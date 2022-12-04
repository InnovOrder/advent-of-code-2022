import os

def common(ruck, n):
    return set(ruck[:n//2]).intersection(ruck[n//2:]).pop()

def transform(char):
    return ord(char) - ord('A') + 27 if char.isupper() else ord(char) - ord('a') + 1

def solve_first_puzzle(data):
    items = [common(ruck, len(ruck)) for ruck in data]
    return sum(transform(item) for item in items)
    
def common_three(a, b, c):
    return set(a).intersection(b).intersection(c).pop()

def solve_second_puzzle(data):
    items = [common_three(data[i], data[i+1], data[i+2]) for i in range(0, len(data), 3)]
    return sum(transform(item) for item in items)

with open(os.path.join(os.path.dirname(__file__), 'data.txt')) as f:
    data = f.read().splitlines()

print("result first puzzle:", solve_first_puzzle(data))
print("result second puzzle:", solve_second_puzzle(data))
