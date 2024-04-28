import type { Cell } from "./cell";

export abstract class Piece {
	cells: Cell[];

	constructor(cells: Cell[]) {
		this.cells = cells;
	}
}