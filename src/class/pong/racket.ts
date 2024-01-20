import { RACKET_HEIGHT, RACKET_SPEED } from "@/components/data/PongData";
import type { Coords } from "./coords";

type racketType = 'player' | 'computer';

export class Racket {
	coords: Coords;
	type: racketType;

	constructor(coord: Coords, type: racketType) {
		this.coords = coord;
		this.type = type;
	}

	/**
     * The move function moves an object up or down based on the given direction, as long as it stays
     * within the boundaries of the window.
     * @param {'up' | 'down'} dir - The `dir` parameter is a string that can have two possible values:
     * 'up' or 'down'. It determines the direction in which the object will move.
     */
	move(dir: 'up' | 'down') {
		if (dir === 'up') {
			if (this.coords.y > 0)
				this.coords = { x: this.coords.x, y: this.coords.y - RACKET_SPEED };
		} else {
			if (this.coords.y + RACKET_HEIGHT < window.innerHeight )
				this.coords = { x: this.coords.x, y: this.coords.y + RACKET_SPEED };
		}
	}
}