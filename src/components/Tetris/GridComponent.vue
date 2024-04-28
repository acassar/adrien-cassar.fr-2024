<script setup lang="ts">
import { Grid } from '@/class/tetris/grid';
import CellComponent from './CellComponent.vue';
import { inject } from 'vue';

const gridSizeX = 10;
const gridSizeY = 14;

const grid = new Grid({x: gridSizeX, y: gridSizeY});
const squareSize = inject('squareSize') as number;

const gridStyle = {
	width: `${squareSize * gridSizeX}px`
};

</script>
<template>
  <div class="grid-container">
    <div
      class="grid"
      :style="gridStyle"
    >
      <div
        v-for="(cell, index) in grid.grid"
        :key="index"
        class="cell-container"
      >
        <CellComponent />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cell-container {
  display: block;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  align-self: center;
}

.grid-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex: 1;
}
</style>