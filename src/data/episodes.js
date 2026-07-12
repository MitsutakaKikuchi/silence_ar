// ==========================================
// エピソードデータ (01-10)
// ==========================================
export const episodes = [
    {
        title: 'Episode.01\n矯正する支柱',
        text: 'ぐらつく足元を、錆びた鉄の<strong>支柱</strong>が静かに支えていた。<br>いつ、誰が打ち込んだのか——私は、訊かなかった。',
        image: './images/layerB_0.jpg'
    },
    {
        title: 'Episode.02\n沈黙の蔦',
        text: 'やさしさは、首筋にそっと巻きつく一本の<strong>蔦</strong>。<br>美しいと感じているうちに、呼吸だけが、細くなる。',
        image: './images/layerB_1.jpg'
    },
    {
        title: 'Episode.03\n拒絶の雨',
        text: '銀色の<strong>雨</strong>が、冷たく降りやまない。<br>私にこびりついていた何かだけが、音もなく流されていく。',
        image: './images/layerB_2.jpg'
    },
    {
        title: 'Episode.04\n言葉の化石',
        text: '飲み込んだ言葉は、<br>二人の地層の底で、ゆっくりと<strong>化石</strong>になる。<br>その形に、いつか触れてみたかった。',
        image: './images/layerB_3.jpg'
    },
    {
        title: 'Episode.05\n過保護な檻',
        text: 'この窮屈さは、壊れやすい私を守る<strong>檻</strong>なのだと思う。<br>その内側にとどまることを、<br>ほかでもない私が選んでいる。',
        image: './images/layerB_4.jpg'
    },
{
        title: 'Episode.06\n相互の呪縛',
        text: '背中合わせの傷口で、二本の幹が癒着していく。<br>もう別々の木には戻れない——<strong>接ぎ木</strong>のように、<br>同じ養分を、分け合いながら。',
        image: './images/layerB_5.jpg'
    },
    {
        title: 'Episode.07\n内なる要塞',
        text: '外に向かって牙をむく、武装した<strong>要塞</strong>。<br>私はその内側で、<br>何も知らないふりを、そっと許されている。',
        image: './images/layerB_6.jpg'
    },
    {
        title: 'Episode.08\n庭師の剪定',
        text: '庭師は、ためらわずに枝を<strong>剪定</strong>する。<br>何を切ったのか、語る必要はない。<br>その手は、庭を壊すためのものではなかった。',
        image: './images/layerB_7.jpg'
    },
    {
        title: 'Episode.09\n庭の全景',
        text: '高みから見おろせば、そこは出口のない<strong>迷路の庭</strong>。<br>迷い続けることを、私たちは互いに、<br>そっと許し合っている。',
        image: './images/layerB_8.jpg'
    },
    {
        title: 'Episode.10\n真実の種',
        text: '言われなかった言葉は、<br>硬い<strong>種</strong>になって、土の中で眠る。<br>芽吹かせないことも、ひとつの約束だった。',
        image: './images/layerB_9.jpg'
    }
];

/**
 * エピソードのタイトルと本文をカードへ流し込む。
 * 本文は <br> 区切りの行ごとに <span class="reveal-line"> でラップし、
 * カード表示時に一行ずつ立ち上がる「行リビール」を可能にする。
 * @param {HTMLElement} titleEl タイトル要素
 * @param {HTMLElement} descEl 本文要素
 * @param {{title: string, text: string}} data エピソードデータ
 */
export function setEpisodeText(titleEl, descEl, data) {
    titleEl.innerHTML = data.title;
    const lines = data.text.split(/<br\s*\/?>/i);
    descEl.innerHTML = lines
        .map((line) => `<span class="reveal-line">${line}</span>`)
        .join('');
}

    // 詩のフラグメント（シアターモード用）
export const poemFragments = [
        '言えなかった言葉だけが永遠に残る',      // 15文字：冒頭／逆説的な真理で引き込む
        '沈黙は、渡せなかった手紙に似ている',    // 15文字：沈黙の正体を提示
        'ここは聖域か、それとも墓場か',          // 13文字：問いの投げかけ／緊張の導入
        '触れれば崩れる。だから、触れなかった',  // 16文字：選択の理由①（均衡）
        '言えば終わる。言わなければ続いていく',  // 16文字：選択の理由②（持続）
        '優しさで塞いだ口、諦めで閉じた瞳',      // 16文字：沈黙の二面性
        '拒絶ではない。これは、もう一つの愛',    // 16文字：誤読への反論／転換点
        '言葉にしない優しさが、空気を守る',      // 15文字：保護としての沈黙
        '言葉より静かに、想いは深く届いている',  // 16文字：沈黙の肯定
        '黙っていたのは、傷つけたくなかったから',          
    ];
