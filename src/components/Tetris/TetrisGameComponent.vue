<script setup lang="ts">
import {onMounted, provide} from 'vue';
import GridComponent from './GridComponent.vue';
import { Grid } from '@/class/tetris/grid';
import { ref, computed } from 'vue';
import { onUnmounted } from 'vue';
import ButtonComponent from '../common/ButtonComponent.vue';
import GameOverComponent from './GameOverComponent.vue';
const gridSizeY = 22;
const gridSizeX = 10;
const SQUARESIZE = Math.floor(window.innerHeight / gridSizeY - 1);
const grid = ref(new Grid({x: gridSizeX, y: gridSizeY}));


const isGameOVer = computed(() => grid.value.gameOver);

provide("squareSize", SQUARESIZE);
const gameSpeed = ref(1000);

onMounted(() => {
	grid.value.addPiece(grid.value.getNewPiece());
});

const interval = setInterval(() => {
	if (!grid.value.gameOver)
		grid.value.fallActivePiece();
}, gameSpeed.value);

onUnmounted(() => {
	clearInterval(interval);
});

const keyDownEvent = (event: KeyboardEvent) => {
	if (!grid.value.gameOver)
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
  <div class="d-flex">
    <div class="flex">
      <router-link
        to="/"
      >
        <ButtonComponent>Retour</ButtonComponent>
      </router-link>
    </div>
    <GridComponent
      :grid="grid"
      :grid-size-x="gridSizeX"
      :grid-size-y="gridSizeY"
    />
    <GameOverComponent
      :is-game-over="isGameOVer"
      @reset="() => grid.reset()"
    />
  </div>
</template>

<style scoped>

</style>