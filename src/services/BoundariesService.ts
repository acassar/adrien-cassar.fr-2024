import { BALL_SPEED, RACKET_HEIGHT, RACKET_WIDTH } from "@/components/data/PongData";
import { usePongStore, type Coords } from "@/stores/pong";

/**
	 * The function `newCoordsInScreenBoundaries` calculates new coordinates for a ball within specified
	 * boundaries, taking into account the direction of the ball.
	 * @param {Coords} actualCoords - The actualCoords parameter represents the current coordinates of an
	 * object. It is an object with properties x and y, representing the x and y coordinates respectively.
	 * @param {Coords} dirCoords - The `dirCoords` parameter represents the direction in which the
	 * coordinates should be moved. It is an object with `x` and `y` properties, indicating the amount of
	 * movement in the horizontal and vertical directions respectively.
	 * @returns an object of type Coords, which has properties x and y.
	 */
export const newCoordsInScreenBoundaries = (actualCoords: Coords, dirCoords: Coords): Coords => {
	const {setBallDir, dirXWithSpeed, dirYWithSpeed, boundaries} = usePongStore();
	let newX = actualCoords.x + dirXWithSpeed;
	let newY = actualCoords.y + dirYWithSpeed;
	/* This code block is checking if the new x-coordinate of the ball is outside the left or right
    boundaries. If it is, it means that the ball has hit the left or right wall of the game area. In
    this case, the code updates the ball's direction by reversing the x-component of the direction
    vector (ballDir.x) and keeping the y-component (ballDir.y) the same. This change in direction will
    make the ball bounce off the wall and continue moving in the opposite x-direction. */
	if (newX < boundaries.left || newX > boundaries.right) {
		setBallDir({x: 0, y: 0});
		// setBallDir({x: -dirCoords.x, y: dirCoords.y});
	}
	/* This code block is checking if the new y-coordinate of the ball is outside the top or bottom
    boundaries. If it is, it means that the ball has hit the top or bottom wall of the game area. In
    this case, the code updates the ball's direction by reversing the y-component of the direction
    vector (ballDir.y) and keeping the x-component (ballDir.x) the same. This change in direction will
    make the ball bounce off the wall and continue moving in the opposite y-direction. */
	if (newY > boundaries.bottom || newY < boundaries.top) {
		setBallDir({x: dirCoords.x, y: -dirCoords.y});
	}
	newX = actualCoords.x + dirXWithSpeed;
	newY = actualCoords.y + dirYWithSpeed;
	return {x: newX, y: newY};
};

export const handleRacketCollisions = (racketCoords: Coords, ballCords: Coords, ballDirCoords: Coords): Coords => {
	const {dirXWithSpeed, dirYWithSpeed, setBallDir} = usePongStore();
	let newX = ballCords.x + dirXWithSpeed;
	let newY = ballCords.y + dirYWithSpeed;

	if (newX > racketCoords.x && newX < racketCoords.x + RACKET_WIDTH && newY > racketCoords.y && newY < racketCoords.y + RACKET_HEIGHT) {
		setBallDir({x: -ballDirCoords.x, y: ballDirCoords.y});
	}

	newX = ballCords.x + dirXWithSpeed;
	newY = ballCords.y + dirYWithSpeed;
	return {x: newX, y: newY};
};