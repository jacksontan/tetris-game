import { Component, Input, ViewChild } from '@angular/core';
import { TetrisPieceFactory } from './../Factories/tetris-piece-factory';
import * as _ from 'lodash';

@Component({
  selector: 'game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent{
  private _command: string;
  private boardCharacter = "*";
  private boardWidth = 22;  //allocate 2 for border
  private boardHeight = 21;  //allocate 1 for bottom border
  private mainBoard;
  private currentTetris;
  private tetrisList = [];
  public errorMsg = "";

  constructor(private TetrisPieceFactory: TetrisPieceFactory) { 
    this.TetrisPieceFactory = TetrisPieceFactory;
  }

  ngOnInit() {
    this.initBoard();
  }

  @Input() set command (command: string) {
    if(this.currentTetris && command !== "") {
      this.errorMsg = "";
      let isUnknownCommand = false;
      switch(command) {
        case "a": {
          this.currentTetris.moveLeft();
          this.currentTetris.moveDown();
          break;
        }
        case "d": {
          this.currentTetris.moveRight();
          this.currentTetris.moveDown();
          break;
        }
        case "w": {
          this.currentTetris.rotateCounterClockwise();
          this.currentTetris.moveDown();
          break;
        }
        case "s": {
          this.currentTetris.rotateClockwise();
          this.currentTetris.moveDown();
          break;
        }
        default: {
          isUnknownCommand = true;
          break;
        }
      }
      if(isUnknownCommand) {
        this.errorMsg = "Unknown command.";
      }
      else {
        if(this.updateTetrisBoard() && this.checkPieceLanded()) {
          this.createTetrisPiece();
          this.updateTetrisBoard();
        }
      }
    }
  };

  public initBoard() {
    this.mainBoard = new Array(this.boardHeight);
    this.createTetrisPiece();
    this.updateTetrisBoard();
  }

  private createTetrisPiece() {
    this.currentTetris = this.TetrisPieceFactory.createTetrisPiece();
    this.tetrisList.push(this.currentTetris);
  }

  private updateTetrisBoard() {
    let isValidMove;
    const mainBoardClone = _.cloneDeep(this.mainBoard);
    this.clearBoard(mainBoardClone);
    _.each(this.tetrisList, (tetrisPiece) => {
      _.every(tetrisPiece.getBody(), (rowElem, index) => {
        let rowBoard = _.get(mainBoardClone, tetrisPiece.getPositionY() + index);
        isValidMove = this.checkValidMove(rowBoard, tetrisPiece, rowElem.length);
        if(rowBoard && isValidMove) {
          rowBoard.splice(tetrisPiece.getPositionX(), rowElem.length, ...rowElem);
        }
        return isValidMove;
      });
    })
    if(isValidMove) {
      this.mainBoard = mainBoardClone;
      return true;
    }
    else {
      this.errorMsg = "Invalid move.";
      this.currentTetris.revertPosition();
      return false;
    }
  }

  private checkValidMove(rowBoard, tetrisPiece, elemWidth) {
    const startIndex = tetrisPiece.getPositionX();
    const endIndex = tetrisPiece.getPositionX() + elemWidth;
    const subset = rowBoard.slice(startIndex, endIndex);
    return !subset.includes("*");
  }

  private checkPieceLanded() {
    const lastElemIndex = this.currentTetris.getLastElementIndex();
    return lastElemIndex === this.boardHeight - 1;
  }

  private clearBoard(mainBoard) {
    for (let i = 0; i < mainBoard.length; i++) {
      mainBoard[i] = new Array(this.boardWidth).fill("");
      mainBoard[i][0] = this.boardCharacter;
      mainBoard[i][this.boardWidth - 1] = this.boardCharacter;
    }
    //fill last border
    mainBoard[mainBoard.length - 1].fill(this.boardCharacter);
  }
}