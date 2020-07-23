import Phaser from "phaser"

export default class Restitution extends Phaser.Scene {
  constructor() {
    super({ key: "Restitution" })
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
    groundTexture.generateTexture('demo_restitution_ground', 640, 40)
    groundTexture.destroy()

    // Ground Sprite
    const groundSprite = this.planck.add.sprite(0, 400, 'demo_restitution_ground')
    groundSprite.setBody('box')
    groundSprite.body.setStatic()

    // Ball Texture
    const ballTexture = this.add.graphics()
    ballTexture.fillStyle(0xffffff)
    ballTexture.fillCircle(15, 15, 15)
    ballTexture.generateTexture('demo_restitution_ball', 30, 30)
    ballTexture.destroy()

    // Ball Drop Timer
    const timer = this.time.addEvent({
      delay: 500,
      callback: () => {
        const ball = this.planck.add.sprite(
          Phaser.Math.Between(200, 300),
          100,
          'demo_restitution_ball'
        )
        ball.setBody('circle', {
          restitution: Phaser.Math.FloatBetween(0.0, 0.9)
        })
        ball.setTintFill(`0x${Math.floor(Math.random()*16777215).toString(16)}`)
        this.time.delayedCall(5000, () => {
          ball.destroy()
        }, null, this)
      },
      //args: [],
      callbackScope: this,
      repeat: 10
    })

  }
}
