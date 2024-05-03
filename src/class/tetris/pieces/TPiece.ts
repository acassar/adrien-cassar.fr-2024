import type { GridSize } from "@/types/tetris/grid";
import { Piece } from "../piece";
import { PieceBlock } from "../pieceBlock";

export class TPiece extends Piece {

	rotateFromTop(): void {
		this.pieceBlocks[2].position = this.pieceBlocks[2].position - (this.gridSize.x + 1);
	}

	rotateFromRight(): void {
		this.pieceBlocks[3].position = this.pieceBlocks[3].position - (this.gridSize.x - 1);
	}

	rotateFromBottom(): void {
		this.pieceBlocks[0].position = this.pieceBlocks[0].position + (this.gridSize.x + 1);
	}
	rotateFromLeft(): void {
		this.pieceBlocks[0].position = this.pieceBlocks[0].position - (this.gridSize.x + 1);
		this.pieceBlocks[2].position = this.pieceBlocks[2].position + (this.gridSize.x + 1);
		this.pieceBlocks[3].position = this.pieceBlocks[3].position + (this.gridSize.x - 1);
	}

	constructor(gridSize: GridSize) {
		const pieceOrigin = Math.floor(gridSize.x / 2 - 1);
		super([new PieceBlock(pieceOrigin), new PieceBlock(pieceOrigin + 1), new PieceBlock(pieceOrigin + 2), new PieceBlock(pieceOrigin + 1 + gridSize.x)], gridSize);
	}
}