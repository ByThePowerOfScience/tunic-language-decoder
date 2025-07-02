<script setup lang="ts">
import {
  BOTLINE_VECTOR,
  bottomCoordToSvgCoord,
  BottomLine,
  Character,
  DIST_INCREMENT,
  DotType,
  HEIGHT_INCREMENT,
  LINE_WIDTH,
  LINE_Y,
  Vector
} from "@/ts/types";
import {$enum} from "ts-enum-util";
import SVGTopLinesComponent from "@/components/svg/SVGTopLinesComponent.vue";
import SVGBottomLinesComponent from "@/components/svg/SVGBottomLinesComponent.vue";

const props = defineProps<{
  character: Character,
  isEditable: boolean
}>()
const character = props.character || new Character()



const bottom_spacing = 10
const bottomStart = LINE_Y + bottom_spacing
const totalheight = bottomStart + 2 * HEIGHT_INCREMENT + 15




</script>

<template>
  <div class="tunic-character">
    <svg class="h-100" style="min-height:20rem" preserveAspectRatio="xMinYMid meet" :viewBox="`-1 -10 ${LINE_WIDTH + 1} ${totalheight + 10}`" xmlns="http://www.w3.org/2000/svg">
      <!--        draw each part of the top character -->
      <SVGTopLinesComponent :is-editable="isEditable" :character="character" />
      
      <!--        center line-->
      <line class="is-active" x1="-5" :y1="LINE_Y" :x2="LINE_WIDTH" :y2="LINE_Y" stroke-width="5" stroke="black"/>
      
      <SVGBottomLinesComponent :is-editable="isEditable" :character="character" :bottom-start="bottomStart" />
    </svg>
  </div>
</template>

<style>

.tunic-character {
  background-color: white;
}

.is-active {
  stroke: black;
  stroke-width: 4px;
}

.is-inactive {
  stroke: transparent;
  stroke-width: 0;
}

.is-placeholder {
  stroke: transparent;
  stroke-width: 7;
}

.is-editable {
  stroke: slategray;
  stroke-width: 2px;
}

circle.closed-circle {
  fill: black;
  opacity: 1;
}

circle {
  fill: none
}

</style>