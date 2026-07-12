// ==========================================
// 共有状態（旧 window.arTargetActive / window.gyroData）
// AR認識状態とジャイロ値を、UI層とシェーダー層で共有する。
// ==========================================
export const state = {
    arTargetActive: false,
    gyroData: { gamma: 0, beta: 0 }
};
