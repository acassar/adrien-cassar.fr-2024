import type { GridSize } from "@/types/tetris/grid";
import type { PieceBlock } from "./pieceBlock";

export type PieceRotationType = 'top' | 'right' | 'bottom' | 'left'

export abstract class Piece {
	pieceBlocks: PieceBlock[];
	actualRotation: PieceRotationType;
	gridSize: GridSize;

	/**
	 * Moves the piece blocks by the specified offset.
	 * @param offset The amount to move the blocks.
	 */
	move(offset: number) {
		this.pieceBlocks.forEach(pieceBlock => {
			pieceBlock.position = pieceBlock.position + offset;
		});
	}

	/**
	 * Drops the piece blocks to the next lower position.
	 * @param gridSize The size of the grid.
	 */
	fall() {
		this.pieceBlocks.forEach(pieceBlock => {
			pieceBlock.fall(this.gridSize);
		});
	}

	/**
	 * Rotates the piece in the specified direction.
	 */
	rotate(): void {
		switch (this.actualRotation) {
			case 'top':
				if (this.rotateFromTop())
					this.actualRotation = 'right';
				break;
			case 'right':
				if (this.rotateFromRight())
					this.actualRotation = 'bottom';
				break;
			case 'bottom':
				if (this.rotateFromBottom())
					this.actualRotation = 'left';
				break;
			case 'left':
				if (this.rotateFromLeft())
					this.actualRotation = 'top';
				break;
			default: throw new Error(`Invalid rotation: ${this.actualRotation}`);
		}
	}

	abstract rotateFromTop(): boolean;
	abstract rotateFromRight(): boolean;
	abstract rotateFromBottom(): boolean;
	abstract rotateFromLeft(): boolean;

	/**
	 * Constructor for the piece.
	 * @param pieceBlocks The blocks that make up the piece.
	 * @param gridSize The size of the grid.
	 */
	constructor(pieceBlocks: PieceBlock[], gridSize: GridSize) {
		this.pieceBlocks = pieceBlocks;
		this.actualRotation = 'top';
		this.gridSize = gridSize;
	}
}