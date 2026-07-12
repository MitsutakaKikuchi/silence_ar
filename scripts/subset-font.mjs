// ==========================================
// フォントサブセット生成
// サイト内で実際に使われる文字だけを含む woff2 を生成する。
// 使い方:  npm run subset          … 生成
//          npm run subset -- --verify … 生成せず、欠落グリフがないか検査のみ
//
// 詩やUI文言を編集したら必ず `npm run subset` を再実行すること。
// (未サブセット文字はシステム明朝でフォールバック表示されるため
//  壊れはしないが、書体が混ざる)
// ==========================================
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const FONTS = [
    { src: '_dev_tools/fonts/ShipporiMinchoB1-Regular.ttf', out: 'src/assets/fonts/ShipporiMinchoB1-Regular.woff2' },
    { src: '_dev_tools/fonts/ShipporiMinchoB1-Medium.ttf', out: 'src/assets/fonts/ShipporiMinchoB1-Medium.woff2' }
];
const FONT_BASE_URL = 'https://github.com/google/fonts/raw/main/ofl/shipporiminchob1/';

// テキストを収集するファイル（UI文言・詩の出どころ）
const TEXT_SOURCES = [
    'index.html',
    'src/data/episodes.js',
    'src/core/loadingManager.js',
    'src/fx/timeEnvironment.js',
    'src/main.js'
];

// 安全マージン: ひらがな・カタカナ・ASCII・和文約物・全角英数は常に含める
const SAFETY_RANGES = [
    [0x0020, 0x007e], // ASCII
    [0x2010, 0x2027], // ダッシュ・引用符・三点リーダなど
    [0x3000, 0x30ff], // 和文記号 + ひらがな + カタカナ
    [0xff01, 0xff65]  // 全角英数・記号
];

function stripJsComments(code) {
    return code
        .replace(/\/\*[\s\S]*?\*\//g, ' ')
        .replace(/^\s*\/\/.*$/gm, ' ');
}

async function ensureSourceFont(relPath) {
    const abs = path.join(root, relPath);
    try {
        await access(abs);
        return abs;
    } catch {
        const filename = path.basename(relPath).replace('.ttf', '') + '.ttf';
        const url = FONT_BASE_URL + filename;
        console.log(`元フォントが無いためダウンロードします: ${url}`);
        await mkdir(path.dirname(abs), { recursive: true });
        const res = await fetch(url, { redirect: 'follow' });
        if (!res.ok) throw new Error(`フォントの取得に失敗: ${res.status} ${url}`);
        await pipeline(Readable.fromWeb(res.body), createWriteStream(abs));
        return abs;
    }
}

async function collectText() {
    const chars = new Set();
    for (const rel of TEXT_SOURCES) {
        let content = await readFile(path.join(root, rel), 'utf8');
        if (rel.endsWith('.js')) content = stripJsComments(content);
        for (const ch of content) chars.add(ch);
    }
    for (const [from, to] of SAFETY_RANGES) {
        for (let cp = from; cp <= to; cp++) chars.add(String.fromCodePoint(cp));
    }
    // 制御文字を除去
    return [...chars].filter((c) => c.codePointAt(0) >= 0x20).join('');
}

async function main() {
    const verifyOnly = process.argv.includes('--verify');
    const text = await collectText();
    console.log(`収集した文字数: ${[...new Set(text)].length}`);

    if (verifyOnly) {
        // 既存のサブセットに欠落がないか検査
        const { default: fontkit } = await import('fontkit');
        let failed = false;
        for (const { out } of FONTS) {
            const font = fontkit.create(await readFile(path.join(root, out)));
            const missing = [...new Set(text)].filter(
                (ch) => !font.hasGlyphForCodePoint(ch.codePointAt(0)) && ch.codePointAt(0) > 0x7f
            );
            if (missing.length) {
                failed = true;
                console.error(`✗ ${out} に欠落グリフ ${missing.length} 字: ${missing.slice(0, 20).join('')}`);
            } else {
                console.log(`✓ ${out} — 欠落なし`);
            }
        }
        process.exit(failed ? 1 : 0);
    }

    await mkdir(path.join(root, 'src/assets/fonts'), { recursive: true });
    for (const { src, out } of FONTS) {
        const srcPath = await ensureSourceFont(src);
        const buffer = await readFile(srcPath);
        const subset = await subsetFont(buffer, text, { targetFormat: 'woff2' });
        await writeFile(path.join(root, out), subset);
        console.log(`✓ ${out} (${(subset.length / 1024).toFixed(1)} KB)`);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
