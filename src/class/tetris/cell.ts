export enum CellState {
	EMPTY = 0,
	OCCUPIED = 1,
	PLAYERPIECE = 2,
}

export class Cell {
	cellState: CellState;
	position: number;

	constructor(position: number) {
		this.cellState = CellState.EMPTY;
		this.position = position;
	}
}