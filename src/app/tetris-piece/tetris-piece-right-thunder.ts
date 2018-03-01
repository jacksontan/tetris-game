import TetrisPiece from './tetris-piece';
import TetrisEnumType from './../Enums/tetris-enum-type';

export default class TetrisPieceRightThunder extends TetrisPiece {
	constructor(id) {
		super(id);
		this.setType(TetrisEnumType.thunder);
		this.bodies = [
					   [["*", ""],
					   ["*", "*"],
					   ["", "*"]], 

					   [["", "*", "*"],
					   ["*", "*", ""]],
					 ];
	}

	public generateBody() {
		this.setBody([["*", ""],
					  ["*", "*"],
					  ["", "*"]]);
		this.setWidthAndHeight();
	}
}