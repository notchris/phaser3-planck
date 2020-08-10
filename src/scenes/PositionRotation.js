import Phaser from "phaser"

export default class PositionRotation extends Phaser.Scene {
  constructor() {
    super({ key: "PositionRotation" })
  }

  preload () {
  }

  init() {

  }

  create() {

    // Ground Texture
    const groundTexture = this.add.graphics()
    groundTexture.fillStyle(0x666666)
    groundTexture.fillRect(0, 0, 640, 40)
    groundTexture.generateTexture('demo_pr_ground', 640, 40)
    groundTexture.destroy()

    // Ground Sprite
    const groundSprite = this.planck.add.sprite(0, 400, 'demo_pr_ground')
    groundSprite.setBody('box')
    groundSprite.body.setStatic()

    // Box Texture
    const boxTexture = this.add.graphics()
    boxTexture.fillStyle(0xffffff)
    boxTexture.fillRect(0, 0, 30, 30)
    boxTexture.generateTexture('demo_pr_box', 30, 30)
    boxTexture.destroy()

    // Box A (Rotation)
    this.boxA = this.planck.add.sprite(
      100,
      250,
      'demo_pr_box'
    )
    this.boxA.setBody('box', {
      restitution: 0,
      friction: 1,
      density: 25.0
    })
    this.boxA.setStatic()
    this.boxRotation = 0

    // Box B (Position)
    this.boxB = this.planck.add.sprite(
      300,
      250,
      'demo_pr_box'
    )
    this.boxB.setBody('box', {
      restitution: 0,
      friction: 1,
      density: 25.0
    })
    this.boxB.setStatic()
    this.boxB.setTintFill(`0xffff00`)

    this.pos = {
      x: this.boxB.getPosition().x,
      y: this.boxB.getPosition().y
    }
    this.positionTween = this.tweens.add({
      targets: this.pos,
      x: { from: this.pos.x, to: this.pos.x + 100 },
      y: { from: this.pos.y, to: this.pos.y + 80 },
      ease: 'Linear',
      duration: 1000,
      repeat: -1,
      yoyo: true
    })

  }

  update (time, delta) {
      this.boxRotation += 1.2
      if (this.boxA) {
        this.boxA.setRotation(Phaser.Math.DegToRad(this.boxRotation))
      }
      if (this.boxB) {
        this.boxB.setPosition(this.pos.x, this.pos.y)
      }
  }
}
