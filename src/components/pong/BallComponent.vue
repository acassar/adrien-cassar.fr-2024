<script setup lang="ts">
import type { Coords } from '@/stores/pong';
import { BALL_SIZE } from '../data/PongData';
defineProps<{
	coords: Coords,
}>();

</script>

<template>
  <div
    class="ball"
    :style="`width: ${BALL_SIZE}px; height: ${BALL_SIZE}px; top: ${coords.y}px; left: ${coords.x}px`"
  />
</template>

<style scoped>
.ball {
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    transform: translate(-50%, -50%);
}

</style>