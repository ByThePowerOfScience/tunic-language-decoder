
<script setup lang="ts">

import {ALL_TOP_LINE_VECTORS} from "@/ts/svgstuff.js";
import {Character} from "@/ts/types";
import {toggleSetStatus} from "@/ts/util";
import {getDisplayType} from "@/ts/styling/Character";

defineProps<{
  isEditable: boolean,
  character: Character
}>()
</script>


<template>
  <template v-for="[id, [start, end]] in ALL_TOP_LINE_VECTORS" :key="(isEditable && character.toplines.has(id)) ? id : -id">
    <line
        :x1="start[0]" :y1="start[1]" :x2="end[0]" :y2="end[1]"
        class="myline" :class="getDisplayType(isEditable, id, character.toplines)"
    />
    <line v-if="isEditable"
          :x1="start[0]" :y1="start[1]" :x2="end[0]" :y2="end[1]"
          @click="toggleSetStatus(id, character.toplines)"
          class="is-placeholder"
    />
  </template>
</template>

<style scoped>



</style>