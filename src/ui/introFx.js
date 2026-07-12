// ==========================================
// イントロ演出
// - タイトルの文字単位リビール
// - 「標本室の扉を開く」タップ後の切開ワイプ:
//   縦のティール・ヘアラインが走り、幕がマスクで左右に開く。
//   最初の解剖の一刀としてカメラビューへ入る。
// ==========================================
import { gsap } from 'gsap';

const REDUCED_MOTION =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function revealIntroTitle(overlay) {
    const title = overlay.querySelector('.intro-title');
    if (!title || title.dataset.split === '1') return;
    title.dataset.split = '1';

    const text = title.textContent;
    title.textContent = '';
    const chars = [...text].map((ch) => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.style.display = 'inline-block';
        title.appendChild(span);
        return span;
    });

    if (REDUCED_MOTION) return;
    gsap.fromTo(
        chars,
        { opacity: 0, y: '0.3em', filter: 'blur(6px)' },
        {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power2.out',
            stagger: 0.1,
            delay: 0.5,
            clearProps: 'filter'
        }
    );
}

export function playIncision(overlay, onOpened) {
    const line = document.getElementById('incision-line');
    if (REDUCED_MOTION || !line) {
        onOpened();
        return;
    }
    const tl = gsap.timeline();
    tl.set(line, { opacity: 1 })
        .fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.45, ease: 'power2.out' }, 0)
        .to(overlay, { '--cut': '60%', duration: 0.9, ease: 'power2.inOut' }, 0.4)
        .to(line, { opacity: 0, duration: 0.35, ease: 'sine.out' }, 0.85)
        .call(onOpened);
}
