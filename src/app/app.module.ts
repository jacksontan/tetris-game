import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GamePanelComponent } from './game-panel/game-panel.component';
import { ControlsPanelComponent } from './controls-panel/controls-panel.component';

import { TetrisPieceFactory } from './factories/tetris-piece-factory';
import { TetrisScoreService } from './services/tetris-score.service';
import { TetrisLevelService } from './services/tetris-level.service';


@NgModule({
  declarations: [
    AppComponent, GamePanelComponent, ControlsPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TetrisPieceFactory, TetrisScoreService, TetrisLevelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
