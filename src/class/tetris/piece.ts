import type { PieceBlock } from "./pieceBlock";

export abstract class Piece {
	pieceBlocks: PieceBlock[];

	constructor(pieceBlocks: PieceBlock[]) {
		this.pieceBlocks = pieceBlocks;
	}
}