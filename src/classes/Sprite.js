import Phaser from 'phaser'
import * as Planck from 'planck-js'

export default class Sprite extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture) {
        super(scene, x, y)
        this.scene = scene
        this.debug = scene.game.config.physics.planck.debug
        this.type = null

        this.setTexture(texture)
        if (!texture) {
            this.setVisible(false)
        }
        this.x = x
        this.y = y
        this.scene.add.existing(this)

        this.graphics = this.scene.add.graphics()

        this.render = null
        this.body = null
        this.sensor = false

        // Conveyer
        this.conveyer = false
        this.conveyerSpeed = 0

        return this
    }

    setBody (type, opts) {
        this.type = type
        this.opts = opts || {}
        this.body = this.scene.planck.world.createBody()
        this.body.setDynamic()
        this.body.setMassData({
            mass: 1,
            center: Planck.Vec2(),
            I: 1
        })
        const fixtureOptions = {
            friction: this.opts.friction || 1.0,
            restitution: this.opts.restitution || 0.0,
            density: this.opts.density || 1.0
        }

        switch (type) {
            case 'box':
                this.fixture = this.body.createFixture(
                    Planck.Box(
                        this.displayWidth / 2 / this.scene.planck.scaleFactor,
                        this.displayHeight / 2 / this.scene.planck.scaleFactor
                    ),
                    fixtureOptions
                )
                this.body.setPosition(
                    Planck.Vec2(
                        (this.x + this.displayWidth / 2) / this.scene.planck.scaleFactor,
                        (this.y - this.displayHeight / 2) / this.scene.planck.scaleFactor
                    )
                )
                break
            case 'circle':
                this.fixture = this.body.createFixture(
                    Planck.Circle(
                        (this.displayWidth / 2) / this.scene.planck.scaleFactor
                    ),
                    fixtureOptions
                )
                this.body.setPosition(
                  Planck.Vec2(
                      this.x / this.scene.planck.scaleFactor,
                      this.y / this.scene.planck.scaleFactor
                  )
                )
                break
            case 'polygon':
                this.vertices = []
                this.points = []
                this.opts.points.forEach((p) => {
                    this.vertices.push(
                        new Planck.Vec2(
                            (p[0] - this.displayWidth / 2) / this.scene.planck.scaleFactor,
                            (p[1] - this.displayHeight / 2) / this.scene.planck.scaleFactor
                        )
                    )
                    this.points.push({
                        x: p[0] - this.displayWidth / 2,
                        y: p[1] - this.displayHeight / 2
                    })
                })
                this.fixture = this.body.createFixture(
                    Planck.Polygon(this.vertices, this.opts.points.length),
                    fixtureOptions
                )
                this.body.setPosition(
                    Planck.Vec2(
                        this.x / this.scene.planck.scaleFactor,
                        this.y / this.scene.planck.scaleFactor
                    )
                )
                break
            case 'edge':
                this.fixture = this.body.createFixture(Planck.Edge(
                    Planck.Vec2(this.opts.x1 / this.scene.planck.scaleFactor, this.opts.y1 / this.scene.planck.scaleFactor),
                    Planck.Vec2(this.opts.x2 / this.scene.planck.scaleFactor, this.opts.y2 / this.scene.planck.scaleFactor)
                ),{
                    friction: 1,
                    restitution: 0.5,
                    density: 1
                })
                this.body.setStatic()
                break
            default:
                break
        }
        return this
    }

    setConveyer (bool, speed) {
        this.conveyer = bool
        this.conveyerSpeed = speed || 0
    }

    setPosition (x, y) {
        if (!this.body) return
        this.body.setTransform(
            new Planck.Vec2(
                x / this.scene.planck.scaleFactor,
                y / this.scene.planck.scaleFactor
            ),
            this.body.getAngle()
        )
    }

    getPosition () {
        if (!this.body) return
        return new Phaser.Math.Vector2(
            this.x,
            this.y
        )
    }

    setRotation (angle) {
        if (!this.body) return
        this.body.setTransform(
            this.body.getPosition(),
            angle
        )
    }

    getRotation () {
        if (!this.body) return
        return this.body.getAngle()
    }

    setStatic () {
        if (!this.body) return
        this.body.setStatic(true)
    }

    setDynamic () {
        if (!this.body) return
        this.body.setDynamic(true)
    }

    setSensor () {
        if (!this.fixture) return
        this.fixture.setSensor(true)
    }

    isSensor () {
        if (!this.fixture) return false
        return this.fixture.isSensor()
    }

    /**
     * Custom debug draw
     * Note: This should really be replaced with a shader or something.
     */
    drawDebug () {
        this.graphics.clear()
        this.graphics.lineStyle(2, 0x0000FF, 1)
        switch (this.type) {
            case 'box':
                this.graphics.translateCanvas(this.x, this.y)
                this.graphics.rotateCanvas(this.rotation)
                this.graphics.strokeRect(-this.displayWidth/2, -this.displayHeight/2, this.displayWidth, this.displayHeight)
                break
            case 'circle':
                this.graphics.translateCanvas(this.x, this.y)
                this.graphics.rotateCanvas(this.rotation)
                this.graphics.strokeCircle(0, 0, this.displayWidth/2)
                break
            case 'polygon':
                this.graphics.translateCanvas(this.x, this.y)
                this.graphics.rotateCanvas(this.rotation)
                this.graphics.strokePoints(this.points, true, true)
                break
            case 'edge':
                this.graphics.strokeLineShape({
                    x1: this.opts.x1,
                    y1: this.opts.y1,
                    x2: this.opts.x2,
                    y2: this.opts.y2
                })
                break
            default:
                break
        }
    }

    /**
     * PreSolve Planck World
     */
    preSolve (contact, oldManifold) {

        // Conveyer
        if (this.conveyer) {
            let fixtureA = contact.getFixtureA()
            let fixtureB = contact.getFixtureB()
            if (fixtureA === this.fixture) {
                contact.setTangentSpeed(-this.conveyerSpeed)
            }
            if (fixtureB === this.fixture) {
                contact.setTangentSpeed(this.conveyerSpeed)
            }
        }
    }

    /**
     * PostSolve Planck World
     */
    postSolve (contact, oldManifold) { }

    /**
     * PreDestroy / PreUpdate Methods
     */

    preDestroy () {
        this.scene.planck.world.destroyBody(this.body)
        this.graphics.destroy()
        this.body.destroy = () => {}
        this.scene.planck.sprites.forEach((s,i) => {
            if (s === this) {
                this.scene.planck.sprites.splice(i, 1)
            }
        })
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta)
        if (this.body) {
            let pb = this.body
            let pos = pb.getPosition()
            this.x = pos.x * this.scene.planck.scaleFactor
            this.y = pos.y * this.scene.planck.scaleFactor
            this.rotation = pb.getAngle()
            if (this.debug) {
                this.drawDebug()
            }
        }
    }
}