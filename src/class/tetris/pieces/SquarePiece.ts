import type { GridSize } from "@/types/tetris/grid";
import { Piece } from "../piece";
import { PieceBlock } from "../pieceBlock";

/**
 * Represents a specific type of Tetris piece.
 * @extends Piece
 */
export class SquarePiece extends Piece {

	/**
     * Returns the future positions of the piece based on its current rotation.
     * @returns An array of arrays, where each inner array contains a PieceBlock object and its new position after rotation.
     */
	getFuturePositions(): [PieceBlock, number][] {
		return [];
	}

	/**
     * Checks if the piece can rotate from the top.
     * @returns True if the piece can rotate from the top, false otherwise.
     */
	canRotateFromTop(): boolean {
		return false;
	}

	/**
     * Checks if the piece can rotate from the right.
     * @returns True if the piece can rotate from the right, false otherwise.
     */
	canRotateFromRight(): boolean {
		return false;
	}

	/**
     * Checks if the piece can rotate from the bottom.
     * @returns True if the piece can rotate from the bottom, false otherwise.
     */
	canRotateFromBottom(): boolean {
		return false;
	}

	/**
     * Checks if the piece can rotate from the left.
     * @returns True if the piece can rotate from the left, false otherwise.
     */
	canRotateFromLeft(): boolean {
		return false;
	}

	/**
     * Constructor for the TPiece class.
     * @param gridSize The size of the grid.
     */
	constructor(gridSize: GridSize) {
		const color = Piece.generateColor();
		const pieceOrigin = Math.floor(gridSize.x / 2 - 1);
		super([new PieceBlock(pieceOrigin, color), new PieceBlock(pieceOrigin + 1, color), new PieceBlock(pieceOrigin + gridSize.x, color), new PieceBlock(pieceOrigin + 1 + gridSize.x, color)], gridSize);
	}
}