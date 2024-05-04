import type { GridSize } from "@/types/tetris/grid";
import { Piece } from "../piece";
import { PieceBlock } from "../pieceBlock";

export class TPiece extends Piece {

	getFuturePositions(): [PieceBlock, number][] {
		switch (this.actualRotation) {
			case 'top':
				return [[this.pieceBlocks[2], this.pieceBlocks[2].position - (this.gridSize.x + 1)]];
			case 'right':
				return [[this.pieceBlocks[3], this.pieceBlocks[3].position - (this.gridSize.x - 1)]];
			case 'bottom':
				return [[this.pieceBlocks[0], this.pieceBlocks[0].position + (this.gridSize.x + 1)]];
			case 'left':
				return [
					[this.pieceBlocks[0], this.pieceBlocks[0].position - (this.gridSize.x + 1)],
					[this.pieceBlocks[2], this.pieceBlocks[2].position + (this.gridSize.x + 1)],
					[this.pieceBlocks[3], this.pieceBlocks[3].position + (this.gridSize.x - 1)],
				];
			default: throw Error("Unknown rotation: " + this.actualRotation);

		}
	}

	canRotateFromTop(): boolean {
		if (this.pieceBlocks[2].isFarTop(this.gridSize.x)) {
			this.fall();
		}
		return true;
	}

	canRotateFromRight(): boolean {
		if (this.pieceBlocks[3].isFarRight(this.gridSize.x)) {
			this.move(-1);
		}
		return true;
	}

	canRotateFromBottom(): boolean {
		if (!this.pieceBlocks[0].isFarBottom(this.gridSize)) {

			return true;
		}
		return false;
	}

	canRotateFromLeft(): boolean {
		if (this.pieceBlocks[0].isFarLeft(this.gridSize.x)) {
			this.move(1);
		}
		return true;
	}

	constructor(gridSize: GridSize) {
		const pieceOrigin = Math.floor(gridSize.x / 2 - 1);
		super([new PieceBlock(pieceOrigin), new PieceBlock(pieceOrigin + 1), new PieceBlock(pieceOrigin + 2), new PieceBlock(pieceOrigin + 1 + gridSize.x)], gridSize);
	}
}