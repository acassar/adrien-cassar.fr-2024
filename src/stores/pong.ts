import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { BALL_SPEED, RACKET_WIDTH, SPACE_SIDES } from '@/components/data/PongData';
import { newCoordsInScreenBoundaries } from '@/services/BoundariesService';
import { moveDown, moveUp } from '@/services/RacketService';
import { moveBall } from '@/services/BallService';

export type Coords = { x: number, y: number}
export type PlayerKeyType = null | undefined | "ArrowUp" | "ArrowDown"

export const usePongStore = defineStore('pong', () => {
	const playerCoords = ref<Coords>({ x: SPACE_SIDES, y: 0 });
	const enemyCoords = ref<Coords>({ x: window.innerWidth - (RACKET_WIDTH + SPACE_SIDES), y: 0 });
	const ballCoords = ref<Coords>({ x: window.innerWidth / 2, y: window.innerHeight / 2});
	const ballDir = ref<Coords>({ x: -1, y: -0.4 });

	const playerKey = ref<PlayerKeyType>();
	const boundaries = ref({left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight});

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

	/**
	 * The function `movePlayer` checks the value of `playerKey` and calls the appropriate function to
	 * move the player up or down based on the arrow key pressed.
	 */
	const movePlayer = () => {
		if (playerKey.value) {
			switch (playerKey.value) {
				case "ArrowUp":
					moveUp("player");
					moveUp("enemy");
					break;
				case "ArrowDown":
					moveDown("player");
					moveDown("enemy");
					break;
				default:
					break;
			}
		}
	};

	const dirXWithSpeed = computed(() => ballDir.value.x * BALL_SPEED);
	const dirYWithSpeed = computed(() => ballDir.value.y * BALL_SPEED);


	/**
	 * The function "play" executes a series of actions including moving the player, updating boundaries,
	 * and moving the ball.
	 */
	const play = () => {
		movePlayer();
		updateBoundaries();
		moveBall();
	};




	return { playerCoords, enemyCoords, setPlayerCoords, setEnemyCoords, playerKey, setPlayerKey, play, ballCoords, dirXWithSpeed, dirYWithSpeed, boundaries, ballDir, setBallDir, newCoordsInBoundaries: newCoordsInScreenBoundaries, setBallCoords };
});
