<script setup lang="ts">
import { RACKET_HEIGHT, RACKET_WIDTH } from '../data/PongData';

defineProps<{
	type : 'player ' | 'enemy'
	coords: {x: number, y: number}
}>();
</script>

<template>
  <div
    :style="`top: ${coords.y}px; left: ${coords.x}px; width: ${RACKET_WIDTH}px; height: ${RACKET_HEIGHT}px;`"
    :class="`racket ${type}`"
  />
</template>

<style scoped>
.racket {
    position: absolute;
    /* top: 0px; */
}

.player {
    /* left: 1rem; */
    background-color: rgb(255, 0, 0);
}

.enemy {
    background-color: rgb(0, 0, 255);
    /* right: 1rem; */
}
</style>