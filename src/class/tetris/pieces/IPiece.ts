import type { GridSize } from "@/types/tetris/grid";
import { Piece } from "../piece";
import { PieceBlock } from "../pieceBlock";

/**
 * Represents a specific type of Tetris piece.
 * @extends Piece
 */
export class IPiece extends Piece {

	/**
     * Returns the future positions of the piece based on its current rotation.
     * @returns An array of arrays, where each inner array contains a PieceBlock object and its new position after rotation.
     */
	getFuturePositions(): [PieceBlock, number][] {
		const initialPositions: [PieceBlock, number][] = [
			[this.pieceBlocks[0], this.pieceBlocks[0].position + this.gridSize.x + 1],
			[this.pieceBlocks[2], this.pieceBlocks[2].position - this.gridSize.x - 1],
			[this.pieceBlocks[3], this.pieceBlocks[3].position - this.gridSize.x * 2 - 2],
		];

		const rotatePositions: [PieceBlock, number][] = [
			[this.pieceBlocks[0], this.pieceBlocks[0].position - this.gridSize.x - 1],
			[this.pieceBlocks[2], this.pieceBlocks[2].position + this.gridSize.x + 1],
			[this.pieceBlocks[3], this.pieceBlocks[3].position + this.gridSize.x * 2 + 2],
		];
		switch (this.actualRotation) {
			case 'top':
				return initialPositions;
			case 'right':
				return rotatePositions;
			case 'bottom':
				return initialPositions;
			case 'left':
				return rotatePositions;
			default:
				throw Error("Unknown rotation: " + this.actualRotation);
		}
	}

	/**
     * Checks if the piece can rotate from the top.
     * @returns True if the piece can rotate from the top, false otherwise.
     */
	canRotateFromTop(): boolean {
		const [blockToTest] = this.pieceBlocks;
		const rowIndex = Math.floor(blockToTest.position / this.gridSize.x);
		if (rowIndex < 2 || rowIndex === this.gridSize.y - 1) {
			return false;
		}
		return true;
	}

	/**
     * Checks if the piece can rotate from the right.
     * @returns True if the piece can rotate from the right, false otherwise.
     */
	canRotateFromRight(): boolean {
		const [blockToTest] = this.pieceBlocks;
		if (blockToTest.isFarLeft(this.gridSize.x) || blockToTest.getRowIndex(this.gridSize.x) >= this.gridSize.x - 2) {
			return false;
		}
		return true;
	}

	/**
     * Checks if the piece can rotate from the bottom.
     * @returns True if the piece can rotate from the bottom, false otherwise.
     */
	canRotateFromBottom(): boolean {
		return this.canRotateFromTop();
	}

	/**
     * Checks if the piece can rotate from the left.
     * @returns True if the piece can rotate from the left, false otherwise.
     */
	canRotateFromLeft(): boolean {
		return this.canRotateFromRight();
	}

	/**
     * Constructor for the TPiece class.
     * @param gridSize The size of the grid.
     */
	constructor(gridSize: GridSize) {
		const color = Piece.generateColor();
		const pieceOrigin = Math.floor(gridSize.x / 2 - 1);
		super([new PieceBlock(pieceOrigin, color), new PieceBlock(pieceOrigin + 1, color), new PieceBlock(pieceOrigin + 2, color), new PieceBlock(pieceOrigin + 3, color)], gridSize);
	}
}