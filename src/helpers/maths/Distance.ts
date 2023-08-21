import { Point } from "../vectors/Point";
import { PathCoords } from "@/helpers/svg/Draw";
export const n2 = (n:number): number => {
    return n * n;
}

export const distanceAB = (A:Point, B:Point): number => {
    return Math.sqrt(n2(B.x - A.x) + n2(B.y - A.y))
}

export const distanceABN2 = (A:Point, B:Point): number => {
    return n2(n2(B.x - A.x) + n2(B.y - A.y))
}

export function CubicN(t:number, a:number, b:number, c:number, d:number) {
    const t2 = t * t;
    const t3 = t2 * t;
    return a + 
        (-a * 3 + t * (3 * a - a * t)) * t + 
        (3 * b + t * (-6 * b + b * 3 * t)) * t + 
        (c * 3 - c * 3 * t) * t2
        + d * t3;
}

export const sliceCurve  = (coords:PathCoords, percent: number): Point => {
    /* const points: Point[] = [];
    const steps = Math.abs(1 * percent);
    console.log('steps ', steps)
    for (let i = 0; i < steps+1;  i++) { */
        const x = CubicN((percent/* *i */), coords.A.x, coords.cA!.x, coords.cB!.x, coords.B!.x);
        const y = CubicN((percent/* *i */), coords.A!.y, coords.cA!.y, coords.cB!.y, coords.B!.y);
        // points.push(new Point(x, y, 1));
    /* } */
    return new Point(x, y, 1);
}