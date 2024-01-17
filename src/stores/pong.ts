import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { BALL_SPEED, RACKET_HEIGHT, RACKET_WIDTH, SPACE_SIDES } from '@/components/data/PongData';
import { newCoordsInScreenBoundaries } from '@/services/BoundariesService';
import { moveDown, moveUp } from '@/services/RacketService';
import { moveBall } from '@/services/BallService';

export type Coords = { x: number, y: number}
export type PlayerKeyType = null | undefined | "ArrowUp" | "ArrowDown"


export const usePongStore = defineStore('pong', () => {
	const playerCoords = ref<Coords>({ x: SPACE_SIDES, y: window.innerHeight / 2 });
	const enemyCoords = ref<Coords>({ x: window.innerWidth - (RACKET_WIDTH + SPACE_SIDES), y: window.innerHeight / 2 });
	const ballCoords = ref<Coords>({ x: window.innerWidth / 2, y: window.innerHeight / 2});
	const ballDir = ref<Coords>({ x: Math.floor(Math.random()) * 2 - 1, y: Math.random() * 2 - 1 });
	const touchCounter = ref(0);

	const playerKey = ref<PlayerKeyType>();
	const boundaries = ref({left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight});

	const end = ref(false);

	/* Getters */

	const dirXWithSpeed = computed(() => ballDir.value.x * BALL_SPEED);
	const dirYWithSpeed = computed(() => ballDir.value.y * BALL_SPEED);

	/* Setters */

	const incrementTouchCounter = (() => touchCounter.value++);

	const setPlayerKey = (key: PlayerKeyType) => playerKey.value = key;

	const setPlayerCoords = (coords: Coords) => {
		playerCoords.value = coords;
	};

	const setEnemyCoords = (coords: Coords) => {
		enemyCoords.value = coords;
	};

	const setBallDir = (_ballDir: Coords) => {
		ballDir.value = _ballDir;
	};

	const setBallCoords = (coords: Coords) => {
		ballCoords.value = coords;
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
		const diff = Math.random() * RACKET_HEIGHT / 2;
		if (enemyCoords.value.y + RACKET_HEIGHT / 2 + diff > ballCoords.value.y) {
			moveUp("enemy");
		} else if (enemyCoords.value.y + RACKET_HEIGHT / 2 + diff < ballCoords.value.y) {
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




	return {
		playerCoords,
		enemyCoords,
		setPlayerCoords,
		setEnemyCoords,
		playerKey,
		setPlayerKey,
		play,
		ballCoords,
		dirXWithSpeed,
		dirYWithSpeed,
		boundaries,
		ballDir,
		setBallDir,
		newCoordsInBoundaries: newCoordsInScreenBoundaries,
		setBallCoords,
		end,
		setEnd,
		incrementTouchCounter,
		touchCounter
	};
});
