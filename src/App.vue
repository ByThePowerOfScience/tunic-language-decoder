<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import CharacterRender from "@/components/CharacterRender.vue";
import {BottomLine, Character, TopLine} from "@/ts/types";

const char = new Character(
    [
        TopLine.VERTLEFT1,
        TopLine.VERTLEFT2,
        TopLine.BOTTOMLEFT,
        TopLine.BOTTOMRIGHT
    ],
    [
        BottomLine.VERTMID1,
        BottomLine.BOTTOMLEFT,
        BottomLine.BOTTOMRIGHT
    ]
)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <CharacterRender :character="char" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
