// ==========================================
// ハプティクス（触覚フィードバック）
// 亀裂が走る瞬間など、演出の山場に極短の微振動を添える。
// - iOS Safari は navigator.vibrate 非対応のため自動的に no-op（無害）
// - prefers-reduced-motion 時は無効化
// ==========================================

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 亀裂が走る瞬間 — 皮膚の下で何かが動いた感触 */
export const HAPTIC_CRACK = 15;

/** 完了演出 — 星座が結ばれた瞬間の二拍 */
export const HAPTIC_CONSTELLATION = [10, 80, 10];

/**
 * 微振動を発火する。非対応環境・モーション低減設定時は何もしない。
 * @param {number|number[]} pattern 振動時間(ms)またはパターン
 */
export function hapticPulse(pattern) {
  if (REDUCED_MOTION) return;
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
  try {
    navigator.vibrate(pattern);
  } catch (err) {
    // 一部ブラウザはユーザー操作外の呼び出しで例外を投げることがある
    console.debug('haptics: vibrate failed', err);
  }
}
