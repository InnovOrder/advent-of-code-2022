/* eslint-disable no-param-reassign */
/* eslint-disable no-loop-func */
import run from "aocrunner";
import { readFileSync } from "fs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { flow, min } from "lodash";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const parseInput = (rawInput: string) => rawInput.split(/\r?\n/);
const testFile = join(
  dirname(fileURLToPath(import.meta.url)),
  "./input.test.txt"
).replace(/\/dist\//g, "/src/");
const inputTest = readFileSync(testFile, "utf-8");

type Valve = {
  id: string;
  rate: number;
  open: boolean;
  tunnels: string[];
};

const getValves = (lines: string[]) => {
  const valves: Record<string, Valve> = {};
  lines.forEach((line) => {
    const valveIds = line.match(/[A-Z][A-Z]/g) ?? [];
    const id = valveIds[0];
    const tunnels = valveIds.slice(1);
    // @ts-expect-error Should not be null
    const flowStr = line.match(/rate=[0-9]./)[0].split("=")[1];
    const rate = parseInt(flowStr, 10);
    valves[id] = {
      id,
      rate,
      open: false,
      tunnels,
    };
  });
  return valves;
};

type State = {
  position: string;
  minutes: number;
  flow: number;
  total: number;
  opened: Set<string>;
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  const valves = getValves(lines);
  console.log(valves);

  const states: Record<string, Record<number, Record<string, State>>> = {};
  let concurentPositions: Set<string> = new Set<string>().add("AA");
  const totalMinutes = 30;
  Object.keys(valves).forEach((key) => {
    states[key] = {};
    for (let i = 0; i <= totalMinutes; i++) {
      states[key][i] = {};
    }
  });
  states.AA[0][""] = {
    position: "AA",
    minutes: 0,
    flow: 0,
    total: 0,
    opened: new Set(),
  };
  let minutes = 0;

  while (minutes < totalMinutes) {
    minutes += 1;
    const nextPositions: string[] = [];
    for (const position of concurentPositions) {
      const valve = valves[position];
      const statesPerOpened = states[position][minutes - 1];
      Object.values(statesPerOpened).forEach((state) => {
        const openedStr = Array.from(state.opened).sort().join("");
        if (state.opened.size === 6) {
          nextPositions.push(position);
          states[position][minutes][openedStr] = {
            position,
            minutes,
            total: state.total + state.flow,
            opened: state.opened,
            flow: state.flow,
          };
        }

        if (!state.opened.has(position) && valve.rate > 0) {
          const existingState = states[position][minutes][openedStr];
          if (!existingState || existingState.flow <= state.flow) {
            const max =
              _.max([existingState?.total ?? 0, state.total + state.flow]) ??
              state.total + state.flow;
            const opened = new Set(state.opened).add(position);
            const newOpenedStr = Array.from(opened).sort().join("");
            states[position][minutes][newOpenedStr] = {
              position,
              minutes,
              total:
                existingState?.flow === state.flow
                  ? max
                  : state.total + state.flow,
              opened: new Set(state.opened).add(position),
              flow: state.flow + valve.rate,
            };
            nextPositions.push(position);
          }
        }
        for (const tunnel of valve.tunnels) {
          const existingState = states[tunnel][minutes][openedStr];
          const max =
            _.max([existingState?.total ?? 0, state.total + state.flow]) ??
            state.total + state.flow;
          if (!existingState || existingState.flow <= state.flow) {
            nextPositions.push(tunnel);
            states[tunnel][minutes][openedStr] = {
              position: tunnel,
              minutes,
              total:
                existingState?.flow === state.flow
                  ? max
                  : state.total + state.flow,
              opened: state.opened,
              flow: state.flow,
            };
          }
        }
      });
    }
    concurentPositions = new Set(nextPositions);
  }

  let max = 0;
  const lastStates = Object.values(states).map((value) => value[totalMinutes]);
  lastStates.forEach((value) =>
    Object.values(value).forEach((state) => {
      if (state.total > max) {
        max = state.total;
      }
    })
  );
  console.log(
    "bestStates",
    lastStates
      .map((value) => Object.values(value))
      .flat()
      .filter(
        (state) =>
          state.total > 1000 && ["CC", "BB", "DD"].includes(state.position)
      )
  );
  return max;
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
        expected: 1651,
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
