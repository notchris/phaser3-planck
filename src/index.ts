import * as Phaser from 'phaser'
import Planck from 'planck-js'

import Sprite from './classes/Sprite';

import Box from './classes/bodies/Box';
import Circle from './classes/bodies/Circle';
import Edge from './classes/bodies/Edge';
import Polygon from './classes/bodies/Polygon';
import Poly from 'polygon';

type PluginOptions = {
  gravity: {
    x: number,
    y: number
  }
  scaleFactor: number,
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

  add: {
    box(texture: string, x: number, y: number, width: number, height: number),
    circle(texture: string, x: number, y: number, radius: number),
    edge(texture: string, x: number, y: number, x2: number, y2: number),
    polygon(texture: string, x: number, y: number, points: Array<[number, number]>)
  }

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager)

    // Temporary type fix on this.game.config.physics.planck
    this.config = { ...defaultOptions, ...(this.game.config.physics as any).planck, ...(this.scene.sys.config as any).planck }
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
      box: (texture: string, x: number, y: number, width: number, height: number) => {
        const body = new Box(this.scene, x, y, width, height)
        const sprite = new Sprite(this.scene, x, y, texture, body)
        if (this.config.debug) {
          sprite.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, width, height),
            Phaser.Geom.Rectangle.Contains
          )
          this.scene.input.enableDebug(sprite, 0xff00ff);
        }
        return sprite;
      },
      circle: (texture: string, x: number, y: number, radius: number) => {
        const body = new Circle(this.scene, x, y, radius)
        const sprite = new Sprite(this.scene, x, y, texture, body)
        if (this.config.debug) {
          sprite.setInteractive(
            new Phaser.Geom.Circle(radius, radius, radius),
            Phaser.Geom.Circle.Contains
          )
          this.scene.input.enableDebug(sprite, 0xff00ff);
        }
        return sprite
      },
      edge: (texture: string, x: number, y: number, x2: number, y2: number) => {
        const body = new Edge(this.scene, x, y, x2, y2)
        const sprite = new Sprite(this.scene, x, y, texture, body)
        return sprite
      },
      polygon: (texture: string, x: number, y: number, points: Array<[number, number]>) => {
        const body = new Polygon(this.scene, x, y, points)
        const sprite = new Sprite(this.scene, x, y, texture, body)
        const poly = new Poly(points)
        const bbox = poly.aabb();
        if (this.config.debug) {
          const arr = [];
          points.forEach((p) => arr.push(new Phaser.Geom.Point(p[0] - bbox.w/2 ,p[1] - bbox.h/2)));
          sprite.setInteractive(
            new Phaser.Geom.Polygon(arr),
            Phaser.Geom.Polygon.Contains
          )
          this.scene.input.enableDebug(sprite, 0xff00ff);
        }
        return sprite
      },
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
  }

  postUpdate() {
    let now = performance.now()
    this.accumulator += (now - this.previousElapsed) / 1000

    while (this.accumulator >= this.hz) {
      this.world.step(this.hz);
      this.world.clearForces();

      this.accumulator -= this.hz;
    }
    this.previousElapsed = now
  }

  shutdown() { }
  destroy() {
    this.shutdown();
  }
}

export default PlanckPhysics;