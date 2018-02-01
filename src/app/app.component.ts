import { Component, ViewChild } from '@angular/core';
import { ControlsPanelComponent } from './controls-panel/controls-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ControlsPanelComponent) controlsPanel;
  public title = 'My Tetris Game';
  public command;

  receiveCommand(commandPassed) {
  	this.command = commandPassed;
  	setTimeout(() => {
  		this.command = "";
  	}, 100);
  }
}
