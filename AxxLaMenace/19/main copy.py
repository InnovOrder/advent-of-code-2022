from os.path import join, dirname
import re
from dataclasses import dataclass

@dataclass
class Cost:
    ore: int = 0
    clay: int = 0
    obsidian: int = 0

class Factory:
    num: int
    ore_robot_cost: Cost
    clay_robot_cost: Cost
    obsidian_robot_cost: Cost
    geode_robot_cost: Cost
    ore_robots: int = 0
    clay_robots: int = 0
    obsidian_robots: int = 0
    geode_robots: int = 0
    ore: int = 0
    clay: int = 0
    obsidian: int = 0
    geode: int = 0

    def __init__(self, num: int, ore_robot_ore_price: int, clay_robot_ore_price: int, obsidian_robot_ore_price: int, obsidian_robot_clay_price: int, geode_robot_ore_price: int, geode_robot_obsidian_price: int):
        self.num = num
        self.ore_robot_cost = Cost(ore_robot_ore_price)
        self.clay_robot_cost = Cost(clay_robot_ore_price)
        self.obsidian_robot_cost = Cost(obsidian_robot_ore_price, obsidian_robot_clay_price)
        self.geode_robot_cost = Cost(geode_robot_ore_price, 0, geode_robot_obsidian_price)
        self.ore_robots = 1

    def harvest_resources(self):
        self.ore += self.ore_robots
        self.clay += self.clay_robots
        self.obsidian += self.obsidian_robots
        self.geode += self.geode_robots

with open(join(dirname(__file__), 'data.txt')) as f:
    data = [list(map(int, re.findall(r'\d+', line))) for line in f.read().splitlines()]

# for blueprint in data:
#     factory = Factory(*blueprint)
#     print('ROBOTS')
#     print(factory.obsidian_robot_cost.clay)
#     print(factory.clay_robots)
# print('PART_1', solve_part_1(data))
# print('PART_2', solve_part_2(data))

for i in range (2**24):
    print(2**24, i)