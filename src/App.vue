<script setup lang="ts">
import {BottomLine, Character, TopLine} from "@/ts/types";
import TextBox from "@/components/TextBox.vue";
import {useTemplateRef} from "vue";

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
type TextBoxType = InstanceType<typeof TextBox>
const mainbox = useTemplateRef<TextBoxType>('mainbox')
</script>

<template>
  <main>
    <TextBox ref="mainbox" class="maintextbox"/>
    <div class="buttonpanel">
      <v-btn @click="($refs.mainbox as TextBoxType).createNewChar()">Add Character</v-btn>
      <v-btn @click="($refs.mainbox as TextBoxType).deleteChar()">Remove Character</v-btn>
    </div>
    <div class="buttonpanel">
      <v-btn @click="($refs.mainbox as TextBoxType).selectPrev()">&lt;--</v-btn>
      <v-btn @click="($refs.mainbox as TextBoxType).selectNext()">--&gt;</v-btn>
    </div>
  </main>
</template>

<style scoped>
.maintextbox {
  height: 40px;
}
</style>
