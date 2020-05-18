import Phaser from 'phaser'
import Box from './bodies/Box';
import Circle from './bodies/Circle';
import Edge from './bodies/Edge';
import Polygon from './bodies/Polygon';
class Sprite extends Phaser.GameObjects.Sprite {
  body: Box | Circle | Edge | Polygon
  
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, body: Box | Circle | Edge | Polygon) {
    super(scene, x, y, texture)

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.body = body;
    this.scene.add.existing(this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)
    if (!this.body) return;
    let p = this.body.planckBody.getPosition()
    this.x = p.x * this.scene.planck.scaleFactor
    this.y = p.y * this.scene.planck.scaleFactor
    this.rotation = this.body.planckBody.getAngle()
  }
}

export default Sprite