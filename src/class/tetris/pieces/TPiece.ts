import { Piece } from "../piece";
import { PieceBlock } from "../pieceBlock";

export class TPiece extends Piece {
	constructor(gridSize: number) {
		const pieceOrigin = Math.floor(gridSize / 2 - 1);
		super([new PieceBlock(pieceOrigin), new PieceBlock(pieceOrigin + 1), new PieceBlock(pieceOrigin + 2), new PieceBlock(pieceOrigin + 1 + gridSize)]);
	}
}