// ==========================================
// Anatomical Reveal Shader（解剖学的露見シェーダー）
// 概要: Depth Mapを用いて、日常(Layer A)と本音(Layer B)を有機的に合成し、
// 視差効果とノイズによる「解剖」演出を行う高機能シェーダー。
// ==========================================
import { state } from '../core/state.js';
import { loadTextureWithCache } from '../core/textureCache.js';

AFRAME.registerComponent('anatomical-reveal', {
    schema: {
        layerA: { type: 'map' },      // 日常（表層）画像
        layerB: { type: 'map' },      // 本音（深層）画像
        depthMap: { type: 'map' },    // 深度マップ（白=手前, 黒=奥）
        strength: { type: 'number', default: 0.15 }, // 視差の強さ
        edgeColor: { type: 'color', default: '#00ffaa' } // 境界線の発光色
    },

    init: function () {
        const data = this.data;
        const el = this.el;
        
        // ジャイロスムージング用の前フレーム値
        this.smoothedViewVec = new THREE.Vector3(0, 0, 1);

        // シェーダーマテリアルの定義
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTexA: { value: null },      // Layer A
                uTexB: { value: null },      // Layer B
                uDepth: { value: null },     // Depth Map
                uTime: { value: 0 },         // 時間経過
                uParallax: { value: data.strength },
                uViewVec: { value: new THREE.Vector3(0, 0, 1) }, // 視線ベクトル
                uReveal: { value: 0.0 },     // 露見度 (0.0=日常, 1.0=本音)
                uEdgeColor: { value: new THREE.Color(data.edgeColor) },
                uHasDepth: { value: 0.0 }    // Depth Mapが利用可能か
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vViewPosition;
                varying vec3 vNormal;

                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vViewPosition = -mvPosition.xyz;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexA;
                uniform sampler2D uTexB;
                uniform sampler2D uDepth;
                uniform float uTime;
                uniform float uParallax;
                uniform float uReveal; // 0.0 ~ 1.0
                uniform vec3 uEdgeColor;
                uniform float uHasDepth;
                uniform vec3 uViewVec; // ジャイロベースの視線方向

                varying vec2 vUv;
                varying vec3 vViewPosition;

                // --- Noise Functions (Simplex Noise) ---
                vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
                float snoise(vec2 v){
                    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                            -0.577350269189626, 0.024390243902439);
                    vec2 i  = floor(v + dot(v, C.yy) );
                    vec2 x0 = v -   i + dot(i, C.xx);
                    vec2 i1;
                    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec4 x12 = x0.xyxy + C.xxzz;
                    x12.xy -= i1;
                    i = mod(i, 289.0);
                    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                    + i.x + vec3(0.0, i1.x, 1.0 ));
                    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                    m = m*m ;
                    m = m*m ;
                    vec3 x = 2.0 * fract(p * C.www) - 1.0;
                    vec3 h = abs(x) - 0.5;
                    vec3 ox = floor(x + 0.5);
                    vec3 a0 = x - ox;
                    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                    vec3 g;
                    g.x  = a0.x  * x0.x  + h.x  * x0.y;
                    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                    return 130.0 * dot(m, g);
                }

                // 角丸マスク関数 (Rounded Rectangle SDF)
                float roundedRectMask(vec2 uv, float radius, float feather) {
                    vec2 centered = uv - 0.5;
                    vec2 boxSize = vec2(0.5 - radius);
                    vec2 d = abs(centered) - boxSize;
                    float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
                    return 1.0 - smoothstep(-feather, feather, dist);
                }

                void main() {
                    // 0. 角丸マスクとフェードエッジ
                    float cornerRadius = 0.08; // 角の丸み
                    float edgeFeather = 0.03;  // フェードの幅
                    float roundMask = roundedRectMask(vUv, cornerRadius, edgeFeather);
                    
                    // 1. 視差マッピング (Parallax Mapping) - カメラ視線ベース
                    // 改善案採用：奥（黒）が大きく動く正しい計算
                    vec3 viewDir = normalize(vViewPosition);
                    float depthVal = uHasDepth > 0.5 ? texture2D(uDepth, vUv).r : 0.5;
                    
                    // 奥の空間が広がるように：黒（奥）ほど大きく動く
                    vec2 parallaxOffset = viewDir.xy * ((1.0 - depthVal) * uParallax * -0.2);
                    
                    vec2 uvB = vUv + parallaxOffset;
                    vec2 uvA = vUv;

                    // 2. 有機的トランジション (Organic Noise Reveal)
                    // ノイズの速度とスケールを調整して滑らかに
                    float noiseVal = snoise(vUv * 2.5 + vec2(0.0, uTime * 0.05));
                    float mask = uReveal + (noiseVal * 0.1); 
                    
                    // 深度マップ自体もマスクの一部に使う（深いところから裂ける演出）
                    float depthFactor = 1.0 - depthVal;  // 黒（奥）が1.0
                    mask = smoothstep(0.4, 0.6, mask * 1.2 - depthFactor * 0.2 * uHasDepth);

                    // 3. テクスチャ取得 & 色収差 (Chromatic Aberration)
                    vec4 colorA = texture2D(uTexA, uvA);
                    
                    // 境界付近で色ズレを起こす（控えめにして振動軽減）
                    float aber = 0.005 * uParallax;
                    float r = texture2D(uTexB, uvB + vec2(aber, 0.0)).r;
                    float g = texture2D(uTexB, uvB).g;
                    float b = texture2D(uTexB, uvB - vec2(aber, 0.0)).b;
                    vec4 colorB = vec4(r, g, b, 1.0);

                    // 4. 合成とエッジ発光
                    float edge = smoothstep(0.0, 0.1, mask) * (1.0 - smoothstep(0.9, 1.0, mask));
                    vec3 edgeEmission = uEdgeColor * edge * 2.0;

                    // AとBを混ぜる
                    vec4 finalColor = mix(colorA, colorB, mask);
                    finalColor.rgb += edgeEmission;
                    
                    // 5. 角丸マスクとフェード境界を適用
                    float borderGlow = (1.0 - roundMask) * smoothstep(0.0, 0.05, roundMask) * 0.5;
                    finalColor.rgb += uEdgeColor * borderGlow;
                    finalColor.a = roundMask;

                    gl_FragColor = finalColor;
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        // テクスチャは遅延ロード（targetFound時にloadTextures()で実行）
        this.texturesLoaded = false;

        // メッシュへの適用
        const mesh = el.getObject3D('mesh');
        if (mesh) {
            mesh.material = this.material;
        } else {
            const geo = new THREE.PlaneGeometry(1, 1, 32, 32);
            const newMesh = new THREE.Mesh(geo, this.material);
            el.setObject3D('mesh', newMesh);
        }
    },

    // テクスチャの遅延ロード（ターゲット検出時に呼び出し）
    loadTextures: function () {
        if (this.texturesLoaded) return;
        this.texturesLoaded = true;
        const data = this.data;
        const material = this.material;
        
        const load = (param, uniform, isDepth) => {
            if (data[param]) {
                loadTextureWithCache(data[param])
                    .then((tex) => {
                        material.uniforms[uniform].value = tex;
                        if (isDepth) material.uniforms.uHasDepth.value = 1.0;
                    })
                    .catch((err) => {
                        console.log(`Texture load failed: ${param}`, err);
                        if (isDepth) material.uniforms.uHasDepth.value = 0.0;
                    });
            }
        };
        
        load('layerA', 'uTexA', false);
        load('layerB', 'uTexB', false);
        load('depthMap', 'uDepth', true);
    },

    tick: function (time, timeDelta) {
        if (!this.material) return;

        // 時間更新
        this.material.uniforms.uTime.value = time / 1000;

        // ターゲットが認識されているかチェック（グローバル変数）
        const isTargetActive = state.arTargetActive === true;
        
        // 目標値（ターゲット認識でLayer B、非認識でLayer A）
        const targetReveal = isTargetActive ? 1.0 : 0.0;
        
        // 現在値から目標値へ滑らかに補間 (Lerp)
        const current = this.material.uniforms.uReveal.value;
        this.material.uniforms.uReveal.value += (targetReveal - current) * 0.02;

        // ジャイロデータを使用したパララックス効果（スムージング適用）
        if (state.gyroData) {
            const gx = state.gyroData.gamma || 0; // 左右傾き
            const gy = state.gyroData.beta || 0;  // 前後傾き
            
            // 目標ベクトル（感度を下げて震えを抑制）
            const targetVec = new THREE.Vector3(gx * 1.2, gy * 0.9, 1.0);
            
            // スムージング補間（係数を極限まで小さくして震えを完全抑制）
            this.smoothedViewVec.lerp(targetVec, 0.002);
            
            // スムージング後の値を適用
            this.material.uniforms.uViewVec.value.copy(this.smoothedViewVec);
        }
    }
});
