import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { BALL_SPEED, RACKET_HEIGHT, RACKET_SPEED, RACKET_WIDTH, SPACE_SIDES } from '@/components/data/PongData';

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

	const dirXWithSpeed = computed(() => ballDir.value.x * BALL_SPEED);
	const dirYWithSpeed = computed(() => ballDir.value.y * BALL_SPEED);

	/**
	 * The function `newCoordsInBoundaries` calculates new coordinates for a ball within specified
	 * boundaries, taking into account the direction of the ball.
	 * @param {Coords} actualCoords - The actualCoords parameter represents the current coordinates of an
	 * object. It is an object with properties x and y, representing the x and y coordinates respectively.
	 * @param {Coords} dirCoords - The `dirCoords` parameter represents the direction in which the
	 * coordinates should be moved. It is an object with `x` and `y` properties, indicating the amount of
	 * movement in the horizontal and vertical directions respectively.
	 * @returns an object of type Coords, which has properties x and y.
	 */
	const newCoordsInBoundaries = (actualCoords: Coords, dirCoords: Coords): Coords => {
		const newX = actualCoords.x + dirXWithSpeed.value;
		const newY = actualCoords.y + dirYWithSpeed.value;
		/* This code block is checking if the new x-coordinate of the ball is outside the left or right
		boundaries. If it is, it means that the ball has hit the left or right wall of the game area. In
		this case, the code updates the ball's direction by reversing the x-component of the direction
		vector (ballDir.x) and keeping the y-component (ballDir.y) the same. This change in direction will
		make the ball bounce off the wall and continue moving in the opposite x-direction. */
		if (newX < boundaries.value.left || newX > boundaries.value.right) {
			ballDir.value = {x: -dirCoords.x, y: dirCoords.y};
		}
		/* This code block is checking if the new y-coordinate of the ball is outside the top or bottom
		boundaries. If it is, it means that the ball has hit the top or bottom wall of the game area. In
		this case, the code updates the ball's direction by reversing the y-component of the direction
		vector (ballDir.y) and keeping the x-component (ballDir.x) the same. This change in direction will
		make the ball bounce off the wall and continue moving in the opposite y-direction. */
		if (newY > boundaries.value.bottom || newY < boundaries.value.top) {
			ballDir.value = {x: dirCoords.x, y: -dirCoords.y};
		}

		return {x: actualCoords.x + (dirCoords.x * BALL_SPEED), y: actualCoords.y + (dirCoords.y * BALL_SPEED)};
	};

	/**
	 * The moveBall function updates the coordinates of a ball within specified boundaries.
	 */
	const moveBall = () => {
		ballCoords.value = newCoordsInBoundaries(ballCoords.value, ballDir.value);
	};

	/**
	 * The function "play" executes a series of actions including moving the player, updating boundaries,
	 * and moving the ball.
	 */
	const play = () => {
		movePlayer();
		updateBoundaries();
		moveBall();
	};

	/**
	 * The function `moveDown` moves either the player or the enemy down based on their type.
	 * @param {'player' | 'enemy'} type - The `type` parameter is a string that can have two possible
	 * values: 'player' or 'enemy'. It is used to determine whether the function should move the player or
	 * the enemy.
	 */
	const moveDown = (type: 'player' | 'enemy') => {

		if (type === 'player' && playerCoords.value.y + RACKET_HEIGHT < window.innerHeight ) {
			setPlayerCoords({ x: playerCoords.value.x, y: playerCoords.value.y + RACKET_SPEED });
		} else if (type === 'enemy') {
			setEnemyCoords({ x: enemyCoords.value.x, y: enemyCoords.value.y + RACKET_SPEED });
		}
	};

	/**
	 * The function `moveUp` moves either the player or the enemy up by a certain speed.
	 * @param {'player' | 'enemy'} type - The `type` parameter is a string that can have two possible
	 * values: 'player' or 'enemy'. It is used to determine whether the function should move the player or
	 * the enemy.
	 */
	const moveUp = (type: 'player' | 'enemy') => {
		if (type === 'player' && playerCoords.value.y > 0) {
			setPlayerCoords({ x: playerCoords.value.x, y: playerCoords.value.y - RACKET_SPEED });
		} else if (type === 'enemy') {
			setEnemyCoords({ x: enemyCoords.value.x, y: enemyCoords.value.y - RACKET_SPEED });
		}
	};


	return { playerCoords, enemyCoords, setPlayerCoords, setEnemyCoords, playerKey, setPlayerKey, play, ballCoords };
});
