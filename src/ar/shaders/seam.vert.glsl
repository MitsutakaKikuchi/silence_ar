// 裂け目パーティクル: 開裂前線が通過した瞬間に点火し、上外方へ漂って消える。
// リビールシェーダーと同じノイズ場・マスク計算を頂点側で再現することで、
// 粒子の点火位置と裂け目の形状が正確に一致する。
attribute vec2 aUv;    // 粒子の発生位置（平面UV）
attribute float aSeed; // 個体差 (0-1)
attribute float aSize;

uniform float uTime;
uniform float uReveal;
uniform sampler2D uDepth;
uniform float uHasDepth;
uniform vec4 uTouch; // xy=uv, z=開始時刻(秒), w=強さ

varying float vAlpha;
varying float vWhite;

// --- Simplex Noise (reveal.frag.glsl と同一) ---
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

void main() {
    float depthVal = uHasDepth > 0.5 ? texture2D(uDepth, aUv).r : 0.5;
    float depthFactor = 1.0 - depthVal;
    float noiseVal = snoise(aUv * 2.5 + vec2(0.0, uTime * 0.05));
    float field = (uReveal + noiseVal * 0.1) * 1.2 - depthFactor * 0.2 * uHasDepth;
    float m = smoothstep(0.4, 0.6, field);

    // 開裂前線の近傍でのみ点火する
    float front = smoothstep(0.05, 0.45, m) * (1.0 - smoothstep(0.55, 0.95, m));

    // 全開後も一部の粒子は光の胞子として漂い続ける
    float sustain = step(aSeed, 0.13) * smoothstep(0.9, 1.0, uReveal) * 0.6;
    float activation = max(front, sustain);

    // タッチリップル通過時のバースト
    if (uTouch.w > 0.0) {
        float tAge = max(uTime - uTouch.z, 0.0);
        float ring = 1.0 - smoothstep(0.0, 0.12, abs(distance(aUv, uTouch.xy) - tAge * 0.45));
        activation = max(activation, ring * max(0.0, 1.0 - tAge * 1.2));
    }

    // ループする浮遊（擬似ライフサイクル）
    float life = fract(uTime * (0.08 + aSeed * 0.12) + aSeed * 7.0);
    vec3 drift = vec3(
        (aSeed - 0.5) * 0.18 * life,
        life * (0.22 + aSeed * 0.18),
        0.04 + life * 0.10
    );

    vec3 pos = vec3(aUv - 0.5, 0.0) + drift * activation;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float fade = activation * (1.0 - life);
    gl_PointSize = aSize * fade * (80.0 / max(-mvPosition.z, 0.1));
    vAlpha = fade;
    vWhite = fract(aSeed * 13.7);
}
