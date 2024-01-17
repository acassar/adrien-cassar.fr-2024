<script setup lang="ts">
import { usePongStore, type PlayerKeyType } from '@/stores/pong';
import RacketComponent from './RacketComponent.vue';
import { storeToRefs } from 'pinia';
import { onUnmounted, ref } from 'vue';
import BallComponent from './BallComponent.vue';
import ModalComponent from '@/components/common/ModalComponent.vue';
import ButtonComponent from '../common/ButtonComponent.vue';

const pongStore = usePongStore();

const { playerCoords, enemyCoords, ballCoords, end} = storeToRefs(pongStore);
const { setPlayerKey, play } = pongStore;
const pressingDown = ref<Set<string>>(new Set());
const start = ref(false);
const counter = ref(0);

const startGame = () => {
	counter.value = 3;
	start.value = true;
	setInterval(() => {
		counter.value -= 1;
		if (counter.value === 0) {
			initPlay();
		}
	}, 1000);
};

const initPlay = () => {
	setInterval(() => {
		if (!end.value && start.value)
			play();
	}, 1);
};

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
  <h1
    v-if="counter > 0"
    class="counter"
  >
    {{ counter }}
  </h1>

  <ButtonComponent class="cv">
    {{ $t("download_cv") }}
  </ButtonComponent>

  <ModalComponent v-if="!start">
    <template #default>
      <h2 class="title">
        {{ $t("title") }}
      </h2>
      <div class="flex-column">
        <div class="d-flex align-center">
          <span class="icon">⬆️</span>
          <span>{{ $t("pong.arrow_up") }}</span>
        </div>
        <div class="d-flex align-center">
          <span class="icon">⬇️</span>
          <span>{{ $t("pong.arrow_down") }}</span>
        </div>
        <div class="d-flex justify-center button">
          <ButtonComponent @click="startGame">
            {{ $t("pong.understood") }}
          </ButtonComponent>
        </div>
      </div>
    </template>
  </ModalComponent>
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
.cv {
	left: 50%;
	top: 5%;
	position: fixed;
    transform: translate(-50%, -50%);
}
.counter {
	left: 50%;
	top: 40%;
	position: fixed;
    transform: translate(-50%, -50%);
	font-size: 50px;
}
.title {
	font-size: 2rem;
    margin-bottom: 1rem;
}
.button {
	margin: 1rem;
}
.icon {
	font-size: 40px;
	margin: 0.2rem;
}
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>