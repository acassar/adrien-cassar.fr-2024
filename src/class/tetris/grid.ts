import type { GridSize } from "@/types/tetris/grid";
import { Cell, CellState } from "./cell";
import type { Piece } from "./piece";
import type { PieceBlock } from "./pieceBlock";
import { TPiece } from "./pieces/TPiece";
import { LPiece } from "./pieces/LPiece";
import { IPiece } from "./pieces/IPiece";
import { LMirrorPiece } from "./pieces/LMirrorPiece";
import { SPiece } from "./pieces/SPiece";
import { SMirrorPiece } from "./pieces/SMirrorPiece";
import { SquarePiece } from "./pieces/SquarePiece";

/**
 * Represents the game grid.
 * @param gridSize The dimensions of the grid.
 */
export class Grid {
	grid: Cell[];
	activePiece: Piece | undefined;
	gridSize: GridSize;
	blocks: PieceBlock[];
	gameOver: boolean;

	/**
   * Get the state of a cell in the grid.
   * @param position The position of the cell.
   * @returns The state of the cell.
   */
	getCellState(position: number): CellState {
		const foundBlock = this.blocks.find(block => block.position === position);
		if (!foundBlock) return CellState.EMPTY;
		else if (this.activePiece?.pieceBlocks.some(block => block.position === position)) return CellState.PLAYERPIECE;
		return CellState.OCCUPIED;
	}

	getNewPiece() {
		const randomNumber = Math.round(Math.random() * 6);
		switch (randomNumber) {
			case 0:
				return new TPiece(this.gridSize);
			case 1:
				return new LPiece(this.gridSize);
			case 2:
				return new IPiece(this.gridSize);
			case 3:
				return new LMirrorPiece(this.gridSize);
			case 4:
				return new SPiece(this.gridSize);
			case 5:
				return new SMirrorPiece(this.gridSize);
			case 6:
				return new SquarePiece(this.gridSize);
			default:
				return new TPiece(this.gridSize);
		}
	}

	reset() {
		this.blocks = [];
		this.addPiece(this.getNewPiece());
		this.gameOver = false;
	}

	/**
   * Add a piece to the grid.
   * @param piece The piece that will be added.
   */
	addPiece(piece: Piece): void {
		this.activePiece = piece;
		this.blocks = this.blocks.concat(this.activePiece.pieceBlocks);
	}

	/**
   * Get the blocks of the line starting from index.
   * @param index The index of the grid on which blocks will be found on the line.
   * @returns The blocks present on the line.
   */
	private getBlocksInRow(index: number): PieceBlock[] {
		return this.blocks.filter(block => block.position >= index && block.position < index + this.gridSize.x);
	}

	/**
   * Fall all blocks in the grid that are upper from the index.
   * @param index The index of the grid from where to begin falling blocks.
   */
	private fallEveryUpperBlock(index: number): void {
		for (let i = index; i > 0; i -= this.gridSize.x) {
			const blocks = this.getBlocksInRow(i);
			for (const block of blocks) {
				block.fall(this.gridSize);
			}
		}
	}

	/**
   * Handle when a row is full and remove it.
   */
	private handleFullRow(): void {
		for (let i = 0; i < this.grid.length; i += this.gridSize.x) {
			const blocks = this.getBlocksInRow(i);
			if (blocks.length === this.gridSize.x) {
				this.blocks = this.blocks.filter(block => !blocks.includes(block));
				this.fallEveryUpperBlock(i);
			}
		}
	}

	/**
   * Handle active piece collision with other pieces.
   */
	handleCollision(): void {
		this.handleFullRow();
		this.activePiece = undefined;
		const newPiece = this.getNewPiece();
		if (this.canPieceMove(newPiece, 1))
			this.addPiece(newPiece);
		else this.gameOver = true;
	}

	/**
   * Get the blocks that the active piece can move to.
   * @returns The blocks that the active piece can move to.
   */
	private getFreezedBlocks(piece: Piece): PieceBlock[] {
		return this.blocks.filter(block => !(piece.pieceBlocks.map(e => e.position).includes(block.position)));
	}

	/**
   * Can the block fall within the grid?
   * @param block The block we test.
   * @returns If the block can fall within the grid.
   */
	private canPieceMove(piece: Piece, offset: number): boolean {
		const filteredBlocks = this.getFreezedBlocks(piece);
		const {pieceBlocks} = piece;
		const isThereAnyOtherBlockHere = (block: PieceBlock) => filteredBlocks.some((b) => b.position === block.position + offset);
		const willBeOffScreenVertically = (block: PieceBlock) => block.position + offset >= this.grid.length;
		for (const block of pieceBlocks) {
			if (willBeOffScreenVertically(block) || isThereAnyOtherBlockHere(block)) return false;
		}
		return true;
	}

	/**
   * Make a piece fall of 1 block.
   */
	fallActivePiece(): void {
		if (!this.activePiece) throw new Error("Active piece should exist at this point");
		const pieceCanFall = this.canPieceMove(this.activePiece, this.gridSize.x);
		const {pieceBlocks} = this.activePiece!;
		if (pieceCanFall) {
			for (const block of pieceBlocks) {
				block.fall(this.gridSize);
			}
		} else {
			this.handleCollision();
		}
	}

	/**
   * Will the block be off screen with an offset?
   * @param block The tested block.
   * @param offset -1 or 1 for the next position.
   * @returns If the block will be off screen or not.
   */
	private willBeOffScreenHorizontally(block: PieceBlock, offset: number): boolean {
		return (block.position % this.gridSize.x) + offset < 0 || (block.position % this.gridSize.x) + offset >= this.gridSize.x;
	}

	/**
   * Can the active piece move to the left or right?
   * @param offset -1 or 1 for the next position.
   * @returns If the active piece can move to the left or right.
   */
	private canActivePiecemove(offset: number): boolean {
		if (!this.activePiece) return false;
		return this.canPieceMove(this.activePiece, offset) && !this.activePiece.pieceBlocks.some(block => this.willBeOffScreenHorizontally(block, offset));
	}

	/**
   * Move the piece to the left or right (if possible).
   * @param offset -1 or 1 for the next position.
   */
	private moveActivePiece(offset: number): void {
		if (this.canActivePiecemove(offset)) {
			this.activePiece!.move(offset);
		}
	}

	/**
   * Move the piece to the left.
   */
	moveActivePieceLeft(): void {
		this.moveActivePiece(-1);
	}

	/**
   * Move the piece to the right.
   */
	moveActivePieceRight(): void {
		this.moveActivePiece(1);
	}

	/**
   * Rotate the active piece.
   */
	rotateActivePiece(): void {
		if (!this.activePiece) throw new Error("Active piece should exist at this point");
		const futurePos = this.activePiece.getFuturePositions();
		const canRotate = futurePos.every((p) => {
			const [_, pos] = p;
			const cellOccupiedByBlock = this.getFreezedBlocks(this.activePiece!).find((block) => block.position === pos);
			return !cellOccupiedByBlock;
		});
		if (canRotate) {
			this.activePiece!.rotate();
		}
	}

	/**
   * Create a new instance of the Grid class.
   * @param gridSize The dimensions of the grid.
   */
	constructor(gridSize: GridSize) {
		this.gridSize = gridSize;
		this.grid = new Array<Cell>(gridSize.x * gridSize.y);
		this.blocks = [];
		this.gameOver = false;
		for (let i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Cell(i);
		}
	}
}