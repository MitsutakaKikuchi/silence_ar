// ==========================================
// ARシーン（MindAR Three.js版）
// A-Frame を介さず MindARThree を直接使用する。
// renderer/scene/camera は MindAR 提供のものを使う（自作しない）。
// ==========================================
import * as THREE from 'three';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import { createRevealMaterial, loadRevealTextures } from './revealMaterial.js';
import { createSeamParticles } from './seamParticles.js';
import { RevealController } from './revealController.js';
import { loadTextureWithCache } from '../core/textureCache.js';
import { events } from '../core/events.js';
import { state } from '../core/state.js';

const TARGET_COUNT = 10;

// 全テクスチャ先読み（GPU事前アップロード）のスケジューリング定数
const TEXTURE_PRELOAD_START_MS = 600;    // カメラ起動が落ち着くまでの初期待ち
const TEXTURE_PRELOAD_STAGGER_MS = 300;  // 1話ぶんの温めごとの間隔
const TEXTURE_PRELOAD_RETRY_MS = 500;    // 露見中は避け、後で再試行する間隔

// targets.mind をストリーム取得し、バイト単位の進捗を通知する。
// 取得結果は Blob URL として MindARThree に渡す。
export async function fetchTargets(url, onProgress) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`targets.mind の取得に失敗: ${res.status}`);
    const total = Number(res.headers.get('content-length')) || 0;
    if (!res.body || !total) {
        const blob = await res.blob();
        if (onProgress) onProgress(1);
        return URL.createObjectURL(blob);
    }
    const reader = res.body.getReader();
    const chunks = [];
    let received = 0;
    for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        if (onProgress) onProgress(Math.min(received / total, 1));
    }
    return URL.createObjectURL(new Blob(chunks));
}

// URLパラメータによる品質の手動指定 (?quality=low / ?quality=high)
function qualityOverride() {
    try {
        return new URLSearchParams(window.location.search).get('quality');
    } catch {
        return null;
    }
}

export class ARScene {
    constructor(container) {
        this.container = container;
        this.mindar = null;
        this.controller = new RevealController();
        this.meshes = [];
        this.particles = [];
        this.textureParams = [];
        this.texturesLoaded = new Set();
        this.started = false;
        this.raycaster = new THREE.Raycaster();
        this.lowQuality = qualityOverride() === 'low';
        this.renderer = null; // start() で MindAR のレンダラを保持（GPU事前アップロード用）
        this.preloadStarted = false; // 全テクスチャ先読みは一度だけ走らせる
    }

    // MindARThree の構築とアンカー配線（カメラはまだ起動しない）
    init(imageTargetSrc) {
        this.mindar = new MindARThree({
            container: this.container,
            imageTargetSrc,
            uiLoading: 'no',
            uiScanning: 'no',
            uiError: 'no',
            // 姿勢推定の小刻みな震え(ジッター)を抑える OneEuroFilter 調整。
            // filterMinCF: 静止時のカットオフ。既定 0.001 より小さくすると
            //   静止時のブレが減る代わりに追従がわずかに遅れる。
            // filterBeta: 動作時の追従性。既定 1000 より小さくすると
            //   ゆっくり動かしたときの震えが減る代わりに遅延が増える。
            // 静止時の震えは主に filterMinCF で決まるためこれを1桁下げ、
            //   beta は追従性を残すため中間値に。落ち着いた鑑賞向けの平滑化寄り設定。
            filterMinCF: 0.0001,
            filterBeta: 300
        });

        const { renderer } = this.mindar;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.lowQuality ? 1.5 : 2));

        for (let i = 0; i < TARGET_COUNT; i++) {
            const anchor = this.mindar.addAnchor(i);

            // strength は視差(奥行き)の強さ。姿勢ジッターを視差が増幅するため、
            // 震え軽減のため 0.6 → 0.5 に微調整（奥行き感はほぼ維持）。
            const material = createRevealMaterial({ strength: 0.5, edgeColor: '#00ffaa' });
            const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
            anchor.group.add(mesh);
            this.meshes.push(mesh);

            // 裂け目パーティクル（品質低下時は生成しない）
            let particleMaterial = null;
            if (!this.lowQuality) {
                const points = createSeamParticles({ edgeColor: '#00ffaa' });
                anchor.group.add(points);
                this.particles.push(points);
                particleMaterial = points.material;
            }

            this.controller.add(material, particleMaterial);
            this.textureParams.push({
                layerA: `./images/layerA_${i}.jpg`,
                layerB: `./images/layerB_${i}.jpg`,
                depthMap: `./images/layerB_${i}_depth.png`
            });
            anchor.onTargetFound = () => events.emit('targetFound', i);
            anchor.onTargetLost = () => events.emit('targetLost', i);
        }

        if (this.lowQuality) {
            this.controller.crackEnabled = false;
            document.documentElement.classList.add('perf-lite');
        }

        // iOSで画面回転後にvideoがミススケールする対策
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.mindar?.resize?.(), 300);
        });
    }

    // テクスチャの遅延ロード（ターゲット検出時・先読み時に呼び出し）。
    // renderer を渡すことで、デコード後すぐGPUへアップロードし、
    // 初回描画時のカクつき（デコード+アップロードの同期処理）を解消する。
    loadTextures(index) {
        if (this.texturesLoaded.has(index)) return;
        this.texturesLoaded.add(index);
        const params = this.textureParams[index];
        const material = this.controller.entries[index]?.material;
        if (material) loadRevealTextures(material, params, this.renderer);

        // パーティクル側にも同じ深度マップを共有（キャッシュ経由なので二重取得なし）
        const particleMaterial = this.controller.entries[index]?.particleMaterial;
        if (particleMaterial && params.depthMap) {
            loadTextureWithCache(params.depthMap)
                .then((tex) => {
                    particleMaterial.uniforms.uDepth.value = tex;
                    particleMaterial.uniforms.uHasDepth.value = 1.0;
                    this.renderer?.initTexture?.(tex);
                })
                .catch(() => {});
        }
    }

    // 全エピソードのテクスチャを段階的に先読みし、GPUへ事前アップロードしておく。
    // スキャン開始後のアイドル時間に少しずつ温めることで、ターゲット認識時の
    // デコード/アップロードが露見アニメと競合するカクつきを防ぐ。
    // 全10話を巡ればいずれ全テクスチャがGPUに載るため、ピークVRAMは増えない（前倒し）。
    // スキャン開始の合図で呼ぶ（複数箇所から呼ばれても一度だけ実行）。
    preloadAllTextures() {
        if (this.preloadStarted || !this.renderer) return;
        this.preloadStarted = true;
        let index = 0;
        const step = () => {
            if (index >= TARGET_COUNT) return;
            // 露見の最中はアップロードを避け、アニメの滑らかさを優先する
            if (state.arTargetActive === true) {
                setTimeout(step, TEXTURE_PRELOAD_RETRY_MS);
                return;
            }
            this.loadTextures(index);
            index++;
            setTimeout(step, TEXTURE_PRELOAD_STAGGER_MS);
        };
        setTimeout(step, TEXTURE_PRELOAD_START_MS);
    }

    // 画面座標→現在アンカーの平面uvへレイキャストし、タッチリップルを発火
    touchAt(clientX, clientY, index) {
        const mesh = this.meshes[index];
        if (!mesh || !this.mindar || !this.started) return;
        const rect = this.container.getBoundingClientRect();
        const ndc = new THREE.Vector2(
            ((clientX - rect.left) / rect.width) * 2 - 1,
            -((clientY - rect.top) / rect.height) * 2 + 1
        );
        this.raycaster.setFromCamera(ndc, this.mindar.camera);
        const hit = this.raycaster.intersectObject(mesh, false)[0];
        if (hit?.uv) this.controller.touch(index, hit.uv);
    }

    // 起動後数秒間のfpsを計測し、低ければ演出を軽量化する
    startQualityWatch() {
        if (this.lowQuality || qualityOverride() === 'high') return;
        let frames = 0;
        const begin = performance.now();
        const tick = () => {
            frames++;
            const elapsed = performance.now() - begin;
            if (elapsed < 4000) {
                requestAnimationFrame(tick);
                return;
            }
            const fps = frames / (elapsed / 1000);
            if (fps < 38) {
                console.log(`Quality tier: low (${fps.toFixed(1)}fps)`);
                this.lowQuality = true;
                this.controller.crackEnabled = false;
                this.particles.forEach((p) => { p.visible = false; });
                this.mindar?.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                document.documentElement.classList.add('perf-lite');
            }
        };
        requestAnimationFrame(tick);
    }

    // カメラ起動 + 描画ループ開始（ユーザージェスチャー起点で呼ぶ）
    async start() {
        if (this.started || !this.mindar) return;
        this.started = true;
        await this.mindar.start();
        const { renderer, scene, camera } = this.mindar;
        this.renderer = renderer;
        renderer.setAnimationLoop((time) => {
            this.controller.update(time || performance.now());
            renderer.render(scene, camera);
        });
        this.startQualityWatch();
    }
}
