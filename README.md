# 沈黙の解剖図譜 — Anatomy of Silence

不可視の愛に関する空間的考察。WebARインスタレーション作品。

印刷された10枚の日常写真（Layer A）にスマートフォンをかざすと、
写真が解剖学的に「開き」、その奥に眠る本音の庭（Layer B）と詩が現れる。

## 技術構成

- **AR**: [MindAR](https://github.com/hiukim/mind-ar-js) 1.2.5 (Three.js版) — 画像トラッキング
- **3D**: Three.js 0.160.1 + 自作GLSLシェーダー（解剖学的露見・裂け目パーティクル）
- **モーション**: GSAP（リビール振付・カード・詩の文字リビール）
- **書体**: しっぽり明朝B1（使用グリフのみのサブセットをセルフホスト）
- **ビルド**: Vite（静的サイトとして `dist/` に出力）

> ⚠️ **three と mind-ar のバージョンは厳密固定**（`three@0.160.1` / `mind-ar@1.2.5`）。
> mind-ar 1.2.5 は three ~0.160 のAPIを前提としており、threeを上げると
> 静かに壊れる。更新する場合は必ず実機で全編を再検証すること。

## 開発

```bash
npm install        # 依存関係のインストール
npm run dev        # HTTPS開発サーバ (mkcert)。カメラにはHTTPSが必須
npm run build      # dist/ へ本番ビルド
npm run preview    # ビルド結果の確認
```

### iPhone実機での確認

1. `npm run dev` を起動（`--host` 済み。LAN内に公開される）
2. Macと同じWi-FiのiPhoneで `https://<MacのIP>:5173` を開く
3. 証明書警告が出る場合は mkcert のルートCAをiPhoneに一度インストールする
4. デバッグ: iPhoneをUSB接続し、Mac Safariの「開発」メニューからWebインスペクタを開く
5. `?debug` を付けるとFPSメーターを表示、`?quality=low|high` で品質を手動指定

## 詩・文言を編集するとき

1. 本文・タイトル: [src/data/episodes.js](src/data/episodes.js)（シアターモードの詩片も同ファイル）
2. イントロ・エピローグ等の画面文言: [index.html](index.html)
3. 編集後、**必ずフォントサブセットを再生成**する:

```bash
npm run subset             # 使用グリフを再収集して woff2 を再生成
npm run subset -- --verify # 欠落グリフがないか検査のみ
```

サブセットに無い文字はシステム明朝でフォールバック表示される（壊れないが書体が混ざる）。
元フォント(TTF)は `_dev_tools/fonts/` に無ければ自動ダウンロードされる。

## ディレクトリ

```
index.html          画面のDOM（オーバーレイ群）
src/main.js         起動順序と画面遷移の配線
src/ar/             MindARシーン・露見シェーダー・裂け目パーティクル
src/ar/shaders/     GLSL（?raw import）
src/ui/             カード・イントロ・コンプリーション等の演出
src/core/           ローディング進捗・状態・イベント・ジャイロ
src/fx/             花弁パーティクル・時間帯テーマ
src/audio/          プロシージャル環境音 (Web Audio)
src/data/           エピソード本文・詩片
src/styles/         関心別CSS
public/             targets.mind・画像（そのまま配信される）
public/legacy/      旧・単一HTML版（展示当日のフォールバック）
scripts/            フォントサブセット生成
_dev_tools/         MindARターゲットのコンパイラ・元画像・元フォント（非配信）
```

## デプロイ

`main` への push で GitHub Actions が `dist/` を GitHub Pages へ自動デプロイする
（初回のみ Settings → Pages → Source を "GitHub Actions" に設定）。

**展示当日のフォールバック**: 移行前の単一HTML版が `<公開URL>/legacy/` で動く。
問題が起きたらQRコードの向き先を差し替えるだけで数分で復旧できる。

## ARターゲットを差し替えるとき

1. `_dev_tools/compiler_images/` に元画像を置く
2. `_dev_tools/start_compile_server.py` を実行してブラウザ上で `.mind` にコンパイル
3. 生成された `targets.mind` を `public/` に置き換える
4. 対応する `public/images/layerA_N.jpg` / `layerB_N.jpg` / `layerB_N_depth.png` を更新

## 作品クレジット

菊池光峰（東京藝術大学 音楽学部 邦楽科 長唄三味線専攻）
コンセプト・画像・実装は Google Gemini / Anthropic Claude との協働により制作。
