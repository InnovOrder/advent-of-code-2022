/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import run from "aocrunner";
import { readFileSync } from "fs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _ from "lodash";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createRock, Rock, rockOrder } from "./Rock.js";

const parseInput = (rawInput: string) => rawInput.split(/\r?\n/);
const testFile = join(
  dirname(fileURLToPath(import.meta.url)),
  "./input.test.txt"
).replace(/\/dist\//g, "/src/");
const inputTest = readFileSync(testFile, "utf-8");

const checkIfRockIsBlocked = (
  rock: Rock,
  blocked: Record<number, Set<number>>
) => {
  for (const { x, y } of rock.blocks) {
    if (blocked[y - 1] && blocked[y - 1].has(x)) rock.isBlocked = true;
  }
  if (rock.isBlocked) {
    for (const { x, y } of rock.blocks) {
      if (blocked[y]) blocked[y].add(x);
      else blocked[y] = new Set([x]);
      if (blocked[y].size === 7) {
        for (let i = 0; i < y; i++) {
          // @ts-expect-error okte
          blocked[i] = undefined;
        }
      }
    }
  }
  return rock.isBlocked;
};

const display = (blocked: Record<number, Set<number>>, rock?: Rock) => {
  const shouldDisplay = false;
  if (!shouldDisplay) return;
  const widght = 7;
  const height =
    _.max(Object.keys(blocked).map((key) => parseInt(key, 10)))! + 10;
  for (let y = height; y >= 0; y--) {
    const line = [];
    for (let x = 0; x < widght; x++) {
      if (blocked[y] && blocked[y].has(x)) line.push("#");
      else {
        let displayed = false;
        if (rock) {
          const { blocks } = rock;
          for (const block of blocks) {
            if (block.x === x && block.y === y) {
              line.push("#");
              displayed = true;
              break;
            }
          }
        }

        if (!displayed) line.push(".");
      }
    }
    console.log(line.join(""));
  }
  console.log("--------------------");
};

const computeTetris = (gas: string, maxRocks: number) => {
  const widght = 7;
  let nextRockIndex = 0;
  let gasIndex = 0;
  const blocked: Record<number, Set<number>> = {};
  blocked[0] = new Set();
  for (let x = 0; x < widght; x++) {
    blocked[0].add(x);
  }
  let y = 4;
  let currentRock: Rock | undefined;
  let totalRocks = 0;
  let timer = false;
  while (totalRocks < maxRocks || !currentRock?.isBlocked) {
    if (totalRocks % 1000000 === 0) {
      if (timer) {
        console.timeEnd("estim");
        console.time("estim");
      } else {
        console.time("estim");
        timer = true;
      }
      console.log(
        `${totalRocks}/${maxRocks} => ${(totalRocks * 100) / maxRocks}`
      );
      console.log(Object.keys(blocked).length);
    }
    if (!currentRock || currentRock.isBlocked) {
      const newRockType = rockOrder[nextRockIndex];
      nextRockIndex = (nextRockIndex + 1) % rockOrder.length;
      if (currentRock) {
        const maxBlockY = _.max(currentRock.blocks.map((block) => block.y))!;
        if (maxBlockY > y - 4) y = maxBlockY + 4;
      } else {
        y = 4;
      }
      currentRock = createRock(newRockType, y);
      totalRocks += 1;
      display(blocked, currentRock);
    } else {
      const currentGas = gas[gasIndex];
      gasIndex = (gasIndex + 1) % gas.length;
      if (currentGas === ">" && !currentRock.isBlockedRight(widght, blocked))
        currentRock.moveRight();
      if (currentGas === "<" && !currentRock.isBlockedLeft(blocked))
        currentRock.moveLeft();
      const isBlocked = checkIfRockIsBlocked(currentRock, blocked);
      if (!isBlocked) currentRock.moveDown();
      display(blocked, currentRock);
    }
    // console.log("rocks", JSON.stringify(rocks));
    // console.log("blocked", blocked);
  }
  display(blocked);
  return _.max(Object.keys(blocked).map((key) => parseInt(key, 10)))!;
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  return computeTetris(lines[0], 2022);
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  return computeTetris(lines[0], 1000000000000);
};

run({
  part1: {
    tests: [
      {
        input: inputTest,
        expected: 3188,
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
  onlyTests: true,
});
