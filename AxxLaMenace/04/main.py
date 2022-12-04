import os

def solve_first_puzzle(data):
    return sum((a<=c and b>=d) or (a>=c and b<=d) for a,b,c,d in data)

def solve_second_puzzle(data):
    return sum((a<=c and b>=c) or (a>=c and a<=d) for a,b,c,d in data)

with open(os.path.join(os.path.dirname(__file__), 'data.txt')) as f:
    data = [[int(section) for section in pair.replace('-',',').split(',')] for pair in f.read().splitlines()]

print("result first puzzle:", solve_first_puzzle(data))
print("result second puzzle:", solve_second_puzzle(data))
