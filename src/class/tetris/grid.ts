import type { GridSize } from "@/types/tetris/grid";
import { Cell, CellState } from "./cell";
import type { Piece } from "./piece";
import type { PieceBlock } from "./pieceBlock";

export class Grid {
	grid: Cell[];
	activePiece: Piece | undefined;
	gridSize: GridSize;
	blocks: PieceBlock[];

	addPiece(piece: Piece): void {
		this.activePiece = piece;
		for (const block of piece.pieceBlocks) {
			this.grid[block.position].cellState = CellState.PLAYERPIECE;
		}
	}

	canFall = (block: PieceBlock): boolean => {
		const cell = this.grid[block.position + this.gridSize.x];
		return cell && cell.cellState !== CellState.OCCUPIED;
	};

	fallActivePiece() {
		const blocks = this.activePiece?.pieceBlocks;
		if (blocks) {
			const pieceCanFall = !blocks.some(block => !this.canFall(block));
			if (pieceCanFall) {
				for (const block of blocks) {
					this.grid[block.position].cellState = CellState.EMPTY;
				}
				for (const block of blocks.sort(block => -block.position)) {
					block.fall(this.gridSize);
					this.grid[block.position].cellState = CellState.PLAYERPIECE;
				}
			}
		}
	}

	constructor(gridSize: GridSize) {
		this.gridSize = gridSize;
		this.grid = new Array<Cell>(gridSize.x * gridSize.y);
		this.blocks = [];
		for (let i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Cell(i);
		}
	}
}