import type { GridSize } from "@/types/tetris/grid";

export class PieceBlock {
	position: number;

	fall(gridSize: GridSize){
		this.position = this.position + gridSize.x;
	}

	constructor(position: number) {
		this.position = position;
	}
}