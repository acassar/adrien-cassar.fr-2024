<script setup lang="ts">
import {onMounted, provide} from 'vue';
import GridComponent from './GridComponent.vue';
import { Grid } from '@/class/tetris/grid';
import { TPiece } from '@/class/tetris/pieces/TPiece';
import { ref } from 'vue';
import { onUnmounted } from 'vue';
const gridSizeY = 22;
const gridSizeX = 10;
const SQUARESIZE = Math.floor(window.innerHeight / gridSizeY - 1);
const grid = ref(new Grid({x: gridSizeX, y: gridSizeY}));

provide("squareSize", SQUARESIZE);
const gameSpeed = ref(1000);

onMounted(() => {
	grid.value.addPiece(new TPiece({x: gridSizeX, y: gridSizeY}));
});

const interval = setInterval(() => {
	grid.value.fallActivePiece();
}, gameSpeed.value);

onUnmounted(() => {
	clearInterval(interval);
});

const keyDownEvent = (event: KeyboardEvent) => {
	switch (event.key) {
		case "ArrowLeft":
			grid.value.moveActivePieceLeft();
			break;
		case "ArrowRight":
			grid.value.moveActivePieceRight();
			break;
		case "ArrowDown":
			grid.value.fallActivePiece();
			break;
		case "ArrowUp":
			grid.value.rotateActivePiece();
			break;
		default:
			break;
	}
};

addEventListener('keydown', keyDownEvent);

onUnmounted(() => {
	document.removeEventListener("keydown", keyDownEvent);
});


</script>

<template>
  <GridComponent
    :grid="grid"
    :grid-size-x="gridSizeX"
    :grid-size-y="gridSizeY"
  />
</template>

<style scoped>

</style>