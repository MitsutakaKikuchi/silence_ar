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
> <br>
> **[日本語訳]**<br>
> 実際の放棄された日本風の庭園で撮影。自然光（曇り空の昼光）の下でのリアルな質感。地面、苔むした石、竹垣、石灯籠、またはわびさびの庭園構造物が背景に見える、実際の庭園空間内に存在するシーン。虚無の中でオブジェクトが浮遊するのは避ける。風化した苔の緑、酸化した金属の灰色、淡い石の白、そして乾いた血の赤のカラーパレット。繊細な日本庭園の美学を伴う、メランコリックで地に足のついた、触れられそうな雰囲気。ドキュメンタリー写真のスタイルと、演出されたアートインスタレーションの混合。庭園の文脈の中でオブジェクトを示す自然な構図。

### シーン別プロンプト (No.01 - No.10)

**No.01: 矯正する支柱 (The Stake/支柱)**
*Concept:* 柔らかい茎を無理やり真っ直ぐにする、錆びた鉄の支柱。痛みと安定。
> In an overgrown Japanese garden corner, a young plant stem is tightly bound to a rusted bamboo stake driven into the dark soil. The binding wire bites into the green flesh. Weathered stone wall and a moss-covered stone lantern visible in the background. Ground covered with fallen leaves and thick moss. The stake casts a harsh shadow. A metaphor for "painful correction that provides stability".
> <br>
> **[日本語訳]**<br>
> 草木が生い茂る日本庭園の片隅で、若い植物の茎が、暗い土に打ち込まれた錆びた竹の支柱にきつく縛り付けられている。縛るワイヤーが緑の果肉に食い込んでいる。背景には風化した石壁と苔むした石灯籠が見える。地面は落ち葉と厚い苔で覆われている。支柱はきつい影を落としている。「安定をもたらす痛みを伴う矯正」のメタファー。

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

**No.02: 沈黙の蔦 (The Silent Ivy/蔦)**
*Concept:* 美しい花を覆い尽くし、呼吸を奪う蔦。優しさという名の窒息。
> In a neglected Japanese garden bed, a single white camellia is being completely enveloped by dense ivy vines climbing up from the ground. The ivy covers most of the petals. Stone stepping stones and a weathered bamboo fence visible in soft focus background. Dark soil littered with fallen ivy leaves in foreground. "Suffocating kindness".
> <br>
> **[日本語訳]**<br>
> 手入れされていない日本庭園の花壇で、一輪の白い椿が、地面から這い上がる密集した蔦にすっかり包み込まれている。蔦は花びらの大部分を覆っている。背景には、飛び石と風化した竹垣が柔らかいフォーカスで見える。手前の暗い土には落ちた蔦の葉が散乱している。「窒息させる優しさ」。

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

**No.03: 拒絶の雨 (The Cold Rain/雨)**
*Concept:* 泥を洗い流し、根を露出させる冷たい雨。厳しさがもたらす浄化。
> A rain-soaked Japanese garden bed with heavy raindrops hitting the exposed earth. Dark muddy soil is being washed away in streams, revealing pale plant stems and their base still clinging to the ground. Bamboo fence and rain-blurred stone basin (tsukubai) in background. Puddles forming on moss-covered stepping stones. Cold, metallic quality to the rain. Exposure and cleansing through harshness.
> <br>
> **[日本語訳]**<br>
> 雨に濡れた日本庭園の花壇。露出した土に大粒の雨が打ち付けている。暗く泥だらけの土が小川のように洗い流され、地面にしがみつく青白い植物の茎とその根元が露わになっている。背景には竹垣と、雨でぼやけた蹲踞（つくばい）が見える。苔むした飛び石に水たまりができている。冷たく、金属的な質感の雨。厳しさによる露出と浄化。

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

**No.04: 守れなかった言葉の化石 (The Soil/土壌)**
*Concept:* 地中に堆積した、言葉の形をした化石たち。歴史の重み。
> A freshly dug hole in the Japanese garden ground, revealing a cross-section of dark layered soil. Within the earth layers, old metal letter stamps (typography blocks) and dried compressed camellia petals are embedded like archaeological findings. Garden tools lying beside the hole. Weathered stone arrangement and a partially buried stone lantern in background. The weight of unspoken history burying the present.
> <br>
> **[日本語訳]**<br>
> 日本庭園の地面に新しく掘られた穴から、暗く層になった土壌の断面が見える。土の層の中には、古い金属の活字ブロックや、乾燥して圧縮された椿の花びらが、考古学的な発見物のように埋め込まれている。穴のそばには園芸用の道具が置かれている。背景には風化した石の配置と、半分埋もれた石灯籠。現在を埋め尽くす、語られなかった歴史の重み。

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

**No.05: 過保護な檻 (The Cage/檻)**
*Concept:* 外敵（嵐）から若芽を守る、錆びた恐ろしい檻。醜い守護。
> In a wild Japanese garden, a small seedling grows inside a crude cage made of rusted iron bars and bamboo stakes, planted firmly in moss-covered soil. Dark storm clouds gather above. Wind-blown maple leaves and debris swirl around outside the cage, but inside is calm. Stone lantern and weathered bamboo fence in background. The cage is ugly but protective. "Restriction as a form of love".
> <br>
> **[日本語訳]**<br>
> 荒れた日本庭園で、小さな苗木が錆びた鉄格子と竹の支柱で作られた粗末な檻の中で育ち、苔むした土にしっかりと植えられている。上空には暗い嵐の雲が集まっている。風に吹かれた紅葉や破片が檻の外で激しく渦巻いているが、檻の中は穏やかである。背景には石灯籠と風化した竹垣。その檻は醜いが保護的である。「愛の形としての制限」。

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

**No.06: 相互の呪縛 (The Grafting/接ぎ木)**
*Concept:* 捻じれながら癒着し、一体化した二本の幹。痛々しいほどの依存。
> In an old Japanese garden, two different tree trunks (maple and pine) have grown together in a twisted spiral formation, their bark fused into one gnarled mass. Dark resin oozes from the grafting point. They rise from a shared patch of moss-covered ground. Stone basin (tsukubai) and weathered bamboo fence visible in the misty background. It looks painful and inseparable. "Mutual dependency".
> <br>
> **[日本語訳]**<br>
> 古い日本庭園で、異なる二本の木の幹（楓と松）がねじれたらせん状に成長し、それらの樹皮は一つの節くれだった塊に融合している。接ぎ木された部分から暗い樹脂が滲み出ている。それらは苔むした地面の共有されたパッチから生えている。霧がかった背景に蹲踞と風化した竹垣が見える。それは痛々しく、切り離せないように見える。「相互依存」。

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

**No.07: 内なる独白/温室 (The Greenhouse/温室)**
*Concept:* ガラスの内側から見た、外の暗い森。棘で武装された温室。拒絶的な内省。
> Interior view of an old glass greenhouse in a Japanese-style walled garden. Looking toward the glass walls reinforced with weathered bamboo and iron frames. Wild bamboo and thorny branches press against the exterior glass. Outside, dark overgrown garden with stone lanterns and shadowy maple trees are visible through condensation-covered glass. Inside, humid air, bonsai on shelves, and warm diffused light. "Defensive introspection".
> <br>
> **[日本語訳]**<br>
> 日本風の壁に囲まれた庭園にある古いガラス温室の内部からの視点。風化した竹と鉄の枠で補強されたガラス壁の方向を見ている。野生の竹と棘のある枝が外側のガラスに押し付けられている。外には、結露で覆われたガラスを通して、石灯籠や影のある楓の木がある暗く生い茂った庭が見える。内部は湿った空気、棚に置かれた盆栽、そして暖かく拡散した光がある。「防衛的な内省」。

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

**No.08: 選別/剪定 (The Pruning/剪定)**
*Concept:* 空中で枝を切るハサミ。切り口からは樹液ではなく赤が滲む。言葉の選別。
> In a Japanese garden workspace, an old pair of rusted pruning shears is caught in the act of cutting a camellia branch. The freshly cut surface shows a dark red sap. Cut petals and leaves have fallen onto a weathered wooden work table below. Garden gloves and bonsai tools scattered on the table. Stone wall and bamboo grove in the background. "The pain of choosing what not to say".
> <br>
> **[日本語訳]**<br>
> 日本庭園の作業場で、古く錆びた剪定ばさみが椿の枝を切っている最中の瞬間。切り立ての表面からは暗赤色の樹液が見える。切り落とされた花びらと葉が、下の風化した木製の作業台に落ちている。テーブルの上には園芸用手袋と盆栽の道具が散乱している。背景には石壁と竹林。「何を言わないかを選ぶ痛み」。

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

**No.09: 庭の全景 (The Labyrinth/迷宮)**
*Concept:* 出口のない美しい迷路庭園。閉ざされた生態系。
> Elevated wide-angle view of an intricate Japanese-style walled garden maze. Overgrown hedges and bamboo groves form complex winding paths with stepping stones. Weathered stone walls enclose the entire garden. Mix of wild blooming camellias and areas of decay. Stone lanterns, weathered stone basin, and dry koi pond visible within. No visible exit. Fog or mist adds to the enclosed atmosphere. It is a closed ecosystem, beautiful but trapped. "The Garden of Silence".
> <br>
> **[日本語訳]**<br>
> 複雑な日本風の迷路庭園を見下ろす広角の俯瞰図。生い茂った生垣と竹林が、飛び石のある複雑で曲がりくねった道を作っている。風化した石壁が庭全体を囲んでいる。野生の咲く椿と朽ちた部分が混在している。石灯籠、風化した蹲踞、干上がった鯉の池が内部に見える。見える出口はない。霧や霞が閉ざされた雰囲気を加えている。それは美しくも閉じ込められた、閉鎖された生態系である。「沈黙の庭」。

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

**No.10: 真実の結晶 (The Seed/種子)**
*Concept:* 苔の上に落ちた、重く黒い幾何学的な種。飾らない真実の重み。
> Close-up of a single large, heavy, dark metallic seed lying on a moss-covered stepping stone in a Japanese garden. The seed appears cold and geometric. Soft green moss surrounds it, growing in the cracks of weathered stone. Stone lantern and bamboo fence visible in soft focus background. Dewdrops on the moss. The contrast between the heavy, undecorated truth and soft living moss. "The heavy, undecorated truth".
> <br>
> **[日本語訳]**<br>
> 日本庭園の苔むした飛び石の上に置かれた、一つで大きく、重く、暗い金属的な種子のクローズアップ。種子は冷たく、幾何学的に見える。風化した石の隙間に生える柔らかい緑の苔がそれを囲んでいる。柔らかいフォーカスの背景には石灯籠と竹垣が見える。苔の上には露のしずく。重く飾りのない真実と、柔らかく生きている苔のコントラスト。「重く飾りのない真実」。

> `Photographed in a real abandoned Japanese-influenced garden. Realistic texture with natural lighting (overcast daylight). A scene existing within an actual garden space with visible ground, moss-covered stones, bamboo fences, stone lanterns, or wabi-sabi garden structures in background. Avoid floating objects in void. Color palette of weathered moss greens, oxidized metal grays, pale stone whites, and dried blood reds. Melancholic, grounded, tangible atmosphere with subtle Japanese garden aesthetics. Documentary photography style mixed with staged art installation. Natural composition showing the object within its garden context.`文字情報は不要。庭という空間の中に存在する構図にすること

---

## 2. 日常レイヤー (Daily Life Layer)
日常パート・スナップショット用
**共通設定:** Aspect Ratio 1:1 (Square)

**Daily Style Block** (各プロンプト末尾に追加):

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`
> <br>
> **[日本語訳]**<br>
> スマートフォンでの撮影スタイル、VSCOフィルムプリセット風（A6またはM5）、くすんだ色合い、低コントラスト、わずかなモーションブラーまたはフォーカスブリージング、高ISOノイズ、感情的な雰囲気、「技術的には不完全だが、感情的にリアル」。

### シーン別プロンプト

**No.01: 深夜のデスク**
> Close up of a desk at midnight. Only the blue light from a laptop screen illuminates hands resting on the keyboard. The screen content is blurry and unreadable. High ISO noise, tired lonely atmosphere.
> <br>
> **[日本語訳]**<br>
> 深夜の机のクローズアップ。ノートパソコンの画面からの青い光だけが、キーボードに置かれた手を照らしている。画面の内容はぼやけていて読めない。高ISOノイズ、疲れて孤独な雰囲気。

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.02: 溶けた氷水**
> A café table with a glass of melted ice water. The seat across is empty. The focus is on the condensation water droplets on the glass surface. Cold and quiet mood.
> <br>
> **[日本語訳]**<br>
> カフェのテーブルの上にある、溶けた氷水のグラス。向かいの席は空いている。焦点はグラスの表面についた結露の水滴に合っている。冷たくて静かな気分。

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.03: 雨の窓**
> Looking out a window on a rainy day. Raindrops on the glass are in sharp focus, while the grey city outside is blurred and unrecognizable. Depressing blue and grey color palette.
> <br>
> **[日本語訳]**<br>
> 雨の日に窓の外を見ている。ガラスについた雨滴には鋭くピントが合っているが、外の灰色の街はぼやけて認識できない。気の滅入るような青と灰色のカラーパレット。

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.04: 栞と本**
> A bookmark sticking out of a closed hardcover book lying on a messy sofa. Or a pen resting on a notebook page. Soft, weak indoor light. Quiet stillness.
> <br>
> **[日本語訳]**<br>
> 散らかったソファの上に置かれた、閉じられたハードカバーの本からはみ出した栞。あるいはノートのページの上に置かれたペン。柔らかく弱い室内の光。静かな静止。

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.05: ドアノブ**
> Extreme close up of a metallic doorknob in dim light. Hand entering frame, hesitating to turn it. Sense of closure and tension/restriction.
> <br>
> **[日本語訳]**<br>
> 薄暗い光の中の金属製ドアノブのエクストリーム・クローズアップ。フレームに手が入るが、回すのをためらっている。閉鎖感と緊張・制限。

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.06: 絡まったイヤホン**
> White wired earphones tangling messily on a wooden table. The knot looks complex and impossible to untie. Symbol of confusion.
> <br>
> **[日本語訳]**<br>
> 木製テーブルの上でめちゃくちゃに絡まっている白い有線イヤホン。結び目は複雑で、ほどくのは不可能に見える。混乱の象徴。

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.07: 窓の反射**
> A reflection in a window at night. The interior room is faintly visible, superimposed on the darkness outside. Ambiguous, ghostly, and lonely.
> <br>
> **[日本語訳]**<br>
> 夜の窓に映る反射。室内の部屋がかすかに見え、外の暗闇に重なっている。曖昧で、幽体のような、孤独感。

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.08: 枯れ葉**
> A single dry, brown fallen leaf on the concrete ground next to a potted plant. The leaf is cracked. Accidental beauty in decay. Top-down view.
> <br>
> **[日本語訳]**<br>
> 鉢植えの隣のコンクリートの地面に落ちている、乾いた茶色の一枚の枯れ葉。葉はひび割れている。朽ちていく中にある偶然の美。真上からの視点。

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.09: ぼやけた街**
> A completely out-of-focus view of a cityscape from a pedestrian bridge at dusk. City lights are just round bokeh circles. Sense of dissociation and distance.
> <br>
> **[日本語訳]**<br>
> 夕暮れ時の歩道橋からの、完全にピントの合っていない街並み。街の明かりはただの丸いボケでしかない。解離感と距離感。

> `Smartphone photography aesthetic, VSCO film preset style (A6 or M5), Muted colors, Low contrast, Slight motion blur or focus breathing, High ISO grain, Emotional atmosphere, "Technically imperfect but emotionally real".`

**No.10: 手のひら**
> An open palm of a hand facing upward, holding nothing. Soft focus, skin texture is visible but gentle. Vulnerability and acceptance. Natural light.
> <br>
> **[日本語訳]**<br>
> 何も持たず、上を向いて開かれた手のひら。ソフトフォーカス、肌の質感は見えるが優しい。脆弱さと受容。自然光。

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