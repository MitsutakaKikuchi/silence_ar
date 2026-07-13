// ==========================================
// Anatomical Reveal Shader（解剖学的露見シェーダー）
// 概要: Depth Mapを用いて、日常(Layer A)と本音(Layer B)を有機的に合成し、
// 視差効果とノイズによる「解剖」演出を行う高機能シェーダー。
// 旧 A-Frame コンポーネント anatomical-reveal からの移植。
// ==========================================
import * as THREE from 'three';
import { loadTextureWithCache } from '../core/textureCache.js';
import vertexShader from './shaders/reveal.vert.glsl?raw';
import fragmentShader from './shaders/reveal.frag.glsl?raw';

export function createRevealMaterial({ strength = 0.6, edgeColor = '#00ffaa' } = {}) {
    return new THREE.ShaderMaterial({
        uniforms: {
            uTexA: { value: null },      // Layer A
            uTexB: { value: null },      // Layer B
            uDepth: { value: null },     // Depth Map
            uTime: { value: 0 },         // 時間経過
            uParallax: { value: strength },
            uViewVec: { value: new THREE.Vector3(0, 0, 1) }, // 視線ベクトル
            uReveal: { value: 0.0 },     // 露見度 (0.0=日常, 1.0=本音)
            uEdgeColor: { value: new THREE.Color(edgeColor) },
            uHasDepth: { value: 0.0 },   // Depth Mapが利用可能か
            uCrack: { value: 0.0 },      // 亀裂ステージ（開裂に先立つ光の走り）
            uEdgeBoost: { value: 1.0 },  // エッジ発光の一時ブースト
            uTouch: { value: new THREE.Vector4(0, 0, 0, 0) }, // タッチリップル
            uAppear: { value: 0.0 }      // 顕現度（霧が凝結して像を結ぶ）
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        side: THREE.DoubleSide
    });
}

// テクスチャの遅延ロード（ターゲット検出時に呼び出し）
export function loadRevealTextures(material, { layerA, layerB, depthMap }) {
    const load = (url, uniform, isDepth) => {
        if (!url) return;
        loadTextureWithCache(url)
            .then((tex) => {
                material.uniforms[uniform].value = tex;
                if (isDepth) material.uniforms.uHasDepth.value = 1.0;
            })
            .catch((err) => {
                console.log(`Texture load failed: ${url}`, err);
                if (isDepth) material.uniforms.uHasDepth.value = 0.0;
            });
    };

    load(layerA, 'uTexA', false);
    load(layerB, 'uTexB', false);
    load(depthMap, 'uDepth', true);
}
