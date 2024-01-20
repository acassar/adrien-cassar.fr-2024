import type { Coords } from "./coords";

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
}