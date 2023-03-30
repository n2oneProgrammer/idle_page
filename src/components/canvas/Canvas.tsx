import "./styles.css"
import {CanvasController} from "./CanvasController";
import React, {useEffect, useState} from "react";

export interface ICanvas {
    id: string;
}

export function Canvas({id}: ICanvas) {
    const canvas = React.createRef<HTMLCanvasElement>();
    const [controller, setController] = useState<CanvasController>();
    useEffect(() => {
        setController(CanvasController.registerCanvas(id, canvas));
        return () => CanvasController.unregisterCanvas(id);
    }, [])

    return (
        <canvas ref={canvas} onLoad={() => controller && controller.onLoad()}></canvas>
    )
}