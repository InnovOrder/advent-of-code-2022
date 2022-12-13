import os
import math
from functools import cmp_to_key

def compare_int(left, right):
    return -1 if left < right else 1 if left > right else 0

def compare(left, right):
    if type(left) == type(right) == int:
        return compare_int(left, right)
    elif type(left) == list and type(right) == int:
        return compare(left, [right])
    elif type(left) == int and type(right) == list:
        return compare([left], right)
    elif type(left) == type(right) == list:
        for i in range(min(len(left), len(right))):
            a = compare(left[i], right[i])
            if a!=0: return a
        return compare_int(len(left), len(right))
    return 0

with open(os.path.join(os.path.dirname(__file__), 'data.txt')) as f:
    pairs = [[eval(line) for line in block.splitlines()]
             for block in f.read().split('\n\n')]

total = sum(i+1 for i, p in enumerate(pairs) if compare(*p) <= 0)
print('PART_1', total)

additional_packets = [[[2]], [[6]]]
packets = [elem for pair in pairs for elem in pair] + additional_packets
packets.sort(key=cmp_to_key(compare))
print('PART_2', math.prod([i+1 for i, p in enumerate(packets) if p in additional_packets]))

