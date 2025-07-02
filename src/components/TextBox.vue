<script setup lang="ts">

import {Character} from "@/ts/types";
import {reactive, ref} from "vue";
import CharacterRender from "@/components/CharacterRender.vue";

const characters = reactive([reactive(new Character())])
const selectedChar = ref(0)

defineProps(['width'])

function createNewChar() {
  selectedChar.value = characters.push(reactive(new Character())) - 1
}

function deleteChar(index: number = selectedChar.value) {
  characters.splice(index, 1)
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

defineExpose({
  selectNext,
  selectPrev,
  createNewChar,
  deleteChar
})

</script>

<template>
  <div class="maincontainer">
    <CharacterRender v-for="(character, i) in characters" :key="i"
                     :is-editable="selectedChar == i"
                     :character="character"
                     :class="(selectedChar == i) ? 'selected-character' : 'unselected-character'"
    />
  </div>
  
  
</template>

<style scoped>
.selected-character {
  background-color: lightgray;
}
.unselected-character {
  background-color: white;
}

.maincontainer {
  display:flex;
  flex-direction: row;
}
</style>