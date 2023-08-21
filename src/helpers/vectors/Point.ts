export class Point {
    private _X:number;
    private _Y:number;
    private _Z:number;
    constructor(x:number, y:number, z:number) {
      this._X = x;
      this._Y = y;
      this._Z = z;
    }
    get x():number {
      return this._X;
    }
    set x(n:number) {
      this._X = n;
    }
    get y():number {
      return this._Y;
    }
    set y(n:number) {
      this._Y = n;
    }
    get z():number {
      return this._Z;
    }
    set z(n:number) {
      this._Z = n;
    }
  }
  