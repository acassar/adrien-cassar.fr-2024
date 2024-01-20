import { usePongStore, } from "@/stores/pong";
import { handleRacketCollision } from "./BoundariesService";
import { RACKET_HEIGHT } from "@/components/data/PongData";
import type { Coords } from "@/class/pong/coords";


/**
 * The function `moveBall` updates the coordinates of the ball based on collisions with the player's
 * racket, the enemy's racket, and the boundaries of the game.
 */
export const moveBall = () => {
	const {setBallCoords, ballCoords, ballDir, newCoordsInBoundaries} = usePongStore();

	//handle window collisions
	setBallCoords(newCoordsInBoundaries(ballCoords, ballDir));

	//handle rackets collision
	handleRacketsCollision();
};

/**
 * The function handles collisions between two rackets in a Pong game, updating the game state
 * accordingly.
 */
const handleRacketsCollision = () => {
	const {ball, player1Coords, player2Coords, incrementTouchCounter, setNewEnemyNextContactPointDiff} = usePongStore();
	const player1Contact = handleRacketCollision(player1Coords);
	const player2Contact = handleRacketCollision(player2Coords);

	if (player1Contact) {
		ball.bounce(player1Coords);
		incrementTouchCounter();

	}

	if (player2Contact) {
		ball.bounce(player2Coords);
		incrementTouchCounter();
		setNewEnemyNextContactPointDiff();

	}
};

/**
 * The function `getNextBallCoords` calculates the next coordinates of a ball in a Pong game based on
 * its current coordinates and direction.
 * @returns an object with the updated x and y coordinates of the ball.
 */
export const getNextBallCoords = () => {
	const {ballCoords, dirXWithSpeed, dirYWithSpeed} = usePongStore();
	const newX = ballCoords.x + dirXWithSpeed;
	const newY = ballCoords.y + dirYWithSpeed;
	return {x: newX, y: newY};
};

/**
 * The function calculates the change in the y movement based on the collision coordinates and racket
 * coordinates.
 * @param {Coords} collisionCoords - The collisionCoords parameter represents the coordinates of the
 * collision point. It is an object with properties x and y, representing the x and y coordinates
 * respectively.
 * @param {Coords} racketCoords - The `racketCoords` parameter represents the coordinates of the
 * racket. It is an object with `x` and `y` properties that specify the position of the racket on the
 * screen.
 * @returns the calculated change in the y movement (0 to 1).
 */
export const changeYMovement = (collisionCoords: Coords, racketCoords: Coords) => {
	const center = racketCoords.y + RACKET_HEIGHT / 2;
	/* Calculate the change in the y-movement based on the collision coordinates and racket center.
	* The y movement is greater if the ball hits the edge of the racket.
	* Also, if the ball hits the center of the racket, the change in y-movement is 0.
	*/
	return -2 * ((center - collisionCoords.y) / RACKET_HEIGHT);
};