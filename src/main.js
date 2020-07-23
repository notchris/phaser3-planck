import './style.css'
import Phaser from 'phaser'
import PlanckPhysics from './PlanckPhysics'

// Demo Scenes
import Basic from './scenes/Basic'
import Restitution from './scenes/Restitution'
import Friction from './scenes/Friction'
import Edges from './scenes/Edges'
import Force from './scenes/Force'
import Conveyer from './scenes/Conveyer'
import Events from './scenes/Events'
import Sensors from './scenes/Sensors'

// Current Demo
let current = 'Basic'

const config = {
    type: Phaser.WEBGL,
    canvas: document.querySelector('#canvas'),
    antialias: true,
    pixelArt: false,
    scene: [Basic, Restitution, Friction, Force, Edges, Conveyer, Events, Sensors],
    width: 640,
    height: 480,
    plugins: {
        scene: [
            { key: 'planckPhysics', plugin: PlanckPhysics, mapping: 'planck' }
        ]
    },
    physics: {
        planck: {
            debug: true,
            gravity: {
                x: 0,
                y: 3
            }
        }
    }
}

const game = new Phaser.Game(config)

const restart = document.querySelector('#restart')
restart.addEventListener('click', (e) => {
    game.scene.stop(current)
    game.scene.start(current)
})

const demos = document.querySelector('#demos')
demos.addEventListener('change', (e) => {
    game.scene.stop(current)
    game.scene.start(e.target.value)
    current = e.target.value
})