import type { Square } from "./square";

export abstract class Piece {
	squares: Square[];

	constructor(squares: Square[]) {
		this.squares = squares;
	}
}