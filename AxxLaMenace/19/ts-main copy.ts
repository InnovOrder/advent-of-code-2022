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

enum Resources {
  ORE,
  CLAY,
  OBSIDIAN,
  GEODE,
}

class Factory {
  id: number;
  resources: number[];
  buildingList: number[];
  robots: number[];
  costs: number[][];
  qualitylevel: number = 0;
  display = false;

  constructor(infos: number[], display = false) {
    this.id = infos[0];
    this.resources = [0, 0, 0, 0];
    this.robots = [1, 0, 0, 0];
    this.costs = [
      [infos[1], 0, 0, 0],
      [infos[2], 0, 0, 0],
      [infos[3], infos[4], 0, 0],
      [infos[5], 0, infos[6], 0],
    ];
    this.buildingList = [];
    this.display = display;
  }

  harvestResources() {
    for (const resType in this.resources) {
      this.resources[resType] += this.robots[resType];
    }
  }

  isEnoughResourcesForRobot(robotType: number) {
    for (const resType in this.resources) {
      if (this.costs[robotType][resType] > this.resources[resType]) {
        return false;
      }
    }
    return true;
  }

  prepareRobotBuild(robotType: Resources) {
    if (this.isEnoughResourcesForRobot(robotType)) {
      for (const resType in this.resources) {
        this.resources[resType] -= this.costs[robotType][resType];
      }
      this.buildingList.push(robotType);
    }
  }

  buildRobots(): void {
    this.buildingList.forEach((robotType: Resources) => {
      this.robots[robotType] += 1;
    });
    this.buildingList = [];
  }

  getQualityLevel(): number {
    return this.id * this.resources[Resources.GEODE];
  }

  runTurns(nbTurns: number): void {
    for (let i = 0; i < nbTurns; i++) {
      //   this.prepareRobotBuild(Resources.ORE);
      //   this.prepareRobotBuild(Resources.CLAY);
      //   this.prepareRobotBuild(Resources.OBSIDIAN);
      //   this.prepareRobotBuild(Resources.GEODE);

      this.harvestResources();

      this.buildRobots();

      if (this.display) {
        console.log(
          "in turn",
          i + 1,
          "this.resources=",
          this.resources,
          "robots",
          this.robots
        );
      }
    }
    this.qualitylevel = this.id * this.resources[Resources.GEODE];
  }
}

const main = async () => {
  const lines = readFileSync(`${__dirname}/data.txt`, "utf-8").split("\n");
  const blueprints = parse(lines);
  //   blueprints.forEach((blueprint) => {
  const blueprint = blueprints[0];
  const facto = new Factory(blueprint, true);
  //   });

  const NB_TURNS = 24;
  facto.runTurns(NB_TURNS);
  console.log("qualityLevel", facto.qualitylevel);
};

main().catch((error) => console.error(error));

// DAY=19 npm run resolve
