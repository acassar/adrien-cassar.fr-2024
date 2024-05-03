export enum CellState {
	EMPTY = 0,
	OCCUPIED = 1,
	PLAYERPIECE = 2,
}
export class Cell {
	position: number;

	constructor(position: number) {
		this.position = position;
	}
}