<script setup lang="ts">
import {provide} from 'vue';
import GridComponent from './GridComponent.vue';
const SQUARESIZE = 50;

provide("squareSize", SQUARESIZE);

</script>

<template>
  <GridComponent />
</template>

<style scoped>

</style>