import {deg2rad, rad2deg} from "../../../utils/MathOperations";
import {CanvasController} from "../../../components/canvas/CanvasController";
import {Vector2} from "../../../utils/Vector2";

export interface ArmElement {
    id: number;
    angle: number;
    radius: number;
    speed: number;
}

export default class FurierSeriesAlgorithm {
    private arms: ArmElement[];
    private startPosition: Vector2;
    private endPosition: Vector2;
    private lastTime: number;
    private isFocus: boolean;
    private isDestroy: boolean;
    private lastPoint: Vector2 | undefined;

    constructor(arms: ArmElement[]) {
        this.arms = arms;
        this.startPosition = new Vector2(250, 250);
        this.endPosition = new Vector2(250, 250);
        this.lastTime = Date.now();
        this.isFocus = true;
        this.isDestroy = false;
        this.update();
        window.addEventListener("focus", () => {
            this.isFocus = true;
            this.lastTime = Date.now();
        });
        window.addEventListener("blur", () => {
            this.isFocus = false;
        })
        let canvas = CanvasController.getCanvas("background");
        canvas.clearCanvas();
    }

    onDestroy() {
        this.isFocus = false;
        this.isDestroy = true;
    }

    update() {
        if (this.isDestroy) return;
        let delta = Date.now() - this.lastTime;
        this.lastTime = Date.now();
        this.tick(delta / 1000);
        requestAnimationFrame(() => this.update())
    }

    tick(deltaTime: number) {
        if (!this.isFocus) return;
        this.arms = this.arms.map(arm => {
            arm.angle += rad2deg(arm.speed) * deltaTime
            return arm;
        })
        this.drawTransform();
        this.putPoint();
    }

    drawTransform() {
        let canvas = CanvasController.getCanvas("main");
        canvas.clearCanvas();
        let angle = 0;
        let position = this.startPosition;
        this.arms.forEach(arm => {
            // canvas.drawCircle(position, arm.radius);
            angle += arm.angle;
            let tempPos = position;
            position = position.add(Vector2.fromAngle(deg2rad(angle), arm.radius));
            canvas.drawLine(tempPos, position, {color: "red"})
        })
        this.endPosition = position;
    }

    putPoint() {
        let canvas = CanvasController.getCanvas("background");
        if (this.lastPoint != undefined)
            canvas.drawLine(this.lastPoint, this.endPosition);
        this.lastPoint = this.endPosition;
    }

}