uniform vec3 uColor;

varying float vAlpha;
varying float vWhite;

void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    // teal → white ランプ（個体差で芯の白さが変わる）
    vec3 col = mix(uColor, vec3(1.0), vWhite * 0.5);
    gl_FragColor = vec4(col, glow * glow * vAlpha);
}
