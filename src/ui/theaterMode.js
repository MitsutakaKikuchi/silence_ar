// ==========================================
// シアターモード
// ==========================================
import { poemFragments } from '../data/episodes.js';

export class TheaterMode {
    constructor(poemElement) {
        this.poemElement = poemElement;
        this.enabled = false;
        this.currentPoemIndex = 0;
        this.interval = null;
    }
    
    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled) {
            this.start();
        } else {
            this.stop();
        }
        return this.enabled;
    }
    
    start() {
        this.showPoem();
        this.interval = setInterval(() => {
            this.showPoem();
        }, 12000); // 12秒ごとに新しい詩
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.poemElement.classList.remove('visible');
    }
    
    showPoem() {
        const poem = poemFragments[this.currentPoemIndex];
        this.currentPoemIndex = (this.currentPoemIndex + 1) % poemFragments.length;
        
        // 一文字ずつアニメーション
        const textElement = this.poemElement.querySelector('.poem-text');
        textElement.innerHTML = '';
        
        this.poemElement.classList.remove('visible');
        
        setTimeout(() => {
            let delay = 0;
            poem.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char;
                span.style.animationDelay = delay + 'ms';
                textElement.appendChild(span);
                delay += 80;
            });
            
            this.poemElement.classList.add('visible');
            
            // フェードアウト
            setTimeout(() => {
                if (this.enabled) {
                    this.poemElement.classList.remove('visible');
                }
            }, 9000);
        }, 500);
    }
}
