import os
from collections import defaultdict

with open(os.path.join(os.path.dirname(__file__), 'data.txt')) as f:
    data = list(f.read().splitlines())

sizes_dict = defaultdict(int)
currentPath = '/'
depth = 0
for line in data[1:]:
    infos = line.split(' ')
    if infos[0] == "$":
        if infos[1] =='cd':
            if infos[2] =='..':
                depth -= 1
                oldPath = currentPath
                currentPath = '/'.join(currentPath.split('/')[:-1])
                sizes_dict[currentPath] += sizes_dict[oldPath]
            else:
                depth += 1
                currentPath += '/'+line.split(' ')[-1]
    elif infos[0] == 'dir':
        pass
    else:
        sizes_dict[currentPath] += int(infos[0])
while depth > 0:
    depth -= 1
    oldPath = currentPath
    currentPath = '/'.join(currentPath.split('/')[:-1])
    sizes_dict[currentPath] += sizes_dict[oldPath]

sizes = sorted(sizes_dict.values())
space_needed = 30_000_000 + sizes[-1] - 70_000_000

print(sum(s for s in sizes if s <= 100000))
print(next(s for s in sizes if s >= space_needed))
