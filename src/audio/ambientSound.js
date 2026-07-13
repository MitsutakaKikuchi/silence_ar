// ==========================================
// アンビエントサウンド
// ==========================================

// マスター音量とダッキング（露見時に世界が息を止める）の定数
const MASTER_VOLUME = 0.12;      // 定常のマスターゲイン
const DUCK_LEVEL = 0.018;        // 息を呑んだ瞬間の残響レベル（定常の約15%）
const DUCK_ATTACK_SEC = 0.6;     // 音が引くまでの時間
const DUCK_HOLD_SEC = 2.5;       // 静寂の保持（uReveal 3.0s の開裂に同期）
const DUCK_RELEASE_SEC = 2.5;    // 深く戻ってくるまでの時間

// 時間帯プロファイルの既定値（timeEnvironment.js の soundProfile が上書きする）
const DEFAULT_SOUND_PROFILE = {
    birds: true,                  // 鳥のさえずりの有無（夕・夜は鳥が帰る）
    dropDelayMs: [5000, 10000],   // 水滴の間合い [基本, ランダム幅]
    bellDelayMs: [20000, 30000],  // 風鈴の間合い [基本, ランダム幅]
    windLfoGain: 0.15             // 風の強弱の振幅
};

export class AmbientSound {
    constructor(soundProfile = null) {
        this.audioContext = null;
        this.enabled = false;
        this.nodes = {};
        // 時間帯連動: 訪問時刻で環境音の「間」が変わる（夜は間が深くなる）
        this.profile = { ...DEFAULT_SOUND_PROFILE, ...soundProfile };
    }
    
    init() {
        if (this.audioContext) return;
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // マスターボリューム（先に作成）
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = MASTER_VOLUME;
        this.masterGain.connect(this.audioContext.destination);
        
        // リバーブ（残響）ノードを作成
        this.createReverbNode();
        
        // 雨音風のノイズ
        this.createRainNoise();
        
        // 低周波のドローン（お輪/シンギングボウル風の深い倍音）
        this.createDrone();
        
        // 風のノイズ
        this.createWindNoise();
        
        // 各種環境音
        this.createWaterDrops();
        this.createBirdChirps();
        this.createBells();
        this.createWoodCreaks();
        this.createGrassRustle();
    }
    
    createReverbNode() {
        // シンプルなリバーブ（ConvolverNode用のインパルス応答を生成）
        const sampleRate = this.audioContext.sampleRate;
        const length = sampleRate * 2.5; // 2.5秒のリバーブ
        const impulse = this.audioContext.createBuffer(2, length, sampleRate);
        const impulseL = impulse.getChannelData(0);
        const impulseR = impulse.getChannelData(1);
        
        // 有機的な減衰を持つインパルス応答を生成
        for (let i = 0; i < length; i++) {
            const decay = Math.exp(-i / (sampleRate * 0.8)); // 減衰率
            impulseL[i] = (Math.random() * 2 - 1) * decay;
            impulseR[i] = (Math.random() * 2 - 1) * decay;
        }
        
        this.reverbNode = this.audioContext.createConvolver();
        this.reverbNode.buffer = impulse;
        
        // リバーブの音量調整
        this.reverbGain = this.audioContext.createGain();
        this.reverbGain.gain.value = 0.3; // リバーブのミックス量
        
        this.reverbNode.connect(this.reverbGain);
        this.reverbGain.connect(this.masterGain);
    }
    
    createRainNoise() {
        const bufferSize = 2 * this.audioContext.sampleRate;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        // ピンクノイズ生成（より自然な音）
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
            b6 = white * 0.115926;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        
        // フィルター（高周波をカット）
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        
        const noiseGain = this.audioContext.createGain();
        noiseGain.gain.value = 0.4;
        
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        noiseGain.connect(this.reverbNode); // リバーブにも送る
        
        this.nodes.rain = { source: noise, gain: noiseGain };
    }
    
    createDrone() {
        // 低周波の深いドローン（お輪/シンギングボウル風の深い倍音）
        const droneGain = this.audioContext.createGain();
        droneGain.gain.value = 0.025; // 音量をより控えめに
        
        const frequencies = [55, 110, 165, 220, 330]; // 基本周波数とその倍音
        const oscillators = frequencies.map((freq, i) => {
            const osc = this.audioContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq + (Math.random() - 0.5) * 0.5; // 微弱なデチューン
            
            const g = this.audioContext.createGain();
            g.gain.value = 1 / (i + 1); // 倍音ほど小さく
            
            // 個別にLFOをかけて複雑な鳴りに
            const lfo = this.audioContext.createOscillator();
            lfo.frequency.value = 0.05 + Math.random() * 0.1;
            const lg = this.audioContext.createGain();
            lg.gain.value = 0.2 + Math.random() * 0.3;
            lfo.connect(lg);
            lg.connect(g.gain);
            lfo.start();
            
            osc.connect(g);
            g.connect(droneGain);
            return osc;
        });
        
        droneGain.connect(this.masterGain);
        droneGain.connect(this.reverbNode);
        
        this.nodes.drone = { oscillators, gain: droneGain };
    }
    
    createWindNoise() {
        // 風の音（より高周波のノイズ、低音を抑制）
        const bufferSize = 2 * this.audioContext.sampleRate;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.02; // 振幅を少し下げる
        }
        
        const wind = this.audioContext.createBufferSource();
        wind.buffer = noiseBuffer;
        wind.loop = true;
        
        // 低音カットフィルター（highpass）
        const windHPFilter = this.audioContext.createBiquadFilter();
        windHPFilter.type = 'highpass';
        windHPFilter.frequency.value = 300; // 300Hz以下をカット
        windHPFilter.Q.value = 0.7;
        
        // バンドパスフィルター（中高域を強調）
        const windFilter = this.audioContext.createBiquadFilter();
        windFilter.type = 'bandpass';
        windFilter.frequency.value = 1200; // 周波数を上げて低音を避ける
        windFilter.Q.value = 0.4; // Q値を下げて広い帯域に
        
        const windGain = this.audioContext.createGain();
        windGain.gain.value = 0;
        
        // LFOで風の強弱
        const windLFO = this.audioContext.createOscillator();
        windLFO.type = 'sine';
        windLFO.frequency.value = 0.08;
        
        const windLFOGain = this.audioContext.createGain();
        windLFOGain.gain.value = this.profile.windLfoGain; // 時間帯で風の強弱が変わる
        
        windLFO.connect(windLFOGain);
        windLFOGain.connect(windGain.gain);
        
        wind.connect(windHPFilter); // まず低音カット
        windHPFilter.connect(windFilter); // 次にバンドパス
        windFilter.connect(windGain);
        windGain.connect(this.masterGain);
        windGain.connect(this.reverbNode); // リバーブにも送る
        
        this.nodes.wind = { source: wind, gain: windGain, lfo: windLFO };
    }
    
    createWaterDrops() {
        // 水滴音のシミュレーション（ランダムなピッチのトーン）
        this.nodes.drops = { timers: [] };
    }
    
    createBirdChirps() {
        // 鳥のさえずり（ランダムな高周波トーン）
        this.nodes.birds = { timers: [] };
    }
    
    createBells() {
        // ベル（風鈴）の音
        this.nodes.bells = { timers: [] };
    }
    
    createWoodCreaks() {
        // 木のきしみ音
        this.nodes.creaks = { timers: [] };
    }
    
    playBirdChirp() {
        if (!this.audioContext || !this.enabled) return;
        if (!this.profile.birds) return; // 夕・夜は鳥が帰っている
        
        // ランダムな鳥の鳴き声（短いFM合成）
        const carrier = this.audioContext.createOscillator();
        const modulator = this.audioContext.createOscillator();
        const modGain = this.audioContext.createGain();
        const birdGain = this.audioContext.createGain();
        
        const baseFreq = 2000 + Math.random() * 1500;
        carrier.type = 'sine';
        carrier.frequency.value = baseFreq;
        
        modulator.type = 'sine';
        modulator.frequency.value = 10 + Math.random() * 20;
        modGain.gain.value = 100 + Math.random() * 200;
        
        modulator.connect(modGain);
        modGain.connect(carrier.frequency);
        
        birdGain.gain.value = 0.008;
        carrier.connect(birdGain);
        birdGain.connect(this.masterGain);
        
        const now = this.audioContext.currentTime;
        carrier.start(now);
        modulator.start(now);
        
        // 短いチャープ
        birdGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        carrier.stop(now + 0.15);
        modulator.stop(now + 0.15);
        
        // 次の鳥（ランダムな間隔）
        if (this.enabled) {
            const nextChirp = setTimeout(() => {
                this.playBirdChirp();
            }, 15000 + Math.random() * 25000);
            this.nodes.birds.timers.push(nextChirp);
        }
    }
    
    playBell() {
        if (!this.audioContext || !this.enabled) return;
        
        // 風鈴のような音（減衰するサイン波）
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        const freq = frequencies[Math.floor(Math.random() * frequencies.length)];
        
        const osc = this.audioContext.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // フィルターでベルっぽい音に
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 400;
        
        const bellGain = this.audioContext.createGain();
        bellGain.gain.value = 0.015;
        
        osc.connect(filter);
        filter.connect(bellGain);
        bellGain.connect(this.masterGain);
        
        const now = this.audioContext.currentTime;
        osc.start(now);
        bellGain.gain.exponentialRampToValueAtTime(0.001, now + 2);
        osc.stop(now + 2);
        
        // 次のベル（時間帯の間合いでランダムに）
        if (this.enabled) {
            const nextBell = setTimeout(() => {
                this.playBell();
            }, this.profile.bellDelayMs[0] + Math.random() * this.profile.bellDelayMs[1]);
            this.nodes.bells.timers.push(nextBell);
        }
    }
    
    playWaterDrop() {
        if (!this.audioContext || !this.enabled) return;
        
        const osc = this.audioContext.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 800 + Math.random() * 400;
        
        const dropGain = this.audioContext.createGain();
        dropGain.gain.value = 0.02;
        
        osc.connect(dropGain);
        dropGain.connect(this.masterGain);
        
        const now = this.audioContext.currentTime;
        osc.start(now);
        dropGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.stop(now + 0.3);
        
        // 次の水滴（時間帯の間合いでランダムに）
        if (this.enabled) {
            const nextDrop = setTimeout(() => {
                this.playWaterDrop();
            }, this.profile.dropDelayMs[0] + Math.random() * this.profile.dropDelayMs[1]);
            this.nodes.drops.timers.push(nextDrop);
        }
    }

    playWoodCreak() {
        if (!this.audioContext || !this.enabled) return;
        
        const now = this.audioContext.currentTime;
        // 木のきしみ（より深みのある複数レイヤー）
        const count = 2 + Math.floor(Math.random() * 2);
        
        for (let i = 0; i < count; i++) {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            osc.type = 'sine';
            const baseFreq = 50 + Math.random() * 50;
            osc.frequency.setValueAtTime(baseFreq, now + i * 0.15);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 2);
            
            filter.type = 'lowpass';
            filter.frequency.value = 250;
            
            gain.gain.setValueAtTime(0, now + i * 0.15);
            gain.gain.linearRampToValueAtTime(0.02, now + i * 0.15 + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            gain.connect(this.reverbNode);
            
            osc.start(now + i * 0.15);
            osc.stop(now + 3);
        }
        
        if (this.enabled) {
            const nextCreak = setTimeout(() => {
                this.playWoodCreak();
            }, 12000 + Math.random() * 15000);
            this.nodes.creaks.timers.push(nextCreak);
        }
    }

    createGrassRustle() {
        // 草のたなびき（ノイズをフィルタリングして再現）
        this.nodes.grass = { timers: [] };
    }

    playGrassRustle() {
        if (!this.audioContext || !this.enabled) return;
        
        const now = this.audioContext.currentTime;
        const bufferSize = this.audioContext.sampleRate * 5;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        // 柔らかいノイズ
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.5;
        }
        
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(600, now);
        filter.Q.value = 0.4;
        
        // 風による周波数のたなびき
        filter.frequency.exponentialRampToValueAtTime(1000, now + 2);
        filter.frequency.exponentialRampToValueAtTime(500, now + 5);
        
        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.015, now + 2);
        gain.gain.linearRampToValueAtTime(0, now + 5);
        
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        
        source.start(now);
        source.stop(now + 5);
        
        if (this.enabled) {
            const nextRustle = setTimeout(() => {
                this.playGrassRustle();
            }, 15000 + Math.random() * 20000);
            this.nodes.grass.timers.push(nextRustle);
        }
    }
    
    // 露見の瞬間、世界が息を止める。
    // 環境音を静かに絞り、開裂が定常へ沈むのに合わせて深く戻す。
    // targetLost 時も何もしなくてよい（このエンベロープが自然に復帰する）。
    duckForReveal() {
        if (!this.enabled || !this.audioContext || !this.masterGain) return;

        const gain = this.masterGain.gain;
        const now = this.audioContext.currentTime;
        const duckEnd = now + DUCK_ATTACK_SEC + DUCK_HOLD_SEC;

        gain.cancelScheduledValues(now);
        gain.setValueAtTime(gain.value, now);
        gain.linearRampToValueAtTime(DUCK_LEVEL, now + DUCK_ATTACK_SEC);
        gain.setValueAtTime(DUCK_LEVEL, duckEnd);
        gain.linearRampToValueAtTime(MASTER_VOLUME, duckEnd + DUCK_RELEASE_SEC);
    }

    toggle() {
        if (!this.audioContext) {
            this.init();
        }
        
        this.enabled = !this.enabled;
        
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        if (this.enabled) {
            this.nodes.rain.source.start();
            // 全てのドローン発振器を開始
            this.nodes.drone.oscillators.forEach(osc => osc.start());
            this.nodes.wind.source.start();
            this.nodes.wind.lfo.start();
            
            // フェードイン（ダッキング等の予約を破棄してから）
            this.masterGain.gain.cancelScheduledValues(this.audioContext.currentTime);
            this.masterGain.gain.linearRampToValueAtTime(MASTER_VOLUME, this.audioContext.currentTime + 2);
            
            // 不規則な環境音の開始（侘寂の美学に基づき、間隔を空ける）
            setTimeout(() => this.playWaterDrop(), 3000);
            setTimeout(() => this.playBirdChirp(), 8000);
            setTimeout(() => this.playBell(), 15000);
            setTimeout(() => this.playWoodCreak(), 5000);
            setTimeout(() => this.playGrassRustle(), 12000);
        } else {
            // フェードアウト（ダッキング等の予約を破棄してから）
            this.masterGain.gain.cancelScheduledValues(this.audioContext.currentTime);
            this.masterGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.5);
            
            // 全てのタイマーをクリア
            const timerNodes = ['drops', 'birds', 'bells', 'creaks', 'grass'];
            timerNodes.forEach(nodeName => {
                if (this.nodes[nodeName] && this.nodes[nodeName].timers) {
                    this.nodes[nodeName].timers.forEach(timer => clearTimeout(timer));
                    this.nodes[nodeName].timers = [];
                }
            });
            
            setTimeout(() => {
                try {
                    if (this.nodes.rain && this.nodes.rain.source) this.nodes.rain.source.stop();
                    if (this.nodes.drone && this.nodes.drone.oscillators) {
                        this.nodes.drone.oscillators.forEach(osc => {
                            try { osc.stop(); } catch(e) {}
                        });
                    }
                    if (this.nodes.wind) {
                        if (this.nodes.wind.source) this.nodes.wind.source.stop();
                        if (this.nodes.wind.lfo) this.nodes.wind.lfo.stop();
                    }
                } catch (e) {}
                
                // 再作成のため初期化
                this.audioContext = null;
                this.nodes = {};
            }, 1600);
        }
        
        return this.enabled;
    }
}
