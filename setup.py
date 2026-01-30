import shutil
import os
import glob

# Try to find the source directory using glob to handle potential encoding/naming issues
base_search = r"c:\Users\admin\Desktop\提出作品企画案\沈黙の解剖図譜*"
candidates = glob.glob(base_search)
# Filter for the one usually intended if multiple
# But usually distinct enough.
source_base = candidates[-1] if candidates else r"c:\Users\admin\Desktop\提出作品企画案\沈黙の解剖図譜 —— 不可視の愛に関する空間的考察"

print(f"Using source base: {source_base}")

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
        print(f"Source image not found at {src_img}")

    if os.path.exists(src_mind):
        shutil.copy2(src_mind, dst_mind)
        print(f"Copied {src_mind} to {dst_mind}")
    else:
        print(f"Source mind file not found at {src_mind}")
except Exception as e:
    print(f"Error copying files: {e}")
