// ==========================================
// 時間帯による環境変化（インスタレーション要素）
// ローディング画面（背景・文言）に加えて、本編の「周辺」——
// 霧の色味・光線の強さ・漂う粒子・環境音の間合い——を
// 訪問した時刻に合わせて薄く沈ませる。
// 切開光のティール(#00ffaa)は作品の基調色なので不変。
// ==========================================

const THEMES = {
    morning: {
        // 朝：曖昧な境界線。まだ冷たい空気と、かすかな希望（あるいは諦め）の淡い光。
        gradient: 'linear-gradient(135deg, #15181a 0%, #202426 50%, #181a1c 100%)', // 青みがかった灰色
        welcomeText: '朝靄に、言えなかった言葉が滲む...',
        // 霧は青灰に、光線はやや控えめに
        mistTintA: 'rgba(140, 180, 200, 0.05)',
        mistTintB: 'rgba(100, 160, 170, 0.05)',
        raysOpacity: 0.55,
        // 粒子: 苔がまだ冷たく、銅は目覚めきらない
        particlePalette: {
            petalBase: [115, 140, 115],
            lightBase: [130, 120, 105]
        },
        // 環境音: 鳥がいる。水滴は朝露の速さ
        soundProfile: {
            birds: true,
            dropDelayMs: [5000, 10000],
            bellDelayMs: [20000, 30000],
            windLfoGain: 0.15
        }
    },
    day: {
        // 昼：理性の時間。すべてが明るみに出る残酷さと、ドライな観察眼。
        gradient: 'linear-gradient(135deg, #0f1210 0%, #1a1f1c 50%, #121413 100%)', // 深い緑味の黒
        welcomeText: '白昼の静寂は、何よりも雄弁だ...',
        mistTintA: 'rgba(0, 255, 170, 0.04)',
        mistTintB: 'rgba(0, 200, 150, 0.05)',
        raysOpacity: 0.7,
        particlePalette: {
            petalBase: [120, 140, 100], // わびさび: 苔色（従来値）
            lightBase: [140, 115, 95]   // わびさび: 銅色（従来値）
        },
        soundProfile: {
            birds: true,
            dropDelayMs: [5000, 10000],
            bellDelayMs: [20000, 30000],
            windLfoGain: 0.15
        }
    },
    evening: {
        // 夕：感情の揺らぎ。愛と拒絶の区別がつかなくなる「誰そ彼（たそがれ）」の時。
        gradient: 'linear-gradient(135deg, #1a0f0a 0%, #261510 50%, #1f120c 100%)', // 赤茶けた闇
        welcomeText: '夕闇が、拒絶と包容を混ぜ合わせる...',
        mistTintA: 'rgba(200, 120, 80, 0.05)',
        mistTintB: 'rgba(170, 110, 90, 0.05)',
        raysOpacity: 0.45,
        // 粒子: 銅が濃く灯る
        particlePalette: {
            petalBase: [130, 135, 95],
            lightBase: [160, 110, 85]
        },
        // 環境音: 鳥は帰り、風がやや強い
        soundProfile: {
            birds: false,
            dropDelayMs: [6000, 12000],
            bellDelayMs: [18000, 28000],
            windLfoGain: 0.22
        }
    },
    night: {
        // 夜：深層心理。もっとも深く沈黙が根を張る時間。内省的な青。
        gradient: 'linear-gradient(135deg, #050508 0%, #0a0a14 50%, #06060a 100%)', // ほぼ漆黒に近い青
        welcomeText: '夜の底で、沈黙は呼吸を始める...',
        mistTintA: 'rgba(60, 90, 180, 0.05)',
        mistTintB: 'rgba(40, 70, 140, 0.06)',
        raysOpacity: 0.3,
        // 粒子: 塵（白）が冴え、色は沈む
        particlePalette: {
            petalBase: [105, 125, 110],
            lightBase: [120, 115, 110]
        },
        // 環境音: 音と音の「間」が深くなる
        soundProfile: {
            birds: false,
            dropDelayMs: [9000, 16000],
            bellDelayMs: [30000, 45000],
            windLfoGain: 0.1
        }
    }
};

export class TimeBasedEnvironment {
    constructor() {
        this.currentPeriod = this.getTimePeriod();
        this.theme = THEMES[this.currentPeriod];
        this.applyEnvironment();
    }

    getTimePeriod() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 10) return 'morning';
        if (hour >= 10 && hour < 17) return 'day';
        if (hour >= 17 && hour < 20) return 'evening';
        return 'night';
    }

    /** 粒子システムに渡す色パレット */
    get particlePalette() {
        return this.theme.particlePalette;
    }

    /** 環境音に渡す間合いプロファイル */
    get soundProfile() {
        return this.theme.soundProfile;
    }

    applyEnvironment() {
        const root = document.documentElement;
        const loadingBg = document.getElementById('custom-loading');
        const theme = this.theme;

        // 本編の周辺環境（霧・光線）へ時刻を薄く反映
        root.style.setProperty('--mist-tint-a', theme.mistTintA);
        root.style.setProperty('--mist-tint-b', theme.mistTintB);
        root.style.setProperty('--rays-opacity', String(theme.raysOpacity));

        // ローディング背景
        if (loadingBg) {
            loadingBg.style.background = theme.gradient;
        }

        // ローディング画面は文字を出さない方針のため、welcomeText は表示しない。

        console.log(`Environment set to: ${this.currentPeriod}`);
    }
}
