<script setup lang="ts">
defineProps<{
	type : 'player ' | 'enemy'
	coords: {x: number, y: number}
}>();
</script>

<template>
  <div
    :style="`top: ${coords.y}px; left: ${coords.x}px;`"
    :class="`racket ${type}`"
  />
</template>

<style scoped>
.racket {
    width: 0.5rem;
    height: 3rem;
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