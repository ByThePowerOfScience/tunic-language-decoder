<script setup lang="ts">
import {Character, LINE_WIDTH, LINE_Y} from "@/ts/types";
import SVGTopLinesComponent from "@/components/svg/SVGTopLinesComponent.vue";

const { isEditable = false } = defineProps<{
  character: Character,
  isEditable?: boolean
}>()
</script>

<template>
  <div>
    <svg height="100%" preserveAspectRatio="xMinYMid meet" :viewBox="`-1 -10 ${LINE_WIDTH} ${LINE_Y + 2}`"
         xmlns="http://www.w3.org/2000/svg">
      <SVGTopLinesComponent :isEditable="isEditable" :character="character"/>
      <line class="is-active" x1="-5" :y1="LINE_Y" :x2="LINE_WIDTH" :y2="LINE_Y" stroke-width="5" stroke="black"/>
    </svg>
  </div>
</template>

<style scoped>

</style>