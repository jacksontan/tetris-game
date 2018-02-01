import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GamePanelComponent } from './game-panel/game-panel.component';
import { ControlsPanelComponent } from './controls-panel/controls-panel.component';

import { TetrisPieceFactory } from './Factories/tetris-piece-factory';


@NgModule({
  declarations: [
    AppComponent, GamePanelComponent, ControlsPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TetrisPieceFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
