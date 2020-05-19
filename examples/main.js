import PhaserPlanck from '../src/index'
import Tests from './scenes/Tests'

// Tests
import Basic from './scenes/Basic'
import RevoluteJoint from './scenes/RevoluteJoint'

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    scene: [Tests, Basic, RevoluteJoint],
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
        debug: true
      }
    }
};

new Phaser.Game(config)