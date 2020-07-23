import Phaser from "phaser"

export default class Friction extends Phaser.Scene {
  constructor() {
    super({ key: "Friction" })
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
    groundTexture.generateTexture('demo_friction_ground', 640, 40)
    groundTexture.destroy()

    // Ground Sprite
    const groundSprite = this.planck.add.sprite(0, 400, 'demo_friction_ground')
    groundSprite.setBody('box')
    groundSprite.body.setTransform(groundSprite.body.getPosition(), Phaser.Math.DegToRad(15))
    groundSprite.body.setStatic()

    // Box Texture
    const boxTexture = this.add.graphics()
    boxTexture.fillStyle(0xffffff)
    boxTexture.fillRect(0, 0, 30, 30)
    boxTexture.generateTexture('demo_friction_box', 30, 30)
    boxTexture.destroy()

    // Box Drop Timer
    const timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        const box = this.planck.add.sprite(
          100,
          250,
          'demo_friction_box'
        )
        box.setBody('box', {
          restitution: 0,
          friction: Phaser.Math.FloatBetween(0.0, 0.9),
          density: 25.0
        })
        box.setTintFill(`0x${Math.floor(Math.random()*16777215).toString(16)}`)
        this.time.delayedCall(5000, () => {
          box.destroy()
        }, null, this)
      },
      //args: [],
      callbackScope: this,
      repeat: 10
    })

  }
}
