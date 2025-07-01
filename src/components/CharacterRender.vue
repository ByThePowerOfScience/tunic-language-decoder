<script setup lang="ts">
import {
  BOTLINE_VECTOR,
  bottomCoordToSvgCoord,
  Character,
  type Coordinate, DIST_INCREMENT,
  DotType, HEIGHT_INCREMENT, LINE_WIDTH, LINE_Y,
  topCoordToSvgCoord,
  TOPLINE_VECTOR
} from "@/ts/types";

const props = defineProps<{
  character: Character,
  width: string | number,
  height: string | number
}>()
const character = props.character || new Character()
const width = +props.width
const height = +props.height

const toplinesvecs: Coordinate[][] = character.toplines.map((it) => TOPLINE_VECTOR[it]).map((it) => it.map(topCoordToSvgCoord))
const bottomlinesvecs: Coordinate[][] = character.bottomlines.map((it) => BOTLINE_VECTOR[it]).map((it) => it.map(bottomCoordToSvgCoord))


const bottom_spacing = 10
const bottomStart = LINE_Y + bottom_spacing
const totalheight = bottomStart + 2 * HEIGHT_INCREMENT

</script>

<template>
  <div class="tunic-character">
    <svg :viewBox="`-10 -10 ${LINE_WIDTH + 20} ${totalheight + 10}`" xmlns="http://www.w3.org/2000/svg" stroke="black" fill="black">
      <!--        draw each part of the top character -->
      <line v-for="[start, end] in toplinesvecs" :x1="start[0]" :y1="start[1]" :x2="end[0]" :y2="end[1]"
            class="myline"/>
      
      <!--        center line-->
      <line x1="0" :y1="LINE_Y" :x2="LINE_WIDTH" :y2="LINE_Y"/>
      
      <line v-for="[start, end] in bottomlinesvecs" :x1="start[0]" :y1="start[1] + bottomStart" :x2="end[0]" :y2="end[1] + bottomStart"
            class="myline"/>
      
      <circle v-if="character.dotType !== DotType.NONE" cx="60" :cy="bottomCoordToSvgCoord([1, 2])[1] + 5" r="5"
              fill="{{(character.dotType === DotType.CLOSED) ? 'black' : ''}}"/>
    </svg>
  </div>
</template>

<style scoped>
.myline {
  stroke: black;
}

.tunic-character {
  background-color: white;
  width: 60px;
  height: 130px;
}
</style>