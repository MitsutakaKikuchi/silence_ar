// ==========================================
// リビール制御（旧 anatomical-reveal の tick() 移植）
// 毎フレーム、各マテリアルの uReveal を目標値へ lerp し、
// ジャイロ値をスムージングして uViewVec に反映する。
// ==========================================
import * as THREE from 'three';
import { state } from '../core/state.js';

export class RevealController {
    constructor() {
        this.entries = [];
    }

    add(material) {
        this.entries.push({
            material,
            // ジャイロスムージング用の前フレーム値
            smoothedViewVec: new THREE.Vector3(0, 0, 1)
        });
    }

    update(time) {
        // ターゲットが認識されているかチェック（共有状態）
        const isTargetActive = state.arTargetActive === true;
        // 目標値（ターゲット認識でLayer B、非認識でLayer A）
        const targetReveal = isTargetActive ? 1.0 : 0.0;

        for (const { material, smoothedViewVec } of this.entries) {
            // 時間更新
            material.uniforms.uTime.value = time / 1000;

            // 現在値から目標値へ滑らかに補間 (Lerp)
            const current = material.uniforms.uReveal.value;
            material.uniforms.uReveal.value += (targetReveal - current) * 0.02;

            // ジャイロデータを使用したパララックス効果（スムージング適用）
            if (state.gyroData) {
                const gx = state.gyroData.gamma || 0; // 左右傾き
                const gy = state.gyroData.beta || 0;  // 前後傾き

                // 目標ベクトル（感度を下げて震えを抑制）
                const targetVec = new THREE.Vector3(gx * 1.2, gy * 0.9, 1.0);

                // スムージング補間（係数を極限まで小さくして震えを完全抑制）
                smoothedViewVec.lerp(targetVec, 0.002);

                // スムージング後の値を適用
                material.uniforms.uViewVec.value.copy(smoothedViewVec);
            }
        }
    }
}
