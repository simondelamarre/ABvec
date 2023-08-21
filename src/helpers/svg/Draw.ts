import { Point } from "../vectors/Point";
import { parseCurve, parseLine } from "./Path";

export declare type staticSVGlement = {
    styles: string,
    classes: string,
    target: SVGElement,
    append: boolean,
    id: string
}
export declare type PathCoords = {
    A: Point,
    cA?: Point,
    B: Point,
    cB?: Point
}

export const drawCircle = (
    p: Point,
    color: string,
    radius: number,
    styles: string,
    target: SVGElement,
    append: boolean
): SVGCircleElement => {
    const svgns = "http://www.w3.org/2000/svg";
    const circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'cx', p.x + 'px');
    circle.setAttributeNS(null, 'cy', p.y + 'px');
    circle.setAttributeNS(null, 'r', radius.toString());
    circle.setAttribute("fill", color);
    circle.setAttributeNS(null, 'style', styles ?? '');
    if (append) target.appendChild(circle);
    return circle;
}

/* export const parseCurve = (A:Point, cA:Point, B:Point, cB:Point): string => {
    return `M ${A.x} ${A.y} C ${cA.x} ${cA.y}, ${cB.x} ${cB.y}, ${B.x} ${B.y}`;
} */
export const drawSegment = (
    coords: PathCoords,
    fill: string,
    stroke: number,
    strokeColor: string,
    styles: string,
    classes: string,
    target: SVGElement,
    append: boolean,
    id: string
): SVGPathElement => {
    if (!coords.cA) coords.cA = coords.A;
    if (!coords.cB) coords.cB = coords.B;
    const svgns = "http://www.w3.org/2000/svg";
    const path = document.createElementNS(svgns, 'path');
    path.setAttribute('d', parseCurve(coords.A, coords.cA, coords.B, coords.cB));
    path.setAttribute("fill", fill);
    path.setAttribute("stroke", strokeColor);
    path.setAttribute("stroke-width", stroke + "px");
    path.setAttribute("style", styles);
    path.setAttribute("class", classes);
    path.setAttribute("id", id);
    if (append) target.appendChild(path);
    return path;
}
export const drawLine = (
    A: Point,
    B: Point,
    fill: string,
    stroke: number,
    strokeColor: string,
    styles: string,
    classes: string,
    target: SVGElement,
    append: boolean,
    id: string
) => {
    const svgns = "http://www.w3.org/2000/svg";
    const path = document.createElementNS(svgns, 'line');
    path.setAttribute("fill", fill);
    path.setAttribute('x1', A.x.toString());
    path.setAttribute('y1', A.y.toString());
    path.setAttribute('x2', B.x.toString());
    path.setAttribute('y2', B.y.toString());
    path.setAttribute("stroke-width", stroke + "px");
    path.setAttribute("stroke", strokeColor);
    path.setAttribute("style", styles);
    path.setAttribute("class", classes);
    path.setAttribute("id", id);
    if (append) target.appendChild(path);
    return path;
}
export const drawRect = (
    A: Point,
    B: Point,
    C: Point,
    fill: string,
    stroke: number,
    strokeColor: string,
    styles: string,
    classes: string,
    id: string,
    append: boolean,
    target: SVGElement,
): SVGElement => {
    const svgns = "http://www.w3.org/2000/svg";
    const rect = document.createElementNS(svgns, 'rect');
    // <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
    rect.setAttribute("x", A.x.toString());
    rect.setAttribute("y", A.y.toString());
    /* rect.setAttribute("x", B.x.toString());
    rect.setAttribute("y", B.y.toString()); */
    rect.setAttribute("width", (C.x - A.x).toString());
    rect.setAttribute("height", (C.y - A.y).toString());

    rect.setAttribute("stroke-width", stroke + "px");
    rect.setAttribute("stroke", strokeColor);
    rect.setAttribute("fill", fill);
    rect.setAttribute("style", styles);
    rect.setAttribute("class", classes);
    rect.setAttribute("id", id);
    if (append) {
        target.appendChild(rect);
    }
    return rect;
}

export const drawGroup = (id:string, target: SVGElement, append: boolean) => {
    const svgns = "http://www.w3.org/2000/svg";
    const group = document.createElementNS(svgns, 'group');
    group.setAttribute("id", id);
    if (append) target.appendChild(group);
    return group;
}

export const drawPoints = (
    points:Point[],
    fill: string,
    stroke: number,
    strokeColor: string,
    styles: string,
    classes: string,
    id: string,
    append: boolean,
    target: SVGElement,
): SVGElement => {
    const svgns = "http://www.w3.org/2000/svg";
    const path = document.createElementNS(svgns, 'path');
    path.setAttribute("d", parseLine(points));
    path.setAttribute("stroke-width", stroke + "px");
    path.setAttribute("stroke", strokeColor);
    path.setAttribute("fill", fill);
    path.setAttribute("style", styles);
    path.setAttribute("class", classes);
    path.setAttribute("id", id);
    if (append) target.appendChild(path);
    return path;
}

