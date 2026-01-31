import shutil
import os
import glob
import sys

# ソースディレクトリの特定
source_base = r'C:\Users\admin\Desktop\提出作品企画案\沈黙の解剖図譜  不可視の愛に関する空間的考察'
if not os.path.exists(source_base):
    candidates = glob.glob(r'C:\Users\admin\Desktop\提出作品企画案\沈黙の解剖図譜*')
    source_base = candidates[0] if candidates else ''

print(f'Source: {source_base}')
os.makedirs('images', exist_ok=True)

try:
    # 全エピソードのコピー処理
    for i in range(1, 11):
        ep_num = str(i)
        src_img_layerb = os.path.join(source_base, f'images\\LayerB\\Episode{ep_num}.jpg')
        # インデックスは 0 から 9 (File 1 -> target 0)
        dst_img_layerb = f'images\\layerB_{i-1}.jpg'
        
        if os.path.exists(src_img_layerb):
            shutil.copy2(src_img_layerb, dst_img_layerb)
            print(f' Copied LayerB (Ep{ep_num}): {dst_img_layerb}')
        else:
            print(f'ERROR: Not found LayerB Ep{ep_num}')

    print('\nNext: Verify targets.mind and run index.html')

except Exception as e:
    print(f'Error copying files: {e}')
