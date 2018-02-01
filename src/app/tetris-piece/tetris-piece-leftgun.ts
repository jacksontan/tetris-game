import TetrisPiece from './tetris-piece';
import TetrisEnumType from './../Enums/tetris-enum-type';

export default class TetrisPieceLeftGun extends TetrisPiece {
	constructor(id) {
		super(id);
		this.setType(TetrisEnumType.leftgun);
		this.bodies = [
					   [["*", " "],
					   ["*", " "],
					   ["*", "*"]], 

					   [["*", "*", "*"],
					   ["*", " "]],

					   [["*", "*"],
					   [" ", "*"],
					   [" ", "*"]],

					   [[" ", " ", "*"],
					   ["*", "*", "*"]]
					 ];
	}

	public generateBody() {
		this.setBody([["*", " "],
					  ["*", " "],
					  ["*", "*"]]);
		this.setWidthAndHeight();
	}

	// public rotateClockwise() {
	// 	this.orientation++;
	// 	if(this.orientation >= this.bodies.length) {
	// 		this.orientation = 0;
	// 	}
	// 	this.toggleOrientation();
	// }

	// public rotateCounterClockwise() {
	// 	this.orientation--;
	// 	if(this.orientation < 0) {
	// 		this.orientation = this.bodies.length - 1;
	// 	}
	// 	this.toggleOrientation();
	// }

}