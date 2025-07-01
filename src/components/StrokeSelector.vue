<script setup lang="ts">

import {Character, TopLine} from "@/ts/types";
import {Ref} from "vue";

defineProps<{
  char: Character
}>()

console.log(JSON.stringify(TopLine))
</script>

<template>
  <v-container fluid class="strokeselector">
      <v-checkbox color="primary"
                  v-for="[name, lineIndex] in Object.entries(TopLine).filter(([_, v]) => typeof v !== 'string')"
                  :key="lineIndex"
                  :label="name"
                  :value="char.toplines.has(lineIndex as TopLine)"
                  @update:focused="(focused: boolean) => focused ? char.toplines.add(lineIndex as TopLine) : char.toplines.delete(lineIndex as TopLine)"
      />
  </v-container>
</template>

<style scoped>

</style>