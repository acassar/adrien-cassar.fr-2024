import { RACKET_HEIGHT, RACKET_SPEED } from "@/components/data/PongData";
import { usePongStore } from "@/stores/pong";

/**
	 * The function `moveDown` moves either the player or the enemy down based on their type.
	 * @param {'player' | 'enemy'} type - The `type` parameter is a string that can have two possible
	 * values: 'player' or 'enemy'. It is used to determine whether the function should move the player or
	 * the enemy.
	 */
export const moveDown = (type: 'player' | 'enemy') => {
	const {setPlayerCoords, setEnemyCoords, playerCoords, enemyCoords} = usePongStore();
	if (type === 'player' && playerCoords.y + RACKET_HEIGHT < window.innerHeight ) {
		setPlayerCoords({ x: playerCoords.x, y: playerCoords.y + RACKET_SPEED });
	} else if (type === 'enemy' && enemyCoords.y + RACKET_HEIGHT < window.innerHeight) {
		setEnemyCoords({ x: enemyCoords.x, y: enemyCoords.y + RACKET_SPEED });
	}
};

/**
 * The function `moveUp` moves either the player or the enemy up by a certain speed.
 * @param {'player' | 'enemy'} type - The `type` parameter is a string that can have two possible
 * values: 'player' or 'enemy'. It is used to determine whether the function should move the player or
 * the enemy.
 */
export const moveUp = (type: 'player' | 'enemy') => {
	const {setPlayerCoords, setEnemyCoords, playerCoords, enemyCoords} = usePongStore();
	if (type === 'player' && playerCoords.y > 0) {
		setPlayerCoords({ x: playerCoords.x, y: playerCoords.y - RACKET_SPEED });
	} else if (type === 'enemy' && enemyCoords.y > 0) {
		setEnemyCoords({ x: enemyCoords.x, y: enemyCoords.y - RACKET_SPEED});
	}
};