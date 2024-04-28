import { Cell, CellState } from "./cell";
import type { Piece } from "./piece";

export class Grid {
	grid: Cell[];

	addPiece(piece: Piece): void {
		for (const cell of piece.squares) {
			this.grid[cell.position].cellState = CellState.OCCUPIED;
		}
		console.log(this.grid);
	}

	constructor(gridSize: {x: number, y: number}) {
		this.grid = new Array<Cell>(gridSize.x * gridSize.y);
		for (let i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Cell(i);
		}
	}
}