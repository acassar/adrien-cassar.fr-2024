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

const squareSize = inject('squareSize');
const cellStyle = ref({
	width: `${squareSize}px`,
	height: `${squareSize}px`,
});

const getCellState = computed(() => {
	return (grid as Grid).getCellState(cell.position);
});

const cellClass = computed(() => {
	return {
		cell: true,
		occupied: getCellState.value === CellState.OCCUPIED,
		playerPiece: getCellState.value === CellState.PLAYERPIECE
	};
});


</script>

<template>
  <div
    :class="cellClass"
    :style="cellStyle"
  />
</template>

<style scoped>
.occupied {
  background-color: red;
}
.playerPiece {
  background-color: blue;
}
.cell {
    border: solid 1px rgba(64, 56, 92, 0.281);
    display: block;
}
</style>