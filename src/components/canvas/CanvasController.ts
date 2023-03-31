import React from "react";
import {Vector2} from "../../utils/Vector2";
import {LineProperty} from "../../utils/LineProperty";

export class CanvasController {
    private static canvases: { [id: string]: CanvasController } = {};
    private DOM_Element: React.RefObject<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D | undefined;

    public static getCanvas(id: string): CanvasController {
        return CanvasController.canvases[id];
    }

    public static registerCanvas(id: string, canvas: React.RefObject<HTMLCanvasElement>) {
        CanvasController.canvases[id] = new CanvasController(canvas);
        return CanvasController.canvases[id];
    }

    public static unregisterCanvas(id: string) {
        delete CanvasController.canvases[id];
    }

    constructor(canvas: React.RefObject<HTMLCanvasElement>) {
        this.DOM_Element = canvas;
        this.onLoad()
    }

    onLoad() {
        this.ctx = this.DOM_Element.current?.getContext("2d") as CanvasRenderingContext2D;
        this.DOM_Element.current!.width = 800;
        this.DOM_Element.current!.height = 600;
    }

    drawLine(start: Vector2, end: Vector2, property: LineProperty = {}) {
        if (this.ctx == undefined) return;

        this.ctx.lineWidth = property.width || 2;
        this.ctx.strokeStyle = property.color || "white";
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
    }

    clearCanvas() {
        if (this.ctx == undefined) return;
        this.ctx.clearRect(0, 0, 800, 600);
    }
}