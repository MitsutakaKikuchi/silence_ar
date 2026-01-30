import shutil
import os
import glob

# 正確なソースディレクトリの取得
source_base = r"C:\Users\admin\Desktop\提出作品企画案\沈黙の解剖図譜 —— 不可視の愛に関する空間的考察"
if not os.path.exists(source_base):
    # フォルダー名に特殊文字が含まれるため、ワイルドカードで再試行
    candidates = glob.glob(r"C:\Users\admin\Desktop\提出作品企画案\沈黙の解剖図譜*")
    source_base = candidates[0] if candidates else ""

print(f"Source: {source_base}")

# Episode 2 をターゲットにする（LayerBの画像とLayerAのmindファイル）
src_img_layerb = os.path.join(source_base, r"images\LayerB\Episode2.jpg")
dst_img_layerb = r"images\layerB.jpg"
src_mind = os.path.join(source_base, r"images\LayerA\mind\Episode2.mind")
dst_mind = r"targets.mind"

os.makedirs("images", exist_ok=True)

try:
    if os.path.exists(src_img_layerb):
        shutil.copy2(src_img_layerb, dst_img_layerb)
        print(f"✓ Copied LayerB: {dst_img_layerb}")
    else:
        print(f"ERROR: Source image not found at {src_img_layerb}")

    if os.path.exists(src_mind):
        shutil.copy2(src_mind, dst_mind)
        print(f"✓ Copied Mind: {dst_mind}")
    else:
        print(f"ERROR: Source mind file not found at {src_mind}")
        
    print("\n次のステップ: python generate_depth.py")
except Exception as e:
    print(f"Error copying files: {e}")
