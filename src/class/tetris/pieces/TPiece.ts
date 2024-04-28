import { Cell } from "../cell";
import { Piece } from "../piece";

export class TPiece extends Piece {
	constructor(gridSize: number) {
		const pieceOrigin = Math.floor(gridSize / 2 - 1);
		super([new Cell(pieceOrigin), new Cell(pieceOrigin + 1), new Cell(pieceOrigin + 2), new Cell(pieceOrigin + 1 + gridSize)]);
	}
}