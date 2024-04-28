<script setup lang="ts">
import { inject } from 'vue';

const squareSize = inject('squareSize');
const cellStyle = {
	width: `${squareSize} px`,
	height: `${squareSize} px`,
};

</script>

<template>
  <div
    class="cell"
    :style="cellStyle"
  />
</template>

<style scoped>
.cell {
    border: solid 1px red;
    display: block;
    width: 50px;
    height: 50px;
}
</style>