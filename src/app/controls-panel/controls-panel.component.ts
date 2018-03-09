import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'controls-panel',
  templateUrl: './controls-panel.component.html',
  styleUrls: ['./controls-panel.component.css']
})
export class ControlsPanelComponent {
  @Output() commandEvent = new EventEmitter<string>();
  public command: string;
  private timeoutId;
  public logMsg = "";

  constructor() {
    document.addEventListener('keydown', (e) => {
        this.doCommand(e);
     });
  }
  
  public doCommand(e) {
    let keyCode;
    if(typeof(e) === "number") {
      keyCode = e;
    }
    else {
      keyCode = e.keyCode;
    }
  	this.commandEvent.emit(keyCode);
  	return true;
  }

  public doCommandMouseDown(e) {
    this.logMsg += "mouse down \r\n";
    this.commandEvent.emit(e);
    this.cancelInterval();
    this.timeoutId = setInterval(() => {
      this.commandEvent.emit(e);
    }, 100);
  }

  public cancelInterval() {
    this.logMsg += "mouse up \r\n";
    clearInterval(this.timeoutId);
  }

  public returnFocus(e) {
    if(e && e.currentTarget) {
      e.currentTarget.focus();
    }
  }
}
