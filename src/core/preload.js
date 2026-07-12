// ==========================================
// Layer B 画像の段階的プリロード（帯域を圧迫しない）
// ==========================================
export const preloadedImageCache = {};

export function startStaggeredPreload(loadingManager) {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const img = new Image();
            img.onload = () => {
                preloadedImageCache[i] = true;
                if (loadingManager) {
                    loadingManager.updateImageProgress(Object.keys(preloadedImageCache).length);
                }
            };
            img.onerror = () => {
                preloadedImageCache[i] = false;
                if (loadingManager) {
                    loadingManager.updateImageProgress(Object.keys(preloadedImageCache).length);
                }
            };
            img.src = `./images/layerB_${i}.jpg`;
        }, i * 150);
    }
}
