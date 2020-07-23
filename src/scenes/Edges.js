import Phaser from "phaser"

export default class Edges extends Phaser.Scene {
  constructor() {
    super({ key: "Edges" })
  }

  preload () {
  }

  init() {

  }

  create() {

    // Ball Texture
    const ballTexture = this.add.graphics()
    ballTexture.fillStyle(0xffffff)
    ballTexture.fillCircle(15, 15, 15)
    ballTexture.generateTexture('demo_edges_ball', 30, 30)
    ballTexture.destroy()

    // Ball Drop Timer
    const timer = this.time.addEvent({
      delay: 500,
      callback: () => {
        const ball = this.planck.add.sprite(
          Phaser.Math.Between(200, 300),
          100,
          'demo_edges_ball'
        )
        ball.setBody('circle')
        ball.setTintFill(`0x${Math.floor(Math.random()*16777215).toString(16)}`)
        this.time.delayedCall(3000, () => {
          ball.destroy()
        }, null, this)
      },
      //args: [],
      callbackScope: this,
      repeat: 10
    })

    // Edge

    const edgeA = this.planck.add.sprite(0,0,'edge')
    edgeA.setBody('edge', {
      x1: 100,
      y1: 100,
      x2: 300,
      y2: 200
    })

    const edgeB = this.planck.add.sprite(0,0,'edge')
    edgeB.setBody('edge', {
      x1: 500,
      y1: 300,
      x2: 100,
      y2: 400
    })

  }
}
