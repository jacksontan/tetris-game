import TetrisPiece from './tetris-piece';
import TetrisEnumType from './../enums/tetris-enum-type';

export default class TetrisPieceLeftThunder extends TetrisPiece {
	constructor(id) {
		super(id);
		this.setType(TetrisEnumType.thunder);
		this.bodies = [
					   [["", "*"],
					   ["*", "*"],
					   ["*", ""]], 

					   [["*", "*", ""],
					   ["", "*", "*"]],
					 ];
	}

	public generateBody() {
		this.setBody([["", "*"],
					  ["*", "*"],
					  ["*", ""]]);
		this.setWidthAndHeight();
	}
}