import Phaser from 'phaser'
import * as Planck from 'planck-js'
import Body from '../Body';
import Poly from 'polygon';

class Polygon extends Body {
  x: number
  y: number
  width: number
  height: number
  points: Array<[number, number]>
  vertices: Array<Planck.Vec2>

  constructor(scene: Phaser.Scene, x: number, y: number, points: Array<[number, number]>) {
    super(scene)

    this.x = x;
    this.y = y;
    this.points = points;

    this.vertices = [];
    const poly = new Poly(points)
    const bbox = poly.aabb()

    this.width = bbox.w
    this.height = bbox.h
    this.points.forEach((p) => {
      this.vertices.push(new Planck.Vec2((p[0] - this.width / 2) / scene.planck.scaleFactor, (p[1] - this.height / 2) / scene.planck.scaleFactor))
    });

    this.planckBody.createFixture(Planck.Polygon(this.vertices))
    this.planckBody.setPosition(Planck.Vec2(this.x / scene.planck.scaleFactor, this.y / scene.planck.scaleFactor))
    this.planckBody.setMassData({
      mass: 1,
      center: Planck.Vec2(),
      I: 1
    })
  }

}

export default Polygon