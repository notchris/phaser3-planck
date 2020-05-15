import * as Phaser from 'phaser'
import Planck from 'planck-js'

import Box from './classes/Box'
import Circle from './classes/Circle'
import Edge from './classes/Edge'
import Polygon from './classes/Polygon'

type PluginOptions = {
  gravity: {
    x: number,
    y: number
  }
  scaleFactor: number
}

const defaultOptions: PluginOptions = {
  gravity: {
    x: 0,
    y: 3
  }, // 3y is normal
  scaleFactor: 30
}

class PlanckPhysics extends Phaser.Plugins.ScenePlugin {
  config: PluginOptions
  world: Planck.World
  gravity: PluginOptions['gravity']
  scaleFactor: PluginOptions['scaleFactor']

  add: {
    box(x: number, y: number, width: number, height: number, isDynamic: boolean, isFixed: boolean): Box
    circle(cx: number, cy: number, radius: number, isDynamic: boolean, isFixed: boolean): Circle
    edge(x1: number, y1: number, x2: number, y2: number, isDynamic: boolean): Edge
    polygon(x: number, y: number, points: [number[]], isDynamic: boolean, isFixed: boolean): Polygon
  }

  constructor(scene:Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager)

    this.config = { ...defaultOptions, ...this.game.config.physics.planck }
    this.gravity = this.config.gravity
    this.scaleFactor = this.config.scaleFactor;

    Phaser.Physics.Planck = this
  }

  boot() {
    this.world = new Planck.World(Planck.Vec2(this.gravity.x, this.gravity.y))

    // is there a better way we can do this?
    this.add = {
      box: (x: number, y: number, width: number, height: number, isDynamic: boolean, isFixed: boolean) => {
        return new Box(this.scene, x, y, width, height, isDynamic, isFixed);
      },
      circle: (cx: number, cy: number, radius: number, isDynamic: boolean, isFixed: boolean) => {
        return new Circle(this.scene, cx, cy, radius, isDynamic, isFixed);
      },
      edge: (x1: number, y1: number, x2: number, y2: number, isDynamic: boolean) => {
        return new Edge(this.scene, x1, y1, x2, y2, isDynamic);
      },
      polygon: (x: number, y: number, points: [number[]], isDynamic: boolean, isFixed: boolean) => {
        return new Polygon(this.scene, x, y, points, isDynamic, isFixed);
      }
    };

    const eventEmitter = this.systems.events;
    eventEmitter.on("postupdate", this.postUpdate, this);
    eventEmitter.on("shutdown", this.shutdown, this);
    eventEmitter.on("destroy", this.destroy, this);

    this.scene.planck = this
  }

  postUpdate() {
    // TODO: make our physics step take into account
    // different hz monitors https://cdn.discordapp.com/attachments/617014860101845033/710707700173897778/unknown.png
    this.world.step(1 / 60)
    this.world.clearForces()
  }

  shutdown() {}
  destroy() {
    this.shutdown();
  }
}

export default PlanckPhysics;