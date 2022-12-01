import { readInputs } from "../helpers/read-inputs";

const TEST_INPUT_PATH = `${__dirname}/input.test.txt`;
const INPUT_PATH = `${__dirname}/input.txt`;

const resolveFirstPuzzle = async (inputPath: string) => {
  const lines = await readInputs(inputPath);
  let max = 0;
  let currentSum = 0;
  lines.forEach((line, index) => {
    const calory = Number.parseInt(line, 10);
    if (Number.isNaN(calory)) {
      console.log(max, currentSum, index);
      if (currentSum > max) {
        max = currentSum;
        currentSum = 0;
      } else {
        currentSum = 0;
      }
    } else {
      currentSum += calory;
    }
  });
  return max;
};

const resolveSecondPuzzle = async (inputPath: string) => {
  const lines = await readInputs(inputPath);
  let top1 = 0;
  let top2 = 0;
  let top3 = 0;
  let currentSum = 0;
  lines.forEach((line, index) => {
    const calory = Number.parseInt(line, 10);
    if (Number.isNaN(calory)) {
      if (currentSum > top1) {
        top3 = top2;
        top2 = top1;
        top1 = currentSum;
        currentSum = 0;
      } else if (currentSum > top2) {
        top3 = top2;
        top2 = currentSum;
        currentSum = 0;
      } else if (currentSum > top3) {
        top3 = currentSum;
        currentSum = 0;
      } else {
        currentSum = 0;
      }
      console.log(top1, top2, top3, currentSum, index);
    } else {
      currentSum += calory;
    }
  });
  return top1 + top2 + top3;
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
