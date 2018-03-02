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
	private id = 1;
	public createTetrisPiece() {
		const classList = [TetrisPieceStick, TetrisPieceLeftGun, TetrisPieceRightGun, TetrisPieceRightGun, TetrisPieceLeftThunder,
				TetrisPieceRightThunder, TetrisPieceBlock, TetrisPieceThumbtuck];
		const randomTetrisType = Math.floor(Math.random() * classList.length);
		return new classList[randomTetrisType](this.id++);
	}
}