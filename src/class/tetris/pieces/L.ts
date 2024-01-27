import type { Coords } from "@/class/common/coords";
import { Piece } from "../piece";
import { Square } from "../square";

export class LPiece extends Piece {
	constructor(startCoords: Coords) {
		super([new Square(startCoords.x, startCoords.y)]);
	}
}