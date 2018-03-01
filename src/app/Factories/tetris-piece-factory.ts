import TetrisPieceStick from '../tetris-piece/tetris-piece-stick';
import TetrisPieceLeftGun from '../tetris-piece/tetris-piece-left-gun';
import TetrisPieceRightGun from '../tetris-piece/tetris-piece-right-gun';
import TetrisPieceLeftThunder from '../tetris-piece/tetris-piece-left-thunder';
import TetrisPieceRightThunder from '../tetris-piece/tetris-piece-right-thunder';
import TetrisPieceBlock from '../tetris-piece/tetris-piece-block';
import TetrisPieceThumbtuck from '../tetris-piece/tetris-piece-thumbtack';
import { Injectable } from '@angular/core';

@Injectable()
export class TetrisPieceFactory {
	public pieceChar = "X";
	public createTetrisPiece() {
		const randomTetrisType = Math.floor(Math.random() * 7);
		let generatedPiece;
		switch(randomTetrisType) {
			case 0: {
				generatedPiece = new TetrisPieceStick(randomTetrisType);
				break;
			}
			case 1: {
				generatedPiece = new TetrisPieceLeftGun(randomTetrisType);
				break;
			}
			case 2: {
				generatedPiece = new TetrisPieceRightGun(randomTetrisType);
				break;
			}
			case 3: {
				generatedPiece = new TetrisPieceLeftThunder(randomTetrisType);
				break;
			}
			case 4: {
				generatedPiece = new TetrisPieceRightThunder(randomTetrisType);
				break;
			}
			case 5: {
				generatedPiece = new TetrisPieceBlock(randomTetrisType);
				break;
			}
			case 6: {
				generatedPiece = new TetrisPieceThumbtuck(randomTetrisType);
				break;
			}
			default: {
				break;
			}
		}
		return generatedPiece;
	}
}