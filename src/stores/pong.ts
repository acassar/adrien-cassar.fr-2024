import { ref } from 'vue';
import { defineStore } from 'pinia';
import { RACKET_HEIGHT, RACKET_SPEED, RACKET_WIDTH, SPACE_SIDES } from '@/components/data/PongData';

export type Coords = { x: number, y: number}
export type PlayerKeyType = null | undefined | "ArrowUp" | "ArrowDown"

export const usePongStore = defineStore('pong', () => {
	const playerCoords = ref<Coords>({ x: SPACE_SIDES, y: 0 });
	const enemyCoords = ref<Coords>({ x: window.innerWidth - (RACKET_WIDTH + SPACE_SIDES), y: 0 });
	const ballCoords = ref<Coords>({ x: window.innerWidth / 2, y: window.innerHeight / 2});

	const playerKey = ref<PlayerKeyType>();
	const boundaries = ref({left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight});

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

	const moveBall = () => {

	};

	const play = () => {
		movePlayer();
		updateBoundaries();
	};

	const moveDown = (type: 'player' | 'enemy') => {

		if (type === 'player' && playerCoords.value.y + RACKET_HEIGHT < window.innerHeight ) {
			setPlayerCoords({ x: playerCoords.value.x, y: playerCoords.value.y + RACKET_SPEED });
		} else if (type === 'enemy') {
			setEnemyCoords({ x: enemyCoords.value.x, y: enemyCoords.value.y + RACKET_SPEED });
		}
	};

	const moveUp = (type: 'player' | 'enemy') => {
		if (type === 'player' && playerCoords.value.y > 0) {
			setPlayerCoords({ x: playerCoords.value.x, y: playerCoords.value.y - RACKET_SPEED });
		} else if (type === 'enemy') {
			setEnemyCoords({ x: enemyCoords.value.x, y: enemyCoords.value.y - RACKET_SPEED });
		}
	};


	return { playerCoords, enemyCoords, setPlayerCoords, setEnemyCoords, playerKey, setPlayerKey, play, ballCoords };
});
