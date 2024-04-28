import type { Cell } from "./cell";

export abstract class Piece {
	squares: Cell[];

	constructor(squares: Cell[]) {
		this.squares = squares;
	}
}