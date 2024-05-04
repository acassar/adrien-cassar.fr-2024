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
	}

	/**
	 * Get the blocks of the line starting from index
	 * @param index index of the grid on which blocks will be found on the line
	 * @returns the blocks present on the line
	 */
	private getBlocksInRow(index: number) {
		return this.blocks.filter(block => block.position >= index && block.position < index + this.gridSize.x);
	}

	/**
	 * Fall all blocks in the grid that are upper from the index
	 * @param index index of the grid from where to begin falling blocks
	 */
	private fallEveryUpperBlock(index: number) {
		for (let i = index; i > 0; i -= this.gridSize.x) {
			const blocks = this.getBlocksInRow(i);
			for (const block of blocks) {
				block.fall(this.gridSize);
			}
		}
	}

	/**
	 * Handle when a row is full and remove it
	 */
	private handleFullRow(){
		for (let i = 0; i < this.grid.length; i += this.gridSize.x) {
			const blocks = this.getBlocksInRow(i);

			//true if  it's a full row
			if (blocks.length === this.gridSize.x) {
				this.blocks = this.blocks.filter(block => !blocks.includes(block));
				this.fallEveryUpperBlock(i);
			}
		}
	}

	/**
	 * Handle active piece collision with other pieces
	 */
	handleCollision() {
		this.handleFullRow();
		this.addPiece(new TPiece(this.gridSize));
	}

	private getFreezedBlocks(){
		if (!this.activePiece)
			throw Error("No active piece");
		return this.blocks.filter(block => !(this.activePiece!.pieceBlocks.map(e => e.position).includes(block.position)));
	}

	/**
	 * Can the block fall within the grid
	 * @param block The block we test
	 * @returns if the block can fall within the grid
	 */
	private canPieceMove = (offset: number): boolean => {
		const filteredBlocks = this.getFreezedBlocks();
		const {pieceBlocks} = this.activePiece!;

		const isThereAnyOtherBlockHere = (block: PieceBlock) => filteredBlocks.some((b) => b.position === block.position + offset);
		const willBeOffScreenVertically = (block: PieceBlock) => block.position + offset >= this.grid.length;

		for (const block of pieceBlocks) {
			if (willBeOffScreenVertically(block) || isThereAnyOtherBlockHere(block))
				return false;

		}
		return true;
	};

	/**
	 * Make a piece fall of 1 block
	 */
	fallActivePiece() {
		if (!this.activePiece)
			throw new Error("Active piece should exist at this point");
		const pieceCanFall = this.canPieceMove(this.gridSize.x);
		const {pieceBlocks} = this.activePiece;
		if (pieceCanFall) {
			for (const block of pieceBlocks) {
				block.fall(this.gridSize);
			}
		} else {
			this.handleCollision();
		}
	}

	/**
	 * Will the block be off screen with an offset
	 * @param block the tested block
	 * @param offset -1 or 1 for the next position
	 * @returns if the block will be off screen or not
	 */
	private willBeOffScreenHorizontally(block: PieceBlock, offset: number): boolean {
		return (block.position % this.gridSize.x) + offset < 0 || (block.position % this.gridSize.x) + offset >= this.gridSize.x;
	}

	private canActivePiecemove(offset: number): boolean {
		if (!this.activePiece)
			return false;
		return this.canPieceMove(offset) && !this.activePiece.pieceBlocks.some(block => this.willBeOffScreenHorizontally(block, offset));
	}

	/**
	 * Move the piece to the left or right (if possible)
	 * @param offset -1 or 1 for the next position
	 */
	private moveActivePiece(offset: number) {
		if (this.canActivePiecemove(offset)) {
			this.activePiece!.move(offset);
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

	rotateActivePiece() {
		if (!this.activePiece)
			throw new Error("Active piece should exist at this point");
		const futurePos = this.activePiece.getFuturePositions();
		const canRotate = futurePos.every((p) => {
			const [_, pos] = p;
			const cellOccupiedByBlock = this.getFreezedBlocks().find((block) => block.position === pos);
			return !cellOccupiedByBlock;
		});
		if (canRotate)
			this.activePiece!.rotate();
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