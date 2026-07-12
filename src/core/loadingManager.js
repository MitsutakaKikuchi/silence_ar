// ==========================================
// ローディングマネージャー（進捗管理）
// ==========================================
export class LoadingManager {
    constructor() {
        this.stages = {
            library: { weight: 20, complete: false },
            targets: { weight: 30, complete: false },
            images: { weight: 40, complete: false },
            camera: { weight: 10, complete: false }
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
    }
    
    updateMainText(stage) {
        if (!this.mainText) return;
        const texts = {
            // library: ライブラリ読み込み
            // 世界観への入り口。「奥へ」「深層へ」という潜るイメージ。
            library: '沈黙の深層へ潜行しています…',

            // targets: ターゲット認識/顔認識など
            // 何を探しているのか。「痕跡」をより具体的に「宛先のない言葉」の捜索へ。
            targets: '行き場のない言葉を探測しています…',

            // images: 画像生成/ロード
            // 見えないものを可視化するプロセス。「現像」という言葉が持つ、徐々に像を結ぶニュアンス。
            images: '不可視の輪郭を現像しています…',

            // camera: カメラ起動
            // 単なる準備ではなく、ユーザー自身の目（カメラ）が、この世界の「目撃者」になる瞬間。
            camera: '観察者の「眼」を接続しています…'
        };
        this.mainText.textContent = texts[stage] || '静寂を調整しています...';
    }
}
