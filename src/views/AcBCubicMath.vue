<template>
    <h1>CUBIC A curve B precision <i>(T{{ precision }}e-128)</i></h1>
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
        <label for="precision">precision: <br/>{{ precision }}</label><br/>
        <input type="range" id="precision" name="precision" min="0.0001" max=".5" step=".0001" v-model="precision" style="width:100%;">
    </div>

    <p>This step only consit to compare A->B vs native SVG length A->B reduced by cubic A3->B3 Math func.</p>
    <h2>DIFF precision Maths vs SVG native get length</h2>
    <p> precision length : {{ precisionLength }}</p>
    <p> precision length : {{ svgAB }}</p>
    <div class="messages">
        <span :class="getClass">DIFF : {{ precisionLength - svgAB }}</span>
    </div>
</template>

<script lang="ts">
import {Point} from "@/helpers/vectors/Point";
import {drawLine, drawCircle, drawSegment, drawGroup, drawRect, drawPoints} from "@/helpers/svg/Draw";
import { defineComponent } from "vue";
import { distanceAB, sliceCurve } from "@/helpers/maths/Distance";

export default defineComponent({
    data(): {
        points: Point[];
        A: Point;
        cA: Point;
        B: Point;
        cB: Point;
        lineName: string;
        enabled: boolean;
        svgAB: number;
        precision: number;
    } {
        return {
            A: new Point(0, 0, 1),
            cA: new Point(90, 10, 1),
            B: new Point(100, 100, 1),
            cB: new Point(10, 90, 1),
            lineName: "myLine",
            enabled: false,
            svgAB: 0,
            points: [],
            precision: .5
        }
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
            /* drawSegment(coords, "transparent", 1, "black", "", "", this.$refs.svg as SVGElement, true, this.lineName); */
            drawSegment(coords, "transparent", 1, "black", "", "", this.$refs.svg as SVGElement, true, this.lineName);
            drawCircle(this.A as Point, 'blue', 8, "", this.$refs.svg as SVGElement, true);
            drawCircle(this.cA as Point, 'blue', 8, "", this.$refs.svg as SVGElement, true);
            drawLine(this.A as Point, this.cA as Point, 'transparent', 4, 'blue', '', '', this.$refs.svg as SVGElement, true, "ac")
            
            drawCircle(this.B as Point, 'blue', 8, "", this.$refs.svg as SVGElement, true);
            drawCircle(this.cB as Point, 'blue', 8, "", this.$refs.svg as SVGElement, true);
            drawLine(this.B as Point, this.cB as Point, 'transparent', 4, 'blue', '', '', this.$refs.svg as SVGElement, true, "ac")
            
            drawCircle(this.A as Point, 'red', 4, "", this.$refs.svg as SVGElement, true);
            drawCircle(this.B as Point, 'red', 4, "", this.$refs.svg as SVGElement, true);
            this.getAB(); 
            this.drawSlices();
        },
        getAB() {
            if (this.$refs.svg ) 
                this.svgAB = (document.querySelector('#'+this.lineName) as SVGLineElement)!.getTotalLength();
            else this.svgAB = 0;
        },
        drawSlices() {
            let group = (this.$refs.svg as SVGElement).querySelector("#svgGroup");
            if (group) (group as SVGElement).innerHTML = "";
            else {
                group = drawGroup("svgGroup", (this.$refs.svg as SVGElement), true);
                (this.$refs.svg as SVGElement).appendChild(group);
            }
            const toNum = parseFloat(this.precision.toString());
            (this.$refs.svgGroup as SVGElement).innerHTML = "";
            this.points = [];
            for (var i=0; i<=1; i+=toNum) {
                const point = sliceCurve({A:this.A as Point, cA:this.cA as Point, B:this.B as Point, cB:this.cB as Point}, i);
                drawCircle(point as Point, '#00800038', 8, "stroke: green", (this.$refs.svgGroup as SVGElement), true);
                this.points.push(point);
            }
            drawCircle(this.B as Point, '#00800038', 8, "stroke: green", (this.$refs.svgGroup as SVGElement), true);
            this.points.push(this.B);
            drawPoints(this.points as Point[], 'transparent', 3, 'purple', '', '', 'slicepath', true, (this.$refs.svgGroup as SVGElement));
        }
    },
    computed: {
        
        precisionLength():number {
            let sum = 0;
            for(const [index, point] of this.points.entries()) {
                if(index > 0) {
                    sum += distanceAB(this.points[index-1] as Point, point as Point);
                }
            }
            return sum;
        },
        getClass():string {
            return "danger";
        }
    },
    watch: {
        precision() {
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
