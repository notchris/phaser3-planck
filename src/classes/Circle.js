import Phaser from "phaser";
import * as Planck from "planck-js";

export default class Circle extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, radius, isDynamic, isFixed) {
    super(scene, x, y);

    const rnd =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    const graphics = scene.add.graphics();
    graphics.fillStyle(0xEEEEEE, 1);
    graphics.fillCircle(radius, radius, radius);

    graphics.generateTexture(rnd, radius * 2, radius * 2);
    graphics.destroy();

    this.setTexture(rnd);
    this.scene = scene;
    this.isDynamic = isDynamic;
    this.isFixed = isFixed;
    this.scene.add.existing(this);

    this.radius = radius;

    this.x = x;
    this.y = y;

    // Body
    this.b = scene.planck.world.createBody();
    if (this.isDynamic) {
      this.b.setDynamic();
    }

    this.b.createFixture(Planck.Circle(radius / scene.planck.scaleFactor), {
      friction: 0.1,
      restitution: 0.5,
      density: 1
    });
    this.b.setPosition(
      Planck.Vec2(this.x / scene.planck.scaleFactor, this.y / scene.planck.scaleFactor)
    );
    this.b.setMassData({
      mass: 1,
      center: Planck.Vec2(),
      I: 1
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    let p = this.b.getPosition();
    this.x = p.x * this.scene.planck.scaleFactor;
    this.y = p.y * this.scene.planck.scaleFactor;
    this.rotation = this.b.getAngle();
  }
}