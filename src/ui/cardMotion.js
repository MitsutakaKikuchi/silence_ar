// ==========================================
// カードUIのモーション（GSAP）
// 入場: わずかなオーバーシュートを伴うスライド + 詩の文字単位リビール。
// カードの transform はGSAPが完全に所有する（CSS transitionはopacity等のみ）。
// ==========================================
import { gsap } from 'gsap';

const REDUCED_MOTION =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 禁則処理用の文字集合。
// 文字単位アニメのため各文字を inline-block span にすると、ブラウザは
// どの文字間でも改行できてしまい CJK の禁則が無効になる。そこで改行を
// 禁じたい箇所へ WORD JOINER(U+2060) を挿入し、禁則を復元する。
const WORD_JOINER = '⁠';
// 行頭禁則: 行頭に来てはならない文字（→ この文字の直前では改行させない）
const NO_LINE_START = new Set(
    '、。，．・：；！？）］｝」』】〕》〉〟”’%‰゜ゝゞ々ー—…‥' +
    'ぁぃぅぇぉっゃゅょゎゕゖ' +
    'ァィゥェォッャュョヮヵヶ'
);
// 行末禁則: 行末に来てはならない文字（→ この文字の直後では改行させない）
const NO_LINE_END = new Set('（［｛「『【〔《〈“‘');

// 本文の各行を文字単位spanへ分割する（<strong>等の子要素構造は保持）。
// TheaterModeの文字演出と「動きの方言」を揃えるための下準備。
// 併せて禁則位置に WORD JOINER を挿入し、行頭・行末禁則を保つ。
function splitChars(el) {
    if (el.querySelector('.char-r')) return el.querySelectorAll('.char-r');
    // 直前に生成した文字（reveal-line=ブロック境界でリセット）
    let prevChar = null;
    const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            for (const ch of node.textContent) {
                // 直前との間で改行を禁じるべきか（行頭禁則 or 直前が行末禁則）
                const joinBefore = prevChar !== null &&
                    (NO_LINE_START.has(ch) || NO_LINE_END.has(prevChar));
                if (joinBefore) frag.appendChild(document.createTextNode(WORD_JOINER));
                const span = document.createElement('span');
                span.className = 'char-r';
                span.textContent = ch;
                frag.appendChild(span);
                prevChar = ch;
            }
            node.replaceWith(frag);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // 行（block）をまたぐ結合は無意味なので境界でリセット
            const isLine = node.classList && node.classList.contains('reveal-line');
            if (isLine) prevChar = null;
            [...node.childNodes].forEach(walk);
            if (isLine) prevChar = null;
        }
    };
    [...el.childNodes].forEach(walk);
    return el.querySelectorAll('.char-r');
}

export function openCard(card) {
    const desc = card.querySelector('#ui-desc');

    card.classList.add('visible');
    // pulse(box-shadowアニメ)とbackdrop-filterはスライド完了後に付与する。
    // スライド中に毎フレーム再描画/再合成させないためのカクつき対策。
    card.classList.remove('pulse-effect', 'settled');

    const chars = desc ? splitChars(desc) : [];

    gsap.killTweensOf(card);
    if (chars.length) gsap.killTweensOf(chars);

    if (REDUCED_MOTION) {
        gsap.set(card, { y: '0%' });
        if (chars.length) gsap.set(chars, { opacity: 1, y: 0 });
        card.classList.add('pulse-effect', 'settled');
        return;
    }

    gsap.set(card, { willChange: 'transform' });

    const tl = gsap.timeline();
    // 入場: 上に僅かに行き過ぎてから沈む（呼吸のような着地）
    tl.fromTo(
        card,
        { y: '100%' },
        {
            y: '0%',
            duration: 0.95,
            ease: 'back.out(1.1)',
            onComplete: () => {
                // 着地してからパルス発火・すりガラス(backdrop-filter)を有効化
                card.classList.add('pulse-effect', 'settled');
                gsap.set(card, { willChange: 'auto' });
            }
        },
        0
    );
    // 詩は一文字ずつ、闇からゆっくり浮かび上がる（blurは負荷が高いので使わない）
    if (chars.length) {
        tl.fromTo(
            chars,
            { opacity: 0, y: '0.35em' },
            {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: 'power2.out',
                stagger: 0.028
            },
            0.4
        );
    }
}

export function closeCard(card) {
    card.classList.remove('visible', 'pulse-effect', 'settled');
    gsap.killTweensOf(card);
    if (REDUCED_MOTION) {
        gsap.set(card, { y: '100%' });
        return;
    }
    gsap.to(card, {
        y: '100%',
        duration: 0.55,
        ease: 'power3.in',
        onComplete: () => gsap.set(card, { willChange: 'auto' })
    });
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
