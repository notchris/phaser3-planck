import Phaser from "phaser"

export default class Sensors extends Phaser.Scene {
  constructor() {
    super({ key: "Sensors" })
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
    groundTexture.generateTexture('demo_sensors_ground', 640, 40)
    groundTexture.destroy()

    // Ball Texture
    const ballTexture = this.add.graphics()
    ballTexture.fillStyle(0xffffff)
    ballTexture.fillCircle(15, 15, 15)
    ballTexture.generateTexture('demo_sensors_ball', 30, 30)
    ballTexture.destroy()

    // Sensor Texture
    const sensorTexture = this.add.graphics()
    sensorTexture.fillStyle(0xffffff)
    sensorTexture.fillRect(0, 0, 300, 20)
    sensorTexture.generateTexture('demo_sensors_sensor', 300, 20)
    sensorTexture.destroy()

    // Ground Sprite
    const groundSprite = this.planck.add.sprite(0, 400, 'demo_sensors_ground')
    groundSprite.setBody('box')
    groundSprite.body.setStatic()

    // Sensor Sprite A
    const sensorSpriteA = this.planck.add.sprite(170, 200, 'demo_sensors_sensor')
    sensorSpriteA.setBody('box', {
      friction: 0.8
    })
    sensorSpriteA.body.setStatic()
    sensorSpriteA.fixture.setSensor(true)

    // Sensor Sprite B
    const sensorSpriteB = this.planck.add.sprite(170, 250, 'demo_sensors_sensor')
    sensorSpriteB.setBody('box', {
      friction: 0.8
    })
    sensorSpriteB.body.setStatic()
    sensorSpriteB.fixture.setSensor(true)

    // Sensor Sprite C
    const sensorSpriteC = this.planck.add.sprite(170, 300, 'demo_sensors_sensor')
    sensorSpriteC.setBody('box', {
      friction: 0.8
    })
    sensorSpriteC.body.setStatic()
    sensorSpriteC.fixture.setSensor(true)

  

    // Ball Drop Timer
    const timer = this.time.addEvent({
      delay: 500,
      callback: () => {
        const rndColor = `0x${Math.floor(Math.random()*16777215).toString(16)}`

        const ball = this.planck.add.sprite(
          Phaser.Math.Between(200, 300),
          100,
          'demo_sensors_ball'
        )
        ball.setBody('circle', {
          restitution: Phaser.Math.FloatBetween(0.0, 0.9)
        })

        ball.setTintFill(`0x${Math.floor(Math.random()*16777215).toString(16)}`)
        this.time.delayedCall(5000, () => {
          ball.destroy()
        }, null, this)

        ball.on('collision-start', (bodyB) => {
          if (bodyB.fixture.isSensor()) {
            bodyB.setTintFill(rndColor)
          }
        }, this)

      },
      //args: [],
      callbackScope: this,
      repeat: 10
    })

  }
}
