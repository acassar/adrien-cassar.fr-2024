<script setup lang="ts">
import { CellState, type Cell } from '@/class/tetris/cell';
import { ref } from 'vue';
import { inject } from 'vue';

const {cell} = defineProps<{
	cell: Cell
}>();

const squareSize = inject('squareSize');
const cellStyle = {
	width: `${squareSize}px`,
	height: `${squareSize}px`,
};

const cellClass = ref({
	cell: true,
	occupied: cell.cellState === CellState.OCCUPIED
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
  background-color: blue;
}
.cell {
    border: solid 1px red;
    display: block;
}
</style>