/**
 * Our custom body class to keep things as in line with phasers api as possible.
 * should we make our own class or extends Plancks class :thinking:
 */

import Phaser from 'phaser'
import * as Planck from 'planck-js'

class Body {
  planckBody: Planck.Body

  debugShowBody: boolean
  debugShowVelocity: boolean
  debugBodyColor: number

  scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    // this is the internal planck body as this class is only for a custom api
    this.planckBody = scene.planck.world.createBody()
    this.planckBody.setDynamic()
    this.debugBodyColor = 0x0000f

    this.scene = scene
  }

  // Set fixed rotation
  setFixedRotation(bool: boolean) {
    this.planckBody.setFixedRotation(bool)
  }

  // Set angular damping
  setAngularDamping(n: number) {
    this.planckBody.setAngularDamping(n)
  }

  // Set angular velocity
  setAngularVelocity(w: number) {
    this.planckBody.setAngularVelocity(w)
  }

  // Set linear damping
  setLinearDamping(n: number) {
    this.planckBody.setLinearDamping(n)
  }

  // Set linear velocity
  setLinearVelocity(x: number, y: number) {
    this.planckBody.setLinearVelocity(Planck.Vec2(x, y))
  }

  // Set the body to sleeping or awake
  setSleeping(bool: boolean) {
    this.planckBody.setAwake(bool)
  }

  // Set the body type to static / dynamic
  setStatic(bool: boolean) {
    bool ? this.planckBody.setStatic() : this.planckBody.setDynamic()
  }

  // Set body as bullet
  setBullet(bool: boolean) {
    this.planckBody.setBullet(bool)
  }

  drawDebug(graphics: Phaser.GameObjects.Graphics) {
    let pos = this.planckBody.getPosition()
    let velocity = this.planckBody.getLinearVelocity()

    if (this.debugShowBody) {
      graphics.lineStyle(graphics.defaultStrokeWidth, this.debugBodyColor)

      // this is the weirdest way to do a for loop.
      for (let f = this.planckBody.getFixtureList(); f; f.getNext()) {
  
        const type = f.getType()
        const shape = f.getShape()

        if (type === 'circle') {
          const radius = shape.m_radius
          const pos = this.planckBody.getPosition()
          const angle = this.planckBody.getAngle()
          const size = radius * 2 + 4 * 2

          graphics.fillCircle(pos.x, pos.y, size)
        }
        if (type === 'edge') {
          // this is todo
          this.drawEdge(body, shape);
        }
        if (type === 'polygon') {
          // this is todo
          this.drawPolygon(body, shape);
        }
        if (type === 'chain') {
          // this is todo
          this.drawPolygon(body, shape);
        }
      }

      if (this.debugShowVelocity) {
        graphic.lineStyle(graphic.defaultStrokeWidth, this.world.defaults.velocityDebugColor, 1);
        graphic.lineBetween(pos.x * this.scene.planck.scaleFactor, pos.y * this.scene.planck.scaleFactor, x + this.velocity.x / 2, y + this.velocity.y / 2);
      }
    }
  }

  willDrawDebug() {
    return (this.debugShowBody || this.debugShowVelocity)
  }
}

export default Body