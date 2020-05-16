import Phaser from 'phaser'
import * as Planck from 'planck-js'

class Circle extends Phaser.GameObjects.Sprite {
  isDynamic: boolean
  isFixed: boolean

  body: Planck.Body

  radius: number

  constructor(scene: Phaser.Scene, x: number, y: number, radius: number, isDynamic: boolean, isFixed: boolean) {
    super(scene, x, y, '')

    const rnd =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)

    const graphics = scene.add.graphics()
    graphics.fillStyle(0xEEEEEE, 1)
    graphics.fillCircle(radius, radius, radius)

    graphics.generateTexture(rnd, radius * 2, radius * 2)
    graphics.destroy()

    this.setTexture(rnd)
    this.isDynamic = isDynamic
    this.isFixed = isFixed
    this.scene.add.existing(this)

    this.radius = radius

    // Body
    this.body = scene.planck.world.createBody()
    if (this.isDynamic) this.body.setDynamic()

    this.body.createFixture(Planck.Circle(radius / scene.planck.scaleFactor), {
      friction: 0.1,
      restitution: 0.5,
      density: 1
    })
    this.body.setPosition(
      Planck.Vec2(this.x / scene.planck.scaleFactor, this.y / scene.planck.scaleFactor)
    )
    this.body.setMassData({
      mass: 1,
      center: Planck.Vec2(),
      I: 1
    })
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)

    let p = this.body.getPosition()
    this.x = p.x * this.scene.planck.scaleFactor
    this.y = p.y * this.scene.planck.scaleFactor
    this.rotation = this.body.getAngle()
  }
}

export default Circle