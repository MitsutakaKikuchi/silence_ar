# WebAR: 沈黙の解剖図譜

「沈黙の解剖図譜 —— 不可視の愛に関する空間的考察」のWebAR実装リポジトリ。

## ディレクトリ構成
- **/ (Root)**: 本番公開用ファイル
  - index.html: ARアプリ本体
  - 	argets.mind: MindAR用ターゲットデータ（Compiled）
  - images/: アプリ内で使用する軽量化画像（LayerB）
  
- **/_dev_tools/**: 開発用・ビルド用ツール（公開不要）
  - compiler_images/: ターゲット画像の元データ（高画質）
  - *_script.js, *.py: ビルド用スクリプト
  - COMPILER.html: ブラウザ用コンパイラアプリ

## 更新手順
1. _dev_tools/compiler_images/ 内の画像を差し替える。
2. コンパイルを実行して 	argets.mind を更新する。
   - COMPILER.html を使うか、Pythonスクリプトを使用。
3. 	argets.mind をルートディレクトリに配置する（上書き）。
