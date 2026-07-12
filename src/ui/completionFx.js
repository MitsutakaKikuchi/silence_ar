// ==========================================
// コンプリーション演出: シードの星座
// 10話すべてを見終えたとき、右端で育っていた10粒のシードが
// 画面中央へ浮かび上がり、細いヘアラインで星座を結び、
// 花弁に解けて消える。そのあとエピローグの詩が立ち上がる。
// ==========================================
import { gsap } from 'gsap';

const REDUCED_MOTION =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SVG_NS = 'http://www.w3.org/2000/svg';

export function playConstellation(particleSystem, onDone) {
    const seeds = [...document.querySelectorAll('.episode-seed')];
    if (REDUCED_MOTION || seeds.length === 0) {
        onDone();
        return;
    }

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    Object.assign(svg.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '999997', /* コンプリーションオーバーレイ(2000)より上 */
        pointerEvents: 'none'
    });
    document.body.appendChild(svg);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const radius = Math.min(cx, cy) * 0.5;
    const points = seeds.map((seed, i) => {
        const r = seed.getBoundingClientRect();
        const angle = -Math.PI / 2 + (i * Math.PI * 2) / seeds.length;
        return {
            x0: r.left + r.width / 2,
            y0: r.top + r.height / 2,
            x1: cx + Math.cos(angle) * radius,
            y1: cy + Math.sin(angle) * radius
        };
    });

    // 星座を結ぶヘアライン（先に追加して点の下に描画）
    const lines = points.map((p, i) => {
        const q = points[(i + 1) % points.length];
        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', p.x1);
        line.setAttribute('y1', p.y1);
        line.setAttribute('x2', q.x1);
        line.setAttribute('y2', q.y1);
        line.setAttribute('stroke', 'rgba(0, 255, 170, 0.4)');
        line.setAttribute('stroke-width', '0.8');
        line.setAttribute('pathLength', '1');
        line.setAttribute('stroke-dasharray', '1');
        line.setAttribute('stroke-dashoffset', '1');
        svg.appendChild(line);
        return line;
    });

    const dots = points.map((p) => {
        const dot = document.createElementNS(SVG_NS, 'circle');
        dot.setAttribute('r', '2.6');
        dot.setAttribute('cx', p.x0);
        dot.setAttribute('cy', p.y0);
        dot.setAttribute('fill', 'rgba(0, 255, 170, 0.9)');
        dot.style.filter = 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.7))';
        svg.appendChild(dot);
        return dot;
    });

    const tl = gsap.timeline({
        onComplete: () => svg.remove()
    });

    // ① シードたちが夜空へ浮かび上がる
    points.forEach((p, i) => {
        tl.to(dots[i], {
            attr: { cx: p.x1, cy: p.y1 },
            duration: 1.6,
            ease: 'power2.inOut'
        }, 0.05 * i);
    });
    // ② 細いヘアラインが星座を結ぶ
    tl.to(lines, {
        attr: { 'stroke-dashoffset': 0 },
        duration: 0.9,
        ease: 'sine.inOut',
        stagger: 0.06
    }, '>-0.3');
    // ③ 余韻
    tl.to({}, { duration: 0.8 });
    // ④ 花弁に解けて消える
    tl.call(() => {
        if (particleSystem && typeof particleSystem.burst === 'function') {
            particleSystem.burst(cx, cy, 26);
        }
    });
    tl.to(svg, { opacity: 0, duration: 0.9, ease: 'sine.out' });
    // 本文の立ち上がりはフェードの途中から始める
    tl.call(onDone, null, '-=0.5');
}
