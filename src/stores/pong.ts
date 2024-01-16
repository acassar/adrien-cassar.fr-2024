import { ref } from 'vue';
import { defineStore } from 'pinia';
import { RACKET_WIDTH, SPACE_SIDES } from '@/components/data/PongData';

type Coords = { x: number, y: number}

export const usePongStore = defineStore('pong', () => {
	const playerCoords = ref({ x: 10, y: 0 });
	const enemyCoords = ref({ x: window.innerWidth - (RACKET_WIDTH + SPACE_SIDES), y: 0 });

	const setPlayerCoords = (coords: Coords) => {
		playerCoords.value = coords;
	};

	const setEnemyCoords = (coords: Coords) => {
		enemyCoords.value = coords;
	};


	return { playerCoords, enemyCoords, setPlayerCoords, setEnemyCoords };
});
