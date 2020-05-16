import PhaserPlanck from '../src/index';
import Tests from './scenes/Tests';

// Tests
import Basic from './scenes/Basic';
import RevoluteJoint from './scenes/RevoluteJoint';

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
    scene: [Tests, Basic, RevoluteJoint]
};

const game = new Phaser.Game(config);