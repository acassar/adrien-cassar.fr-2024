import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { BALL_SIZE, BALL_SPEED, RACKET_HEIGHT, defaultStoreValues } from '@/components/data/PongData';
import { newCoordsInScreenBoundaries } from '@/services/BoundariesService';
import { moveBall } from '@/services/BallService';
import { Racket } from '@/class/pong/racket';
import { Ball } from '@/class/pong/ball';
import type { Coords } from '@/class/pong/coords';

export type PlayerKeyType = null | undefined | "ArrowUp" | "ArrowDown"

const getContactPointDiff = () => (Math.random() * 2 - 1) * RACKET_HEIGHT / 2;


export const usePongStore = defineStore('pong', () => {
	const player1Racket = ref<Racket>(new Racket(defaultStoreValues.player1Coords, 'player'));
	const player2Racket = ref<Racket>(new Racket(defaultStoreValues.player2Coords, 'computer'));

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

	const player1Coords = computed(() => player1Racket.value.coords);
	const player2Coords = computed(() => player2Racket.value.coords);

	/* Setters */

	const setNewEnemyNextContactPointDiff = () => {
		enemyNextContactPointDiff.value = getContactPointDiff();
	};


	const incrementTouchCounter = (() => touchCounter.value++);

	const setPlayerKey = (key: PlayerKeyType) => playerKey.value = key;

	const setPlayer1Coords = (coords: Coords) => {
		player1Racket.value.coords = coords;
	};

	const setPlayer2Coords = (coords: Coords) => {
		player2Racket.value.coords = coords;
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
 	* The function `movePlayer` checks the value of `playerKey` and moves the player's racket up or down
 	* based on the arrow key pressed.
 	*/
	const movePlayer = () => {
		if (playerKey.value) {
			switch (playerKey.value) {
				case "ArrowUp":
					player1Racket.value.move("up");
					break;
				case "ArrowDown":
					player1Racket.value.move("down");
					break;
				default:
					break;
			}
		}
	};



	/**
	 * The function `moveComputer` calculates the point of contact between the computer's racket and the
	 * ball, and moves the racket up or down based on the position of the ball.
	 */
	const moveComputer = () => {
		const pointOfContact = player2Racket.value.coords.y + RACKET_HEIGHT / 2 + enemyNextContactPointDiff.value;
		const isBelowBall = pointOfContact > ball.value.coords.y;
		const isAboveBall = pointOfContact < ball.value.coords.y;
		if (isBelowBall) {
			player2Racket.value.move('up');
		} else if (isAboveBall) {
			player2Racket.value.move('down');
		}
	};


	/**
	 * The function "play" executes a series of actions including moving the player, updating boundaries,
	 * and moving the ball.
	 */
	const play = () => {
		movePlayer();
		moveComputer();
		updateBoundaries();
		moveBall();
	};

	/**
	 * The function "reset" resets the coordinates and direction of the players and the ball to their
	 * default values.
	 */
	const reset = () => {
		setPlayer1Coords(defaultStoreValues.player1Coords);
		setPlayer2Coords(defaultStoreValues.player2Coords);
		setBallDir(defaultStoreValues.ballDir);
		setBallCoords(defaultStoreValues.ballCoords);
	};


	return {
		setNewEnemyNextContactPointDiff,
		reset,
		setPlayer1Coords,
		setPlayer2Coords,
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
		player1Coords,
		player2Coords,
		ball,
	};
});
