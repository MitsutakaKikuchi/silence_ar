// ==========================================
// タッチリップルエフェクト
// ==========================================
export class RippleEffect {
    constructor(container) {
        this.container = container;
    }
    
    create(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'touch-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.container.appendChild(ripple);
        
        // アニメーション終了後に削除
        setTimeout(() => {
            ripple.remove();
        }, 1500);
    }
}
