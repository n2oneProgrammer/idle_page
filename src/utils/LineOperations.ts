import {Vector2} from "./Vector2";

export function cutLine(start: Vector2, end: Vector2, k: number): Vector2[] {
    let points: Vector2[] = [];
    points.push(start);
    let jump = end.sub(start).mul(1 / k);
    let v = start;
    for (let i = 0; i < k; i++) {
        v = v.add(jump);
        points.push(v);
    }
    console.log(points);
    return points;
}