# コンパイル手順

10枚の画像を1つの targets.mind ファイルにまとめる必要があります。
AIエージェントの権限ではこの処理（画像処理バイナリの実行）を完遂できないため、以下の手順をお試しください。

## 手順

1. 以下のURLを開く
   https://mitsutakakikuchi.github.io/silence_ar/COMPILER.html

2. 「ファイルを選択」をクリック

3. 以下のフォルダにある10枚の画像(episode_1.jpg 〜 episode_10.jpg)を**すべて選択**する
   フォルダ: Desktop\silence_ar\compiler_images\
   
    名前順(episode_1, episode_2... episode_10)に並ぶように選択してください。
   （Windowsのファイル選択画面で「名前」列をクリックしてソートしてから全選択すると確実です）

4. 「Start Compilation」をクリックして待つ

5. 「Download targets.mind」が表示されたらクリックしてダウンロード

6. ダウンロードした 	argets.mind を、Desktop\silence_ar\ フォルダに上書き保存する

7. 以下のコマンドを実行して反映する
   `ash
   cd Desktop/silence_ar
   git add targets.mind
   git commit -m 'Update targets.mind with 10 episodes'
   git push
   `

完了です。
