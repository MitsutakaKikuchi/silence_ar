# 『沈黙の解剖図譜』Gemini Nano Banana Pro プロンプト集

**作品名:** 沈黙の解剖図譜 —— 不可視の愛に関する空間的考察
**用途:** フォトブック制作（本音レイヤー & 日常レイヤー）+ WebAR版展開 + Veo動画版
**モデル推奨:** Gemini Nano Banana Pro / Imagen 3（静止画）、Google Veo（動画）
**最終更新:** 2026年2月1日

---

## プロンプト構成の設計思想

本作品では、AI画像生成において二つの異なる視覚言語を使い分けています：

### Layer A（日常レイヤー）の設計意図
- **スタイル:** スマートフォン撮影のような「技術的に不完全な写真」
- **狙い:** 日常の不安定さ、儚さ、記憶の曖昧さを表現
- **技術的特徴:** 高ISOノイズ、ピンボケ、VSCOフィルム風の色褪せ
- **動画版:** ハンドヘルドカメラの自然な揺れ、フォーカスブリージング、微細な日常動作

### Layer B（本音レイヤー）の設計意図
- **スタイル:** 日本庭園を舞台にした写実的ドキュメンタリー × アートインスタレーション
- **狙い:** 沈黙が持つグロテスクな美しさ、侘び寂びの精神性
- **技術的特徴:** 自然光、高い描写密度、物質感のあるテクスチャ
- **動画版:** スローモーション、時間経過表現、自然現象（風・雨・成長・滴り）の詩的な動き

---

## 1. 本音レイヤー (Inner Truth Layer)
見開き全面配置用（透層下のイラスト）
**共通設定:** Aspect Ratio 1:1 (Square)

**Master Style Block** (各プロンプト末尾に追加):
> `--ar 1:1`
> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

### シーン別プロンプト (No.01 - No.10)

**No.01: 矯正する支柱 (The Stake/支柱)**
*Concept:* 柔らかい茎を無理やり真っ直ぐにする、錆びた鉄の支柱。痛みと安定。
> In an overgrown Japanese garden corner, a young plant stem is tightly bound to a rusted bamboo stake driven into the dark soil. The binding wire bites into the green flesh. Weathered stone wall and a moss-covered stone lantern visible in the background. Ground covered with fallen leaves and thick moss. The stake casts a harsh shadow. A metaphor for "painful correction that provides stability".
> `--ar 1:1`
> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.02: 沈黙の蔦 (The Silent Ivy/蔦)**
*Concept:* 美しい花を覆い尽くし、呼吸を奪う蔦。優しさという名の窒息。
> In a neglected Japanese garden bed, a single white camellia is being completely enveloped by dense ivy vines climbing up from the ground. The ivy covers most of the petals. Stone stepping stones and a weathered bamboo fence visible in soft focus background. Dark soil littered with fallen ivy leaves in foreground. "Suffocating kindness".
> `--ar 1:1`
> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.03: 拒絶の雨 (The Cold Rain/雨)**
*Concept:* 泥を洗い流し、根を露出させる冷たい雨。厳しさがもたらす浄化。
> A rain-soaked Japanese garden bed with heavy raindrops hitting the exposed earth. Dark muddy soil is being washed away in streams, revealing pale plant stems and their base still clinging to the ground. Bamboo fence and rain-blurred stone basin (tsukubai) in background. Puddles forming on moss-covered stepping stones. Cold, metallic quality to the rain. Exposure and cleansing through harshness.
> `--ar 1:1`
> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.04: 守れなかった言葉の化石 (The Soil/土壌)**
*Concept:* 地中に堆積した、言葉の形をした化石たち。歴史の重み。
> A freshly dug hole in the Japanese garden ground, revealing a cross-section of dark layered soil. Within the earth layers, old metal letter stamps (typography blocks) and dried compressed camellia petals are embedded like archaeological findings. Garden tools lying beside the hole. Weathered stone arrangement and a partially buried stone lantern in background. The weight of unspoken history burying the present.
> `--ar 1:1`
> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.05: 過保護な檻 (The Cage/檻)**
*Concept:* 外敵（嵐）から若芽を守る、錆びた恐ろしい檻。醜い守護。
> In a wild Japanese garden, a small seedling grows inside a crude cage made of rusted iron bars and bamboo stakes, planted firmly in moss-covered soil. Dark storm clouds gather above. Wind-blown maple leaves and debris swirl around outside the cage, but inside is calm. Stone lantern and weathered bamboo fence in background. The cage is ugly but protective. "Restriction as a form of love".
> `--ar 1:1`
> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.06: 相互の呪縛 (The Grafting/接ぎ木)**
*Concept:* 捻じれながら癒着し、一体化した二本の幹。痛々しいほどの依存。
> In an old Japanese garden, two different tree trunks (maple and pine) have grown together in a twisted spiral formation, their bark fused into one gnarled mass. Dark resin oozes from the grafting point. They rise from a shared patch of moss-covered ground. Stone basin (tsukubai) and weathered bamboo fence visible in the misty background. It looks painful and inseparable. "Mutual dependency".
> `--ar 1:1`
> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.07: 内なる独白/温室 (The Greenhouse/温室)**
*Concept:* ガラスの内側から見た、外の暗い森。棘で武装された温室。拒絶的な内省。
> Interior view of an old glass greenhouse in a Japanese-style walled garden. Looking toward the glass walls reinforced with weathered bamboo and iron frames. Wild bamboo and thorny branches press against the exterior glass. Outside, dark overgrown garden with stone lanterns and shadowy maple trees are visible through condensation-covered glass. Inside, humid air, bonsai on shelves, and warm diffused light. "Defensive introspection".
> `--ar 1:1`
> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.08: 選別/剪定 (The Pruning/剪定)**
*Concept:* 空中で枝を切るハサミ。切り口からは樹液ではなく赤が滲む。言葉の選別。
> In a Japanese garden workspace, an old pair of rusted pruning shears is caught in the act of cutting a camellia branch. The freshly cut surface shows a dark red sap. Cut petals and leaves have fallen onto a weathered wooden work table below. Garden gloves and bonsai tools scattered on the table. Stone wall and bamboo grove in the background. "The pain of choosing what not to say".
> `--ar 1:1`
> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.09: 庭の全景 (The Labyrinth/迷宮)**
*Concept:* 出口のない美しい迷路庭園。閉ざされた生態系。
> Elevated wide-angle view of an intricate Japanese-style walled garden maze. Overgrown hedges and bamboo groves form complex winding paths with stepping stones. Weathered stone walls enclose the entire garden. Mix of wild blooming camellias and areas of decay. Stone lanterns, weathered stone basin, and dry koi pond visible within. No visible exit. Fog or mist adds to the enclosed atmosphere. It is a closed ecosystem, beautiful but trapped. "The Garden of Silence".
> `--ar 1:1`
> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること


**No.10: 真実の結晶 (The Seed/種子)**
*Concept:* 苔の上に落ちた、重く黒い幾何学的な種。飾らない真実の重み。
> Close-up of a single large, heavy, dark metallic seed lying on a moss-covered stepping stone in a Japanese garden. The seed appears cold and geometric. Soft green moss surrounds it, growing in the cracks of weathered stone. Stone lantern and bamboo fence visible in soft focus background. Dewdrops on the moss. The contrast between the heavy, undecorated truth and soft living moss. "The heavy, undecorated truth".
> `--ar 1:1`
> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

---

## 1-B. 本音レイヤー - Veo動画版 (Inner Truth Layer - Video)
静止画を基にした8秒動画用プロンプト
**共通設定:** 8 seconds, Cinematic, Slow motion

**Veo Motion Style Block** (各プロンプト末尾に追加):
> `8 seconds. Slow, contemplative camera movement. Subtle organic motion. Cinematic depth of field. Melancholic atmosphere. Natural wind and weather effects. Preserve the documentary photography aesthetic with staged art installation quality.`

### 動画シーン別プロンプト (No.01 - No.10)

**No.01: 矯正する支柱 (The Stake/支柱) - Video**
> Start with a close-up of the rusted bamboo stake and bound plant stem in the Japanese garden corner. Gentle breeze causes the plant to sway slightly against its restraints, the binding wire cutting deeper with each movement. Camera slowly pulls back to reveal the moss-covered stone lantern in background. Fallen leaves drift across the ground. The stake's shadow slowly shifts as clouds move overhead. 8 seconds. Melancholic, restrained motion emphasizing the tension between freedom and stability.

**No.02: 沈黙の蔦 (The Silent Ivy/蔦) - Video**
> Begin focused on the white camellia being enveloped by dense ivy in the Japanese garden bed. Time-lapse effect: the ivy vines very slowly tighten their grip on the petals, almost imperceptibly closing around the flower. Soft breeze causes ivy leaves to tremble. Camera slowly orbits around the subject. Fallen ivy leaves in the foreground shift slightly. Bamboo fence remains softly out of focus in background. 8 seconds. Suffocating, inevitable motion.

**No.03: 拒絶の雨 (The Cold Rain/雨) - Video**
> Heavy rain falls continuously on the Japanese garden bed. Raindrops hit the dark soil, creating small splashes. Muddy streams flow across the frame, gradually washing away more soil to reveal pale plant stems. Puddles form and ripple on moss-covered stepping stones. Camera slowly tilts down following the rain's descent. The stone basin (tsukubai) in background catches water. 8 seconds. Cold, cleansing, relentless motion.

**No.04: 守れなかった言葉の化石 (The Soil/土壌) - Video**
> Camera slowly pushes in on the freshly dug hole revealing layered soil cross-section in the Japanese garden. The metal letter stamps and compressed camellia petals embedded in the earth layers are gradually revealed with the camera movement. Gentle breeze causes loose soil to drift. Garden tools in foreground remain still. Stone lantern partially buried in background. Dust motes float in the air. 8 seconds. Archaeological, revelatory motion revealing buried history.

**No.05: 過保護な檻 (The Cage/檻) - Video**
> Storm winds blow through the wild Japanese garden. The rusted iron and bamboo cage remains stationary while maple leaves and debris swirl violently around it. The small seedling inside stays perfectly calm and protected. Dark clouds move rapidly overhead. The stone lantern and bamboo fence in background sway in the wind. Camera slowly orbits around the cage structure. 8 seconds. Contrasting motion: chaos outside, stillness within.

**No.06: 相互の呪縛 (The Grafting/接ぎ木) - Video**
> Open on the twisted maple and pine trunks fused together in the old Japanese garden. Dark resin very slowly oozes from the grafting point, dripping down the bark. Mist drifts slowly through the scene. Camera slowly circles the intertwined trees, revealing different angles of their painful union. Moss-covered ground in foreground. The stone basin (tsukubai) and bamboo fence barely visible through the mist. 8 seconds. Intimate, painful, inseparable motion.

**No.07: 内なる独白/温室 (The Greenhouse/温室) - Video**
> Interior POV from inside the Japanese-style greenhouse looking out. Condensation slowly drips down the glass walls. Steam and humid air drift inside. Bonsai leaves on shelves gently sway in the internal air current. Outside, wild bamboo and thorny branches press against the glass, slightly moving in the wind. Stone lanterns and shadowy maple trees barely visible through the foggy glass. Camera slowly pushes toward the glass wall. 8 seconds. Claustrophobic, protective, isolating motion.

**No.08: 選別/剪定 (The Pruning/剪定) - Video**
> The rusted pruning shears slowly close, cutting through the camellia branch in the Japanese garden workspace. Dark red sap begins to well up at the cut surface. Cut petals and leaves fall in slow motion onto the weathered wooden table. Camera slowly zooms in on the cutting action, then pulls back to reveal scattered bonsai tools and garden gloves. Stone wall and bamboo grove in background. 8 seconds. Decisive, painful, necessary motion of severance.

**No.09: 庭の全景 (The Labyrinth/迷宮) - Video**
> Elevated wide-angle view slowly rising above the intricate Japanese-style walled garden maze. The camera ascent reveals more of the complex winding paths with stepping stones, overgrown hedges and bamboo groves. Mist flows through the pathways. Wild camellias sway gently. Stone lanterns, weathered basin, and dry koi pond become visible as camera rises. No exit is ever revealed. Fog thickens at the edges. 8 seconds. Ascending, revelatory yet entrapping motion showing the inescapable beauty.

**No.10: 真実の結晶 (The Seed/種子) - Video**
> Close-up of the heavy, dark metallic seed resting on the moss-covered stepping stone in the Japanese garden. Morning dew slowly drips from nearby leaves onto the moss, creating tiny ripples. Camera very slowly pushes in on the seed, emphasizing its weight and geometric coldness. The soft green moss sways almost imperceptibly in a gentle breeze. Stone lantern and bamboo fence drift slightly out of focus in background. Dewdrops catch the overcast light. 8 seconds. Quiet, meditative motion emphasizing the contrast between heavy truth and soft life.

---

## 2. 日常レイヤー (Daily Life Layer)
日常パート・スナップショット用
**共通設定:** Aspect Ratio 1:1 (Square)

**Daily Style Block** (各プロンプト末尾に追加):
> `--ar 1:1`
> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

### シーン別プロンプト

**No.01: 深夜のデスク**
> Close up of a desk at midnight. Only the blue light from a laptop screen illuminates hands resting on the keyboard. The screen content is blurry and unreadable. High ISO noise, tired lonely atmosphere.
> `--ar 1:1`
> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.02: 溶けた氷水**
> A café table with a glass of melted ice water. The seat across is empty. The focus is on the condensation water droplets on the glass surface. Cold and quiet mood.
> `--ar 1:1`
> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.03: 雨の窓**
> Looking out a window on a rainy day. Raindrops on the glass are in sharp focus, while the grey city outside is blurred and unrecognizable. Depressing blue and grey color palette.
> `--ar 1:1`
> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.04: 栞と本**
> A bookmark sticking out of a closed hardcover book lying on a messy sofa. Or a pen resting on a notebook page. Soft, weak indoor light. Quiet stillness.
> `--ar 1:1`
> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.05: ドアノブ**
> Extreme close up of a metallic doorknob in dim light. Hand entering frame, hesitating to turn it. Sense of closure and tension/restriction.
> `--ar 1:1`
> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.06: 絡まったイヤホン**
> White wired earphones tangling messily on a wooden table. The knot looks complex and impossible to untie. Symbol of confusion.
> `--ar 1:1`
> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.07: 窓の反射**
> A reflection in a window at night. The interior room is faintly visible, superimposed on the darkness outside. Ambiguous, ghostly, and lonely.
> `--ar 1:1`
> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.08: 枯れ葉**
> A single dry, brown fallen leaf on the concrete ground next to a potted plant. The leaf is cracked. Accidental beauty in decay. Top-down view.
> `--ar 1:1`
> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.09: ぼやけた街**
> A completely out-of-focus view of a cityscape from a pedestrian bridge at dusk. City lights are just round bokeh circles. Sense of dissociation and distance.
> `--ar 1:1`
> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.10: 手のひら**
> An open palm of a hand facing upward, holding nothing. Soft focus, skin texture is visible but gentle. Vulnerability and acceptance. Natural light.
> `--ar 1:1`
> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

---

## 2-B. 日常レイヤー - Veo動画版 (Daily Life Layer - Video)
スマートフォン撮影風の8秒動画用プロンプト
**共通設定:** 8 seconds, Handheld camera, Smartphone aesthetic

**Veo Daily Motion Style Block** (各プロンプト末尾に追加):
> `8 seconds. Handheld smartphone camera with slight shake. Subtle focus breathing. Minimal movement. VSCO film aesthetic. High ISO grain. Emotionally real, technically imperfect. Intimate, quiet atmosphere.`

### 動画シーン別プロンプト

**No.01: 深夜のデスク - Video**
> Static handheld shot of a desk at midnight. Hands occasionally shift slightly on the keyboard. Blue light from laptop screen flickers subtly. Screen content remains blurry. Camera has slight natural handheld tremor. Fingers twitch once or twice. Shadows shift slightly. 8 seconds. Tired, lonely, late-night atmosphere with minimal motion.

**No.02: 溶けた氷水 - Video**
> Fixed shot of café table with glass of melted ice water. Condensation droplets slowly run down the glass surface. The empty seat across remains visible. Camera has natural handheld micro-movements. Very subtle focus shift between the glass and the background. One or two water droplets fall. 8 seconds. Cold, patient, waiting atmosphere.

**No.03: 雨の窓 - Video**
> Looking out a window on a rainy day. New raindrops continuously hit and run down the glass in sharp focus. Grey city outside remains blurred. Camera slightly pans or tilts with natural handheld movement. Rain intensity varies slightly. Window fog shifts. 8 seconds. Depressing, isolating rainy day atmosphere.

**No.04: 栞と本 - Video**
> Static shot of closed hardcover book with bookmark on messy sofa. Soft indoor light flickers slightly as if from a nearby window. Pages shift almost imperceptibly in a breeze. Camera has minimal handheld drift. Pen rolls slightly. 8 seconds. Quiet, suspended, unfinished atmosphere.

**No.05: ドアノブ - Video**
> Extreme close-up of metallic doorknob in dim light. Very minimal motion. Hand enters frame and grips the knob but hesitates and doesn't turn it. Fingers might tremble slightly. Camera has natural handheld micro-shake. 8 seconds. Tense, restrictive atmosphere with decisive limitation.

**No.06: 絡まったイヤホン - Video**
> Top-down shot of tangled white earphones on wooden table. Camera slowly pushes in slightly. Fingers enter frame and attempt to untangle, making it worse, then withdraw. The knot remains complex. Natural handheld camera movement. 8 seconds. Frustrating, confused, impossible to resolve atmosphere.

**No.07: 窓の反射 - Video**
> Shot of window at night showing interior room reflection superimposed on darkness outside. Camera slowly pushes toward the glass. The reflection shifts slightly with camera movement. Occasionally a light flickers inside. Natural handheld shake. Ghostly double image throughout. 8 seconds. Ambiguous, lonely, liminal space atmosphere.

**No.08: 枯れ葉 - Video**
> Top-down view of single dry fallen leaf on concrete next to potted plant. A gentle breeze causes the leaf to shift and tumble slightly across the concrete, then settle. Camera follows with slight pan. Natural handheld movement. Light and shadow shift subtly. 8 seconds. Accidental beauty in decay and movement.

**No.09: ぼやけた街 - Video**
> Completely out-of-focus view of cityscape from pedestrian bridge at dusk. Bokeh circles of city lights pulse and shift slightly as cars move. Camera very slowly pans across the scene. Focus never sharpens. Handheld drift and slight camera shake. Colors blend and separate. 8 seconds. Dissociated, distant, dreamlike atmosphere.

**No.10: 手のひら - Video**
> Close-up of open palm facing upward, holding nothing. Hand remains mostly still with natural micro-movements (breathing, slight tremor). Soft natural light shifts subtly. Camera slowly pushes in slightly. Skin texture becomes more visible. Fingers barely curl inward then relax. 8 seconds. Vulnerable, accepting, open atmosphere.

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

## 4. 制作状況サマリー（2026年2月1日更新）

### 完了項目
- ✅ コンセプト設計・メタファー体系の構築
- ✅ 全10エピソードの台割完成（AR対応形式）
- ✅ Layer A（日常）画像10点生成完了
- ✅ Layer B（本音）画像10点生成完了
- ✅ 各エピソードのテキスト完成（ポラロイドキャプション形式）
- ✅ プロンプトテンプレートの標準化（静止画・動画両対応）
- ✅ Veo用動画プロンプト全20点作成（本音レイヤー10点 + 日常レイヤー10点）

### 進行中
- 🔄 物理ブック（透層本）のレイアウト設計
- 🔄 WebAR版の実装とテスト
- 🔄 印刷仕様の最終調整（用紙選定、製本方法）
- 🔄 Veo動画版の生成テスト（8秒×20シーン）

### 今後の展開
- 📋 物理本の試作版制作（少部数）
- 📋 展示形式の検討（実物 + WebAR + 動画インスタレーションのハイブリッド展示）
- 📋 多言語展開の可能性（英語版、中国語版など）
- 📋 動画版を使った映像インスタレーション展示の検討

---

## 5. AI活用の振り返り

### Gemini Nano Banana Proの強み（静止画生成）
1. **メタファー理解の正確さ:** 抽象的な感情表現を的確に視覚化
2. **スタイルの使い分け:** 同一モデルで異なる2つの画風を高品質に出力
3. **意図的なハルシネーション:** 有機物と無機物の不自然な融合が、かえって心理描写のリアリティを生んだ

### Google Veoの展開可能性（動画生成）
1. **静止画からの時間軸展開:** 完成した静止画像に「時間」という次元を追加することで、より深い感情表現を実現
2. **微細な動きの詩的表現:** 8秒という短尺で、見る者を圧倒しない繊細な動き（雨、風、成長、滴り）を描写
3. **二つの時間感覚:** 本音レイヤーは「自然の時間（スローモーション、時間経過）」、日常レイヤーは「人間の時間（手持ちカメラの揺れ、日常の一瞬）」を表現

### プロジェクトを通じて得た知見
- **プロンプトの文学性:** 詩的な表現を用いることで、AIの解釈に深みが増す
- **制約としての一貫性:** 「庭」というメタファーに統一することで、作品世界が強固になった
- **物理性との対話:** デジタル生成物を物理書籍に落とし込む過程で、新たな表現可能性が発見できた
- **静止画と動画の相互補完:** 静止画は「瞬間の真実」を、動画は「時間の中の変化」を捉え、両者が作品に多層的な深みを与える

---

**制作者ノート:**  
このプロンプト集は、感情の可視化という試みの「設計図」です。AIは道具であると同時に、対話相手でもありました。生成された画像は、私一人では決して描けなかった「もう一つの真実」を見せてくれました。さらに動画という時間軸を得ることで、「沈黙」が持つ動的な性質——じわじわと締め付けていく蔦、ゆっくりと滴る樹液、静かに流れる霧——を表現できるようになりました。
