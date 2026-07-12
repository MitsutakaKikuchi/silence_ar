// ==========================================
// 時間帯による環境変化（インスタレーション要素）
// ==========================================
export class TimeBasedEnvironment {
    constructor() {
        this.currentPeriod = this.getTimePeriod();
        this.applyEnvironment();
    }
    
    getTimePeriod() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 10) return 'morning';
        if (hour >= 10 && hour < 17) return 'day';
        if (hour >= 17 && hour < 20) return 'evening';
        return 'night';
    }
                
    applyEnvironment() {
        const root = document.documentElement;
        const loadingBg = document.getElementById('custom-loading');
        
        const themes = {
            morning: {
                // 朝：曖昧な境界線。まだ冷たい空気と、かすかな希望（あるいは諦め）の淡い光。
                gradient: 'linear-gradient(135deg, #15181a 0%, #202426 50%, #181a1c 100%)', // 青みがかった灰色
                welcomeText: '朝靄に、言えなかった言葉が滲む...'
            },
            day: {
                // 昼：理性の時間。すべてが明るみに出る残酷さと、ドライな観察眼。
                gradient: 'linear-gradient(135deg, #0f1210 0%, #1a1f1c 50%, #121413 100%)', // 深い緑味の黒
                welcomeText: '白昼の静寂は、何よりも雄弁だ...'
            },
            evening: {
                // 夕：感情の揺らぎ。愛と拒絶の区別がつかなくなる「誰そ彼（たそがれ）」の時。
                gradient: 'linear-gradient(135deg, #1a0f0a 0%, #261510 50%, #1f120c 100%)', // 赤茶けた闇
                welcomeText: '夕闇が、拒絶と包容を混ぜ合わせる...'
            },
            night: {
                // 夜：深層心理。もっとも深く沈黙が根を張る時間。内省的な青。
                gradient: 'linear-gradient(135deg, #050508 0%, #0a0a14 50%, #06060a 100%)', // ほぼ漆黒に近い青
                welcomeText: '夜の底で、沈黙は呼吸を始める...'
            }
        };
    

        
        const theme = themes[this.currentPeriod];
        
        // ローディング背景
        if (loadingBg) {
            loadingBg.style.background = theme.gradient;
        }
        
        // ローディングテキスト更新
        const loadingText = document.getElementById('loading-main-text');
        if (loadingText) {
            loadingText.textContent = theme.welcomeText;
        }
        
        console.log(`Environment set to: ${this.currentPeriod}`);
    }
}
