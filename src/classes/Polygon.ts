import Phaser from 'phaser'
import * as Planck from 'planck-js'
import Poly from 'polygon'

class Polygon extends Phaser.GameObjects.Sprite {
  isDynamic: boolean
  isFixed: boolean

  body: Planck.Body

  constructor(scene: Phaser.Scene, x: number, y: number, points: [number[]], isDynamic: boolean, isFixed: boolean) {
    super(scene, x, y, '')

    const rnd = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const poly = new Poly(points)
    const bbox = poly.aabb()
    const c = poly.center()

    const width = bbox.w
    const height = bbox.h

    const graphics = scene.add.graphics()
    graphics.fillStyle(0xff0000, 1)
    graphics.beginPath()
    graphics.moveTo(points[0][0], points[0][1])
    for (let i = 1; i < points.length; i += 1) {
      graphics.lineTo(points[i][0], points[i][1])
    }
    graphics.lineTo(points[0][0], points[0][1])
    graphics.closePath()
    graphics.fill()
    graphics.generateTexture(rnd, width, height)
    graphics.destroy()

    this.setTexture(rnd)
    this.isDynamic = isDynamic
    this.isFixed = isFixed
    this.scene.add.existing(this)

    this.body = scene.planck.world.createBody()
    if (this.isDynamic) this.body.setDynamic()

    const vertices = [];
    points.forEach((p) => {
      vertices.push(new Planck.Vec2((p[0] - width / 2) / scene.planck.scaleFactor, (p[1] - height / 2) / scene.planck.scaleFactor))
    });

    this.body.createFixture(Planck.Polygon(vertices))
    this.body.setPosition(Planck.Vec2(x / scene.planck.scaleFactor, y / scene.planck.scaleFactor))
    this.body.setMassData({
      mass: 1,
      center: Planck.Vec2(),
      I: this.isFixed ? 0 : 1
    })
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    let p = this.body.getPosition();
    this.x = p.x * this.scene.planck.scaleFactor
    this.y = p.y * this.scene.planck.scaleFactor;
    this.rotation = this.body.getAngle();
  }
}

export default Polygon