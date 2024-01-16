<script setup lang="ts">
import { usePongStore } from '@/stores/pong';
import RacketComponent from './RacketComponent.vue';
import { storeToRefs } from 'pinia';

const pongStore = usePongStore();

const { playerCoords, enemyCoords } = storeToRefs(pongStore);

</script>

<template>
  <div class="container">
    <RacketComponent
      :coords="playerCoords"
      type="player "
    />
    <RacketComponent
      :coords="enemyCoords"
      type="enemy"
    />
  </div>
</template>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>