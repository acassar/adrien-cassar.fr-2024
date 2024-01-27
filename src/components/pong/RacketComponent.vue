<script setup lang="ts">
import type { Coords } from '@/class/common/coords';
import { RACKET_HEIGHT, RACKET_WIDTH } from '../data/PongData';

defineProps<{
	type : 'player ' | 'enemy'
	coords: Coords
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
    border-radius: 20px;
}

.player {
    background-color: #84DCCF;
}

.enemy {
    background-color: #EF626C;
}
</style>