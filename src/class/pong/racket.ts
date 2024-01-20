import type { Coords } from "./coords";

type racketType = 'player' | 'computer';

export class Racket {
	coords: Coords;
	type: racketType;
	constructor(coord: Coords, type: racketType) {
		this.coords = coord;
		this.type = type;
	}
}