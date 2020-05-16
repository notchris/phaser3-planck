import Phaser from "phaser";

export default class RevoluteJoint extends Phaser.Scene {
  constructor() {
    super({ key: "RevoluteJoint" });
  }

  init() {

  }

  create() {
    const box = this.planck.add.box(200, 200, 50, 50, true, false);
    const circle = this.planck.add.circle(200, 100, 10, true, true);
    const joint = this.planck.add.revoluteJoint(100, 100, box, circle, {
        motorSpeed: 1.0 * Math.PI,
        maxMotorTorque: 10000.0,
        enableMotor: false,
        lowerAngle: -0.25 * Math.PI,
        upperAngle: 0.5 * Math.PI,
        enableLimit: true,
        collideConnected: false
    })

    const edge = this.planck.add.edge(100, 400, 400, 400, false);
    // this.planck.add.polygon(300, 200, [[0, 0], [0, 70], [50, 100]], true, false);
  }
}