import { Cell } from "../cell";
import { Piece } from "../piece";

export class TPiece extends Piece {
	static pieceOrigin: number = 2;

	constructor(gridSize: number) {
		super([new Cell(TPiece.pieceOrigin), new Cell(TPiece.pieceOrigin + 1), new Cell(TPiece.pieceOrigin + 2), new Cell(TPiece.pieceOrigin + 1 + gridSize)]);
	}
}