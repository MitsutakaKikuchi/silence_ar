// ==========================================
// ジャイロスコープ視差効果
// ==========================================
export class GyroParallax {
    constructor(callback) {
        this.callback = callback;
        this.enabled = false;
        this.beta = 0;
        this.gamma = 0;
        this.init();
    }
    
    init() {
        if (window.DeviceOrientationEvent) {
            // iOS 13+ では許可が必要
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                // ユーザーインタラクション後に有効化される
                this.needsPermission = true;
            } else {
                this.startListening();
            }
        }
    }
    
    async requestPermission() {
        if (this.needsPermission) {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') {
                    this.startListening();
                    return true;
                }
            } catch (e) {
                console.log('Gyro permission error:', e);
            }
            return false;
        }
        return true;
    }
    
    startListening() {
        window.addEventListener('deviceorientation', (e) => {
            this.enabled = true;
            // beta: 前後の傾き (-180 to 180)
            // gamma: 左右の傾き (-90 to 90)
            this.beta = (e.beta || 0) / 180;
            this.gamma = (e.gamma || 0) / 90;
            
            if (this.callback) {
                this.callback(this.gamma, this.beta);
            }
        });
    }
}
