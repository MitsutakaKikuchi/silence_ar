// ==========================================
// 裂け目GPUパーティクル
// アンカー毎に THREE.Points を1つ。約300頂点。
// 点火判定はすべて頂点シェーダー側（seam.vert.glsl）で行うため、
// CPU側の毎フレームコストはuniform更新のみ。
// ==========================================
import * as THREE from 'three';
import vertexShader from './shaders/seam.vert.glsl?raw';
import fragmentShader from './shaders/seam.frag.glsl?raw';

const COUNT = 300;

export function createSeamParticles({ edgeColor = '#00ffaa' } = {}) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3); // 実位置は頂点シェーダーで算出（ダミー）
    const uvs = new Float32Array(COUNT * 2);
    const seeds = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
        uvs[i * 2] = Math.random();
        uvs[i * 2 + 1] = Math.random();
        seeds[i] = Math.random();
        sizes[i] = 14 + Math.random() * 22;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aUv', new THREE.BufferAttribute(uvs, 2));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uReveal: { value: 0 },
            uDepth: { value: null },
            uHasDepth: { value: 0.0 },
            uTouch: { value: new THREE.Vector4(0, 0, 0, 0) },
            uColor: { value: new THREE.Color(edgeColor) }
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    return points;
}
