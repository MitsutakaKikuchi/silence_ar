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
