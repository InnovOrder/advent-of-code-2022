import { readFileSync } from "fs";

const parse = (lines: string[]): number[][] => {
  const data: number[][] = [];
  lines.forEach((line) => {
    const numbers: string[] | null = line.match(/\d+/g);
    if (numbers) {
      data.push(numbers.map((num) => Number(num)));
    }
  });
  return data;
};

const ORE = 0;
const CLAY = 1;
const OBSIDIAN = 2;
const GEODE = 3;

enum Resources {
  ORE,
  CLAY,
  OBSIDIAN,
  GEODE,
}

class State {
  resources: number[];
  robots: number[];
  costs: number[][];
  minutesLeft: number;
  buildingList: number[];
  nextBuild: number;

  constructor(
    minutesLeft: number,
    resources: number[],
    robots: number[],
    costs: number[][],
    buildingList: number[],
    nextBuild: number
  ) {
    this.minutesLeft = minutesLeft;
    this.resources = resources;
    this.robots = robots;
    this.costs = costs;
    this.buildingList = buildingList;
    this.nextBuild = nextBuild;
  }

  harvestResources() {
    for (const resType in this.resources) {
      this.resources[resType] += this.robots[resType];
    }
  }

  canBuildRobot(robotType: number) {
    for (const resType in this.resources) {
      if (this.costs[robotType][resType] > this.resources[resType]) {
        return false;
      }
    }
    return true;
  }

  buildRobot(robot: number) {
    for (const resType in this.resources) {
      this.resources[resType] -= this.costs[robot][resType];
    }
    this.robots[robot] += 1;
    this.buildingList.push(robot);
  }

  harvestUntilBuild() {
    while (!this.canBuildRobot(this.nextBuild)) {
      this.harvestResources();
      this.minutesLeft--;
      if (this.minutesLeft === 0) return;
    }
    this.buildRobot(this.nextBuild);
  }
}

class Factory {
  id: number;
  resources: number[];
  buildingList: number[];
  robots: number[];
  costs: number[][];
  qualitylevel: number = 0;

  constructor(infos: number[]) {
    this.id = infos[0];
    this.resources = [0, 0, 0, 0];
    this.robots = [1, 0, 0, 0];
    this.costs = [
      [infos[1], 0, 0, 0],
      [infos[2], 0, 0, 0],
      [infos[3], infos[4], 0, 0],
      [infos[5], 0, infos[6], 0],
    ];
    this.buildingList = [0];
  }

  handleStates(minutesLeft: number) {
    const stack: State[] = [];
    const geodes: Map<number[], number> = new Map();
    const firstBuilds = [ORE, CLAY];
    // const firstBuilds = [ORE];
    firstBuilds.forEach((nextBuild) => {
      stack.push(
        new State(
          minutesLeft,
          [...this.resources],
          [...this.robots],
          this.costs,
          [...this.buildingList],
          nextBuild
        )
      );
    });
    while (stack.length > 0) {
      const state = stack.shift();
      if (state) {
        state.harvestUntilBuild();
        if (state.minutesLeft === 0) {
          geodes.set(state.buildingList, state.resources[3]);
        } else {
          console.log(
            "buildingList",
            state.buildingList,
            "robots",
            state.robots,
            "resources",
            state.resources,
            "minutes",
            state.minutesLeft
          );
          let nextBuilds = [ORE, CLAY];
          if (state.robots[CLAY] > 0) {
            nextBuilds.push(OBSIDIAN);
          }
          if (state.robots[OBSIDIAN] > 0) {
            nextBuilds.push(GEODE);
          }
          nextBuilds.forEach((nextBuild) => {
            stack.push(
              new State(
                state.minutesLeft,
                [...state.resources],
                [...state.robots],
                this.costs,
                [...state.buildingList],
                nextBuild
              )
            );
          });
        }
      }
    }
    console.log("END geodes");
    console.log("MAX GEODE", Math.max(...Array.from(geodes.values())));
    // Array.from(geodes.keys()).forEach((k) => {
    //   console.log(geodes.get(k));
    // });
  }

  runTurns(): void {
    this.qualitylevel = this.id * this.resources[Resources.GEODE];
  }
}

const main = async () => {
  const lines = readFileSync(`${__dirname}/data.txt`, "utf-8").split("\n");
  const blueprints = parse(lines);
  //   blueprints.forEach((blueprint) => {
  const blueprint = blueprints[0];
  const facto = new Factory(blueprint);
  //   });

  const NB_TURNS = 12;
  facto.handleStates(NB_TURNS);
  //   console.log("qualityLevel", facto.qualitylevel);
};

main().catch((error) => console.error(error));

// DAY=19 npm run resolve
