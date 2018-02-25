import TetrisPieceStick from '../tetris-piece/tetris-piece-stick';
import TetrisPieceLeftGun from '../tetris-piece/tetris-piece-leftgun';
import TetrisPieceRightGun from '../tetris-piece/tetris-piece-rightgun';
import TetrisPieceThunder from '../tetris-piece/tetris-piece-thunder';
import TetrisPieceBlock from '../tetris-piece/tetris-piece-block';
import { Injectable } from '@angular/core';

@Injectable()
export class TetrisPieceFactory {
	public pieceChar = "X";
	public createTetrisPiece() {
		const randomTetrisType = Math.floor(Math.random() * 5);
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
				generatedPiece = new TetrisPieceThunder(randomTetrisType);
				break;
			}
			case 4: {
				generatedPiece = new TetrisPieceBlock(randomTetrisType);
				break;
			}
			default: {
				break;
			}
		}
		return generatedPiece;
	}
}