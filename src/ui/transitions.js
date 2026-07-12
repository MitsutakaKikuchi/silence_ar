// ==========================================
// View Transitions API ラッパー（プログレッシブ強化）
// 対応環境(iOS 18+/Chrome)ではオーバーレイの切替が
// ページ全体のクロスフェードとして滑らかに繋がる。
// 非対応環境では既存のCSS transitionがそのまま働く。
// ==========================================
const REDUCED_MOTION =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function swapOverlay(mutate) {
    if (document.startViewTransition && !REDUCED_MOTION) {
        document.startViewTransition(mutate);
    } else {
        mutate();
    }
}
