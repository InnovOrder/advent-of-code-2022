import os
from collections import defaultdict

def create_operation(line):
    return lambda old: eval(line)

def create_test(a, b, c):
    return lambda x: c if x%a else b

def solve(data, rounds, puzzle=1):
    items, operations, tests, pgcd = {}, {}, {}, 1
    for index, block in enumerate(data):
        items[index] = list(map(int, block[1].split(': ')[-1].split(', ')))
        operations[index] = create_operation(block[2].split('= ')[-1])
        L = list(map(lambda b: int(b.split(' ')[-1]), block[3:]))
        tests[index] = create_test(*L)
        pgcd *= L[0]

    count = defaultdict(int)
    for _ in range(rounds):
        for monkey in range(len(data)):
            count[monkey] += len(items[monkey])
            while items[monkey]:
                item = items[monkey].pop(0)
                item = operations[monkey](item)%pgcd
                if puzzle==1: item //= 3
                new_monkey = tests[monkey](item)
                items[new_monkey].append(item)
    business = sorted(count.values())
    return business[-1] * business[-2]

with open(os.path.join(os.path.dirname(__file__), 'data.txt')) as f:
    data = [block.splitlines() for block in f.read().split('\n\n')]
print(solve(data, 20, 1))
print(solve(data, 10000, 2))
