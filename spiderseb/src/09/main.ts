/* eslint-disable max-classes-per-file */
import { readInputs } from "../helpers/read-inputs";

const TEST_INPUT_PATH = `${__dirname}/input.test.txt`;
const INPUT_PATH = `${__dirname}/input.txt`;

class Head {
  x = 0;

  y = 0;

  move = (direction: string) => {
    if (direction === "U") this.x -= 1;
    if (direction === "D") this.x += 1;
    if (direction === "L") this.y -= 1;
    if (direction === "R") this.y += 1;
  };
}
class Body {
  x = 0;

  y = 0;

  // eslint-disable-next-line no-useless-constructor
  constructor(private previousPart: Head | Body) {}

  move = () => {
    if (
      Math.abs(this.x - this.previousPart.x) <= 1 &&
      Math.abs(this.y - this.previousPart.y) <= 1
    )
      return;

    if (this.previousPart.x > this.x) {
      this.x++;
    } else if (this.previousPart.x < this.x) {
      this.x--;
    }
    if (this.previousPart.y > this.y) {
      this.y++;
    } else if (this.previousPart.y < this.y) {
      this.y--;
    }
  };
}

const resolveFirstPuzzle = async (inputPath: string) => {
  const lines = await readInputs<string>(inputPath);
  const head = new Head();
  const tail = new Body(head);
  const moves = new Set();
  moves.add(`${tail.x}.${tail.y}`);

  lines.forEach((move) => {
    const [direction, steps] = move.split(" ");
    for (let i = 0; i < Number(steps); i++) {
      head.move(direction);
      tail.move();
      moves.add(`${tail.x}.${tail.y}`);
    }
  });

  return moves.size;
};

const resolveSecondPuzzle = async (inputPath: string) => {
  const lines = await readInputs<string>(inputPath);
  const head = new Head();
  const body: Body[] = [];
  for (let i = 0; i <= 8; i++)
    body.push(new Body(i === 0 ? head : body[i - 1]));

  const moves = new Set();
  moves.add(`${body[8].x}.${body[8].y}`); // tail = last part of body

  lines.forEach((move) => {
    const [direction, steps] = move.split(" ");
    for (let step = 0; step < Number(steps); step++) {
      head.move(direction);
      body.forEach((bodyPart) => bodyPart.move());

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
