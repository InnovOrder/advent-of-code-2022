import { readInputs } from "../helpers/read-inputs";

const TEST_INPUT_PATH = `${__dirname}/input.test.txt`;
const INPUT_PATH = `${__dirname}/input.txt`;

const resolveFirstPuzzle = async (inputPath: string) => {
  const lines = await readInputs(inputPath);
  lines.pop();
  let sum = 0;
  lines.forEach((line) => {
    const [pair1, pair2] = line.split(",");
    const [a, b] = pair1.split("-").map((value) => Number.parseInt(value, 10));
    const [x, y] = pair2.split("-").map((value) => Number.parseInt(value, 10));
    if ((a >= x && b <= y) || (x >= a && y <= b)) {
      sum += 1;
    }
  });
  return sum;
};

const resolveSecondPuzzle = async (inputPath: string) => {
  const lines = await readInputs(inputPath);
  lines.pop();
  let sum = 0;
  lines.forEach((line) => {
    const [pair1, pair2] = line.split(",");
    const [a, b] = pair1.split("-").map((value) => Number.parseInt(value, 10));
    const [x, y] = pair2.split("-").map((value) => Number.parseInt(value, 10));
    if (
      (a >= x && a <= y) ||
      (b <= y && b >= y) ||
      (x >= a && x <= b) ||
      (y <= b && y >= a)
    ) {
      sum += 1;
    }
  });
  return sum;
};

const main = async () => {
  const resultFirstPuzzleTest = await resolveFirstPuzzle(TEST_INPUT_PATH);
  console.log("The result of the first puzzle test is:", resultFirstPuzzleTest);
  const resultFirstPuzzle = await resolveFirstPuzzle(INPUT_PATH);
  console.log("The result of the first puzzle is: ", resultFirstPuzzle);

  const resultSecondPuzzleTest = await resolveSecondPuzzle(TEST_INPUT_PATH);
  console.log(
    "The result of the second puzzle test is:",
    resultSecondPuzzleTest
  );
  const resultSecondPuzzle = await resolveSecondPuzzle(INPUT_PATH);
  console.log("The result of the second puzzle is: ", resultSecondPuzzle);
};

main().catch((error) => {
  console.error(error);
});
