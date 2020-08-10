import Phaser from "phaser"

export default class Conveyer extends Phaser.Scene {
  constructor() {
    super({ key: "Conveyer" })
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
    groundTexture.generateTexture('demo_conveyer_ground', 640, 40)
    groundTexture.destroy()

    // Box Texture
    const boxTexture = this.add.graphics()
    boxTexture.fillStyle(0xffffff)
    boxTexture.fillRect(0, 0, 40, 40)
    boxTexture.generateTexture('demo_conveyer_rect', 40, 40)
    boxTexture.destroy()

    // Conveyer Texture
    const conveyerTexture = this.add.graphics()
    conveyerTexture.fillStyle(0xffffff)
    conveyerTexture.fillRect(0, 0, 300, 20)
    conveyerTexture.generateTexture('demo_conveyer_platform', 300, 20)
    conveyerTexture.destroy()


    // Ground Sprite
    const groundSprite = this.planck.add.sprite(0, 400, 'demo_conveyer_ground')
    groundSprite.setBody('box')
    groundSprite.setStatic()

    // Conveyer Sprite
    const conveyerSprite = this.planck.add.sprite(170, 200, 'demo_conveyer_platform')
    conveyerSprite.setBody('box', {
      friction: 0.8
    })
    conveyerSprite.setStatic()
    
    conveyerSprite.setConveyer(true, 2.0) // Bool, Speed

    // Box Drop Timer
    const timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        const box = this.planck.add.sprite(
          300,
          100,
          'demo_conveyer_rect'
        )
        box.setBody('box')
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
