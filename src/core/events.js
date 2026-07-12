// ==========================================
// 小型イベントエミッター
// AR層(arScene)とUI層(main)の橋渡し。
// ==========================================
const listeners = {};

export const events = {
    on(name, fn) {
        (listeners[name] = listeners[name] || []).push(fn);
    },
    off(name, fn) {
        if (!listeners[name]) return;
        listeners[name] = listeners[name].filter((f) => f !== fn);
    },
    emit(name, ...args) {
        (listeners[name] || []).forEach((fn) => fn(...args));
    }
};
