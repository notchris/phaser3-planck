/**
 * @author       notchris <mail@chrismcgrne.com>
 * @copyright    2020 notchris
 * @license      {@link https://github.com/notchris/phaser3-planck
 */

import Phaser from 'phaser';
import * as Planck from 'planck-js';
import Box from './classes/Box';
import Circle from './classes/Circle';
import Edge from './classes/Edge';
import Polygon from './classes/Polygon';

export default class PlanckPhysics extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);

    let config = scene.registry.parent.config.physics.planck;
    if (scene.registry.parent.config.physics.planck) {
      let scaleFactor = config.scaleFactor;
      let gravity = config.gravity;

      if (!scaleFactor) {
          scaleFactor = 30;
      }
      if (!gravity) {
        gravity = { x: 0, y: 0 };
      }
      config = {
        debug: config.debug ? true : false,
        scaleFactor,
        gravity,
      };
    }

    Phaser.Physics.PlanckPhysics = this;
    this.scene = scene;
    this.world = new Planck.World(Planck.Vec2(config.gravity.x, config.gravity.y));
    this.scaleFactor = config.scaleFactor;
    scene.planck = this;

    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once("boot", this.boot, this);
    }

    this.add = {
        box: (x, y, width, height, isDynamic, isFixed) => {
            return new Box(this.scene, x, y, width, height, isDynamic, isFixed);
        },
        circle: (cx, cy, radius, isDynamic, isFixed) => {
            return new Circle(this.scene, cx, cy, radius, isDynamic, isFixed);
        },
        edge: (x1, y1, x2, y2, isDynamic) => {
            return new Edge(this.scene, x1, y1, x2, y2, isDynamic);
        },
        polygon: (x, y, points, isDynamic, isFixed) => {
            return new Polygon(this.scene, x, y, points, isDynamic, isFixed);
        }
    };

  }

  boot() {
    const eventEmitter = this.systems.events;
    eventEmitter.on("update", this.update, this);
    eventEmitter.on("postupdate", this.postUpdate, this);
    eventEmitter.on("shutdown", this.shutdown, this);
    eventEmitter.on("destroy", this.destroy, this);
  }

  postUpdate() {}

  update() {
    this.world.step(1 / 60);
    this.world.clearForces();
  }

  shutdown() {}

  destroy() {
    this.shutdown();
    this.scene = undefined;
  }
}

PlanckPhysics.register = function(PluginManager) {
  PluginManager.register("PlanckPhysics", PlanckPhysics, "PlanckPhysics");
};