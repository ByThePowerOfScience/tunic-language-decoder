<script setup lang="ts">
import {BottomLine, Character, TopLine, Word} from "@/ts/types";
import WordRender from "@/components/WordRender.vue";
import {reactive, ref, useTemplateRef} from "vue";
import CharacterRender from "@/components/CharacterRender.vue";
import TopRadicalView from "@/components/TopRadicalView.vue";
import BottomRadicalView from "@/components/BottomRadicalView.vue";

const char = new Character(
    new Set([
        TopLine.VERTLEFT1,
        TopLine.VERTLEFT2,
        TopLine.BOTTOMLEFT,
        TopLine.BOTTOMRIGHT
    ]),
    new Set([
        BottomLine.VERTMID1,
        BottomLine.BOTTOMLEFT,
        BottomLine.BOTTOMRIGHT
    ])
)
type TextBoxType = InstanceType<typeof WordRender>
const mainbox = useTemplateRef<TextBoxType>('mainbox')

const saved_words: Word[] = reactive([])

function saveWord() {
  saved_words.push(mainbox.value!!.word)
  mainbox.value!!.word = reactive(new Word([new Character()]))
}

const textdesc = ref("")

const savedTopRadicals: Character[] = reactive([])
const savedBottomRadicals: Character[] = reactive([])
</script>

<template>
  <main class="container" style="height:1080px;width:1920px">
    <div class="row-4">
        <div class="h-75 col mytextbox">
            <WordRender class="row" ref="mainbox" is-editable/>
            <textarea class="row" style="resize:none" v-model="textdesc" rows="1" />
        </div>
        
        <div class="h-25 btn-group">
          <button type="button" class="btn active btn-secondary" @click="($refs.mainbox as TextBoxType).createNewChar()">Add Character</button>
          <button type="button" class="btn active btn-secondary" @click="($refs.mainbox as TextBoxType).deleteChar()">Remove Character</button>
          <button type="button" class="btn active btn-secondary" @click="saveWord">Save Word</button>
        </div>
    </div>
    
    <div id="radicals-list" class="row-3 flex-column">
      <div id="radicals-upper" class="flex-row">
        <TopRadicalView v-for="(char, i) in savedTopRadicals" :key="i" :character="char" class="border-dark-subtle pr-5"/>
      </div>
      <div id="radicals-lower" class="flex-row">
        <BottomRadicalView v-for="(char, i) in savedBottomRadicals" :key="i" :character="char" class="border-dark-subtle pr-5"/>
      </div>
    </div>
    <div>
    
    </div>
    <div class="row-2">
      <ul class="list-group">
        <li v-for="word in saved_words" class="list-group-item">
          <WordRender :word="word"/>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>

</style>
