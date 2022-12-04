import { intersection, uniq } from "lodash";
import { readInputs } from "../helpers/read-inputs";

const TEST_INPUT_PATH = `${__dirname}/input.test.txt`;
const INPUT_PATH = `${__dirname}/input.txt`;

const resolveFirstPuzzle = async (inputPath: string) => {
  const lines = await readInputs(inputPath);
  lines.pop();
  let sum = 0;
  lines.forEach((line) => {
    const sack1 = line.substring(0, line.length / 2);
    const sack2 = line.substring(line.length / 2);
    const lettersInSack1: Record<string, boolean> = {};
    for (const letter of sack1) {
      lettersInSack1[letter] = true;
    }
    const appearsInBoth: Record<string, boolean> = {};
    for (const letter of sack2) {
      if (lettersInSack1[letter]) {
        appearsInBoth[letter] = true;
      }
    }
    Object.keys(appearsInBoth).forEach((letter) => {
      sum +=
        letter.toLowerCase() === letter
          ? letter.charCodeAt(0) - "a".charCodeAt(0)
          : letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
    });
  });
  return sum;
};

const resolveFirstPuzzleWithLodash = async (inputPath: string) => {
  const lines = await readInputs(inputPath);
  lines.pop();
  let sum = 0;
  lines.forEach((line) => {
    const appearsInBoth = intersection(
      [...line.substring(0, line.length / 2)],
      [...line.substring(line.length / 2)]
    );

    appearsInBoth.forEach((letter) => {
      sum +=
        letter.toLowerCase() === letter
          ? letter.charCodeAt(0) - "a".charCodeAt(0)
          : letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
    });
  });
  return sum;
};

const resolveSecondPuzzle = async (inputPath: string) => {
  const lines = await readInputs(inputPath);
  lines.pop();
  let sum = 0;
  for (let i = 0; i < lines.length; i += 3) {
    const lettersInAllSack: Record<string, number> = {};
    for (let j = 0; j < 3; j++) {
      uniq([...lines[i + j]]).forEach((letter) => {
        if (letter in lettersInAllSack) {
          lettersInAllSack[letter] += 1;
        } else {
          lettersInAllSack[letter] = 1;
        }
      });
    }
    // eslint-disable-next-line no-loop-func
    Object.keys(lettersInAllSack).forEach((letter) => {
      if (lettersInAllSack[letter] === 3) {
        sum +=
          letter.toLowerCase() === letter
            ? letter.charCodeAt(0) - "a".charCodeAt(0)
            : letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
      }
    });
  }
  return sum;
};

const resolveSecondPuzzleWithLodash = async (inputPath: string) => {
  const lines = await readInputs(inputPath);
  lines.pop();
  let sum = 0;
  for (let i = 0; i < lines.length; i += 3) {
    const lettersInAllSack = intersection(
      [...lines[i]],
      [...lines[i + 1]],
      [...lines[i + 2]]
    );
    // eslint-disable-next-line no-loop-func
    lettersInAllSack.forEach((letter) => {
      sum +=
        letter.toLowerCase() === letter
          ? letter.charCodeAt(0) - "a".charCodeAt(0)
          : letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
    });
  }
  return sum;
};

const main = async () => {
  const resultFirstPuzzleTest = await resolveFirstPuzzle(TEST_INPUT_PATH);
  console.log("The result of the first puzzle test is:", resultFirstPuzzleTest);
  const resultFirstPuzzle = await resolveFirstPuzzle(INPUT_PATH);
  console.log("The result of the first puzzle is: ", resultFirstPuzzle);

  const resultFirstPuzzleWithLodashTest = await resolveFirstPuzzleWithLodash(
    TEST_INPUT_PATH
  );
  console.log(
    "The result of the first puzzle test is:",
    resultFirstPuzzleWithLodashTest
  );
  const resultFirstPuzzleWithLodash = await resolveFirstPuzzleWithLodash(
    INPUT_PATH
  );
  console.log(
    "The result of the first puzzle is: ",
    resultFirstPuzzleWithLodash
  );

  const resultSecondPuzzleTest = await resolveSecondPuzzle(TEST_INPUT_PATH);
  console.log(
    "The result of the second puzzle test is:",
    resultSecondPuzzleTest
  );
  const resultSecondPuzzle = await resolveSecondPuzzle(INPUT_PATH);
  console.log("The result of the second puzzle is: ", resultSecondPuzzle);

  const resultSecondPuzzleWithLodashTest = await resolveSecondPuzzleWithLodash(
    TEST_INPUT_PATH
  );
  console.log(
    "The result of the second puzzle test is:",
    resultSecondPuzzleWithLodashTest
  );
  const resultSecondPuzzleWithLodash = await resolveSecondPuzzleWithLodash(
    INPUT_PATH
  );
  console.log(
    "The result of the second puzzle is: ",
    resultSecondPuzzleWithLodash
  );
};

main().catch((error) => {
  console.error(error);
});
