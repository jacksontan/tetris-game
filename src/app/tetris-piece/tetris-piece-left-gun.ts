import TetrisPiece from './tetris-piece';
import TetrisEnumType from './../enums/tetris-enum-type';

export default class TetrisPieceLeftGun extends TetrisPiece {
	constructor(id) {
		super(id);
		this.setType(TetrisEnumType.leftgun);
		this.bodies = [
					   [["*", ""],
					   ["*", ""],
					   ["*", "*"]], 

					   [["*", "*", "*"],
					   ["*", ""]],

					   [["*", "*"],
					   ["", "*"],
					   ["", "*"]],

					   [["", "", "*"],
					   ["*", "*", "*"]]
					 ];
	}

	public generateBody() {
		this.setBody([["*", ""],
					  ["*", ""],
					  ["*", "*"]]);
		this.setWidthAndHeight();
	}
}