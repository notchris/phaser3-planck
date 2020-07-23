import Phaser from "phaser"

export default class Events extends Phaser.Scene {
  constructor() {
    super({ key: "Events" })
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
    groundTexture.generateTexture('demo_events_ground', 640, 40)
    groundTexture.destroy()

    // Ground Sprite
    const groundSprite = this.planck.add.sprite(0, 400, 'demo_events_ground')
    groundSprite.setBody('box')
    groundSprite.body.setStatic()

    // Ball Texture
    const ballTexture = this.add.graphics()
    ballTexture.fillStyle(0xffffff)
    ballTexture.fillCircle(15, 15, 15)
    ballTexture.generateTexture('demo_events_ball', 30, 30)
    ballTexture.destroy()

    // Ball Drop Timer
    const timer = this.time.addEvent({
      delay: 500,
      callback: () => {
        const ball = this.planck.add.sprite(
          Phaser.Math.Between(200, 300),
          100,
          'demo_events_ball'
        )
        ball.setBody('circle', {
          restitution: Phaser.Math.FloatBetween(0.0, 0.9)
        })
        ball.setTintFill(0xCCCCCC)
        this.time.delayedCall(5000, () => {
          ball.destroy()
        }, null, this)

        ball.on('collision-start', (bodyB) => {
          ball.setTintFill(0xFFFF00)
        }, this)

        ball.on('collision-end', (bodyB) => {
          ball.setTintFill(0x00FF00)
        }, this)

      },
      //args: [],
      callbackScope: this,
      repeat: 10
    })

  }
}
