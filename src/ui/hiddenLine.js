// ==========================================
// 佇む者への一行
// 開いた「本音の庭」を動かさず見つめ続けた鑑賞者にだけ、
// 未収載の一行が霞から滲むように浮かび、しばらく佇んでから
// 下方へ「沈殿」して層に還る（前書きの詩「層を重ねている」との呼応）。
// ==========================================
import { gsap } from 'gsap';

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CHAR_STAGGER = 0.05;   // 文字の立ち上がり間隔（秒）
const RISE_DURATION = 1.4;   // 1文字が滲み出るまで（秒）
const HOLD_SEC = 5.0;        // 一行が佇む時間（秒）
const SINK_DURATION = 1.8;   // 沈殿にかける時間（秒）
const REDUCED_HOLD_SEC = 4.0; // モーション低減時の表示時間（秒）

let activeTimeline = null;

/**
 * 隠れた一行を浮かび上がらせる。表示中に再度呼ばれた場合は前の行を破棄する。
 * @param {string} text 表示する一行
 */
export function showHiddenLine(text) {
  const el = document.getElementById('hidden-line');
  if (!el || !text) return;

  hideHiddenLine();

  el.innerHTML = [...text]
    .map((ch) => `<span class="hl-char">${ch}</span>`)
    .join('');
  el.classList.add('visible');
  const chars = el.querySelectorAll('.hl-char');

  if (REDUCED_MOTION) {
    activeTimeline = gsap.timeline({ onComplete: () => cleanup(el) });
    activeTimeline.to({}, { duration: REDUCED_HOLD_SEC });
    return;
  }

  activeTimeline = gsap.timeline({ onComplete: () => cleanup(el) });
  // 霞から滲むように浮かぶ
  activeTimeline.fromTo(chars,
    { opacity: 0, y: 8, filter: 'blur(6px)' },
    {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: RISE_DURATION, stagger: CHAR_STAGGER, ease: 'sine.out'
    }
  );
  // 佇む
  activeTimeline.to({}, { duration: HOLD_SEC });
  // フェードではなく「沈殿」——下方へ沈み、ぼけて層になる
  activeTimeline.to(chars, {
    opacity: 0, y: 22, filter: 'blur(4px)',
    duration: SINK_DURATION, stagger: CHAR_STAGGER * 0.6, ease: 'sine.in'
  });
}

/** 表示中の一行を即座に片付ける（カード表示・targetLost 時） */
export function hideHiddenLine() {
  const el = document.getElementById('hidden-line');
  if (activeTimeline) {
    activeTimeline.kill();
    activeTimeline = null;
  }
  if (el) cleanup(el);
}

function cleanup(el) {
  el.classList.remove('visible');
  el.innerHTML = '';
  activeTimeline = null;
}
