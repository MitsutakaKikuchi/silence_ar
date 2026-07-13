// ==========================================
// パーティクルシステム（花びら・光の粒子）
// ==========================================

// 既定のわびさびパレット（時間帯テーマ未指定時のフォールバック）
const DEFAULT_PALETTE = {
    petalBase: [120, 140, 100], // 苔色
    lightBase: [140, 115, 95]   // 銅色
};

export class ParticleSystem {
    constructor(canvas, palette = DEFAULT_PALETTE) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 35;
        this.gyroOffset = { x: 0, y: 0 };
        // 時間帯連動: 訪問時刻のパレットで粒子を彩る（timeEnvironment.js 参照）
        this.palette = { ...DEFAULT_PALETTE, ...palette };
        this.resize();
        this.init();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle() {
        const types = ['petal', 'light', 'dust'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: type === 'petal' ? 3 + Math.random() * 5 : 1.5 + Math.random() * 3,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: -0.2 - Math.random() * 0.4, // 上昇
            opacity: 0.1 + Math.random() * 0.4,
            type: type,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            pulse: Math.random() * Math.PI * 2,
            color: type === 'petal'
                ? `rgba(${this.palette.petalBase[0] + Math.random() * 20}, ${this.palette.petalBase[1] + Math.random() * 15}, ${this.palette.petalBase[2] + Math.random() * 20}, ` // 苔色（時間帯で沈む）
                : type === 'light'
                ? `rgba(${this.palette.lightBase[0] + Math.random() * 20}, ${this.palette.lightBase[1] + Math.random() * 15}, ${this.palette.lightBase[2] + Math.random() * 20}, ` // 銅色（時間帯で沈む）
                : `rgba(255, 255, 255, `
        };
    }
    
    updateGyro(x, y) {
        this.gyroOffset.x = x * 15;
        this.gyroOffset.y = y * 15;
    }

    // 指定座標から花弁・光の粒を放つ（コンプリーション星座の解散などに使用）
    burst(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            const p = this.createParticle();
            p.x = x;
            p.y = y;
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.6 + Math.random() * 1.6;
            p.speedX = Math.cos(angle) * speed;
            p.speedY = Math.sin(angle) * speed - 0.5; // やや上向きに
            p.opacity = 0.3 + Math.random() * 0.4;
            this.particles.push(p);
        }
        // しばらく漂ったあと定常数へ戻す
        setTimeout(() => {
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
        }, 9000);
    }
    
    update() {
        this.particles.forEach((p, index) => {
            // 移動
            p.x += p.speedX + this.gyroOffset.x * 0.01;
            p.y += p.speedY + this.gyroOffset.y * 0.005;
            p.rotation += p.rotationSpeed;
            p.pulse += 0.02;
            
            // 画面外に出たらリセット
            if (p.y < -20 || p.x < -20 || p.x > this.canvas.width + 20) {
                this.particles[index] = this.createParticle();
                this.particles[index].y = this.canvas.height + 10;
                this.particles[index].x = Math.random() * this.canvas.width;
            }
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            
            const pulseOpacity = p.opacity * (0.7 + Math.sin(p.pulse) * 0.3);
            
            if (p.type === 'petal') {
                // 花びら形状
                this.ctx.beginPath();
                this.ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color + pulseOpacity + ')';
                this.ctx.fill();
                
                // 光彩
                this.ctx.shadowBlur = 8;
                this.ctx.shadowColor = p.color + '0.3)';
            } else {
                // 光の粒子
                const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
                gradient.addColorStop(0, p.color + pulseOpacity + ')');
                gradient.addColorStop(1, p.color + '0)');
                
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }
            
            this.ctx.restore();
        });
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}
