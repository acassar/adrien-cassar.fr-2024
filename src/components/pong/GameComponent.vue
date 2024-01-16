<script setup lang="ts">
import { usePongStore } from '@/stores/pong';
import RacketComponent from './RacketComponent.vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const pongStore = usePongStore();

const { playerCoords, enemyCoords } = storeToRefs(pongStore);
const { setPlayerKey, movePlayer } = pongStore;
const pressingDown = ref<Set<string>>(new Set());

onMounted(() => {
	setInterval(() => {
		movePlayer();
	}, 10);
});

document.addEventListener('keydown', (e) => {
	pressingDown.value.add(e.key);

	if (e.key === "ArrowDown" || e.key === "ArrowUp")
		setPlayerKey(e.key);
});

document.addEventListener('keyup', (e) => {
	pressingDown.value.delete(e.key);
	if (pressingDown.value.size === 0)
		setPlayerKey(null);

});

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