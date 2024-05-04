import type { GridSize } from "@/types/tetris/grid";

export class PieceBlock {
	position: number;

	/**
     * Returns the column index of the block in the grid.
     * @param rowSize The number of columns in the grid.
     * @returns The column index of the block in the grid.
     */
	getRowIndex(rowSize: number): number {
		return this.position % rowSize;
	}


	/**
	 * Returns true if the block is at the bottom of the grid.
	 * @param gridSize The size of the grid.
	 * @returns True if the block is at the bottom, false otherwise.
	 */
	isFarBottom(gridSize: GridSize): boolean {
		const cellLength = (gridSize.x * gridSize.y);
		return this.position < cellLength && this.position > cellLength - gridSize.x;
	}

	/**
	 * Returns true if the block is at the top of the grid.
	 * @param rowSize The number of columns in the grid.
	 * @returns True if the block is at the top, false otherwise.
	 */
	isFarTop(rowSize: number): boolean {
		return this.position < rowSize;
	}

	/**
	 * Returns true if the block is at the far left of the grid.
	 * @param rowSize The number of columns in the grid.
	 * @returns True if the block is at the far left, false otherwise.
	 */
	isFarLeft(rowSize: number): boolean {
		return this.getRowIndex(rowSize) === 0;
	}

	/**
	 * Returns true if the block is at the far right of the grid.
	 * @param rowSize The number of columns in the grid.
	 * @returns True if the block is at the far right, false otherwise.
	 */
	isFarRight(rowSize: number): boolean {
		return this.getRowIndex(rowSize) === rowSize - 1;
	}

	/**
	 * Moves the block downwards by the specified grid size.
	 * @param gridSize The size of the grid.
	 */
	fall(gridSize: GridSize): void {
		this.position = this.position + gridSize.x;
	}

	constructor(position: number) {
		this.position = position;
	}
}