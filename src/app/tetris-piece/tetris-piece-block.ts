import TetrisPiece from './tetris-piece';
import TetrisEnumType from './../Enums/tetris-enum-type';

export default class TetrisPieceBlock extends TetrisPiece {
	constructor(id) {
		super(id);
		this.setType(TetrisEnumType.block);
		this.bodies = [[["*", "*"], 
					  ["*", "*"]]];
	}

	public generateBody() {
		this.setBody([["*", "*"], 
					  ["*", "*"]]);
		this.setWidthAndHeight();
	}
}