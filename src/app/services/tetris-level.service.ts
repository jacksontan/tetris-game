import { Injectable } from '@angular/core';

@Injectable()
export class TetrisLevelService {
	private levelThreshold = 30	//in seconds when the level will increase
	private maxLevel = 9
	private level = 1;
	private counter = 0;
	private timerId;

	public getLevel() {
		if(this.counter >= this.levelThreshold) {
			if(++this.level === this.maxLevel) {
				this.stopTimer();
			}
			this.counter = 0;
		}
		return this.level;
	}

	public startTimer() {
		this.timerId = setInterval(() => {
			this.counter++;
		}, 1000)
		return this.timerId;
	}

	public stopTimer() {
		clearInterval(this.timerId);
	}
}