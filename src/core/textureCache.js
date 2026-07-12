// ==========================================
// グローバルテクスチャキャッシュ（読み込み最適化）
// ==========================================
const textureCache = {};
const textureLoadPromises = {};

export function loadTextureWithCache(url) {
    // 既にキャッシュにあればそれを返す
    if (textureCache[url]) {
        return Promise.resolve(textureCache[url]);
    }
    // 読み込み中ならそのPromiseを返す（重複読み込み防止）
    if (textureLoadPromises[url]) {
        return textureLoadPromises[url];
    }
    // 新規読み込み
    const loader = new THREE.TextureLoader();
    const promise = new Promise((resolve, reject) => {
        loader.load(url, (tex) => {
            textureCache[url] = tex;
            delete textureLoadPromises[url];
            resolve(tex);
        }, undefined, (err) => {
            delete textureLoadPromises[url];
            reject(err);
        });
    });
    textureLoadPromises[url] = promise;
    return promise;
}
