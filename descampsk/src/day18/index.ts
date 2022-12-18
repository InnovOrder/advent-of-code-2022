import run from "aocrunner";
import { readFileSync } from "fs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from "lodash";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const parseInput = (rawInput: string) => rawInput.split(/\r?\n/);
const testFile = join(
  dirname(fileURLToPath(import.meta.url)),
  "./input.test.txt"
).replace(/\/dist\//g, "/src/");
const inputTest = readFileSync(testFile, "utf-8");

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  const cubes: number[][] = [];
  let max = 0;
  lines.forEach((line) => {
    const cube = line.split(",").map((value) => parseInt(value, 10));
    cubes.push(cube);
    const maxCube = _.max(cube)!;
    if (maxCube > max) max = maxCube;
  });
  // To avoid borders issues
  max += 2;
  const map: number[][][] = new Array(max)
    .fill(0)
    .map(() => new Array(max).fill(0).map(() => new Array(max).fill(0)));

  cubes.forEach((cube) => {
    map[cube[0]][cube[1]][cube[2]] = 1;
  });

  console.log(map.length);

  let total = 0;
  cubes.forEach(([x, y, z]) => {
    console.log(x, y, z);
    if (!map[x][y][z + 1]) total += 1;
    if (z === 0 || !map[x][y][z - 1]) total += 1;
    if (!map[x][y + 1][z]) total += 1;
    if (y === 0 || !map[x][y - 1][z]) total += 1;
    if (!map[x + 1][y][z]) total += 1;
    if (x === 0 || !map[x - 1][y][z]) total += 1;
  });

  return total;
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  return 0;
};

run({
  part1: {
    tests: [
      {
        input: inputTest,
        expected: 64,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: inputTest,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
