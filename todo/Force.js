import Phaser from 'phaser';

export default class Force extends Phaser.GameObjects.Line {

    constructor (scene, x, y, x1, y1, x2, y2, strokeColor) {
        super(scene, x, y, x1, y1, x2, y2, strokeColor);
        this.scene = scene;
        scene.add.existing(this);
        this.setVisible(false);
        this.setOrigin(1, 1);
    }

    update () {
        if (!this.scene.force.visible) return;

        this.setTo(
            this.scene.ball.x,
            this.scene.ball.y,
            this.scene.pointer.x + this.scene.cameras.main.scrollX,
            this.scene.pointer.y + this.scene.cameras.main.scrollY
        );
    }

}