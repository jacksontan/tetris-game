import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'controls-panel',
  templateUrl: './controls-panel.component.html',
  styleUrls: ['./controls-panel.component.css']
})
export class ControlsPanelComponent {
  @Output() commandEvent = new EventEmitter<string>();
  public command: string;

  constructor() { }
  
  public doCommand(e) {
  	this.commandEvent.emit(e.key);
  	return true;
  }

  public returnFocus(e) {
    if(e && e.currentTarget) {
      e.currentTarget.focus();
    }
  }
}
