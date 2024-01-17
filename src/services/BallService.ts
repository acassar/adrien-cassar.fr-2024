import { usePongStore } from "@/stores/pong";
import { handleRacketCollisions } from "./BoundariesService";

/**
	 * The moveBall function updates the coordinates of a ball within specified boundaries.
	 */
export const moveBall = () => {
	const {setBallCoords, ballCoords, ballDir, newCoordsInBoundaries, playerCoords, enemyCoords} = usePongStore();
	setBallCoords(handleRacketCollisions(playerCoords, ballCoords, ballDir));
	setBallCoords(newCoordsInBoundaries(ballCoords, ballDir));
};