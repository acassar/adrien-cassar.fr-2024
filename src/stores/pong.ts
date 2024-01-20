import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { BALL_SIZE, BALL_SPEED, RACKET_HEIGHT, defaultStoreValues } from '@/components/data/PongData';
import { newCoordsInScreenBoundaries } from '@/services/BoundariesService';
import { moveDown, moveUp } from '@/services/RacketService';
import { moveBall } from '@/services/BallService';
import { Racket } from '@/class/pong/racket';
import { Ball } from '@/class/pong/ball';
import type { Coords } from '@/class/pong/coords';

export type PlayerKeyType = null | undefined | "ArrowUp" | "ArrowDown"

const getContactPointDiff = () => (Math.random() * 2 - 1) * RACKET_HEIGHT / 2;


export const usePongStore = defineStore('pong', () => {
	const playerRacket = ref<Racket>(new Racket(defaultStoreValues.playerCoords, 'player'));
	const computerRacket = ref<Racket>(new Racket(defaultStoreValues.computerCoords, 'computer'));

	const ball = ref<Ball>(new Ball(defaultStoreValues.ballCoords, defaultStoreValues.ballDir, BALL_SPEED, BALL_SIZE));
	const touchCounter = ref(defaultStoreValues.touchCounter);

	const enemyNextContactPointDiff = ref(getContactPointDiff());

	const playerKey = ref<PlayerKeyType>(defaultStoreValues.playerKey);
	const boundaries = ref({left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight});

	const end = ref(defaultStoreValues.end);

	/* Getters */

	const dirXWithSpeed = computed(() => ball.value.dir.x * BALL_SPEED);
	const dirYWithSpeed = computed(() => ball.value.dir.y * BALL_SPEED);

	const ballCoords = computed(() => ball.value.coords);
	const ballDir = computed(() => ball.value.dir);

	const playerCoords = computed(() => playerRacket.value.coords);
	const computerCoords = computed(() => computerRacket.value.coords);

	/* Setters */

	const setNewEnemyNextContactPointDiff = () => {
		enemyNextContactPointDiff.value = getContactPointDiff();
	};


	const incrementTouchCounter = (() => touchCounter.value++);

	const setPlayerKey = (key: PlayerKeyType) => playerKey.value = key;

	const setPlayerCoords = (coords: Coords) => {
		playerRacket.value.coords = coords;
	};

	const setComputerCoords = (coords: Coords) => {
		computerRacket.value.coords = coords;
	};

	const setBallDir = (_ballDir: Coords) => {
		ball.value.dir = _ballDir;
	};

	const setBallCoords = (coords: Coords) => {
		ball.value.coords = coords;
	};

	const setEnd = (_end: boolean) => {
		end.value = _end;
	};


	/* Methods */


	/**
	 * The function `updateBoundaries` updates the boundaries object with the current window dimensions.
	 */
	const updateBoundaries = () => {
		boundaries.value = {
			left: 0,
			top: 0,
			right: window.innerWidth,
			bottom: window.innerHeight
		};
	};

	/**
	 * The function `movePlayer` checks the value of `playerKey` and calls the appropriate function to
	 * move the player up or down based on the arrow key pressed.
	 */
	const movePlayer = () => {
		if (playerKey.value) {
			switch (playerKey.value) {
				case "ArrowUp":
					moveUp("player");
					break;
				case "ArrowDown":
					moveDown("player");
					break;
				default:
					break;
			}
		}
	};

	const moveEnemy = () => {
		if (computerRacket.value.coords.y + RACKET_HEIGHT / 2 + enemyNextContactPointDiff.value > ball.value.coords.y) {
			moveUp("enemy");
		} else if (computerRacket.value.coords.y + RACKET_HEIGHT / 2 + enemyNextContactPointDiff.value < ball.value.coords.y) {
			moveDown("enemy");
		}
	};


	/**
	 * The function "play" executes a series of actions including moving the player, updating boundaries,
	 * and moving the ball.
	 */
	const play = () => {
		movePlayer();
		moveEnemy();
		updateBoundaries();
		moveBall();
	};

	const reset = () => {
		setPlayerCoords(defaultStoreValues.playerCoords);
		setComputerCoords(defaultStoreValues.computerCoords);
		setBallDir(defaultStoreValues.ballDir);
		setBallCoords(defaultStoreValues.ballCoords);
	};


	return {
		setNewEnemyNextContactPointDiff,
		reset,
		setPlayerCoords,
		setComputerCoords,
		playerKey,
		setPlayerKey,
		play,
		ballCoords,
		ballDir,
		dirXWithSpeed,
		dirYWithSpeed,
		boundaries,
		setBallDir,
		newCoordsInBoundaries: newCoordsInScreenBoundaries,
		setBallCoords,
		end,
		setEnd,
		incrementTouchCounter,
		touchCounter,
		playerCoords,
		computerCoords
	};
});
