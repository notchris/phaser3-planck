import * as Phaser from 'phaser'
import Planck from 'planck-js'

// Body Types
import Box from './classes/Box'
import Circle from './classes/Circle'
import Edge from './classes/Edge'
import Polygon from './classes/Polygon'

// Joints
import RevoluteJoint from './classes/RevoluteJoint'

type PluginOptions = {
  gravity: {
    x: number
    y: number
  }
  scaleFactor: number
  debug: boolean
}

const defaultOptions: PluginOptions = {
  gravity: {
    x: 0,
    y: 3
  }, // 3y is normal
  scaleFactor: 30,
  debug: false
}

class PlanckPhysics extends Phaser.Plugins.ScenePlugin {
  config: PluginOptions
  world: Planck.World
  gravity: PluginOptions['gravity']
  scaleFactor: PluginOptions['scaleFactor']

  accumulator: number
  previousElapsed: number

  tickRate: number
  hz: number

  debugGraphics?: Phaser.GameObjects.Graphics

  add: {
    box(x: number, y: number, width: number, height: number, isDynamic: boolean, isFixed: boolean): Box
    circle(cx: number, cy: number, radius: number, isDynamic: boolean, isFixed: boolean): Circle
    edge(x1: number, y1: number, x2: number, y2: number, isDynamic: boolean): Edge
    polygon(x: number, y: number, points: Array<[number, number]>, isDynamic: boolean, isFixed: boolean): Polygon
    revoluteJoint(x: number, y: number, bodyA: any, bodyB: any, options: any): RevoluteJoint
  }

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager)

    // Temporary type fix on this.game.config.physics.planck
    this.config = { ...defaultOptions, ...(this.game.config.physics as any).planck }
    this.gravity = this.config.gravity
    this.scaleFactor = this.config.scaleFactor;

    // Temporary type fix on Phaser.Physics.Planck
    (Phaser.Physics as any).Planck = this

    this.tickRate = 60
    this.hz = 1 / this.tickRate
  }

  boot() {
    this.world = new Planck.World(Planck.Vec2(this.gravity.x, this.gravity.y))

    // is there a better way we can do this?
    this.add = {
      box: (x: number, y: number, width: number, height: number, isDynamic: boolean, isFixed: boolean) => {
        return new Box(this.scene, x, y, width, height, isDynamic, isFixed)
      },
      circle: (cx: number, cy: number, radius: number, isDynamic: boolean, isFixed: boolean) => {
        return new Circle(this.scene, cx, cy, radius, isDynamic, isFixed)
      },
      edge: (x1: number, y1: number, x2: number, y2: number, isDynamic: boolean) => {
        return new Edge(this.scene, x1, y1, x2, y2, isDynamic)
      },
      polygon: (x: number, y: number, points: Array<[number, number]>, isDynamic: boolean, isFixed: boolean) => {
        return new Polygon(this.scene, x, y, points, isDynamic, isFixed)
      },
      revoluteJoint: (x: number, y: number, bodyA: any, bodyB: any, options: any) => {
        return new RevoluteJoint(this.scene, x, y, bodyA, bodyB, options)
      }
    }

    const eventEmitter = this.systems.events
    eventEmitter.on('create', this.create, this)
    eventEmitter.on('postupdate', this.postUpdate, this)
    eventEmitter.on('shutdown', this.shutdown, this)
    eventEmitter.on('destroy', this.destroy, this)

    this.scene.planck = this
  }

  create() {
    // we have to get our previous elapsed now, since boot runs when the game starts it'll cause
    // a bunch of steps to happen when a scene is started.
    this.accumulator = 0
    this.previousElapsed = performance.now()

    // setup our render graphics if debug is on.
    if (this.config.debug) this.debugGraphics = this.scene.add.graphics()
  }

  postUpdate() {
    let now = performance.now()
    this.accumulator += (now - this.previousElapsed) / 1000

    while (this.accumulator >= this.hz) {
      this.world.step(this.hz)
      this.world.clearForces()

      this.accumulator -= this.hz
    }
    this.previousElapsed = now
  }

  shutdown() { }
  destroy() {
    this.shutdown()
  }
}

export default PlanckPhysics;