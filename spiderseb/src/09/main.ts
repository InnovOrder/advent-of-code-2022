/* eslint-disable no-param-reassign */
import { readInputs } from "../helpers/read-inputs";

const TEST_INPUT_PATH = `${__dirname}/input.test.txt`;
const INPUT_PATH = `${__dirname}/input.txt`;

type Position = {
  x: number;
  y: number;
};

const moveHead = (head: Position, direction: string) => {
  if (direction === "U") head.x -= 1;
  if (direction === "D") head.x += 1;
  if (direction === "L") head.y -= 1;
  if (direction === "R") head.y += 1;
};

const followHead = (head: Position, tail: Position) => {
  if (Math.abs(tail.x - head.x) <= 1 && Math.abs(tail.y - head.y) <= 1) return;

  if (head.x > tail.x) {
    tail.x++;
  } else if (head.x < tail.x) {
    tail.x--;
  }
  if (head.y > tail.y) {
    tail.y++;
  } else if (head.y < tail.y) {
    tail.y--;
  }
};

const resolveFirstPuzzle = async (inputPath: string) => {
  const lines = await readInputs<string>(inputPath);
  const head: Position = { x: 0, y: 0 };
  const tail: Position = { x: 0, y: 0 };
  const moves = new Set();
  moves.add(`${tail.x}.${tail.y}`);

  lines.forEach((move) => {
    const [direction, steps] = move.split(" ");
    for (let i = 0; i < Number(steps); i++) {
      moveHead(head, direction);
      followHead(head, tail);
      moves.add(`${tail.x}.${tail.y}`);
    }
  });

  return moves.size;
};

const resolveSecondPuzzle = async (inputPath: string) => {
  const lines = await readInputs<string>(inputPath);
  const head: Position = { x: 0, y: 0 };
  const body: Position[] = [];
  for (let i = 0; i <= 8; i++) body.push({ x: 0, y: 0 });
  const moves = new Set();
  moves.add(`${body[8].x}.${body[8].y}`); // tail = last part of body

  lines.forEach((move) => {
    const [direction, steps] = move.split(" ");
    for (let step = 0; step < Number(steps); step++) {
      moveHead(head, direction);
      for (let i = 0; i <= 8; i++)
        followHead(i === 0 ? head : body[i - 1], body[i]);

      moves.add(`${body[8].x}.${body[8].y}`);
    }
  });

  return moves.size;
};

const main = async () => {
  const result1Test = await resolveFirstPuzzle(TEST_INPUT_PATH);
  console.log("##  TEST 1  ##", result1Test);
  const result1 = await resolveFirstPuzzle(INPUT_PATH);
  console.log("## RESULT 1 ##", result1);

  const result2Test = await resolveSecondPuzzle(TEST_INPUT_PATH);
  console.log("##  TEST 2  ##", result2Test);
  const result2 = await resolveSecondPuzzle(INPUT_PATH);
  console.log("## RESULT 2 ##", result2);
};

main().catch((error) => console.error(error));
