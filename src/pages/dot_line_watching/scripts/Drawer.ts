import {Vector2} from "../../../utils/Vector2";
import {CanvasController} from "../../../components/canvas/CanvasController";

export class Drawer {
    private position: Vector2;
    private target: number;
    private speed: number;
    private lastTime: number;
    private targets: Vector2[];
    private isFocus: boolean;

    constructor(speed: number, targets: Vector2[]) {
        CanvasController.getCanvas("main").clearCanvas();
        this.position = targets[0];
        this.targets = targets;
        this.target = 1;
        this.speed = speed;
        this.lastTime = Date.now();
        this.isFocus = true;
        this.update();
        window.addEventListener("focus", () => {
            console.log("Asd")
            this.isFocus = true;
            this.lastTime = Date.now();
        });
        window.addEventListener("blur", () => {
            this.isFocus = false;
        })
    }

    update() {
        let delta = Date.now() - this.lastTime;
        this.lastTime = Date.now();
        this.tick(delta / 1000);
        requestAnimationFrame(() => this.update())
    }

    tick(deltaTime: number) {
        if (!this.isFocus) return;
        let transform = this.targets[this.target].sub(this.position);
        let prev = this.position;
        if (transform.length() < 10) {
            this.position = this.targets[this.target];
            CanvasController.getCanvas("main").drawLine(prev, this.position);
            this.target = this.target + 1;
            if (this.target >= this.targets.length) {
                this.target = 1;
                this.position = this.targets[0];
                CanvasController.getCanvas("main").clearCanvas();
            }
            return;
        }
        this.position = this.position.add(transform.normalize().mul(this.speed * deltaTime));
        CanvasController.getCanvas("main").drawLine(prev, this.position);
    }

}