// ==========================================
// A-Frame シーン注入（Phase 1 移行期の暫定コード）
// Vite の module スクリプトは defer 実行されるため、
// anatomical-reveal コンポーネント登録「後」に a-scene を DOM へ追加する。
// Phase 2 (MindARThree 移行) でこのファイルは置き換えられる。
// ==========================================

function targetEntity(i) {
    return `
        <a-entity mindar-image-target="targetIndex: ${i}" id="target-${i}">
            <a-entity
                geometry="primitive: plane; width: 1; height: 1"
                position="0 0 0"
                rotation="0 0 0"
                anatomical-reveal="
                    layerA: ./images/layerA_${i}.jpg;
                    layerB: ./images/layerB_${i}.jpg;
                    depthMap: ./images/layerB_${i}_depth.png;
                    strength: 0.6;
                    edgeColor: #00ffaa
                ">
            </a-entity>
        </a-entity>`;
}

export function injectARScene() {
    const container = document.createElement('div');
    container.innerHTML = `
    <a-scene mindar-image="imageTargetSrc: ./targets.mind; autoStart: true; uiLoading: no; uiError: yes; uiScanning: no;"
             color-space="sRGB"
             renderer="colorManagement: true, physicallyCorrectLights"
             vr-mode-ui="enabled: false"
             device-orientation-permission-ui="enabled: false">

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        ${Array.from({ length: 10 }, (_, i) => targetEntity(i)).join('\n')}

    </a-scene>`;
    const scene = container.querySelector('a-scene');
    document.body.appendChild(scene);
    return scene;
}
