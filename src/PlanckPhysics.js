/**
 * @author       notchris <mail@chrismcgrne.com>
 * @copyright    2020 notchris
 * @license      @link https://github.com/notchris/phaser3-planck
 */

import Phaser from 'phaser'
import * as Planck from 'planck-js'
import Sprite from './classes/Sprite'

export default class PlanckPhysics extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager)

    let config = scene.registry.parent.config.physics.planck
    if (scene.registry.parent.config.physics.planck) {
      let scaleFactor = config.scaleFactor
      let gravity = config.gravity

      if (!scaleFactor) {
          scaleFactor = 30
      }
      if (!gravity) {
        gravity = { x: 0, y: 0 }
      }
      config = {
        debug: config.debug ? true : false,
        scaleFactor,
        gravity,
      }
    }

    Phaser.Physics.PlanckPhysics = this
    this.scene = scene
    this.world = new Planck.World(Planck.Vec2(config.gravity.x, config.gravity.y))
    this.sprites = []
    this.scaleFactor = config.scaleFactor
    scene.planck = this

    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once("boot", this.boot, this)
    }

    // Creates a sprite with an empty Planck body
    this.add = {
        sprite: (x, y, texture) => {
          const s = new Sprite(this.scene, x, y, texture)
          this.sprites.push(s)
          return s
        }
    }

    // Planck event bindings
    this.world.on('pre-solve', (contact, oldManifold) => {
      this.sprites.forEach((s) => s.preSolve(contact, oldManifold))
    })
    this.world.on('post-solve', (contact, oldManifold) => {
      this.sprites.forEach((s) => s.postSolve(contact, oldManifold))
    })
    this.world.on('begin-contact', (contact, oldManifold) => {
      const a = this.sprites.filter((s) => s.fixture === contact.getFixtureA())[0]
      const b = this.sprites.filter((s) => s.fixture === contact.getFixtureB())[0]
      a.emit('collision-start', b)
      b.emit('collision-start', a)
    })
    this.world.on('end-contact', (contact, oldManifold) => {
      const a = this.sprites.filter((s) => s.fixture === contact.getFixtureA())[0]
      const b = this.sprites.filter((s) => s.fixture === contact.getFixtureB())[0]
      a.emit('collision-end', b)
      b.emit('collision-end', a)
    })



  }

  boot() {
    const eventEmitter = this.systems.events
    eventEmitter.on("update", this.update, this)
    eventEmitter.on("postupdate", this.postUpdate, this)
    eventEmitter.on("shutdown", this.shutdown, this)
    eventEmitter.on("destroy", this.destroy, this)
  }

  postUpdate() {}

  update() {
    this.world.step(1 / 60)
    this.world.clearForces()
  }

  shutdown() {
  }

  destroy() {
    this.shutdown()
    this.scene = undefined
    this.sprites = []
  }
}

PlanckPhysics.register = function(PluginManager) {
  PluginManager.register("PlanckPhysics", PlanckPhysics, "PlanckPhysics")
}