import TetrisPiece from './tetris-piece';
import TetrisEnumType from './../Enums/tetris-enum-type';

export default class TetrisPieceRightGun extends TetrisPiece {
	constructor(id) {
		super(id);
		this.setType(TetrisEnumType.rightgun);
		this.bodies = [
					   [[" ", "*"],
					   [" ", "*"],
					   ["*", "*"]], 

					   [["*", " ", " "],
					   ["*", "*", "*"]],

					   [["*", "*"],
					   ["*", " "],
					   ["*", " "]],

					   [["*", "*", "*"],
					   [" ", " ", "*"]]
					 ];
	}

	public generateBody() {
		this.setBody([[" ", "*"],
					  [" ", "*"],
					  ["*", "*"]]);
		this.setWidthAndHeight();
	}
}