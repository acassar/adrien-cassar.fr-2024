import { usePongStore } from "@/stores/pong";

/**
	 * The moveBall function updates the coordinates of a ball within specified boundaries.
	 */
export const moveBall = () => {
	const {setBallCoords, ballCoords, ballDir, newCoordsInBoundaries} = usePongStore();
	setBallCoords(newCoordsInBoundaries(ballCoords, ballDir));
};