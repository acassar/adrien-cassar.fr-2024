<script setup lang="ts">
import { usePongStore, type PlayerKeyType } from '@/stores/pong';
import RacketComponent from './RacketComponent.vue';
import { storeToRefs } from 'pinia';
import { onUnmounted, ref, computed } from 'vue';
import BallComponent from './BallComponent.vue';
import ModalComponent from '@/components/common/ModalComponent.vue';
import ButtonComponent from '../common/ButtonComponent.vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const pongStore = usePongStore();

const { playerCoords, enemyCoords, ballCoords, end, touchCounter} = storeToRefs(pongStore);
const { setPlayerKey, play, reset, setEnd } = pongStore;
const pressingDown = ref<Set<string>>(new Set());
const start = ref(false);
const counter = ref(0);
const playInterval = ref<any>();
const counterInterval = ref<any>();

const unlockedResume = computed(() => touchCounter.value >= 15 || end.value);

const clearPlayInterval = () => {
	clearInterval(playInterval.value ?? 0);
};

const clearCounterInterval = () => {
	clearInterval(counterInterval.value ?? 0);
};

const startGame = () => {
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
	startGame();
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

const changeLocale = (locale: string) => {
	i18n.locale.value = locale;
};

</script>

<template>
  <h1
    v-if="counter > 0"
    class="counter"
  >
    {{ counter }}
  </h1>

  <a href="documents/cv.pdf">
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
      <div class="d-flex locales">
        <h3 @click="() => changeLocale('fr')">
          Français
        </h3>
        <h3 @click="() => changeLocale('en')">
          English
        </h3>
      </div>
      <div class="d-flex row">
        <div class="flex-column">
          <div class="d-flex align-center">
            <span class="icon">⬆️</span>
            <span>{{ $t("pong.arrow_up") }}</span>
          </div>
          <div class="d-flex align-center">
            <span class="icon">⬇️</span>
            <span>{{ $t("pong.arrow_down") }}</span>
          </div>
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
        <ButtonComponent @click="startGame">
          {{ $t("pong.understood") }}
        </ButtonComponent>
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

.locales {
  gap: 1rem;
  text-decoration: underline;
  cursor: pointer;
}

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