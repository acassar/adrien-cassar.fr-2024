<script setup lang="ts">
import { CellState, type Cell } from '@/class/tetris/cell';
import { computed } from 'vue';
import { ref } from 'vue';
import { inject } from 'vue';

const {cell} = defineProps<{
	cell: Cell,
}>();

const squareSize = inject('squareSize');
const cellStyle = ref({
	width: `${squareSize}px`,
	height: `${squareSize}px`,
});

const cellClass = computed(() => {
	return {cell: true,
		occupied: cell.cellState === CellState.OCCUPIED
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
.cell {
    border: solid 1px rgba(64, 56, 92, 0.281);
    display: block;
}
</style>