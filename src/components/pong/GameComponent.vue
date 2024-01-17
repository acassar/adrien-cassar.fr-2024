<script setup lang="ts">
import { usePongStore, type PlayerKeyType } from '@/stores/pong';
import RacketComponent from './RacketComponent.vue';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref } from 'vue';
import BallComponent from './BallComponent.vue';

const pongStore = usePongStore();

const { playerCoords, enemyCoords, ballCoords, end} = storeToRefs(pongStore);
const { setPlayerKey, play } = pongStore;
const pressingDown = ref<Set<string>>(new Set());

onMounted(() => {
	setInterval(() => {
		if (!end.value)
			play();
	}, 1);
});

const keyUpEvent = (e: KeyboardEvent) => {
	pressingDown.value.delete(e.key);
	const values = Array.from(pressingDown.value);
	if (pressingDown.value.size === 0)
		setPlayerKey(null);
	else {
		if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			setPlayerKey(values[values.length - 1] as PlayerKeyType);
		}
	}
};
const keyDownEvent = (e: KeyboardEvent) => {
	pressingDown.value.add(e.key);

	if (e.key === "ArrowDown" || e.key === "ArrowUp")
		setPlayerKey(e.key);
};

document.addEventListener('keydown', keyDownEvent);
document.addEventListener('keyup', keyUpEvent);

onUnmounted(() => {
	document.removeEventListener("keydown", keyDownEvent);
	document.removeEventListener("keyup", keyUpEvent);

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
    <BallComponent :coords="ballCoords" />
  </div>
</template>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>