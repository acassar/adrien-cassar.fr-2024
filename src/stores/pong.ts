import { ref } from 'vue';
import { defineStore } from 'pinia';
import { RACKET_SPEED, RACKET_WIDTH, SPACE_SIDES } from '@/components/data/PongData';

type Coords = { x: number, y: number}
type PlayerKeyType = null | undefined | "ArrowUp" | "ArrowDown"

export const usePongStore = defineStore('pong', () => {
	const playerCoords = ref({ x: SPACE_SIDES, y: 0 });
	const enemyCoords = ref({ x: window.innerWidth - (RACKET_WIDTH + SPACE_SIDES), y: 0 });
	const playerKey = ref<PlayerKeyType>();

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

	const moveDown = (type: 'player' | 'enemy') => {
		if (type === 'player') {
			setPlayerCoords({ x: playerCoords.value.x, y: playerCoords.value.y + RACKET_SPEED });
		} else if (type === 'enemy') {
			setEnemyCoords({ x: enemyCoords.value.x, y: enemyCoords.value.y + RACKET_SPEED });
		}
	};

	const moveUp = (type: 'player' | 'enemy') => {
		if (type === 'player') {
			setPlayerCoords({ x: playerCoords.value.x, y: playerCoords.value.y - RACKET_SPEED });
		} else if (type === 'enemy') {
			setEnemyCoords({ x: enemyCoords.value.x, y: enemyCoords.value.y - RACKET_SPEED });
		}
	};


	return { playerCoords, enemyCoords, setPlayerCoords, setEnemyCoords, playerKey, setPlayerKey, movePlayer };
});
