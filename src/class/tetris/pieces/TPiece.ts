import type { GridSize } from "@/types/tetris/grid";
import { Piece } from "../piece";
import { PieceBlock } from "../pieceBlock";

export class TPiece extends Piece {

	rotateFromTop(): boolean {
		if (this.pieceBlocks[2].isFarTop(this.gridSize.x)) {
			this.fall();
		}
		this.pieceBlocks[2].position = this.pieceBlocks[2].position - (this.gridSize.x + 1);
		return true;
	}

	rotateFromRight(): boolean {
		if (this.pieceBlocks[3].isFarRight(this.gridSize.x)) {
			this.move(-1);
		}
		this.pieceBlocks[3].position = this.pieceBlocks[3].position - (this.gridSize.x - 1);
		return true;
	}

	rotateFromBottom(): boolean {
		if (!this.pieceBlocks[0].isFarBottom(this.gridSize)) {
			this.pieceBlocks[0].position = this.pieceBlocks[0].position + (this.gridSize.x + 1);
			return true;
		}
		return false;
	}

	rotateFromLeft(): boolean {
		if (this.pieceBlocks[0].isFarLeft(this.gridSize.x)) {
			this.move(1);
		}
		this.pieceBlocks[0].position = this.pieceBlocks[0].position - (this.gridSize.x + 1);
		this.pieceBlocks[2].position = this.pieceBlocks[2].position + (this.gridSize.x + 1);
		this.pieceBlocks[3].position = this.pieceBlocks[3].position + (this.gridSize.x - 1);
		return true;
	}

	constructor(gridSize: GridSize) {
		const pieceOrigin = Math.floor(gridSize.x / 2 - 1);
		super([new PieceBlock(pieceOrigin), new PieceBlock(pieceOrigin + 1), new PieceBlock(pieceOrigin + 2), new PieceBlock(pieceOrigin + 1 + gridSize.x)], gridSize);
	}
}