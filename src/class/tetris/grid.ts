import { Cell } from "./cell";

export class Grid {
	grid: Cell[];

	constructor(gridSize: {x: number, y: number}) {
		this.grid = new Array<Cell>(gridSize.x * gridSize.y).fill(new Cell());
	}
}