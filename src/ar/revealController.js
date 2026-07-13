// ==========================================
// リビール振付（GSAPタイムライン）
// 旧実装の固定lerp(0.02/frame)を、4段階の振付に置き換える:
//   ⓪ 0-1.1s   uAppear — 霧が凝結し、記憶（Layer A）が像を結ぶ
//   ① 0.9s~    uCrack  — 深部から細い光の亀裂が走る
//   ② 1.4s~    uReveal — 有機的に開裂 (power2.inOut)
//   ③ 中間点    uEdgeBoost — エッジ発光がパルスして定常へ沈む
// targetLost 時は約1.6倍速で逆再生する。
// ジャイロ平滑(uViewVec)は旧 tick() の忠実移植。
// ==========================================
import * as THREE from 'three';
import { gsap } from 'gsap';
import { state } from '../core/state.js';
import { hapticPulse, HAPTIC_CRACK } from '../core/haptics.js';

const REDUCED_MOTION =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 顕現ステージの振付定数
const APPEAR_DURATION = 1.1; // 結像にかける時間（秒）
const APPEAR_LEAD = 0.9;     // 顕現がほぼ結像してから亀裂が走るまでのリード（秒）
const APPEAR_CLOSE = 0.8;    // targetLost 時に像が霧へ還る時間（秒）

export class RevealController {
    constructor() {
        this.entries = [];
        this.lastActive = false;
        this.lastTimeSec = 0;
        this.crackEnabled = !REDUCED_MOTION; // quality tier からも無効化される
    }

    add(material, particleMaterial = null) {
        this.entries.push({
            material,
            particleMaterial,
            // ジャイロスムージング用の前フレーム値
            smoothedViewVec: new THREE.Vector3(0, 0, 1)
        });
    }

    // 開閉の振付。全マテリアルに同じ振付を適用する
    // （可視なのは認識中のアンカーのみなので描画コストは1枚分）。
    transitionTo(active) {
        const speed = REDUCED_MOTION ? 100 : 1; // モーション低減時はほぼ即時遷移

        // 亀裂が走る瞬間の微振動（全マテリアル共通なので一度だけ予約する）
        if (this.hapticCall) {
            this.hapticCall.kill();
            this.hapticCall = null;
        }
        if (active && !REDUCED_MOTION) {
            this.hapticCall = gsap.delayedCall(APPEAR_LEAD, () => hapticPulse(HAPTIC_CRACK));
        }

        for (const entry of this.entries) {
            const u = entry.material.uniforms;
            gsap.killTweensOf([u.uReveal, u.uCrack, u.uEdgeBoost, u.uAppear]);

            if (active) {
                const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });
                // ⓪ 霧の凝結 — まず記憶（Layer A）が像を結ぶ
                tl.to(u.uAppear, { value: 1, duration: APPEAR_DURATION / speed, ease: 'sine.out' }, 0);
                // 顕現がほぼ結像してから、以降の解剖振付が始まる
                const lead = APPEAR_LEAD / speed;
                if (this.crackEnabled) {
                    tl.to(u.uCrack, { value: 1, duration: 0.7 / speed, ease: 'power1.out' }, lead);
                }
                const revealStart = lead + (this.crackEnabled ? 0.5 / speed : 0);
                // 被膜がゆっくり剥がれるよう開裂を減速（uReveal: 3.0s）
                tl.to(u.uReveal, { value: 1, duration: 3.0 / speed, ease: 'power2.inOut' }, revealStart);
                // 開裂の中間点で発光がひときわ強まり、ゆっくり定常へ沈む
                tl.to(u.uEdgeBoost, { value: 1.9, duration: 1.0 / speed, ease: 'power1.in' }, lead + 1.0 / speed)
                  .to(u.uEdgeBoost, { value: 1.0, duration: 1.4 / speed, ease: 'sine.out' }, lead + 2.0 / speed);
                // 亀裂は開裂の進行とともに癒える
                if (this.crackEnabled) {
                    tl.to(u.uCrack, { value: 0, duration: 1.2 / speed, ease: 'sine.out' }, lead + 1.4 / speed);
                }
            } else {
                // 逆再生（約1.6倍速）: 傷が静かに閉じ、像は霧へ還る
                gsap.to(u.uReveal, { value: 0, duration: 1.5 / speed, ease: 'power2.in' });
                gsap.to(u.uCrack, { value: 0, duration: 0.4 / speed, ease: 'sine.out' });
                gsap.to(u.uEdgeBoost, { value: 1.0, duration: 0.6 / speed, ease: 'sine.out' });
                gsap.to(u.uAppear, { value: 0, duration: APPEAR_CLOSE / speed, ease: 'sine.in' });
            }
        }
    }

    // タッチリップル: 該当uvから減衰リングを発生させる
    touch(index, uv) {
        const entry = this.entries[index];
        if (!entry) return;
        entry.material.uniforms.uTouch.value.set(uv.x, uv.y, this.lastTimeSec, 1.0);
        if (entry.particleMaterial) {
            entry.particleMaterial.uniforms.uTouch.value.set(uv.x, uv.y, this.lastTimeSec, 1.0);
        }
    }

    update(time) {
        const timeSec = time / 1000;
        this.lastTimeSec = timeSec;

        // ターゲット認識状態の遷移を検知して振付を発火
        const active = state.arTargetActive === true;
        if (active !== this.lastActive) {
            this.lastActive = active;
            this.transitionTo(active);
        }

        for (const { material, particleMaterial, smoothedViewVec } of this.entries) {
            // 時間更新
            material.uniforms.uTime.value = timeSec;

            // パーティクルはリビールの進行に同期
            if (particleMaterial) {
                particleMaterial.uniforms.uTime.value = timeSec;
                particleMaterial.uniforms.uReveal.value = material.uniforms.uReveal.value;
            }

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
