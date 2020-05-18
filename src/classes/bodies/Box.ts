import Phaser from 'phaser'
import * as Planck from 'planck-js'
import Body from '../Body';
class Box extends Body {
  width: number
  height: number
  x: number
  y: number

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene)

    this.width = width
    this.height = height
    this.x = x + width / 2
    this.y = y - height / 2

    this.planckBody.createFixture(Planck.Box(this.width / 2 / scene.planck.scaleFactor, this.height / 2 / scene.planck.scaleFactor))
    this.planckBody.setPosition(Planck.Vec2(this.x / scene.planck.scaleFactor, this.y / scene.planck.scaleFactor))
    this.planckBody.setMassData({
      mass: 1,
      center: Planck.Vec2(),
      I: 1
    });
    
  }
}

export default Box