<script setup lang="ts">
import { Grid } from '@/class/tetris/grid';
import CellComponent from './CellComponent.vue';
import { inject } from 'vue';

const {grid, gridSizeX} = defineProps<{
	grid: Partial<Grid>,
	gridSizeX: number,
	gridSizeY: number,
}>();

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
        v-for="cell in grid.grid"
        :key="cell.position"
      >
        <CellComponent
          :cell="cell"
          :grid="grid"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  align-self: center;
}

.grid-container {
  height: 100vh;
  display: flex;
  justify-content: center;
}
</style>