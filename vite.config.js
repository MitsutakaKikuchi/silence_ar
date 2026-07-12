import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

// カメラ(getUserMedia)は secure context 必須のため、dev は mkcert でHTTPS化。
// 同一LANのiPhoneから https://<MacのIP>:5173 でアクセスして実機確認する。
export default defineConfig({
    base: './',
    plugins: [mkcert()],
    build: {
        target: 'safari15',
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
            output: {
                manualChunks: {
                    // 変更頻度の低いライブラリを分離し、アプリ更新時のキャッシュ効率を上げる
                    vendor: ['three', 'gsap', 'mind-ar/dist/mindar-image-three.prod.js']
                }
            }
        }
    }
});
