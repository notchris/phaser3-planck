/**
 * Our custom body class to keep things as in line with phasers api as possible.
 * should we make our own class or extends Plancks class :thinking:
 */

import * as Planck from 'planck-js'

class Body {
  planckBody: Planck.Body
  constructor(scene) {
    
    // this is the internal planck body as this class is only for a custom api
    this.planckBody = scene.planck.world.createBody();
    this.planckBody.setDynamic();
    return this;
  }

  // Set fixed rotation
  setFixedRotation (bool: boolean) {
    this.planckBody.setFixedRotation(bool);
  }

  // Set angular damping
  setAngularDamping (n: number) {
      this.planckBody.setAngularDamping(n);
  }

  // Set angular velocity
  setAngularVelocity (w: number) {
    this.planckBody.setAngularVelocity(w);
  }

  // Set linear damping
  setLinearDamping (n: number) {
    this.planckBody.setLinearDamping(n);
  }

  // Set linear velocity
  setLinearVelocity (x: number, y: number) {
    this.planckBody.setLinearVelocity(Planck.Vec2(x, y));
  }

  // Set the body to sleeping or awake
  setSleeping (bool: boolean) {
      this.planckBody.setAwake(bool);
  }

  // Set the body type to static / dynamic
  setStatic (bool: boolean) {
    bool ? this.planckBody.setStatic() : this.planckBody.setDynamic()
  }

  // Set body as bullet
  setBullet (bool: boolean) {
    this.planckBody.setBullet(bool);
  }
}

export default Body