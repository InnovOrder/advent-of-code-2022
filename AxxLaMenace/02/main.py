import os

RPC1 = 'ABC'
RPC2 = 'XYZ'

def solve_first_puzzle(data):
    score = 0
    for move1, move2 in data:
        a = RPC1.index(move1)
        b = RPC2.index(move2)
        win_lose = 6 if b==(a+1)%3 else 3 if a==b else 0
        score += win_lose + b+1
    return score

def solve_second_puzzle(data):
    score = 0
    for move1, move2 in data:
        a = RPC1.index(move1)
        b = RPC2.index(move2)
        b = (a+b-1)%3
        win_lose = 6 if b==(a+1)%3 else 3 if a==b else 0
        score += win_lose + b+1
    return score

with open(os.path.join(os.path.dirname(__file__), 'data.txt')) as f:
    data = [line.split(' ') for line in f.read().splitlines()]
print("result first puzzle:", solve_first_puzzle(data))
print("result second puzzle:", solve_second_puzzle(data))
