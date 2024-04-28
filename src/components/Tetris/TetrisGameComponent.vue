<script setup lang="ts">
import {provide, onMounted} from 'vue';
import GridComponent from './GridComponent.vue';
import { Grid } from '@/class/tetris/grid';
import { TPiece } from '@/class/tetris/pieces/TPiece';
const gridSizeY = 22;
const gridSizeX = 10;
const SQUARESIZE = Math.floor(window.innerHeight / gridSizeY - 1);
const grid = new Grid({x: gridSizeX, y: gridSizeY});

provide("squareSize", SQUARESIZE);

onMounted(() => {
	grid.addPiece(new TPiece(gridSizeX));
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