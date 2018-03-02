import { Injectable } from '@angular/core';

@Injectable()
export class TetrisScoreService {
	private score = 0;
	private scoreMap = {
		1: 40,
		2: 100,
		3: 300,
		4: 1200
	};

	public addScore(numberOfLines, multiplier=1) {
		if(this.scoreMap[numberOfLines]) {
			this.score = this.score + this.scoreMap[numberOfLines] * multiplier;
		}
		return this.score;
	}

	public getScore() {
		return this.score;
	}
}