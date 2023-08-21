import { Point } from "../vectors/Point";

export const parseCurve = (A:Point, cA:Point, B:Point, cB:Point) => {
    return `M ${A.x} ${A.y} C ${cA.x} ${cA.y}, ${cB.x} ${cB.y}, ${B.x} ${B.y}`;
}
export const parseLine = (p:Point[]): string => {
    return `M ${p.map(p => { return p.x+" "+p.y}).join(",")}`;
}