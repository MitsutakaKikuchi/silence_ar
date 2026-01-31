import os
import sys
# 必要なライブラリのインストール確認とインストール
try:
    from transformers import pipeline
    from PIL import Image, ImageDraw, ImageFilter
    import numpy as np
except ImportError:
    print("ライブラリをインストールします...")
    os.system(f"{sys.executable} -m pip install transformers torch pillow numpy")
    from transformers import pipeline
    from PIL import Image, ImageDraw, ImageFilter
    import numpy as np

def apply_edge_fade(depth_img, fade_width=80):
    """深度マップの縁を黒くフェードさせる（歪み防止）"""
    width, height = depth_img.size
    
    # グラデーションマスクを作成（中心が白、縁が黒）
    mask = Image.new('L', (width, height), 0)
    draw = ImageDraw.Draw(mask)
    
    # 内側の矩形（完全に白い領域）
    inner_box = [
        fade_width, fade_width,
        width - fade_width, height - fade_width
    ]
    draw.rectangle(inner_box, fill=255)
    
    # ブラーでなめらかなグラデーションを作る
    mask = mask.filter(ImageFilter.GaussianBlur(radius=fade_width // 2))
    
    # 深度マップにマスクを適用
    depth_array = np.array(depth_img.convert('L'))
    mask_array = np.array(mask) / 255.0
    result_array = (depth_array * mask_array).astype(np.uint8)
    
    return Image.fromarray(result_array)

def main():
    # モデルのロード（初回はダウンロードに数分かかります）
    print("Depth Anythingモデルをロード中...")
    pipe = pipeline(task="depth-estimation", model="LiheYoung/depth-anything-small-hf")

    input_dir = "images"
    output_dir = "depth_maps"
    os.makedirs(output_dir, exist_ok=True)

    # imagesフォルダ内の画像を処理
    files = [f for f in os.listdir(input_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    
    if not files:
        print(f"エラー: {input_dir} フォルダに画像が見つかりません。")
        return

    for filename in files:
        print(f"処理中: {filename} ...")
        img_path = os.path.join(input_dir, filename)
        image = Image.open(img_path)
        
        # 推論実行
        depth = pipe(image)["depth"]
        
        # 縁を黒くする処理（歪み防止）
        print("  → 縁をフェード処理中...")
        depth = apply_edge_fade(depth, fade_width=150)
        
        # 保存 (ファイル名_depth.png)
        name, _ = os.path.splitext(filename)
        save_path = os.path.join(output_dir, f"{name}_depth.png")
        depth.save(save_path)
        print(f"  ✓ 完了: {save_path}")

    print("\nすべての処理が完了しました。")

if __name__ == "__main__":
    main()
