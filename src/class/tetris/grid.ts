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
	 * Get the state of a cell in the grid
	 * @param position position of the cell
	 * @returns the state of the cell
	 */
	getCellState(position: number) :CellState {
		const foundBlock = this.blocks.find(block => block.position === position);
		if (!foundBlock)
			return CellState.EMPTY;
		else if (this.activePiece?.pieceBlocks.some(block => block.position === position))
			return CellState.PLAYERPIECE;
		return CellState.OCCUPIED;
	}

	/**
	 * Add a piece to the grid
	 * @param piece the piece that will be added
	 */
	addPiece(piece: Piece): void {
		this.activePiece = piece;
		this.blocks = this.blocks.concat(this.activePiece.pieceBlocks);
		debugger;
	}

	// fallEveryUpperBlock()

	/**
	 * Handle when a row is full and remove it
	 */
	handleFullRow(){
		for (let i = 0; i < this.gridSize.y; i++) {
			const cells = this.grid.slice(i * this.gridSize.x, (i + 1) * this.gridSize.x);
			//todo
		}
	}

	/**
	 * Handle active piece collision with other pieces
	 */
	handleCollision() {
		this.handleFullRow();
		this.addPiece(new TPiece(this.gridSize.x));
	}

	/**
	 * Can the block fall within the grid
	 * @param block The block we test
	 * @returns if the block can fall within the grid
	 */
	canFall = (block: PieceBlock): boolean => {
		if (block.position + this.gridSize.x >= this.grid.length)
			return false;
		return !this.blocks.some((b) => b.position === block.position + this.gridSize.x && !this.activePiece?.pieceBlocks.some(pb => pb. position === b.position));
	};

	/**
	 * Make a piece fall of 1 block
	 */
	fallActivePiece() {
		const blocks = this.activePiece?.pieceBlocks;
		if (blocks) {
			const pieceCanFall = blocks.every(block => this.canFall(block));
			if (pieceCanFall) {
				for (const block of blocks) {
					block.fall(this.gridSize);
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
			this.activePiece.move(offset);
		}
	}

	/**
	 * Move the piece (if possible) to the left
	 */
	moveActivePieceLeft() {
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