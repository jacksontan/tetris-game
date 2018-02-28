import TetrisPiece from './tetris-piece';
import TetrisEnumType from './../Enums/tetris-enum-type';

export default class TetrisPieceStick extends TetrisPiece {
	private horizontalBody = [["*", "*", "*", "*"]];
	private verticalBody = [["*"], ["*"], ["*"], ["*"]];

	constructor(id) {
		super(id);
		this.setType(TetrisEnumType.stick);
		this.bodies = [this.horizontalBody, this.verticalBody];
	}

	public generateBody() {
		this.setBody([["*", "*", "*", "*"]]);
		this.setWidthAndHeight();
	}
}