import Phaser from 'phaser'
import * as Planck from 'planck-js'

// should this be extending sprite? feels weird since we litterly never use it
class Edge extends Phaser.GameObjects.Sprite {
  isDynamic: boolean
  isFixed: boolean

  body: Planck.Body

  x2: number
  y2: number

  constructor(scene: Phaser.Scene, x: number, y: number, x2: number, y2: number, isDynamic: boolean) {
    super(scene, x, y, '')

    const rnd = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const graphics = scene.add.graphics();
    graphics.lineStyle(4, 0x333333, 1);
    graphics.beginPath();
    graphics.moveTo(x, y);
    graphics.lineTo(x2, y2);
    graphics.closePath();
    graphics.strokePath();
    graphics.generateTexture(rnd)
    graphics.destroy()

    this.setTexture(rnd)
    this.setOrigin(.25, .5)
    this.isDynamic = isDynamic;
    this.isFixed = true;

    this.scene.add.existing(this);

    this.x2 = x2;
    this.y2 = y2;

    this.body = scene.planck.world.createBody();

    this.body.createFixture(Planck.Edge(
      Planck.Vec2(this.x / scene.planck.scaleFactor, this.y / scene.planck.scaleFactor),
      Planck.Vec2(this.x2 / scene.planck.scaleFactor, this.y2 / scene.planck.scaleFactor)
    ), {
      friction: 1,
      restitution: 0.5,
      density: 1
    });

    this.body.setMassData({
      mass: 1,
      center: Planck.Vec2(),
      I: 0
    });
  }
}

export default Edge