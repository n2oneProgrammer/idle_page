import "./styles.css"
import {CanvasController} from "./CanvasController";
import React, {useEffect, useState} from "react";
import {Vector2} from "../../utils/Vector2";

export interface ICanvas {
    id: string;
    width?: number;
    height?: number;
}

export function Canvas({id, width, height}: ICanvas) {
    const canvas = React.createRef<HTMLCanvasElement>();
    const [, setController] = useState<CanvasController>();
    if (width == null && height == null) {
        width = 800;
        height = 600;
    }
    if (width == null && height != null) {
        width = 800 * (height / 600);
    }
    if (height == null && width != null) {
        height = 600 * (width / 800);
    }
    useEffect(() => {
        setController(CanvasController.registerCanvas(id, canvas, new Vector2(width as number, height as number)));
        return () => CanvasController.unregisterCanvas(id);
    }, [])

    return (
        <canvas ref={canvas}></canvas>
    )
}