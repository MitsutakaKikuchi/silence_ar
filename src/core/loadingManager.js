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
    }

    setStageActive(stageName) {
        // ローディング画面は文字を出さない方針のため、テキストは更新しない。
        // 段階表示の要素が存在すればハイライトだけ行う（現状は非表示）。
        const stageEl = document.getElementById(`stage-${stageName}`);
        if (stageEl) {
            stageEl.classList.remove('complete');
            stageEl.classList.add('active');
        }
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
}
