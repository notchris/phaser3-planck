import Phaser from 'phaser'
import * as Planck from 'planck-js'
import Body from '../Body';
class Circle extends Body {
  x: number
  y: number
  radius: number

  constructor(scene: Phaser.Scene, x: number, y: number, radius: number) {
    super(scene)

    this.x = x
    this.y = y
    this.radius = radius;

    this.planckBody.createFixture(Planck.Circle(this.radius / scene.planck.scaleFactor))
    this.planckBody.setPosition(
      Planck.Vec2(this.x / scene.planck.scaleFactor, this.y / scene.planck.scaleFactor)
    )
    this.planckBody.setMassData({
      mass: 1,
      center: Planck.Vec2(),
      I: 1
    })
  }
}

export default Circle