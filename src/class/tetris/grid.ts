import type { GridSize } from "@/types/tetris/grid";
import { Cell, CellState } from "./cell";
import type { Piece } from "./piece";

export class Grid {
	grid: Cell[];
	activePiece: Piece | undefined;
	gridSize: GridSize;

	addPiece(piece: Piece): void {
		this.activePiece = piece;
		for (const cell of piece.cells) {
			this.grid[cell.position].cellState = CellState.PLAYERPIECE;
		}
	}

	canFall = (cell: Cell): boolean => this.grid[cell.position + this.gridSize.x].cellState !== CellState.OCCUPIED;

	fallActivePiece() {
		const cells = this.activePiece?.cells;
		if (cells) {
			const pieceCanFall = !cells.some(cell => !this.canFall(cell));
			if (pieceCanFall) {
				for (const cell of cells.sort(cell => -cell.position)) {
					this.grid[cell.position + this.gridSize.x].cellState = CellState.PLAYERPIECE;
					this.grid[cell.position].cellState = CellState.EMPTY;
				}
			}
		}
	}

	constructor(gridSize: GridSize) {
		this.gridSize = gridSize;
		this.grid = new Array<Cell>(gridSize.x * gridSize.y);
		for (let i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Cell(i);
		}
	}
}