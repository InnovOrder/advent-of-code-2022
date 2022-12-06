import os

def find_marker(data, distincts):
    marker = []
    count = 0
    while count < len(data):
        marker.append(data[count])
        count += 1
        if len(marker) > distincts:
            marker.pop(0)
        if len(set(marker)) == distincts:
            return count

with open(os.path.join(os.path.dirname(__file__), 'data.txt')) as f:
    data = list(f.read())

print(find_marker(data, 4))
print(find_marker(data, 14))
