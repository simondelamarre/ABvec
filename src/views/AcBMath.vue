<template>
    <h1>CUBIC A curve B percent <i>(T{{ percent }})</i></h1>
    <svg version="1.1" 
        ref="svg"
        id="svg"
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        x="100px" 
        y="100px" 
        width="100px"
        height="100px" 
        viewBox="0 0 100 100" 
        enable-background="new 0 0 100 100" 
        xml:space="preserve">
        <g ref="svgGroup"></g>
    </svg>
    <div style="width: 100px; max-width: 100px">
        <label for="percent">percent: <br/>{{ percent }}</label><br/>
        <input type="range" id="percent" name="percent" min="0" max="1" step=".01" v-model="percent" style="width:100%;">
    </div>

    <p>This step only consit to compare A->B vs native SVG length A->B reduced by cubic A3->B3 Math func.</p>
    <h2>It Will be logic such as:</h2>
    <p> TODO : embad highlight JS to display calc right</p>
    <code lang="js">
        CubicN(t:number, a:number, b:number, c:number, d:number) {
            const t2 = t * t;
            const t3 = t2 * t;
            return a + 
                (-a * 3 + t * (3 * a - a * t)) * t + 
                (3 * b + t * (-6 * b + b * 3 * t)) * t + 
                (c * 3 - c * 3 * t) * t2
                + d * t3;
        }
    </code>
</template>

<script lang="ts">
import {Point} from "@/helpers/vectors/Point";
import {drawLine, drawCircle, drawSegment, drawGroup, drawRect} from "@/helpers/svg/Draw";
import { defineComponent } from "vue";
import { distanceAB, sliceCurve } from "@/helpers/maths/Distance";

export default defineComponent({
    data(): {
        points: Point[];
        Ax: number,
        A: Point;
        cA: Point;
        B: Point;
        cB: Point;
        lineName: string;
        enabled: boolean;
        svgAB: number;
        percent: number;
    } {
        return {
            Ax: 0,
            A: new Point(0, 0, 1),
            cA: new Point(50, 0, 1),
            B: new Point(100, 100, 1),
            cB: new Point(100, 100, 1),
            lineName: "myLine",
            enabled: false,
            svgAB: 0,
            points: [],
            percent: .5
        }
    },
    created() {
        this.A = new Point(this.Ax, 0, 1);
    },
    mounted() {
        this.draw();
        this.enabled = true;
    },
    methods: {
        draw() {
            const coords = {
                A: this.A as Point, 
                cA: this.cA as Point, 
                B: this.B as Point, 
                cB: this.cB as Point
            };
            drawSegment(coords, "transparent", 4, "red", "", "", this.$refs.svg as SVGElement, true, this.lineName);
            drawSegment(coords, "transparent", .1, "black", "", "", this.$refs.svg as SVGElement, true, this.lineName);
            drawCircle(this.A as Point, 'blue', 8, "", this.$refs.svg as SVGElement, true);
            drawCircle(this.cA as Point, 'blue', 8, "", this.$refs.svg as SVGElement, true);
            drawLine(this.A as Point, this.cA as Point, 'transparent', 4, 'blue', '', '', this.$refs.svg as SVGElement, true, "ac")
            drawCircle(this.A as Point, 'red', 4, "", this.$refs.svg as SVGElement, true);
            drawCircle(this.B as Point, 'red', 4, "", this.$refs.svg as SVGElement, true);
            this.getAB() 
            this.getAB();
            this.drawSlices();
        },
        getAB() {
            if(this.$refs.svg ) {
                this.svgAB = (document.querySelector('#'+this.lineName) as SVGLineElement)!.getTotalLength();
            }
            else this.svgAB = 0;
        },
        drawSlices() {
            const group = (this.$refs.svg as SVGElement).querySelector("#svgGroup");
            if (group) (group as SVGElement).innerHTML = "";
            else drawGroup("svgGroup", (this.$refs.svg as SVGElement), true);/* (this.$refs.svg as SVGElement).appendChild('<g ref="svgGroup"></g>') */
                
            (this.$refs.svgGroup as SVGElement).innerHTML = "";
           
            /* this.points = */ 
            const point = sliceCurve({A:this.A as Point, cA:this.cA as Point, B:this.B as Point, cB:this.cB as Point}, this.percent);
            console.log('this.points' , this.points);
            /* for (const [index, point] of this.points.entries()) { */
                drawCircle(point as Point, '#00800038', 8, "stroke: green", (this.$refs.svgGroup as SVGElement), true);
                /* if(index > 0) { */
                    drawRect(
                        this.A as Point, 
                        this.B as Point, 
                        point as Point, 
                        '#ff000075', 
                        2, 
                        'transparent', 
                        'blue', 
                        '', 
                        "rect-°",
                        true, 
                        this.$refs.svgGroup as SVGElement);
                    drawRect(
                        point as Point, 
                        this.A as Point, 
                        this.B as Point, 
                        '#00800038', 
                        2, 
                        'transparent', 
                        'blue', 
                        '', 
                        "rect-°",
                        true, 
                        this.$refs.svgGroup as SVGElement);
                /* }
            } */
        }
    },
    computed: {
        AB(): number {
            return distanceAB(this.A as Point, this.B as Point);
        },
        AcB(): number {
            return distanceAB(this.A as Point, this.B as Point);
        },
        getClass():string {
            return Math.abs(this.svgAB - this.AB) < 0.0000001 ? 'success': "danger";
        }
    },
    watch: {
        percent() {
            this.drawSlices();
        }
    }
});
</script>

<style lang="css">
svg {
    border: 4px solid #F1F1F1;
    background-color: 1px solid #F1F1F1;
}
.messages {
    display:flex;
    justify-content: center;
}

.messages span {
    background: rgb(253, 189, 189);
    color: rgb(121, 0, 0);
    padding: 10px;
    border-radius: 10px;
}
.messages span.error {
    background: rgb(253, 189, 189);
    color: rgb(121, 0, 0);
    padding: 10px;
    border-radius: 10px;
}
.messages span.success {
    background: rgb(182, 255, 192);
    color: rgb(18, 121, 0);
    padding: 10px;
    border-radius: 10px;
}
</style>
