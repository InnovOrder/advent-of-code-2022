import { readInputs } from "../helpers/read-inputs";

const TEST_INPUT_PATH = `${__dirname}/input.test.txt`;
const INPUT_PATH = `${__dirname}/input.txt`;

const scoreTable: Record<string, number> = {
  "0 0": 1 + 3,
  "0 1": 2 + 6,
  "0 2": 3 + 0,
  "1 0": 1 + 0,
  "1 1": 2 + 3,
  "1 2": 3 + 6,
  "2 0": 1 + 6,
  "2 1": 2 + 0,
  "2 2": 3 + 3,
};

const resolveFirstPuzzle = async (inputPath: string) => {
  const lines = await readInputs(inputPath);
  lines.pop();
  let score = 0;
  lines.forEach((line) => {
    const [opponent, myChoice] = line.split(" ");
    const opponentNumber = opponent.toLowerCase().charCodeAt(0) - 97;
    const myChoiceNumber = myChoice.toLowerCase().charCodeAt(0) - 97 - 23;
    score += scoreTable[`${opponentNumber} ${myChoiceNumber}`];
  });

  return score;
};

const resolveSecondPuzzle = async (inputPath: string) => {
  const lines = await readInputs(inputPath);
  lines.pop();
  let score = 0;
  lines.forEach((line) => {
    const [opponent, winLoseDraw] = line.split(" ");
    const opponentNumber = opponent.toLowerCase().charCodeAt(0) - 97;
    let myChoice = 0;
    switch (winLoseDraw) {
      // lose
      case "X":
        myChoice = (opponentNumber - 1 + 3) % 3;
        break;
      // draw
      case "Y":
        myChoice = opponentNumber;
        break;
      // win
      case "Z":
        myChoice = (opponentNumber + 1) % 3;
        break;
      default:
        break;
    }

    score += scoreTable[`${opponentNumber} ${myChoice}`];
  });
  return score;
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
