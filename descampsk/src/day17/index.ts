/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import run from "aocrunner";
import { readFileSync } from "fs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { has, size } from "lodash";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { findMotif } from "./motif.js";
import { createRock, Rock, rockOrder } from "./Rock.js";

const parseInput = (rawInput: string) => rawInput.split(/\r?\n/);
const testFile = join(
  dirname(fileURLToPath(import.meta.url)),
  "./input.test.txt"
).replace(/\/dist\//g, "/src/");
const inputTest = readFileSync(testFile, "utf-8");

const checkIfRockIsBlocked = (
  rock: Rock,
  blocked: Map<number, Set<number>>
) => {
  for (const { x, y } of rock.blocks) {
    if (y === 1 || blocked.get(y - 1)?.has(x)) rock.isBlocked = true;
  }
  if (rock.isBlocked) {
    for (const { x, y } of rock.blocks) {
      const blockedY = blocked.get(y);
      if (blockedY) blockedY.add(x);
      else blocked.set(y, new Set([x]));
      if (blockedY?.size === 7) {
        // for (let i = y - blocked.size; i < y; i++) {
        //   blocked.delete(i);
        // }
      }
    }
  }
  return rock.isBlocked;
};

const display = (blocked: Map<number, Set<number>>, rock?: Rock) => {
  const shouldDisplay = true;
  if (!shouldDisplay) return;
  const widght = 7;
  const height = _.max(Array.from(blocked.keys()))! + 10;
  for (let y = height; y >= 1; y--) {
    const line = [];
    for (let x = 0; x < widght; x++) {
      if (blocked.get(y)?.has(x)) line.push("#");
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
  console.log("-------");
};

const computeTetris = (gas: string, maxRocks: number, motifSize: number) => {
  const widght = 7;
  let gasIndex = 0;
  const blocked: Map<number, Set<number>> = new Map();
  let y = 4;
  let currentRock: Rock = createRock("line", y);
  let nextRockIndex = 1;
  let totalRocks = 1;
  let oldRockModif = 0;
  let newRockModif = 0;
  while (totalRocks < maxRocks || !currentRock?.isBlocked) {
    if (currentRock.isBlocked) {
      const newRockType = rockOrder[nextRockIndex];
      nextRockIndex = (nextRockIndex + 1) % rockOrder.length;
      const maxBlockY = _.max(currentRock.blocks.map((block) => block.y))!;
      if (maxBlockY > y - 4) y = maxBlockY + 4;
      currentRock = createRock(newRockType, y);
      totalRocks += 1;
      newRockModif += 1;
      if (maxBlockY % motifSize === 0) {
        if (oldRockModif === newRockModif) {
          newRockModif = 0;
        } else {
          oldRockModif = newRockModif;
          newRockModif = 0;
        }
      }
    } else {
      const currentGas = gas[gasIndex];
      gasIndex = (gasIndex + 1) % gas.length;
      if (currentGas === ">" && !currentRock.isBlockedRight(widght, blocked))
        currentRock.moveRight();
      if (currentGas === "<" && !currentRock.isBlockedLeft(blocked))
        currentRock.moveLeft();
      const isBlocked = checkIfRockIsBlocked(currentRock, blocked);
      if (!isBlocked) currentRock.moveDown();
    }
    // console.log("rocks", JSON.stringify(rocks));
    // console.log("blocked", blocked);
  }
  // display(blocked);

  //   const motif = findMotif(blocked, motifSize);
  //   console.log(motif.motif);

  return { y: _.max(Array.from(blocked.keys()))!, newRockModif, oldRockModif };
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  //   return 0;
  const firstTotal = 1000;
  const totalToFind = 2022;
  const motifSize = 53;
  const { y, oldRockModif } = computeTetris(lines[0], firstTotal, motifSize);
  const differenceToCompute = totalToFind - firstTotal;
  const multiplier = Math.floor(differenceToCompute / 35);
  const reste = totalToFind - (firstTotal + multiplier * 35);
  const { y: newY } = computeTetris(lines[0], firstTotal + reste, motifSize);
  console.log(y, oldRockModif, differenceToCompute, multiplier, reste, newY);

  //   console.log(y + motifSize * multiplier);

  return motifSize * multiplier + newY;
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  const totalToFind = 1000000000000;
  //   const motifSize = 2778;
  const motifSize = 53;
  const firstTotal = 30000;
  const { y, oldRockModif, newRockModif } = computeTetris(
    lines[0],
    firstTotal,
    motifSize
  );
  console.log(y, oldRockModif, newRockModif);
  const differenceToCompute = totalToFind - firstTotal;
  const multiplier = Math.floor(differenceToCompute / 35);
  const reste = totalToFind - (firstTotal + multiplier * 35);
  const { y: newY } = computeTetris(lines[0], firstTotal + reste, motifSize);
  console.log(y, oldRockModif, differenceToCompute, multiplier, reste, newY);

  //   console.log(y + motifSize * multiplier);

  return motifSize * multiplier + newY;
};

// 10000 => 15148
// 10035 => 15148 + 53 = 15201
// 360000 => 15148 + 53 * 10000 = 545138
// 1000000000000 - 10000 / 35 = 28571428285
// 25 restants => 15148 + 53 * 28571428285 => 1 514 285 714 253

// 333535345301234013012322234523451234345012340101111212012323431234514141234140124140123412412423456456345440123423430123401312341313123123012323456356345645454445452345123245012345141412341212322345332323012323431234445645645456012560126012601236346346345623430123123123123323433456234234242423413123413134561231232323012323433456232322222201201231212252456245241234012112342323220123234312342323331234241234242345232334341234342343012323423423432343234561261262626262345623431234333456345634562343234523123121212120124141234123451212012342341232234522012241234245601234560145014512345012512345444545345323432345124124234301234013012340202024012401234012312512456252501235234535345645454423432341231234561231231234534523433456444401401412340121123423232222220123234323452323333434234323432345121252523452524561234544412345123456123523453345345343454242401240123423423423421232012323232223231232123234562323252523452323432345232322012101211234454545612456123456234323454545444444234323432345232336363456343450140134560250123502345023450230230250123501234501345614141234121232345645453534561235345623423423235123456123451212121201201250124561234545452525234523234323454545552345252456252345232331301234134012340123451414123451456123452352353455456252345623232323450123452343034560404012340121012323233334341234560125612345232322222201232343234534034040401234012

// 1212626245625245612345444412412423432343234523423423454565123451414123461234601245612345123123131351234561234544441241242344345040123402020123234563562345
// 1212626245625245612345444412412423432343234523423423454565123451414123461234601245612345123123131351234561234544441241242344345040123402020123234563562345
// 1212626245625245612345444412412423432343234523423423454565123451414123461234601245612345123123131351234561234544441241242344345040123402020123234563562345
//                       4444124124234323432345234234234545651234514141234612346012456123451231231313512345612345444412412423443450401234020201232345635623451212626245625245612345
run({
  part1: {
    tests: [
      {
        input: inputTest,
        expected: 3068,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: inputTest,
        expected: 1514285714288,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
