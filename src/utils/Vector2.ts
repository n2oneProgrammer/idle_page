export class Vector2 {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    add(b: Vector2): Vector2 {
        return new Vector2(this._x + b.x, this._y + b._y);

    }

    sub(b: Vector2): Vector2 {
        return new Vector2(this._x - b.x, this._y - b._y);
    }

    mul(a: number): Vector2 {
        return new Vector2(this._x * a, this._y * a);
    }

    length(): number {
        return Math.sqrt(this.lengthSqt());
    }

    lengthSqt(): number {
        return this._x * this._x + this._y * this._y;
    }

    normalize() {
        return this.mul(1 / this.length());
    }

    static fromAngle(angle: number, length: number) {
        let x = length * Math.cos(angle);
        let y = length * Math.sin(angle);
        return new Vector2(x, y);
    }
}