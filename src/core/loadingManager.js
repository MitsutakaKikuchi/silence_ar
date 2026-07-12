// ==========================================
// ローディングマネージャー（進捗管理）
// ==========================================
export class LoadingManager {
    constructor() {
        // targets.mind (約7MB) が支配的なので、その実バイト進捗に最大の重みを割く。
        // カメラはローディング中ではなくイントロのタップで起動するため、ステージから外した。
        this.stages = {
            library: { weight: 5, complete: false },
            fonts: { weight: 10, complete: false },
            targets: { weight: 65, complete: false },
            images: { weight: 20, complete: false }
        };
        this.imageProgress = 0;
        this.totalImages = 10;
        this.loadedImages = 0;
        this.partials = {}; // ステージ途中経過 (0.0〜1.0)
        
        this.progressFill = document.getElementById('loading-progress-fill');
        this.progressText = document.getElementById('loading-progress-text');
        this.mainText = document.getElementById('loading-main-text');
    }
    
    setStageActive(stageName) {
        const stageEl = document.getElementById(`stage-${stageName}`);
        if (stageEl) {
            stageEl.classList.remove('complete');
            stageEl.classList.add('active');
        }
        this.updateMainText(stageName);
    }
    
    setStageComplete(stageName) {
        const stageEl = document.getElementById(`stage-${stageName}`);
        if (stageEl) {
            stageEl.classList.remove('active');
            stageEl.classList.add('complete');
        }
        this.stages[stageName].complete = true;
        this.updateProgress();
    }
    
    updateImageProgress(loaded) {
        this.loadedImages = loaded;
        this.imageProgress = (loaded / this.totalImages) * this.stages.images.weight;
        this.updateProgress();
    }
    
    // ステージの途中経過を反映（targets.mind のストリーム取得などで使用）
    setStagePartial(stageName, ratio) {
        this.partials[stageName] = Math.max(0, Math.min(ratio, 1));
        this.updateProgress();
    }

    updateProgress() {
        let total = 0;
        for (const [key, stage] of Object.entries(this.stages)) {
            if (stage.complete) {
                total += stage.weight;
            } else if (key === 'images') {
                total += this.imageProgress;
            } else if (this.partials[key]) {
                total += this.partials[key] * stage.weight;
            }
        }
        
        const percent = Math.min(Math.round(total), 100);
        if (this.progressFill) {
            this.progressFill.style.width = percent + '%';
        }
        if (this.progressText) {
            this.progressText.textContent = percent + '%';
        }
        // 種子の線画SVG（stroke-dashoffset）を実進捗で描き進める
        const loading = document.getElementById('custom-loading');
        if (loading) loading.style.setProperty('--load-progress', String(percent / 100));
    }
    
    updateMainText(stage) {
        if (!this.mainText) return;
        const texts = {
            // library: ライブラリ読み込み
            // 世界観への入り口。「奥へ」「深層へ」という潜るイメージ。
            library: '沈黙の深層へ潜行しています…',

            // fonts: 書体の読み込み
            // 語られなかった言葉に、かたち（活字）を与える準備。
            fonts: '言葉のかたちを整えています…',

            // targets: 図譜(targets.mind)の読み込み
            // 何を探しているのか。「痕跡」をより具体的に「宛先のない言葉」の捜索へ。
            targets: '行き場のない言葉を探測しています…',

            // images: 画像プリロード
            // 見えないものを可視化するプロセス。「現像」という言葉が持つ、徐々に像を結ぶニュアンス。
            images: '不可視の輪郭を現像しています…'
        };
        this.mainText.textContent = texts[stage] || '静寂を調整しています...';
    }
}
