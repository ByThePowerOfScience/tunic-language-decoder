<script setup lang="ts">
import {Character, LINE_WIDTH, LINE_Y} from "@/ts/types";
import SVGBottomLinesComponent from "@/components/svg/SVGBottomLinesComponent.vue";

const { isEditable = false } = defineProps<{
  character: Character,
  isEditable?: boolean
}>()
</script>

<template>
  <div>
    <svg height="100%" preserveAspectRatio="xMinYMid meet" :viewBox="`-1 -10 ${LINE_WIDTH} ${LINE_Y + 12}`"
         xmlns="http://www.w3.org/2000/svg">
      
      <line class="is-active" x1="-5" y1="0" :x2="LINE_WIDTH" y2="0" stroke-width="5" stroke="black"/>
      <SVGBottomLinesComponent :isEditable="isEditable" :character="character"/>
    </svg>
  </div>
</template>

<style scoped>

</style>