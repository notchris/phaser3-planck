require('../dist/main.js');
console.log('ok')
var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    plugins: {
        scene: [
          { key: 'PhaserPlanck', plugin: '', mapping: 'planck' }
        ]
      },
      physics: {
        planck: {
          gravity: {
            x: 0,
            y: 3
          }
        }
      },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

function create ()
{
    console.log('ok')
}