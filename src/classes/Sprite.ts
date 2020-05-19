import Phaser from 'phaser'
import * as Planck from 'planck-js'

import Body from '../Body'

class Sprite extends Phaser.GameObjects.Sprite {
  isDynamic: boolean
  isFixed: boolean

  body: Body

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, isDynamic: boolean, isFixed: boolean) {
    super(scene, x, y, texture)

    this.isDynamic = isDynamic
    this.isFixed = isFixed
    this.scene.add.existing(this)

    this.body = new Body(scene)

    this.body.planckBody.createFixture(Planck.Box(this.width / 2 / scene.planck.scaleFactor, this.height / 2 / scene.planck.scaleFactor))
    this.body.planckBody.setPosition(Planck.Vec2(this.x / scene.planck.scaleFactor, this.y / scene.planck.scaleFactor))
    this.body.planckBody.setMassData({
      mass: 1,
      center: Planck.Vec2(),
      I: this.isFixed ? 0 : 1
    })
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)

    if (this.scene.planck.debugGraphics && this.body.willDrawDebug())
      this.body.drawDebug(this.scene.planck.debugGraphics)

    let p = this.body.planckBody.getPosition()
    this.x = p.x * this.scene.planck.scaleFactor
    this.y = p.y * this.scene.planck.scaleFactor
    this.rotation = this.body.planckBody.getAngle()
  }
}

export default Sprite