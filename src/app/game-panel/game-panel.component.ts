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
  private boardWidth = 17;  //allocate 2 for border
  private boardHeight = 21;  //allocate 1 for bottom border
  public mainBoard;
  private currentTetris;
  private tetrisList = [];
  public errorMsg = "";
  public gravityMultiplier = 1;

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
      switch(command.toLowerCase()) {
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
        this.checkPieceLandedAndCreate();
      }
    }
  };

  public initBoard() {
    this.mainBoard = new Array(this.boardHeight);
    this.createTetrisPiece();
    this.updateTetrisBoard();
    this.startGravity();
  }

  private createTetrisPiece() {
    this.currentTetris = this.TetrisPieceFactory.createTetrisPiece();
    this.tetrisList.push(this.currentTetris);
    this.currentTetris.setPositionX(this.boardWidth / 2 - 1); //get middle position
  }

  private startGravity() {
    let interval = 1000 - this.gravityMultiplier * 100;
    setInterval(() => {
      this.currentTetris.moveDown();
      this.checkPieceLandedAndCreate();
    }, interval)
  }

  private checkPieceLandedAndCreate() {
    if(this.updateTetrisBoard() && this.checkPieceLanded()) {
      this.createTetrisPiece();
      this.updateTetrisBoard();
    }
  }

  private updateTetrisBoard(isSilent?: boolean) {
    let isValidMove;
    const mainBoardClone = _.cloneDeep(this.mainBoard);
    this.clearBoard(mainBoardClone);
    _.each(this.tetrisList, (tetrisPiece) => {
      _.every(tetrisPiece.getBody(), (rowElem, index) => {
        let rowBoard = _.get(mainBoardClone, tetrisPiece.getPositionY() + index);
        isValidMove = this.checkValidMove(rowBoard, tetrisPiece, rowElem.length, index);
        if(rowBoard && isValidMove) {
          let rowBoardSubset = rowBoard.slice(tetrisPiece.getPositionX(), tetrisPiece.getPositionX() + rowElem.length);
          _.mergeWith(rowBoardSubset, rowElem, (val1, val2) => val1 || val2);
          rowBoard.splice(tetrisPiece.getPositionX(), rowElem.length, ...rowBoardSubset);
        }
        return isValidMove;
      });
    })
    if(isValidMove) {
      if(!isSilent) {
        this.mainBoard = mainBoardClone;
      }
      return true;
    }
    else {
      if(!isSilent) {
        this.errorMsg = "Invalid move.";
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
        return subset[index] === "*";
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
      return true;
    }
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