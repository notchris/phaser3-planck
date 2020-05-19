/**
 * Our custom body class to keep things as in line with phasers api as possible.
 * should we make our own class or extends Plancks class :thinking:
 */

import Phaser from 'phaser'
import * as Planck from 'planck-js'

const lw = 4

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

    this.debugShowBody = scene.planck.config.debug
    this.debugShowVelocity = scene.planck.config.debug
    this.debugBodyColor = 0xff00ff

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
    graphics.lineStyle(graphics.defaultStrokeWidth, this.debugBodyColor)

    if (this.debugShowBody) {
      graphics.lineStyle(graphics.defaultStrokeWidth, this.debugBodyColor)

      // this is the weirdest way to do a for loop.
      for (let f = this.planckBody.getFixtureList(); f; f = f.getNext()) {
  
        const type = f.getType()
        const shape = f.getShape()

        if (type === 'circle') {
          this.drawCircle(shape, graphics)
        }
        if (type === 'edge') {
          this.drawEdge(shape, graphics)
        }
        if (type === 'polygon') {
          this.drawPolygon(shape, graphics)
        }
        if (type === 'chain') {
          this.drawPolygon(shape, graphics)
        }
      }

      if (this.debugShowVelocity) {
        // graphics.lineStyle(graphics.defaultStrokeWidth, this.world.defaults.velocityDebugColor, 1);
        // graphics.lineBetween(pos.x * this.scene.planck.scaleFactor, pos.y * this.scene.planck.scaleFactor, x + this.velocity.x / 2, y + this.velocity.y / 2);
      }
    }
  }

  willDrawDebug() {
    return (this.debugShowBody || this.debugShowVelocity)
  }

  drawCircle(shape: Planck.Shape, g: Phaser.GameObjects.Graphics) {
    const radius = shape.m_radius
    const pos = this.planckBody.getPosition()
    const angle = this.planckBody.getAngle()
    const size = radius * 2 + 4 * 2

    g.fillCircle(pos.x, pos.y, size)
    g.setRotation(angle)
  }

  drawEdge(shape: Planck.Shape, g: Phaser.GameObjects.Graphics) {}
  drawPolygon(shape: Planck.Shape, g: Phaser.GameObjects.Graphics) {
    const vertices = ((shape as any ).m_vertices)

    if (!vertices.length) return

    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    for (const v of vertices) {
      minX = Math.min(minX, v.x)
      maxX = Math.max(maxX, v.x)
      minY = Math.min(minY, v.y)
      maxY = Math.max(maxY, v.y)
    }

    const width = maxX - minX
    const height = maxY - minY

    const pos = this.planckBody.getPosition()
    const angle = this.planckBody.getAngle()

    g.moveTo(pos.x + lw * this.scene.planck.scaleFactor, pos.y + lw * this.scene.planck.scaleFactor)
    g.setRotation(angle)

    g.beginPath()
    for (let i = 0; i < vertices.length; ++i) {
      const v = vertices[i]
      const x = v.x - lw
      const y = v.y - lw
      if (i === 0) {
        g.moveTo(x * this.scene.planck.scaleFactor, y * this.scene.planck.scaleFactor)
      } else {
        g.lineTo(x * this.scene.planck.scaleFactor, y * this.scene.planck.scaleFactor)
      }
    }

    if (vertices.length > 2) {
      g.closePath()
    }

    g.stroke()
  }
}

export default Body