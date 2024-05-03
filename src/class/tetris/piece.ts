import type { PieceBlock } from "./pieceBlock";

export abstract class Piece {
	pieceBlocks: PieceBlock[];

	move(offset: number) {
		this.pieceBlocks.forEach(pieceBlock => {
			pieceBlock.position = pieceBlock.position + offset;
		});
	}

	constructor(pieceBlocks: PieceBlock[]) {
		this.pieceBlocks = pieceBlocks;
	}
}