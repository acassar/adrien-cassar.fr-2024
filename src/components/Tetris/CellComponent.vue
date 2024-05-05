<script setup lang="ts">
import { Cell, CellState } from '@/class/tetris/cell';
import type { Grid } from '@/class/tetris/grid';
import { computed } from 'vue';
import { ref } from 'vue';
import { inject } from 'vue';

const {grid, cell} = defineProps<{
	grid: Partial<Grid>,
	cell: Cell
}>();

const getCellColor = computed(() => {
	return (grid as Grid).getBlock(cell.position)?.color;
});

const squareSize = inject('squareSize');
const cellStyle = ref({
	width: `${squareSize}px`,
	height: `${squareSize}px`,
	'background-color': getCellColor
});





</script>

<template>
  <div
    class="cell"
    :style="cellStyle"
  />
</template>

<style scoped>
.cell {
    border: solid 1px rgba(64, 56, 92, 0.281);
    display: block;
}
</style>