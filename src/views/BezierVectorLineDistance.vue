<template>
    <h1>AB Cubic vector distance</h1>
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
    </svg>
    <p>Math.sqrt((B.x - A.x)2 + (B.x - A.x)2)</p>
    <h2>svg native vs EsMaths</h2>
    <p>Excepted NativeSVG === Maths egal</p>
    <h3>results</h3>
    <p v-show="enabled">SVG.Line.getTotalLength : {{ svgAB }}</p>
    <p>Maths : {{ AB }}</p>

    <h4>Diff SVG Native vs Maths</h4>
    <div class="messages">
        <span class="error">{{ Math.abs(svgAB- AB) }}</span>
    </div>
</template>

<script lang="ts">
import {Point} from "@/helpers/vectors/Point";
import {drawLine, drawCircle} from "@/helpers/svg/Draw";
import { defineComponent } from "vue";
import { distanceAB, sliceCurve } from "@/helpers/maths/Distance";

export default defineComponent({
    data(): {
        A:Point;
        cA:Point;
        B:Point;
        cB:Point;
        lineName: string;
        enabled: boolean;
        svgAB:number;
    } {
        return {
            A: new Point(0, 0, 1),
            cA: new Point(0, 100, 1),
            B: new Point(100, 100, 1),
            cB: new Point(100, 0, 1),
            lineName: "myLine",
            enabled: false,
            svgAB: 0,
        }
    },
    mounted() {
        console.log('BZZZZZZZIER');
        /* this.draw();
        this.enabled = true; */
    },
    methods: {
        draw() {
            console.log('mounted ', this, this.$refs);
            drawLine(this.A as Point, this.B as Point, "transparent", 2, "black", "", "", this.$refs.svg as SVGElement, true, this.lineName);
            drawCircle(this.A as Point, 'blue', 4, "", this.$refs.svg as SVGElement, true);
            drawCircle(this.B as Point, 'blue', 4, "", this.$refs.svg as SVGElement, true);
            const slicedPoints = sliceCurve({A:this.A as Point, cA:this.cA as Point, B:this.B as Point, cB:this.cB as Point}, .01);
            this.getAB()  
        },
        getAB() {
            if(this.$refs.svg ) {
                this.svgAB = (document.querySelector('#'+this.lineName) as SVGLineElement)!.getTotalLength();
            }
            else this.svgAB = 0;
        }
    },
    computed: {
        AB(): number {
            return distanceAB(this.A as Point, this.B as Point);
        },
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

.messages span.error {
    background: rgb(253, 189, 189);
    color: rgb(121, 0, 0);
    padding: 10px;
    border-radius: 10px;
}
</style>
