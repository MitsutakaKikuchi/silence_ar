// ==========================================
// ARシーン（MindAR Three.js版）
// A-Frame を介さず MindARThree を直接使用する。
// renderer/scene/camera は MindAR 提供のものを使う（自作しない）。
// ==========================================
import * as THREE from 'three';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import { createRevealMaterial, loadRevealTextures } from './revealMaterial.js';
import { RevealController } from './revealController.js';
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

export class ARScene {
    constructor(container) {
        this.container = container;
        this.mindar = null;
        this.controller = new RevealController();
        this.textureParams = [];
        this.texturesLoaded = new Set();
        this.started = false;
    }

    // MindARThree の構築とアンカー配線（カメラはまだ起動しない）
    init(imageTargetSrc) {
        this.mindar = new MindARThree({
            container: this.container,
            imageTargetSrc,
            uiLoading: 'no',
            uiScanning: 'no',
            uiError: 'no',
            // 旧A-Frame版と同じトラッキング挙動を保つため filter 系は既定値のまま
        });

        const { renderer } = this.mindar;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        for (let i = 0; i < TARGET_COUNT; i++) {
            const anchor = this.mindar.addAnchor(i);
            const material = createRevealMaterial({ strength: 0.6, edgeColor: '#00ffaa' });
            const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
            anchor.group.add(mesh);
            this.controller.add(material);
            this.textureParams.push({
                layerA: `./images/layerA_${i}.jpg`,
                layerB: `./images/layerB_${i}.jpg`,
                depthMap: `./images/layerB_${i}_depth.png`
            });
            anchor.onTargetFound = () => events.emit('targetFound', i);
            anchor.onTargetLost = () => events.emit('targetLost', i);
        }

        // iOSで画面回転後にvideoがミススケールする対策
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.mindar?.resize?.(), 300);
        });
    }

    // テクスチャの遅延ロード（ターゲット検出時に呼び出し）
    loadTextures(index) {
        if (this.texturesLoaded.has(index)) return;
        this.texturesLoaded.add(index);
        const material = this.controller.entries[index]?.material;
        if (material) loadRevealTextures(material, this.textureParams[index]);
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
    }
}
