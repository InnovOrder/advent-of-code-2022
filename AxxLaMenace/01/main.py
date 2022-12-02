import os

def solve_first_puzzle(data):
    return data[0]


def solve_second_puzzle(data):
    return sum(data[:3])

if __name__ == '__main__':
    with open(os.path.join(os.path.dirname(__file__), 'data.txt')) as f:
        data = sorted([sum([int(elem) for elem in elem_list.split('\n')]) for elem_list in f.read().split('\n\n')], reverse=True)
    print("result first puzzle:", solve_first_puzzle(data))
    print("result second puzzle:", solve_second_puzzle(data))
