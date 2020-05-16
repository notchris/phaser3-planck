import Phaser from "phaser";

export default class Basic extends Phaser.Scene {
  constructor() {
    super({ key: "Basic" });
  }

  init() {

  }

  create() {
    const box = this.planck.add.box(200, 200, 50, 50, true, false);
    const circle = this.planck.add.circle(200, 100, 10, true, true);
    const edge = this.planck.add.edge(100, 400, 400, 400, false);
    // this.planck.add.polygon(300, 200, [[0, 0], [0, 70], [50, 100]], true, false);
  }
}