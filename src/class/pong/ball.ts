import { usePongStore } from "@/stores/pong";
import type { Coords } from "../common/coords";
import { changeYMovement, getNextBallCoords } from "@/services/BallService";

export class Ball {
	coords: Coords;
	dir: Coords;
	speed: number;
	size: number;

	constructor(coords: Coords, dir: Coords, speed: number, size: number) {
		this.coords = coords;
		this.dir = dir;
		this.speed = speed;
		this.size = size;
	}

	/**
	 * The bounce function changes the direction of the ball based on the racket's coordinates.
	 * @param {Coords} racketCoords - The racketCoords parameter is an object that represents the
	 * coordinates of the racket. It typically has two properties: x and y, which represent the x and y
	 * coordinates of the racket on the game screen.
	 */
	bounce (racketCoords: Coords) {
		this.dir = ({x: -this.dir.x, y: changeYMovement(getNextBallCoords(), racketCoords)});
	}
}