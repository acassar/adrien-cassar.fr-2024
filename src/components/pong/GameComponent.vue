<script setup lang="ts">
import { usePongStore, type gameModeType } from '@/stores/pong';
import RacketComponent from './RacketComponent.vue';
import { storeToRefs } from 'pinia';
import { onUnmounted, ref, computed } from 'vue';
import BallComponent from './BallComponent.vue';
import ModalComponent from '@/components/common/ModalComponent.vue';
import ButtonComponent from '../common/ButtonComponent.vue';
import { allowedKeys } from '../data/PongData';
import CommandComponent from './CommandComponent.vue';

const pongStore = usePongStore();

const { player1Coords, player2Coords, ballCoords, end, touchCounter, gameMode} = storeToRefs(pongStore);
const { setUserKeyPressing, play, reset, setEnd, setGameMode } = pongStore;
const pressingDown = ref<Set<string>>(new Set());
const start = ref(false);
const counter = ref(0);
const playInterval = ref<any>();
const counterInterval = ref<any>();

const unlockedResume = computed(() => touchCounter.value >= 15);

const clearPlayInterval = () => {
	clearInterval(playInterval.value ?? 0);
};

const clearCounterInterval = () => {
	clearInterval(counterInterval.value ?? 0);
};

const startGame = (gameMode: gameModeType) => {
	setGameMode(gameMode);
	counter.value = 3;
	start.value = true;
	clearPlayInterval();
	playInterval.value = setInterval(() => {
		counter.value -= 1;
		if (counter.value === 0) {
			initPlay();
			setEnd(false);
		}
	}, 1000);
};


const playAgain = () => {
	reset();
	startGame(gameMode.value);
};

const initPlay = () => {
	counterInterval.value = setInterval(() => {
		if (!end.value && start.value)
			play();
		if (end.value)
			clearCounterInterval();
	}, 1);
};

const keyUpEvent = (e: KeyboardEvent) => {
	pressingDown.value.delete(e.key);
	const values = Array.from(pressingDown.value);
	setUserKeyPressing(values);
};
const keyDownEvent = (e: KeyboardEvent) => {
	if (allowedKeys.includes(e.key)) {
		pressingDown.value.add(e.key);
		const values = Array.from(pressingDown.value);
		setUserKeyPressing(values);
	}
};

document.addEventListener('keydown', keyDownEvent);
document.addEventListener('keyup', keyUpEvent);

onUnmounted(() => {
	document.removeEventListener("keydown", keyDownEvent);
	document.removeEventListener("keyup", keyUpEvent);
	clearPlayInterval();
	clearCounterInterval();
});


</script>

<template>
  <h1
    v-if="counter > 0"
    class="counter"
  >
    {{ counter }}
  </h1>

  <a
    href="documents/cv"
    target="_blank"
  >
    <ButtonComponent
      :visible="unlockedResume"
      class="cv"
    >
      {{ $t("download_cv") }}
    </ButtonComponent>
  </a>

  <ButtonComponent
    v-if="end"
    class="play-again"
    @click="playAgain"
  >
    {{ $t("pong.play_again") }}
  </ButtonComponent>

  <ModalComponent v-if="!start">
    <template #default>
      <h2 class="title">
        {{ $t("title") }}
      </h2>
      <div class="d-flex row">
        <div class="flex-column ">
          <CommandComponent
            :player="1"
            key-for-up="Z"
            key-for-down="S"
          />
          <CommandComponent
            :player="2"
            key-for-up="⬆"
            key-for-down="⬇"
          />
        </div>
        <div class="separator" />
        <div>
          <div class="text-container d-flex flex-column">
            <span class="text">{{ $t("pong.play_to_unlock_cv") }}</span>
            <br>
            <span class="text">{{ $t("pong.other_way_to_unlock") }}</span>
          </div>
        </div>
      </div>
      <div class="d-flex justify-center button">
        <ButtonComponent
          type="outline"
          @click="() => $router.back()"
        >
          {{ $t("back") }}
        </ButtonComponent>
        <ButtonComponent @click="() => startGame('1 vs 1')">
          {{ $t("pong.1_vs_1") }}
        </ButtonComponent>
        <ButtonComponent @click="() => startGame('1 vs computer')">
          {{ $t("pong.1_vs_computer") }}
        </ButtonComponent>
      </div>
    </template>
  </ModalComponent>
  <div class="container">
    <RacketComponent
      :coords="player1Coords"
      type="player "
    />
    <RacketComponent
      :coords="player2Coords"
      type="enemy"
    />
    <BallComponent :coords="ballCoords" />
  </div>
</template>

<style scoped>

.separator {
  background-color: var(--color-background);
  width: 0.2rem;
}
.row {
  margin-top: 1rem;
  gap: 2rem;
}
.text-container {
  margin-top: 2rem;
}
.cv {
	left: 50%;
	top: 10%;
	position: fixed;
  transform: translate(-50%, -50%);
}

.play-again {
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

.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>