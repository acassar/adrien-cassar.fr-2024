export enum CellState {
	EMPTY = 0,
	OCCUPIED = 1,
}

export class Cell {
	cellState: CellState;

	constructor() {
		this.cellState = CellState.EMPTY;
	}
}