import Phaser from 'phaser';
import * as Planck from 'planck-js';

class RevoluteJoint extends Phaser.GameObjects.GameObject {
  x: number
  y: number
  bodyA: Planck.Body
  bodyB: Planck.Body
  joint: any
  options: {
    motorSpeed?: number,
    maxMotorTorque?: number,
    enableMotor?: boolean,
    enableLimit?: boolean,
    lowerAngle?: number,
    upperAngle?: number,
    collideConnected?: boolean
 }
  
  constructor(scene: Phaser.Scene, x, y, bodyA, bodyB, options) {
    super(scene, '')

    this.scene.add.existing(this);
    this.x = x || 0;
    this.y = y || 0;
    this.bodyA = bodyA.body;
    this.bodyB = bodyB.body;
    this.joint = (scene as any).planck.world.createJoint(
        Planck.RevoluteJoint(options, this.bodyA, this.bodyB, new Planck.Vec2(x, y))
    );
  }
}

export default RevoluteJoint