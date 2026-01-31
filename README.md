# 沈黙の解剖図譜 —— 不可視の愛に関する空間的考察

WebAR体験作品

## 作品概要

「言わなかった言葉」が庭の中でどんな植物や構造として存在しているのかを、ARで体験する作品です。

日常の写真（LayerA）をスキャンすると、その背後にある「本音の庭」（LayerB）が現れます。

## 鑑賞方法

1. スマートフォンまたはタブレットでこのページにアクセス
2. カメラを使用して、LayerAの画像（日常の写真）をスキャン
3. LayerBの庭の画像とテキストが表示されます

## 技術仕様

- **WebAR**: MindAR 1.2.5 + A-Frame 1.5.0
- **画像トラッキング**: MINDファイルによる高精度AR認識
- **エピソード数**: 10話

## ファイル構成

```
silence_ar/
├── index.html          # メインARビューア
├── targets.mind        # 10エピソードのARターゲット
├── images/             # LayerB画像（本音の庭）
│   ├── layerB_0.jpg    # Episode 1
│   ├── layerB_1.jpg    # Episode 2
│   └── ...
└── README.md
```

## ローカルテスト

HTTPSまたはlocalhostで実行する必要があります。

```bash
# Pythonの簡易サーバーを使用
python -m http.server 8080

# ブラウザでアクセス
# http://localhost:8080/index.html
```

## 使用技術

- [MindAR](https://hiukim.github.io/mind-ar-js-doc/)
- [A-Frame](https://aframe.io/)
- Gemini Nano Banana Pro (画像生成)

## コンセプト

沈黙の中にある、言葉にならなかった感情を「庭」というメタファーで可視化。日常の裏側に潜む「本音の庭」を、ARという技術を通じて鑑賞者に体験してもらいます。

## ライセンス

© 2026 NanoBanana. All rights reserved.
