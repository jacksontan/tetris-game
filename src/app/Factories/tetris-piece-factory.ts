import TetrisPieceStick from '../tetris-piece/tetris-piece-stick';
import TetrisPieceLeftGun from '../tetris-piece/tetris-piece-leftgun';
import TetrisPieceRightGun from '../tetris-piece/tetris-piece-rightgun';
import TetrisPieceThunder from '../tetris-piece/tetris-piece-thunder';
import TetrisPieceBlock from '../tetris-piece/tetris-piece-block';
import { Injectable } from '@angular/core';

@Injectable()
export class TetrisPieceFactory {
	public createTetrisPiece() {
		const randomTetrisType = Math.floor(Math.random() * 5);
		switch(randomTetrisType) {
			case 0: {
				return new TetrisPieceStick(randomTetrisType);
			}
			case 1: {
				return new TetrisPieceLeftGun(randomTetrisType);
			}
			case 2: {
				return new TetrisPieceRightGun(randomTetrisType);
			}
			case 3: {
				return new TetrisPieceThunder(randomTetrisType);
			}
			case 4: {
				return new TetrisPieceBlock(randomTetrisType);
			}
			default: {
				break;
			}
		}
	}
}