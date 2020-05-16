import Phaser from 'phaser'

class Basic extends Phaser.Scene {
  constructor() {
    super({ key: "Basic" })
  }

  create() {
    this.planck.add.box(400, 100, 30, 30, true, false)
    this.planck.add.circle(300, 20, 10, true, true)
    this.planck.add.edge(200, 300, 600, 300, false)
    this.planck.add.polygon(340, 100, [[0, 0], [0, 70], [50, 100]], true, false)
  }
}

export default Basic