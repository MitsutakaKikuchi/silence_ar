import os
import shutil
import glob

# コピー先
dest_dir = r'images'
os.makedirs(dest_dir, exist_ok=True)

# デスクトップ全体から LayerB 内の Episode*.jpg を検索
# 範囲をデスクトップの特定の親フォルダ以下に限定して高速化
search_root = r'C:\Users\admin\Desktop\提出作品企画案'
print(f'Searching in: {search_root}...')

# 再帰検索
# パターン: root/**/LayerB/Episode*.jpg
count = 0
found_files = {} # ep_num -> path

for root, dirs, files in os.walk(search_root):
    # パスに LayerB が含まれていない場合はスキップ（高速化）
    # 大文字小文字を区別しない検索が必要かも
    if 'LayerB' not in root and 'layerb' not in root.lower():
        continue
    
    for file in files:
        if file.lower().startswith('episode') and file.lower().endswith('.jpg'):
            # 数字部分を抽出
            try:
                # Episode1.jpg -> 1
                name_part = os.path.splitext(file)[0] # Episode1
                num_part = name_part.replace('Episode', '').replace('episode', '')
                ep_num = int(num_part)
                
                if 1 <= ep_num <= 10:
                    found_files[ep_num] = os.path.join(root, file)
            except ValueError:
                pass

print(f'Found {len(found_files)} episodes.')

for ep_num in range(1, 11):
    if ep_num in found_files:
        src = found_files[ep_num]
        dst = os.path.join(dest_dir, f'layerB_{ep_num-1}.jpg')
        shutil.copy2(src, dst)
        print(f'Copied Ep{ep_num}: {src} -> {dst}')
        count += 1
    else:
        print(f'Warning: Episode {ep_num} not found.')

print(f'Total copied: {count}')
