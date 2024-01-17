import { usePongStore } from "@/stores/pong";
import { handleRacketCollisions } from "./BoundariesService";

/**
	 * The moveBall function updates the coordinates of a ball within specified boundaries.
	 */
export const moveBall = () => {
	const {setBallCoords, ballCoords, ballDir, newCoordsInBoundaries, playerCoords, enemyCoords} = usePongStore();

	/* The code is updating the coordinates of the ball based on the collisions with the player's racket,
    the enemy's racket, and the boundaries of the game. */
	setBallCoords(newCoordsInBoundaries(ballCoords, ballDir));
	setBallCoords(handleRacketCollisions(playerCoords, ballCoords, ballDir));
	setBallCoords(handleRacketCollisions(enemyCoords, ballCoords, ballDir));
};