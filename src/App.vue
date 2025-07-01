<script setup>
import {BottomLine, Character, TopLine} from "@/ts/types";
import TextBox from "@/components/TextBox.vue";

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
</script>

<template>
  <main>
    <TextBox/>
  </main>
</template>

<style scoped>

</style>
