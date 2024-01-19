import { usePongStore, type Coords } from "@/stores/pong";
import { handleRacketCollisions } from "./BoundariesService";
import { RACKET_HEIGHT } from "@/components/data/PongData";


/**
 * The function `moveBall` updates the coordinates of the ball based on collisions with the player's
 * racket, the enemy's racket, and the boundaries of the game.
 */
export const moveBall = () => {
	const {setBallCoords, ballCoords, ballDir, newCoordsInBoundaries} = usePongStore();

	setBallCoords(newCoordsInBoundaries(ballCoords, ballDir));
	handlePlayerCollisions();
	handleEnemyCollisions();
};

/**
 * The function handles collisions between the ball and the player in a Pong game, causing the ball to
 * bounce off the player's racket and incrementing a touch counter.
 */
const handlePlayerCollisions = () => {
	const {ballCoords, playerCoords, incrementTouchCounter} = usePongStore();
	const contact = handleRacketCollisions(playerCoords, ballCoords);
	if (contact) {
		bounce(playerCoords);
		incrementTouchCounter();

	}
};


/**
 * The function handles collisions between the ball and the enemy racket in a Pong game, updating the
 * enemy's next contact point difference, incrementing the touch counter, and bouncing the ball.
 */
const handleEnemyCollisions = () => {
	const {ballCoords, enemyCoords, setNewEnemyNextContactPointDiff, incrementTouchCounter} = usePongStore();

	const contact = handleRacketCollisions(enemyCoords, ballCoords);
	if (contact) {
		setNewEnemyNextContactPointDiff();
		incrementTouchCounter();
		bounce(enemyCoords);
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
 * The `bounce` function updates the direction of the ball in a Pong game based on the position of the
 * racket.
 * @param {Coords} racketCoords - The `racketCoords` parameter is an object that represents the
 * coordinates of the racket. It typically contains the `x` and `y` values that specify the position of
 * the racket on the game screen.
 */
const bounce = (racketCoords: Coords) => {
	const {ballDir, setBallDir} = usePongStore();

	setBallDir({x: -ballDir.x, y: changeYMovement(getNextBallCoords(), racketCoords)});
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
const changeYMovement = (collisionCoords: Coords, racketCoords: Coords) => {
	const center = racketCoords.y + RACKET_HEIGHT / 2;
	/* Calculate the change in the y-movement based on the collision coordinates and racket center.
	* The y movement is greater if the ball hits the edge of the racket.
	* Also, if the ball hits the center of the racket, the change in y-movement is 0.
	*/
	return -2 * ((center - collisionCoords.y) / RACKET_HEIGHT);
};