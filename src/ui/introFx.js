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

// 観音開きの扉演出。中央の継ぎ目が息づいてから、
// 模様入りの両扉が奥へ swing open し、庭（AR）が現れる。
// #door-scene は事前に .active で表示済みである前提。
export function playDoors(onOpened) {
    const scene = document.getElementById('door-scene');
    const left = scene && scene.querySelector('.door-left');
    const right = scene && scene.querySelector('.door-right');
    const seam = scene && scene.querySelector('.door-seam');

    const finish = () => {
        if (scene) scene.classList.remove('active');
        if (left && right) gsap.set([left, right], { clearProps: 'all' });
        if (seam) gsap.set(seam, { clearProps: 'all' });
        onOpened();
    };

    if (REDUCED_MOTION || !scene || !left || !right) {
        finish();
        return;
    }

    const tl = gsap.timeline({ onComplete: finish });

    // 継ぎ目が息づく
    if (seam) {
        tl.fromTo(seam,
            { opacity: 0, scaleY: 0.6 },
            { opacity: 1, scaleY: 1, duration: 0.4, ease: 'power2.out' }, 0);
    }
    // 両扉が奥へ開く（観音開き）
    tl.to(left, { rotateY: 108, duration: 1.25, ease: 'power3.inOut' }, 0.35)
      .to(right, { rotateY: -108, duration: 1.25, ease: 'power3.inOut' }, 0.35);
    // 継ぎ目の光は開き始めに解ける
    if (seam) {
        tl.to(seam, { opacity: 0, duration: 0.5, ease: 'sine.out' }, 0.5);
    }
    // 開ききる手前で扉を薄く消し、縁のちらつきを防ぐ
    tl.to([left, right], { opacity: 0, duration: 0.45, ease: 'sine.in' }, '-=0.5');
}
