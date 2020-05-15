import './style.css';
import Phaser from 'phaser';
import Game from './scenes/Game';
import PlanckPhysics from './PlanckPhysics';

const config = {
    type: Phaser.WEBGL,
    canvas: document.querySelector('#canvas'),
    antialias: true,
    pixelArt: false,
    scene: [Game],
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
                y: 1.5
            }
        }
    }
};

const game = new Phaser.Game(config);