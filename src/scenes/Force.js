import Phaser from "phaser"
import * as Planck from 'planck-js'

export default class Force extends Phaser.Scene {
  constructor() {
    super({ key: "Force" })
  }

  preload() {
  }

  init() {

  }

  create() {

    // Ground Texture
    const groundTexture = this.add.graphics()
    groundTexture.fillStyle(0x666666)
    groundTexture.fillRect(0, 0, 640, 40)
    groundTexture.generateTexture('demo_force_ground', 640, 40)
    groundTexture.destroy()

    // Ground Sprite
    const groundSprite = this.planck.add.sprite(0, 400, 'demo_force_ground')
    groundSprite.setBody('box')
    groundSprite.body.setStatic(true)

    // Ball Texture
    const ballTexture = this.add.graphics()
    ballTexture.fillStyle(0xffffff)
    ballTexture.fillCircle(15, 15, 15)
    ballTexture.generateTexture('demo_force_ball', 30, 30)
    ballTexture.destroy()

    const balls = []
    for (let i = 0; i < 5; i += 1) {
      const ball = this.planck.add.sprite(120 + (i * 100), 300, 'demo_force_ball')
      ball.setBody('circle', {
        restitution: 0.5
      })
      ball.setTintFill(`0x${Math.floor(Math.random() * 16777215).toString(16)}`)
      balls.push(ball)

      this.time.addEvent({
        delay: 2000,
        callback: () => {
          ball.body.applyForceToCenter(Planck.Vec2(0, -Phaser.Math.Between(-600, -200)), true)
        },
        callbackScope: this,
        repeat: 10
      })

    }

  }
}
