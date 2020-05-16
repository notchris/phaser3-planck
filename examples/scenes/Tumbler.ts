import Phaser from 'phaser'
import * as Planck from 'planck-js'

class Tumbler extends Phaser.Scene {
  offset: Planck.Vec2
  pivot: Planck.Vec2

  motorSpeed: number
  motorOn: boolean

  constructor() {
    super({ key: 'Tumbler' })

    this.motorSpeed = 2
    this.motorOn = true

    this.offset = Planck.Vec2(0, 8)
    this.pivot = Planck.Vec2(0, .8)
  }

  create() {
    this.planck.world.setGravity(Planck.Vec2(0, -10))

    this.planck.add.box(400, 100, 30, 30, true, false)
    this.planck.add.circle(300, 20, 10, true, true)
    this.planck.add.edge(200, 300, 600, 300, false)
    this.planck.add.polygon(340, 100, [[0, 0], [0, 70], [50, 100]], true, false);
  }
}

export default Tumbler