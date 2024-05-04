import type { GridSize } from "@/types/tetris/grid";
import { Piece } from "../piece";
import { PieceBlock } from "../pieceBlock";

/**
 * Represents a specific type of Tetris piece.
 * @extends Piece
 */
export class TPiece extends Piece {

	/**
     * Returns the future positions of the piece based on its current rotation.
     * @returns An array of arrays, where each inner array contains a PieceBlock object and its new position after rotation.
     */
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
					[this.pieceBlocks[3], this.pieceBlocks[3].position + (this.gridSize.x - 1)]
				];
			default:
				throw Error("Unknown rotation: " + this.actualRotation);
		}
	}

	/**
     * Checks if the piece can rotate from the top.
     * @returns True if the piece can rotate from the top, false otherwise.
     */
	canRotateFromTop(): boolean {
		if (this.pieceBlocks[2].isFarTop(this.gridSize.x)) {
			this.fall();
		}
		return true;
	}

	/**
     * Checks if the piece can rotate from the right.
     * @returns True if the piece can rotate from the right, false otherwise.
     */
	canRotateFromRight(): boolean {
		if (this.pieceBlocks[3].isFarRight(this.gridSize.x)) {
			this.move(-1);
		}
		return true;
	}

	/**
     * Checks if the piece can rotate from the bottom.
     * @returns True if the piece can rotate from the bottom, false otherwise.
     */
	canRotateFromBottom(): boolean {
		if (!this.pieceBlocks[0].isFarBottom(this.gridSize)) {
			return true;
		}
		return false;
	}

	/**
     * Checks if the piece can rotate from the left.
     * @returns True if the piece can rotate from the left, false otherwise.
     */
	canRotateFromLeft(): boolean {
		if (this.pieceBlocks[0].isFarLeft(this.gridSize.x)) {
			this.move(1);
		}
		return true;
	}

	/**
     * Constructor for the TPiece class.
     * @param gridSize The size of the grid.
     */
	constructor(gridSize: GridSize) {
		const pieceOrigin = Math.floor(gridSize.x / 2 - 1);
		super([new PieceBlock(pieceOrigin), new PieceBlock(pieceOrigin + 1), new PieceBlock(pieceOrigin + 2), new PieceBlock(pieceOrigin + 1 + gridSize.x)], gridSize);
	}
}