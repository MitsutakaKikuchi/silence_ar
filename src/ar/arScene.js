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

const TARGET_COUNT = 10;

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
    }

    // MindARThree の構築とアンカー配線（カメラはまだ起動しない）
    init(imageTargetSrc) {
        this.mindar = new MindARThree({
            container: this.container,
            imageTargetSrc,
            uiLoading: 'no',
            uiScanning: 'no',
            uiError: 'no'
            // 旧A-Frame版と同じトラッキング挙動を保つため filter 系は既定値のまま
        });

        const { renderer } = this.mindar;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.lowQuality ? 1.5 : 2));

        for (let i = 0; i < TARGET_COUNT; i++) {
            const anchor = this.mindar.addAnchor(i);

            const material = createRevealMaterial({ strength: 0.6, edgeColor: '#00ffaa' });
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

        if (this.lowQuality) this.controller.crackEnabled = false;

        // iOSで画面回転後にvideoがミススケールする対策
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.mindar?.resize?.(), 300);
        });
    }

    // テクスチャの遅延ロード（ターゲット検出時に呼び出し）
    loadTextures(index) {
        if (this.texturesLoaded.has(index)) return;
        this.texturesLoaded.add(index);
        const params = this.textureParams[index];
        const material = this.controller.entries[index]?.material;
        if (material) loadRevealTextures(material, params);

        // パーティクル側にも同じ深度マップを共有（キャッシュ経由なので二重取得なし）
        const particleMaterial = this.controller.entries[index]?.particleMaterial;
        if (particleMaterial && params.depthMap) {
            loadTextureWithCache(params.depthMap)
                .then((tex) => {
                    particleMaterial.uniforms.uDepth.value = tex;
                    particleMaterial.uniforms.uHasDepth.value = 1.0;
                })
                .catch(() => {});
        }
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
        renderer.setAnimationLoop((time) => {
            this.controller.update(time || performance.now());
            renderer.render(scene, camera);
        });
        this.startQualityWatch();
    }
}
