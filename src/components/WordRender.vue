<script setup lang="ts">

import {Character, Word} from "@/ts/types";
import {onMounted, reactive, ref} from "vue";
import CharacterRender from "@/components/CharacterRender.vue";



const {isEditable} = defineProps({
  isEditable: Boolean,
})

const selectedChar = defineModel<number>('selected-char', { default: () => -1 })

const word = defineModel<Word>('word', { default: reactive(new Word([new Character()]))})


onMounted(() => {
  if (isEditable && selectedChar.value == -1)
    selectedChar.value = 0
  if (isEditable && word.value.chars.length === 0) {
    word.value.chars.push(new Character())
  }
})

function createNewChar() {
  if (!isEditable) {
    return;
  }
  selectedChar.value = word.value.chars.push(reactive(new Character())) - 1
}

function deleteChar(index: number = selectedChar.value) {
  if (!isEditable) {
    return;
  }
  word.value.chars.splice(index, 1)
  if (selectedChar.value >= word.value.chars.length) {
    selectedChar.value = word.value.chars.length - 1
  }
}

defineExpose({
  createNewChar,
  deleteChar,
  word
})

</script>

<template>
  <div class="maincontainer flex-row align-start" style="height:100%">
    <CharacterRender v-for="(character, i) in word.chars" :key="i"
                     :is-editable="isEditable && selectedChar == i"
                     :character="character"
                     class="p-0"
                     :class="(isEditable && selectedChar == i) ? 'selected-character' : 'unselected-character'"
                     @click="selectedChar = i"
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