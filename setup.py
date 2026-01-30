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

# Episode 2 をターゲットにする
src_img = os.path.join(source_base, r"images\LayerB\Episode2.jpg")
dst_img = r"images\layerB.jpg"
src_mind = os.path.join(source_base, r"images\LayerA\mind\Episode2.mind")
dst_mind = r"targets.mind"

os.makedirs("images", exist_ok=True)

try:
    if os.path.exists(src_img):
        shutil.copy2(src_img, dst_img)
        print(f"Copied {src_img} to {dst_img}")
    else:
        print(f"ERROR: Source image not found at {src_img}")

    if os.path.exists(src_mind):
        shutil.copy2(src_mind, dst_mind)
        print(f"Copied {src_mind} to {dst_mind}")
        print("Note: Source mind files seem to be identical size. Try adjusting targetIndex in index.html if wrong image responds.")
    else:
        print(f"ERROR: Source mind file not found at {src_mind}")
except Exception as e:
    print(f"Error copying files: {e}")
