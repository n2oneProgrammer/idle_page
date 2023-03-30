import {Vector2} from "../../../utils/Vector2";
import {CanvasController} from "../../../components/canvas/CanvasController";

export class MeshDrawer {
    private position: Vector2;
    private target: number;
    private target1: number;
    private target2: number;
    private readonly speed: number;
    private lastTime: number;
    private readonly targets: Vector2[];

    constructor(speed: number, targets: Vector2[]) {
        this.position = targets[0];
        this.targets = targets;
        this.target = 1;
        this.target1 = 1;
        this.target2 = targets.length - 1;
        this.speed = speed;
        this.lastTime = Date.now();
        this.update();
    }

    update() {
        let delta = Date.now() - this.lastTime;
        this.lastTime = Date.now();
        this.tick(delta / 1000);
        requestAnimationFrame(() => this.update())
    }

    tick(deltaTime: number) {
        let transform = this.targets[this.target].sub(this.position);
        let prev = this.position;
        if (transform.length() < 10) {
            this.position = this.targets[this.target];
            CanvasController.getCanvas("main").drawLine(prev, this.position);
            if (this.target == this.target1) {
                this.target = this.target2;
                this.target1 = (this.target1 + 1) % this.targets.length;
            } else {
                this.target = this.target1;
                this.target2 = (this.target2 + this.targets.length - 1) % this.targets.length;
            }
            console.log(this.target, this.target1, this.target2)
            return;
        }
        this.position = this.position.add(transform.normalize().mul(this.speed * deltaTime));
        CanvasController.getCanvas("main").drawLine(prev, this.position);
    }

}