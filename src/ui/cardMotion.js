// ==========================================
// カードUIのモーション（GSAP）
// 入場: わずかなオーバーシュートを伴うスライド + 詩の文字単位リビール。
// カードの transform はGSAPが完全に所有する（CSS transitionはopacity等のみ）。
// ==========================================
import { gsap } from 'gsap';

const REDUCED_MOTION =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 本文の各行を文字単位spanへ分割する（<strong>等の子要素構造は保持）。
// TheaterModeの文字演出と「動きの方言」を揃えるための下準備。
function splitChars(el) {
    if (el.querySelector('.char-r')) return el.querySelectorAll('.char-r');
    const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            for (const ch of node.textContent) {
                const span = document.createElement('span');
                span.className = 'char-r';
                span.textContent = ch;
                frag.appendChild(span);
            }
            node.replaceWith(frag);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            [...node.childNodes].forEach(walk);
        }
    };
    [...el.childNodes].forEach(walk);
    return el.querySelectorAll('.char-r');
}

export function openCard(card) {
    const desc = card.querySelector('#ui-desc');

    card.classList.add('visible');
    card.classList.remove('pulse-effect');
    // reflowを挟んでパルスを再トリガー
    void card.offsetWidth;
    card.classList.add('pulse-effect');

    const chars = desc ? splitChars(desc) : [];

    gsap.killTweensOf(card);
    if (chars.length) gsap.killTweensOf(chars);

    if (REDUCED_MOTION) {
        gsap.set(card, { y: '0%' });
        if (chars.length) gsap.set(chars, { opacity: 1, y: 0, filter: 'none' });
        return;
    }

    const tl = gsap.timeline();
    // 入場: 上に僅かに行き過ぎてから沈む（呼吸のような着地）
    tl.fromTo(
        card,
        { y: '100%' },
        { y: '0%', duration: 0.95, ease: 'back.out(1.1)' },
        0
    );
    // 詩は一文字ずつ、闇からゆっくり浮かび上がる
    if (chars.length) {
        tl.fromTo(
            chars,
            { opacity: 0, y: '0.35em', filter: 'blur(3px)' },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.55,
                ease: 'power2.out',
                stagger: 0.028,
                clearProps: 'filter'
            },
            0.4
        );
    }
}

export function closeCard(card) {
    card.classList.remove('visible');
    card.classList.remove('pulse-effect');
    gsap.killTweensOf(card);
    if (REDUCED_MOTION) {
        gsap.set(card, { y: '100%' });
        return;
    }
    gsap.to(card, { y: '100%', duration: 0.55, ease: 'power3.in' });
}

// シードの発芽ポップ（新しいエピソードを見た瞬間）
export function pingSeed(seedEl) {
    if (REDUCED_MOTION) return;
    gsap.fromTo(
        seedEl,
        { scale: 1.9 },
        { scale: 1, duration: 1.1, ease: 'elastic.out(1, 0.4)' }
    );
}
