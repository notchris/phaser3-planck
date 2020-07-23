import Phaser from 'phaser';
import Planck from 'planck-js';
import Box from './Box';
import Edge from './Edge';

export default class Trajectory extends Phaser.GameObjects.Graphics {

    constructor (scene, options) {
        super(scene, options);
        scene.add.existing(this);
        this.setVisible(false);
    }

    getTrajectoryPoint (x, y, vx, vy, n) {

        const t = 1 / 30.0;
        
        const stepVelocityX = t * -vx / this.scene.scaleFactor;
        const stepVelocityY = t * -vy / this.scene.scaleFactor;
        const stepGravityX = t * t * (-this.scene.world.m_gravity.x);
        const stepGravityY = t * t * (-this.scene.world.m_gravity.y);

    
        x = -x / this.scene.scaleFactor;
        y = -y / this.scene.scaleFactor;
        
        let tpx = x + n * stepVelocityX + 0.5 * (n*n+n) * stepGravityX;
        let tpy = x + n * stepVelocityY + 0.5 * (n*n+n) * stepGravityY;
        
        
        tpx = -tpx * this.scene.scaleFactor;
        tpy = -tpy * this.scene.scaleFactor;
        
        return { x: tpx, y: tpy};
    }

    getLaunchVelocity() {
        const dis = Phaser.Math.Distance.Between(
            this.scene.pointer.worldX,
            this.scene.pointer.worldY,
            this.scene.ball.x,
            this.scene.ball.y
        );
        const force = Planck.Vec2.sub(
            Planck.Vec2(this.scene.pointer.worldX, this.scene.pointer.worldY),
            Planck.Vec2(this.scene.ball.x, this.scene.ball.y)
        );
        const f = force.mul(dis / 40);
        
        return { x: -f.x, y: -f.y };    
    }

    preUpdate() {
        if (!this.scene.force.visible) return;
        this.clear();
        this.fillStyle(0xffff00, 1);
        this.moveTo(this.scene.ball.x, this.scene.ball.y);
        for (let i = 0; i < 60; i += 3) {
            const lv = this.getLaunchVelocity();
            const t = this.getTrajectoryPoint(
                this.scene.ball.x,
                this.scene.ball.y,
                lv.x,
                lv.y,
                i
            );

            // check point collision
            let collides = false;
            for (let j = 0; j < this.scene.bodies.length; j += 1) {
                const b = this.scene.bodies[j];
                if (b instanceof Box) {
                    const s = new Phaser.Geom.Rectangle(b.x, b.y, b.width, b.height);
                    if (s.contains(t.x, t.y)) {
                        collides = true;
                        break;
                    }
                } else if (b instanceof Edge) {
                    const c = new Phaser.Geom.Circle(t.x, t.y, 3);
                    const s = new Phaser.Geom.Line(b.x, b.y, b.x2, b.y2);
                    if (Phaser.Geom.Intersects.LineToCircle(s, c)) {
                        collides = true;
                        break;
                    }
                }
            }
            if (collides) return;

            this.fillCircle(t.x, t.y, 3);
        }
        this.stroke();
    }

}