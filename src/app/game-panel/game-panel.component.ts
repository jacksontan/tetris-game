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
  private borderChar = "O";
  private boardWidth = 20;  //allocate 2 for border
  private boardHeight = 21;  //allocate 1 for bottom border
  private landedPiecesBoard;
  private currentTetris;
  private gravityTimer = 0;
  private tetrisList = [];
  public errorMsg = "";
  public gravityMultiplier = 1;
  public mainBoard;
  public score = 0;

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
      switch(_.toLower(command)) {
        case "a": {
          this.currentTetris.moveLeft();
          // this.currentTetris.moveDown();
          break;
        }
        case "d": {
          this.currentTetris.moveRight();
          // this.currentTetris.moveDown();
          break;
        }
        case "w": {
          this.currentTetris.rotateCounterClockwise();
          // this.currentTetris.moveDown();
          break;
        }
        case "e": {
          this.currentTetris.rotateClockwise();
          // this.currentTetris.moveDown();
          break;
        }
        case "s": {
          this.checkPieceLandedAndCreate();
          this.currentTetris.moveDown();
          this.resetGravityTimer();
          break;
        }
        default: {
          isUnknownCommand = true;
          break;
        }
      }
      if(isUnknownCommand) {
        // this.errorMsg = "Unknown command.";
        console.log("Unknown command")
      }
      else {
        this.updateTetrisBoard();
      }
    }
  };

  public initBoard() {
    this.mainBoard = new Array(this.boardHeight);
    this.clearBoard(this.mainBoard);
    this.landedPiecesBoard = _.cloneDeep(this.mainBoard);
    this.createTetrisPiece();
    this.updateTetrisBoard();
    this.startGravity();
  }

  private createTetrisPiece() {
    this.currentTetris = this.TetrisPieceFactory.createTetrisPiece();
    this.tetrisList.push(this.currentTetris);
    this.currentTetris.setPositionX(this.boardWidth / 2 - 1); //get middle position
    if(this.isGameOver()) {
      clearInterval(this.gravityTimer);
      alert("GAME OVER!! WEAK!");
    }
  }

  private isGameOver() {
    return _.some(this.currentTetris.getBody(), (tetrisRow, index) => {
      return !this.checkValidMove(this.mainBoard[index], this.currentTetris, tetrisRow.length, index);
    });
  }

  private startGravity() {
    const interval = 1000 - this.gravityMultiplier * 100;
    this.gravityTimer = setInterval(() => {
      this.checkPieceLandedAndCreate();
      this.currentTetris.moveDown();
      this.updateTetrisBoard();
    }, interval)
  }

  private resetGravityTimer() {
    clearInterval(this.gravityTimer);
    this.startGravity();
  }

  private checkPieceLandedAndCreate() {
    if(this.updateTetrisBoard() && this.checkPieceLanded()) {
      this.createTetrisPiece();
      this.updateTetrisBoard();
    }
  }

  private updateTetrisBoard(isSilent?: boolean) {
    let isValidMove;
    const boardClone = _.cloneDeep(this.landedPiecesBoard);
    _.each(this.currentTetris.getBody(), (rowElem, index) => {
        let rowBoard = _.get(boardClone, this.currentTetris.getPositionY() + index);
        isValidMove = this.checkValidMove(rowBoard, this.currentTetris, rowElem.length, index);
        if(rowBoard && isValidMove) {
          let rowBoardSubset = rowBoard.slice(this.currentTetris.getPositionX(), this.currentTetris.getPositionX() + rowElem.length);
          _.mergeWith(rowBoardSubset, rowElem, (val1, val2) => val1 || val2);
          rowBoard.splice(this.currentTetris.getPositionX(), rowElem.length, ...rowBoardSubset);
        }
    })
    if(isValidMove) {
      if(!isSilent) {
        this.mainBoard = boardClone;
      }
      return true;
    }
    else {
      if(!isSilent) {
        // this.errorMsg = "Invalid move.";
        console.log("Invalid move.")
        this.currentTetris.revertPosition();
      }
      return false;
    }
  }

  private checkValidMove(rowBoard, tetrisPiece, elemWidth, elemIndex) {
    const startIndex = tetrisPiece.getPositionX();
    const endIndex = tetrisPiece.getPositionX() + elemWidth;
    const subset = rowBoard.slice(startIndex, endIndex);
    return !_.some(tetrisPiece.getBody()[elemIndex], (val, index) => {
      if(val === "*") {
        return subset[index] === this.borderChar || subset[index] === "*";
      }
    })
  }

  private checkPieceLanded() {
    const lastElemIndex = this.currentTetris.getLastElementIndex();
    this.currentTetris.moveDown();
    if(this.updateTetrisBoard(true)) {
      this.currentTetris.moveUp();
      return false;
    }
    else {
      this.currentTetris.moveUp();
      this.checkAndRemoveCompletedLines();
      this.storeLandedPieces();
      return true;
    }
  }

  private storeLandedPieces() {
    this.landedPiecesBoard = _.cloneDeep(this.mainBoard);
  }

  private checkAndRemoveCompletedLines() {
    let rowsToDelete = [];
    _.each(this.mainBoard, (row, rowNo) => {
      let isCompleted = _.every(_.without(row, this.borderChar), (item) => item === "*");
      if(isCompleted && rowNo !== this.boardHeight - 1) {  //exclude bottom border
        rowsToDelete.push(rowNo);
      }
    });
    _.each(rowsToDelete, (rowNo) => {
      this.mainBoard.splice(rowNo, 1);
      this.addNewEmptyLine();
      this.score++;
    });
  }

  private addNewEmptyLine() {
      let newEmptyRow = new Array(this.boardWidth).fill("");
      newEmptyRow[0] = this.borderChar;
      newEmptyRow[this.boardWidth - 1] = this.borderChar;
      this.mainBoard.splice(0, 0, newEmptyRow);
  }

  private clearBoard(mainBoard) {
    for (let i = 0; i < mainBoard.length; i++) {
      mainBoard[i] = new Array(this.boardWidth).fill("");
      mainBoard[i][0] = this.borderChar;
      mainBoard[i][this.boardWidth - 1] = this.borderChar;
    }
    //fill last border
    mainBoard[mainBoard.length - 1].fill(this.borderChar);
  }
}