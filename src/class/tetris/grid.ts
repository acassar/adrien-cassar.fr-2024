import type { GridSize } from "@/types/tetris/grid";
import { Cell, CellState } from "./cell";
import type { Piece } from "./piece";
import type { PieceBlock } from "./pieceBlock";
import { TPiece } from "./pieces/TPiece";

export class Grid {
	grid: Cell[];
	activePiece: Piece | undefined;
	gridSize: GridSize;
	blocks: PieceBlock[];

	/**
	 * Add a piece to the grid
	 * @param piece the piece that will be added
	 */
	addPiece(piece: Piece): void {
		this.activePiece = piece;
		for (const block of piece.pieceBlocks) {
			this.grid[block.position].cellState = CellState.PLAYERPIECE;
		}
	}

	/**
	 * Freeze the active piece in the grid
	 */
	freezePiece(): void {
		if (!this.activePiece)
			throw Error("cannot find active piece");
		for (const block of this.activePiece.pieceBlocks) {
			this.grid[block.position].cellState = CellState.OCCUPIED;
			this.activePiece = undefined;
		}
	}

	/**
	  * Handle active piece collision with other pieces
	  */
	handleCollision() {
		this.freezePiece();
		// this.handleFullRow();//TODO
		this.addPiece(new TPiece(this.gridSize.x));
	}

	/**
	 * Can the block fall within the grid
	 * @param block The block we test
	 * @returns if the block can fall within the grid
	 */
	canFall = (block: PieceBlock): boolean => {
		const cell = this.grid[block.position + this.gridSize.x];
		return cell && cell.cellState !== CellState.OCCUPIED;
	};

	/**
	 * Make a piece fall of 1 block
	 */
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
			} else {
				this.handleCollision();
			}
		}
	}

	/**
	 * Will the block be off screen with an offset
	 * @param block the tested block
	 * @param offset -1 or 1 for the next position
	 * @returns if the block will be off screen or not
	 */
	private willBeOffScreen(block: PieceBlock, offset: number): boolean {
		return (block.position % this.gridSize.x) + offset < 0 || (block.position % this.gridSize.x) + offset >= this.gridSize.x;
	}

	/**
	 * Move the piece to the left or right (if possible)
	 * @param offset -1 or 1 for the next position
	 */
	private moveActivePiece(offset: number) {
		if (this.activePiece?.pieceBlocks && !this.activePiece.pieceBlocks.some(block => this.willBeOffScreen(block, offset))) {
			for (const block of this.activePiece.pieceBlocks) {
				this.grid[block.position].cellState = CellState.EMPTY;
			}
			for (const block of this.activePiece.pieceBlocks) {
				block.position = block.position + offset;
				this.grid[block.position].cellState = CellState.PLAYERPIECE;
			}
		}
	}

	/**
	 * Move the piece (if possible) to the left
	 */
	moveActivePieceLeft() {
		console.log("moveActivePieceLeft");
		this.moveActivePiece(-1);
	}

	/**
	 * Move the piece (if possible) to the right
	 */
	moveActivePieceRight() {
		this.moveActivePiece(1);
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