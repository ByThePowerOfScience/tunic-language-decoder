<script setup lang="ts">

import {Character} from "@/ts/types";
import {reactive, ref} from "vue";
import CharacterRender from "@/components/CharacterRender.vue";
import StrokeSelector from "@/components/StrokeSelector.vue";

const characters = reactive([reactive(new Character())])
const selectedChar = ref(0)

function createNewChar() {
  selectedChar.value = characters.push(reactive(new Character())) - 1
}

function deleteChar() {
  characters.splice(selectedChar.value, 1)
  if (selectedChar.value >= characters.length) {
    selectedChar.value = characters.length - 1
  }
}

function selectNext() {
  if (selectedChar.value >= characters.length - 1)
    selectedChar.value = characters.length - 1
  else
    selectedChar.value++
}
function selectPrev() {
  if (selectedChar.value <= 0)
    selectedChar.value = 0
  else
    selectedChar.value--
}
</script>

<template>
  <CharacterRender :is-editable="true" v-for="(character, i) in characters" :character="character" width="500" :key="i" :class="(selectedChar == i) ? 'selected-character' : 'unselected-character'"/>
  <div class="buttonpanel">
    <v-btn @click="createNewChar">Add Character</v-btn>
    <v-btn @click="deleteChar">Remove Character</v-btn>
  </div>
  <div class="buttonpanel">
    <v-btn @click="selectPrev">&lt;--</v-btn>
    <v-btn @click="selectNext">--&gt;</v-btn>
  </div>
  <div>
  
  </div>
  
  
</template>

<style scoped>
.selected-character {
  background-color: lightgray;
}
.unselected-character {
  background-color: white;
}
</style>