import PhaserPlanck from '../src/index';
import Basic from './scenes/Basic';

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    plugins: {
        scene: [
          {
            key: 'PhaserPlanck',
            plugin: PhaserPlanck,
            mapping: 'planck'
          }
        ]
      },
      physics: {
        planck: {
          scaleFactor: 30,
          gravity: {
            x: 0,
            y: 6
          }
        }
      },
    scene: [Basic]
};

const game = new Phaser.Game(config);