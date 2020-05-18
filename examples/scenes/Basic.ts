import Phaser from 'phaser'

class Basic extends Phaser.Scene {
  constructor() {
    super({ key: "Basic" })
  }

  create() {
    const box = this.planck.add.box('', 100, 100, 100, 100);
    const poly = this.planck.add.polygon('', 300, 100, [[0,0],[0,100],[50, 0]]);
    const ball = this.planck.add.circle('', 200, 20, 20);
    const edge = this.planck.add.box('', 0, 400, 500, 20);
    edge.body.setStatic(true);
  }
}

export default Basic