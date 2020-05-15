import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
  }

  init() {

  }

  create() {
    this.planck.add.box(100, 100, 50, 50, true, false);
    this.planck.add.circle(200, 100, 10, true, false);
    this.planck.add.edge(100, 400, 400, 400, false);
    this.planck.add.polygon(300, 200, [[0, 0], [0, 70], [50, 100]], true, false);
  }
}
