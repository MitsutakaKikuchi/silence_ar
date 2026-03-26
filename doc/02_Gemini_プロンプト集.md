# 『沈黙の解剖図譜』Gemini Nano Banana Pro プロンプト集

**作品名:** 沈黙の解剖図譜 —— 不可視の愛に関する空間的考察
**用途:** フォトブック制作（本音レイヤー & 日常レイヤー）+ WebAR版展開
**モデル推奨:** Gemini Nano Banana Pro / Imagen 3（静止画）
**最終更新:** 2026年3月27日

---

## プロンプト構成の設計思想

本作品では、AI画像生成において二つの異なる視覚言語を使い分けています：

### Layer A（日常レイヤー）の設計意図
- **スタイル:** スマートフォン撮影のような「技術的に不完全な写真」
- **狙い:** 日常の不安定さ、儚さ、記憶の曖昧さを表現
- **技術的特徴:** 高ISOノイズ、ピンボケ、VSCOフィルム風の色褪せ

### Layer B（本音レイヤー）の設計意図
- **スタイル:** 日本庭園を舞台にした写実的ドキュメンタリー × アートインスタレーション
- **狙い:** 沈黙が持つグロテスクな美しさ、侘び寂びの精神性
- **技術的特徴:** 自然光、高い描写密度、物質感のあるテクスチャ

---

## 1. 本音レイヤー (Inner Truth Layer)
見開き全面配置用（透層下のイラスト）
**共通設定:** Aspect Ratio 1:1 (Square)

**Master Style Block** (各プロンプト末尾に追加):

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

### シーン別プロンプト (No.01 - No.10)

**No.01: 矯正する支柱 (The Stake/支柱)**
*Concept:* 柔らかい茎を無理やり真っ直ぐにする、錆びた鉄の支柱。痛みと安定。
> In an overgrown Japanese garden corner, a young plant stem is tightly bound to a rusted bamboo stake driven into the dark soil. The binding wire bites into the green flesh. Weathered stone wall and a moss-covered stone lantern visible in the background. Ground covered with fallen leaves and thick moss. The stake casts a harsh shadow. A metaphor for "painful correction that provides stability".

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.02: 沈黙の蔦 (The Silent Ivy/蔦)**
*Concept:* 美しい花を覆い尽くし、呼吸を奪う蔦。優しさという名の窒息。
> In a neglected Japanese garden bed, a single white camellia is being completely enveloped by dense ivy vines climbing up from the ground. The ivy covers most of the petals. Stone stepping stones and a weathered bamboo fence visible in soft focus background. Dark soil littered with fallen ivy leaves in foreground. "Suffocating kindness".

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.03: 拒絶の雨 (The Cold Rain/雨)**
*Concept:* 泥を洗い流し、根を露出させる冷たい雨。厳しさがもたらす浄化。
> A rain-soaked Japanese garden bed with heavy raindrops hitting the exposed earth. Dark muddy soil is being washed away in streams, revealing pale plant stems and their base still clinging to the ground. Bamboo fence and rain-blurred stone basin (tsukubai) in background. Puddles forming on moss-covered stepping stones. Cold, metallic quality to the rain. Exposure and cleansing through harshness.

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.04: 守れなかった言葉の化石 (The Soil/土壌)**
*Concept:* 地中に堆積した、言葉の形をした化石たち。歴史の重み。
> A freshly dug hole in the Japanese garden ground, revealing a cross-section of dark layered soil. Within the earth layers, old metal letter stamps (typography blocks) and dried compressed camellia petals are embedded like archaeological findings. Garden tools lying beside the hole. Weathered stone arrangement and a partially buried stone lantern in background. The weight of unspoken history burying the present.

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.05: 過保護な檻 (The Cage/檻)**
*Concept:* 外敵（嵐）から若芽を守る、錆びた恐ろしい檻。醜い守護。
> In a wild Japanese garden, a small seedling grows inside a crude cage made of rusted iron bars and bamboo stakes, planted firmly in moss-covered soil. Dark storm clouds gather above. Wind-blown maple leaves and debris swirl around outside the cage, but inside is calm. Stone lantern and weathered bamboo fence in background. The cage is ugly but protective. "Restriction as a form of love".

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.06: 相互の呪縛 (The Grafting/接ぎ木)**
*Concept:* 捻じれながら癒着し、一体化した二本の幹。痛々しいほどの依存。
> In an old Japanese garden, two different tree trunks (maple and pine) have grown together in a twisted spiral formation, their bark fused into one gnarled mass. Dark resin oozes from the grafting point. They rise from a shared patch of moss-covered ground. Stone basin (tsukubai) and weathered bamboo fence visible in the misty background. It looks painful and inseparable. "Mutual dependency".

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.07: 内なる独白/温室 (The Greenhouse/温室)**
*Concept:* ガラスの内側から見た、外の暗い森。棘で武装された温室。拒絶的な内省。
> Interior view of an old glass greenhouse in a Japanese-style walled garden. Looking toward the glass walls reinforced with weathered bamboo and iron frames. Wild bamboo and thorny branches press against the exterior glass. Outside, dark overgrown garden with stone lanterns and shadowy maple trees are visible through condensation-covered glass. Inside, humid air, bonsai on shelves, and warm diffused light. "Defensive introspection".

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.08: 選別/剪定 (The Pruning/剪定)**
*Concept:* 空中で枝を切るハサミ。切り口からは樹液ではなく赤が滲む。言葉の選別。
> In a Japanese garden workspace, an old pair of rusted pruning shears is caught in the act of cutting a camellia branch. The freshly cut surface shows a dark red sap. Cut petals and leaves have fallen onto a weathered wooden work table below. Garden gloves and bonsai tools scattered on the table. Stone wall and bamboo grove in the background. "The pain of choosing what not to say".

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.09: 庭の全景 (The Labyrinth/迷宮)**
*Concept:* 出口のない美しい迷路庭園。閉ざされた生態系。
> Elevated wide-angle view of an intricate Japanese-style walled garden maze. Overgrown hedges and bamboo groves form complex winding paths with stepping stones. Weathered stone walls enclose the entire garden. Mix of wild blooming camellias and areas of decay. Stone lanterns, weathered stone basin, and dry koi pond visible within. No visible exit. Fog or mist adds to the enclosed atmosphere. It is a closed ecosystem, beautiful but trapped. "The Garden of Silence".

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.10: 真実の結晶 (The Seed/種子)**
*Concept:* 苔の上に落ちた、重く黒い幾何学的な種。飾らない真実の重み。
> Close-up of a single large, heavy, dark metallic seed lying on a moss-covered stepping stone in a Japanese garden. The seed appears cold and geometric. Soft green moss surrounds it, growing in the cracks of weathered stone. Stone lantern and bamboo fence visible in soft focus background. Dewdrops on the moss. The contrast between the heavy, undecorated truth and soft living moss. "The heavy, undecorated truth".

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

---

## 2. 日常レイヤー (Daily Life Layer)
日常パート・スナップショット用
**共通設定:** Aspect Ratio 1:1 (Square)

**Daily Style Block** (各プロンプト末尾に追加):

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

### シーン別プロンプト

**No.01: 深夜のデスク**
> Close up of a desk at midnight. Only the blue light from a laptop screen illuminates hands resting on the keyboard. The screen content is blurry and unreadable. High ISO noise, tired lonely atmosphere.

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.02: 溶けた氷水**
> A café table with a glass of melted ice water. The seat across is empty. The focus is on the condensation water droplets on the glass surface. Cold and quiet mood.

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.03: 雨の窓**
> Looking out a window on a rainy day. Raindrops on the glass are in sharp focus, while the grey city outside is blurred and unrecognizable. Depressing blue and grey color palette.

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.04: 栞と本**
> A bookmark sticking out of a closed hardcover book lying on a messy sofa. Or a pen resting on a notebook page. Soft, weak indoor light. Quiet stillness.

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.05: ドアノブ**
> Extreme close up of a metallic doorknob in dim light. Hand entering frame, hesitating to turn it. Sense of closure and tension/restriction.

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.06: 絡まったイヤホン**
> White wired earphones tangling messily on a wooden table. The knot looks complex and impossible to untie. Symbol of confusion.

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.07: 窓の反射**
> A reflection in a window at night. The interior room is faintly visible, superimposed on the darkness outside. Ambiguous, ghostly, and lonely.

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.08: 枯れ葉**
> A single dry, brown fallen leaf on the concrete ground next to a potted plant. The leaf is cracked. Accidental beauty in decay. Top-down view.

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.09: ぼやけた街**
> A completely out-of-focus view of a cityscape from a pedestrian bridge at dusk. City lights are just round bokeh circles. Sense of dissociation and distance.

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.10: 手のひら**
> An open palm of a hand facing upward, holding nothing. Soft focus, skin texture is visible but gentle. Vulnerability and acceptance. Natural light.

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

---

## 3. WebAR版展開計画

### WebAR版のコンセプト
物理的な透層本（トレーシングペーパー本）の体験をウェブ上で再現するため、深度マップ（Depth Map）を活用したWebAR版の制作を進めています。スマートフォンやタブレットで閲覧すると、Layer AとLayer Bが立体的に分離し、視差効果によって「透けて見える」体験がデジタル空間で再現されます。

### 技術仕様
- **フォーマット:** WebAR (8th Wall / AR.js / Three.js)
- **深度マップ生成:** MiDaS / Depth Anything を使用し、全20点の画像から深度情報を抽出
- **インタラクション:** スワイプでページ送り、傾き検知で視差効果、タップで層の切り替え
- **アクセス:** QR コードまたはURL経由で、アプリ不要で体験可能

### 現在の進捗状況（2026年1月31日時点）
- ✅ 全20点の画像生成完了（Layer A + Layer B）
- ✅ 深度マップ生成スクリプト整備済み（`WebAR/generate_depth.py`, `WebAR/setup.py`）
- 🔄 WebARフレームワークの実装中
- 🔄 UI/UX設計およびプロトタイプテスト

### WebAR固有のプロンプト調整
物理本とWebAR版では視認環境が異なるため、以下の調整を行います：
- **明度補正:** スマートフォン画面でも視認性を保つため、全体的に明るめに調整
- **コントラスト強化:** 小画面でも細部が潰れないよう、Layer Bのコントラストを若干強化
- **中央余白:** 物理本の綴じ代を考慮した配置だったものを、WebAR版では中央配置に最適化

---

## 4. 制作状況サマリー（2026年3月更新）

### 完了項目
- ✅ コンセプト設計・メタファー体系の構築
- ✅ 「沈黙」にまつわる様々な感情の言語化
- ✅ プロンプトテンプレート出力
- ✅ 全10エピソードの台割完成（AR対応形式）
- ✅ Layer A（日常）画像10点生成完了
- ✅ Layer B（本音）画像10点生成完了
- ✅ 各エピソードのテキスト完成（ポラロイドキャプション形式）
- ✅ WebAR版の実装とテスト（Three.js, 演出UI最適化完了）

### 進行中・今後の展開
- 📋 物理本の試作版制作（少部数）
- 📋 展示形式の検討（実物 + WebAR インスタレーションのハイブリッド展示）
- 📋 多言語展開の可能性（英語版、中国語版など）

---

## 5. AI活用の振り返り

### Gemini Nano Banana Proの強み（静止画生成）
- **プロンプトの文学性:** 詩的な表現を用いることで、AIの解釈に深みが増す
- **制約としての一貫性:** 「庭」というメタファーに統一することで、作品世界が強固になった
- **物理性との対話:** デジタル生成物を物理書籍に落とし込む過程で、新たな表現可能性が発見できた

---

**制作者ノート:**  
このプロンプト集は、感情の可視化という試みの「設計図」です。AIは道具であると同時に、対話相手でもありました。生成された画像は、私一人では決して描けなかった「もう一つの真実」を見せてくれました。ARという空間の次元を得ることで、「沈黙」が持つ多層的な性質を表現できるようになりました。
