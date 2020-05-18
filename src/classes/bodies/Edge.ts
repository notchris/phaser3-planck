import Phaser from 'phaser'
import * as Planck from 'planck-js'
import Body from '../Body';
class Edge extends Body {
  x: number
  y: number
  x2: number
  y2: number

  constructor(scene: Phaser.Scene, x: number, y: number, x2: number, y2: number) {
    super(scene)

    this.x = x
    this.y = y
    this.x2 = x2;
    this.y2 = y2;

    this.planckBody.createFixture(Planck.Edge(
      Planck.Vec2(this.x / scene.planck.scaleFactor, this.y / scene.planck.scaleFactor),
      Planck.Vec2(this.x2 / scene.planck.scaleFactor, this.y2 / scene.planck.scaleFactor)
    ), {
      friction: 1,
      restitution: 0.5,
      density: 1
    });

    this.planckBody.setMassData({
      mass: 1,
      center: Planck.Vec2(),
      I: 0
    });
  }
}

export default Edge