import type { Coords } from "@/class/common/coords";
import { Piece } from "../piece";
import { Cell } from "../cell";

export class LPiece extends Piece {
	constructor(startCoords: Coords) {
		super([new Cell(startCoords.x, startCoords.y)]);
	}
}