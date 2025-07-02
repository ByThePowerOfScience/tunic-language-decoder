<script setup lang="ts">

import WordRender from "@/components/WordRender.vue";
import {reactive, ref} from "vue";
import {Character, Word} from "@/ts/types";
import {Phrase} from "@/ts/dictionary";

const { phrase = new Phrase() } = defineProps<{
  phrase: Phrase
}>()

const words: Word[] = reactive([new Word()])
const selectedWord = ref(0)
const realText: string[] = reactive([""])

/// Hit space to start a new word
function onNextWord() {
  selectedWord.value = words.push(new Word([new Character()])) - 1
  realText.push("")
}

function deleteChar() {

}
</script>

<template>
<div class="container flex-row align-start h-100 border border-1">
  <div class="flex-column" v-for="(word, i) in words" :key="i">
    <WordRender
        class="pr-5 h-75" :class="{'is-selected': selectedWord == i}"
        @click="selectedWord = i"
        :word="word"
    />
    <v-text-field class="h-25" v-model="realText[i]"/>
  </div>
</div>
</template>

<style scoped>

</style>