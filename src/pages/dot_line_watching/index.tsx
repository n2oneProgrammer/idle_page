import {Canvas} from "../../components/canvas/Canvas";
import {useEffect} from "react";
import {CanvasController} from "../../components/canvas/CanvasController";
import {Vector2} from "../../utils/Vector2";
import {Drawer} from "./scripts/Drawer";
import {cutLine} from "../../utils/LineOperations";

function DotLineWatchingPage() {
    useEffect(() => {
        let k = 21;
        // CanvasController.getCanvas("main").drawLine(new Vector2(40, 40), new Vector2(100, 200), {color: "red"});
        let points = cutLine(new Vector2(20, 20), new Vector2(20, 480), k);
        points.pop();
        points.push(...cutLine(new Vector2(20, 480), new Vector2(480, 480), k));
        points.pop();
        points.push(...cutLine(new Vector2(480, 480), new Vector2(480, 20), k));
        points.pop();
        points.push(...cutLine(new Vector2(480, 20), new Vector2(20, 20), k));
        points.pop();

        let finalPoints: Vector2[] = [];
        let i1 = 0;
        let i2 = points.length - 1;
        for (let i = 0; i < k; i++) {
            finalPoints.push(points[i1])
            finalPoints.push(points[(i1 + 1) % points.length])
            finalPoints.push(points[i2])
            finalPoints.push(points[(i2 + points.length - 1) % points.length])
            i1 = (i1 + 2) % points.length;
            i2 = (i2 + points.length - 2) % points.length;
        }

        i1 = 3 * k;
        i2 = 3 * k - 1;
        for (let i = 0; i < k; i++) {
            finalPoints.push(points[i1])
            finalPoints.push(points[(i1 + 1) % points.length])
            finalPoints.push(points[i2])
            finalPoints.push(points[(i2 + points.length - 1) % points.length])
            i1 = (i1 + 2) % points.length;
            i2 = (i2 + points.length - 2) % points.length;
        }
        CanvasController.getCanvas("main").clearCanvas();
        CanvasController.getCanvas("main").drawLine(new Vector2(20, 20), new Vector2(20, 500));
        CanvasController.getCanvas("main").drawLine(new Vector2(20, 500), new Vector2(500, 500));
        CanvasController.getCanvas("main").drawLine(new Vector2(500, 500), new Vector2(500, 20));
        CanvasController.getCanvas("main").drawLine(new Vector2(500, 20), new Vector2(20, 20));
        new Drawer(400, finalPoints);
    })
    return (
        <div className="App" style={{
            display: "grid",
            justifyItems:"center"
        }}>
            <Canvas id="main" width={500} height={500}/>
        </div>
    )
}

export default DotLineWatchingPage
