import Phaser from "phaser";

export default class Tests extends Phaser.Scene {
  constructor() {
    super({ key: "Tests" });
  }

  init() {
    this.tests = [{
        id: 'Basic',
        title: 'Basic Test'
    }, {
        id: 'RevoluteJoint',
        title: 'Revolute Joint'
    }];
  }

  create() {
    const title = this.add.text(400, 60, 'Phaser3 + Planck Tests', { fontFamily: 'Arial', fontSize: 30, color: '#ffff00' });
    title.setOrigin(0.5);

    this.tests.forEach((test, i) => {
        const t = this.add.text(400, 160 + (i * 40), test.title, { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        t.setOrigin(0.5);
        t.setInteractive(new Phaser.Geom.Rectangle(0, 0, t.width, t.height), Phaser.Geom.Rectangle.Contains);
        t.on( 'pointerdown', () => {
            this.scene.start(test.id);
        });
    });

    this.input.on('gameobjectover', function (pointer, gameObject) {
        gameObject.setTint(0x00ff00);
    });

    this.input.on('gameobjectout', function (pointer, gameObject) {
        gameObject.clearTint();
    });
  }
}