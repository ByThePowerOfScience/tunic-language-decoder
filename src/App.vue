<script setup lang="ts">
import {BottomLine, Character, TopLine, Word} from "@/ts/types";
import WordRender from "@/components/WordRender.vue";
import {reactive, ref, useTemplateRef} from "vue";
import CharacterRender from "@/components/CharacterRender.vue";

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
</script>

<template>
  <main>
    <div class="main-word-entry">
      <div class="maintextbox">
        <div class="container flex-column align-start" style="height:100%">
          <WordRender ref="mainbox" style="height:80%" is-editable/>
          <textarea v-model="textdesc"/>
        </div>
      </div>
      
      <div class="buttonpanel flex-sm-1-0">
        <v-btn @click="($refs.mainbox as TextBoxType).createNewChar()">Add Character</v-btn>
        <v-btn @click="($refs.mainbox as TextBoxType).deleteChar()">Remove Character</v-btn>
        <v-btn @click="saveWord">Save Word</v-btn>
      </div>
    </div>
    <div id="radicals-list" class="d-flex flex-column">
      <div id="radicals-upper" class="d-flex flex-row">
<!--        TODO have a list of saved radicals and when you click on them they pop into the "edit" box -->
      </div>
      <div id="radicals-lower" >
      
      </div>
    </div>
    <div class="words-list">
      <div class="listed-word-bar flex-0-0">
        <WordRender v-for="word in saved_words" class="listed-word" :word="word"/>
      </div>
    </div>
  </main>
</template>

<style scoped>
.maintextbox {
  height: 200px;
}

.words-list {
  display: flex;
  flex-direction: column;
}

.listed-word {
  height: 175px;
}
.listed-word-bar {
  display: flex;
}

.main-word-entry {
  padding: 20px;
}

.buttonpanel {
  height: 20%
}
</style>
