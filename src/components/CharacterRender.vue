<script setup lang="ts">
import {
  BOTLINE_VECTOR,
  bottomCoordToSvgCoord, BottomLine,
  Character, DIST_INCREMENT, DotType,
  HEIGHT_INCREMENT, LINE_WIDTH, LINE_Y,
  topCoordToSvgCoord, TopLine,
  TOPLINE_VECTOR, Vector
} from "@/ts/types";
import {computed} from "vue";
import {$enum} from "ts-enum-util";

const props = defineProps<{
  character: Character,
  isEditable: boolean,
  width: string | number
}>()
const character = props.character || new Character()
const width = +props.width


const allTopLines: [TopLine, Vector][] = $enum(TopLine).map(it => [it, TOPLINE_VECTOR[it]] as [TopLine, Vector]).map(([k, v]) => [k, v.map(topCoordToSvgCoord)] as [TopLine, Vector])
const allBottomLines: [BottomLine, Vector][] = $enum(BottomLine).map(it => [it, BOTLINE_VECTOR[it]] as [BottomLine, Vector]).map(([k, v]) => [k, v.map(bottomCoordToSvgCoord)] as [BottomLine, Vector])

const bottom_spacing = 10
const bottomStart = LINE_Y + bottom_spacing
const totalheight = bottomStart + 2 * HEIGHT_INCREMENT + 15

function toggleSetStatus<T>(item: T, set: Set<T>) {
  if (set.has(item))
    set.delete(item)
  else
    set.add(item)
}

function getDisplayType<T>(id: T, set: Set<T>) {
  if (set.has(id))
    return 'is-active'
  if (props.isEditable) {
    return 'is-editable'
  }
  return 'is-inactive'
}

</script>

<template>
  <div class="tunic-character" style="width:100%" >
    <svg :width="width" style="float:left" preserveAspectRatio="true" :viewBox="`-5 -10 ${LINE_WIDTH} ${totalheight + 10}`" xmlns="http://www.w3.org/2000/svg" stroke="black" fill="black">
      <!--        draw each part of the top character -->
      <template v-for="[id, [start, end]] in allTopLines" :key="(isEditable && character.toplines.has(id)) ? id : -id">
        <line
            :x1="start[0]" :y1="start[1]" :x2="end[0]" :y2="end[1]"
            class="myline" :class="getDisplayType(id, character.toplines)"
        />
        <line v-if="isEditable"
            :x1="start[0]" :y1="start[1]" :x2="end[0]" :y2="end[1]"
            @click="toggleSetStatus(id, character.toplines)"
            class="is-placeholder"
        />
      </template>
     
      
      <!--        center line-->
      <line class="is-active" x1="0" :y1="LINE_Y" :x2="LINE_WIDTH" :y2="LINE_Y" stroke-width="5" stroke="black"/>
      
      <template v-for="[id, [start, end]] in allBottomLines" :key="(isEditable && character.bottomlines.has(id)) ? id : -id">
        <line
            :x1="start[0]" :y1="start[1] + bottomStart" :x2="end[0]" :y2="end[1] + bottomStart"
            class="myline" :class="getDisplayType(id, character.bottomlines)"
        />
        <line v-if="isEditable"
              :x1="start[0]" :y1="start[1] + bottomStart" :x2="end[0]" :y2="end[1] + bottomStart"
              @click="toggleSetStatus(id, character.bottomlines)"
              class="is-placeholder"
        />
      </template>
      
      <circle :class="`${character.dotType !== DotType.NONE ? 'is-active' : (isEditable ? 'is-editable' : 'is-inactive')} ${character.dotType === DotType.CLOSED ? 'closed-circle' : ''}`"
      r="3" :cx="DIST_INCREMENT" :cy="bottomStart + HEIGHT_INCREMENT*2 + 3" />
      <circle class="is-placeholder" @click="character.dotType = (character.dotType + 1) % (DotType.CLOSED + 1)" fill="transparent"
              r="3" :cx="DIST_INCREMENT" :cy="bottomStart + HEIGHT_INCREMENT*2 + 3" />
    </svg>
  </div>
</template>

<style scoped>

.tunic-character {
  background-color: white;
  width: v-bind(width);
  height: fit-content;
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
  stroke-width: 6;
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