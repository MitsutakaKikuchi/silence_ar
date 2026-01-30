import os
import shutil
import glob

dest_dir = 'compiler_images'
os.makedirs(dest_dir, exist_ok=True)

search_root = r'C:\Users\admin\Desktop\提出作品企画案'
print(f'Searching in: {search_root}...')

found_files = {} # ep_num -> path

for root, dirs, files in os.walk(search_root):
    # Find LayerA folder
    if 'LayerA' not in root and 'layera' not in root.lower():
        continue
    
    for file in files:
        if file.lower().endswith('.jpg'):
             # We want EpisodeX.jpg
             if 'episode' in file.lower():
                 try:
                     name_part = os.path.splitext(file)[0]
                     num_part = name_part.lower().replace('episode', '')
                     ep_num = int(num_part)
                     if 1 <= ep_num <= 10:
                         if ep_num not in found_files:
                             found_files[ep_num] = os.path.join(root, file)
                 except ValueError:
                     pass

print(f'Found {len(found_files)} images for LayerA.')

for ep_num in range(1, 11):
    if ep_num in found_files:
        src = found_files[ep_num]
        # Rename to episode_1.jpg ...
        dst = os.path.join(dest_dir, f'episode_{ep_num}.jpg')
        shutil.copy2(src, dst)
        print(f'Copied Ep{ep_num}: {src} -> {dst}')
    else:
        print(f'Missing Ep{ep_num}')
