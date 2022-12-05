import os
from collections import defaultdict

with open(os.path.join(os.path.dirname(__file__), 'data.txt')) as f:
    stacks_str, moves_str = [elem.splitlines() for elem in f.read().split('\n\n')]

stacks = defaultdict(list)
for row in stacks_str[::-1][1:]:
    for i in range(0, len(row)//4+1):
        if row[i*4+1] != ' ':
            stacks[i+1].append(row[i*4+1])

moves = [map(int, [m[1], m[3], m[5]]) for m in [move.split(' ') for move in moves_str]]
stacks2 = stacks.copy()

for a, b, c in moves:
    # PART 1
    stacks[c] += stacks[b][-a:][::-1]
    stacks[b] = stacks[b][:-a]

    # PART 2
    stacks2[c] += stacks2[b][-a:]
    stacks2[b] = stacks2[b][:-a]

print(''.join([stacks[i][-1] for i in stacks]))
print(''.join([stacks2[i][-1] for i in stacks2]))
