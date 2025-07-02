
<script setup lang="ts">
import {toggleSetStatus} from "@/ts/util";
import {Character, DIST_INCREMENT, DotType, HEIGHT_INCREMENT} from "@/ts/types";
import {ALL_BOTTOM_LINE_VECTORS} from "@/ts/svgstuff";
import {getDisplayType} from "@/ts/styling/Character";

const {bottomStart = 0} = defineProps<{
  isEditable: boolean,
  character: Character,
  bottomStart?: number
}>()
</script>

<template>
  <template v-for="[id, [start, end]] in ALL_BOTTOM_LINE_VECTORS"
            :key="(isEditable && character.bottomlines.has(id)) ? id : -id">
    <line
        :x1="start[0]" :y1="start[1] + bottomStart" :x2="end[0]" :y2="end[1] + bottomStart"
        class="myline" :class="getDisplayType(isEditable, id, character.bottomlines)"
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
</template>

<style scoped>

.is-placeholder {
  stroke: transparent;
  stroke-width: 7;
}

circle {
  fill: none
}

</style>