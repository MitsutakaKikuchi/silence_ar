// ==========================================
// 呼吸の同期
// サイト全体の「待機の明滅」を単一の呼吸周期に揃え、
// 画面が一つの生き物として息づくようにする。
// - 常時起動のCSSアニメーションはページロードで一斉に始まるため、
//   周期を揃えるだけで自然に同位相になる（base.css の --breath-period）。
// - 後から始まるアニメーション（.current シード等）は syncBreath() で
//   負のディレイを与え、共通の呼吸位相に合流させる。
// - シェーダー側（reveal.frag.glsl）は uTime が performance.now() 由来
//   なので、同じ周期・同じ位相基準（t=0 で息を吐き切る）で一致する。
// ==========================================

/** 呼吸周期（秒）。人の安静時呼吸に近い長さ。base.css の --breath-period と一致させること */
export const BREATH_PERIOD_SEC = 4.8;

/**
 * 要素のCSSアニメーションを共通の呼吸位相に合流させる。
 * アニメーションが適用される（クラス付与などの）タイミングで呼ぶ。
 * @param {HTMLElement} el 対象要素
 */
export function syncBreath(el) {
  if (!el) return;
  const phase = (performance.now() / 1000) % BREATH_PERIOD_SEC;
  el.style.animationDelay = `-${phase.toFixed(3)}s`;
}
