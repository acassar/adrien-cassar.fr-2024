import type { GridSize } from "@/types/tetris/grid";
import type { PieceBlock } from "./pieceBlock";

export type PieceRotationType = 'top' | 'right' | 'bottom' | 'left'

export abstract class Piece {
	pieceBlocks: PieceBlock[];
	actualRotation: PieceRotationType;
	gridSize: GridSize;

	move(offset: number) {
		this.pieceBlocks.forEach(pieceBlock => {
			pieceBlock.position = pieceBlock.position + offset;
		});
	}

	rotate(): void {
		switch (this.actualRotation) {
			case 'top':
				this.rotateFromTop();
				this.actualRotation = 'right';
				break;
			case 'right':
				this.rotateFromRight();
				this.actualRotation = 'bottom';
				break;
			case 'bottom':
				this.rotateFromBottom();
				this.actualRotation = 'left';
				break;
			case 'left':
				this.rotateFromLeft();
				this.actualRotation = 'top';
				break;
			default: throw new Error(`Invalid rotation: ${this.actualRotation}`);
		}
	}

	abstract rotateFromTop(): void;
	abstract rotateFromRight(): void;
	abstract rotateFromBottom(): void;
	abstract rotateFromLeft(): void;

	constructor(pieceBlocks: PieceBlock[], gridSize: GridSize) {
		this.pieceBlocks = pieceBlocks;
		this.actualRotation = 'top';
		this.gridSize = gridSize;
	}
}