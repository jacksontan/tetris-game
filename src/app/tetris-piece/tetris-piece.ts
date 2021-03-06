import TetrisEnumType from '../enums/tetris-enum-type';
import _ from 'lodash';

export default abstract class TetrisPiece {
  private id;
  private type;
  private width;
  private height;
  private body;
  private positionX = 0;
  private positionY = 0;
  public orientation = 0;
  private oldPositionX = this.positionX;
  private oldPositionY = this.positionY;
  private oldOrientation = this.orientation;
  public bodies = [];

  constructor(id) {
    this.setId(id);
    this.generateBody();
  }
  abstract generateBody(): void;

  public setWidthAndHeight() {
    this.setHeight(this.getBody().length);
    this.setWidth(this.getBody()[0].length);
  }

  public moveLeft() {
    this.oldPositionX = this.positionX;
    this.oldPositionY = undefined;
    this.oldOrientation = undefined;
    this.positionX--;
  }

  public moveRight() {
    this.oldPositionX = this.positionX;
    this.oldPositionY = undefined;
    this.oldOrientation = undefined;
    this.positionX++;
  }

  public moveUp() {
    this.oldPositionX = undefined;
    this.oldPositionY = this.positionY;
    this.oldOrientation = undefined;
    this.positionY--;
  }

  public moveDown() {
    this.oldPositionX = undefined;
    this.oldPositionY = this.positionY;
    this.oldOrientation = undefined;
    this.positionY++;
  }

  public rotateClockwise() {
    this.oldOrientation = this.orientation;
    this.orientation--;
    if(this.orientation < 0) {
      this.orientation = this.bodies.length - 1;
    }
    this.toggleOrientation();
    this.oldPositionX = undefined;
    this.oldPositionY = undefined;
  }

  public rotateCounterClockwise() {
    this.oldOrientation = this.orientation;
    this.orientation++;
    if(this.orientation >= this.bodies.length) {
      this.orientation = 0;
    }
    this.toggleOrientation();
    this.oldPositionX = undefined;
    this.oldPositionY = undefined;
  }

  public revertPosition() {
    this.positionX = _.isUndefined(this.oldPositionX) ? this.positionX : this.oldPositionX;
    this.positionY = _.isUndefined(this.oldPositionY) ? this.positionY : this.oldPositionY;
    this.orientation = _.isUndefined(this.oldOrientation) ? this.orientation : this.oldOrientation;
    this.toggleOrientation();
  }

  public getLastElementIndex() {
    return this.positionY + this.height;
  }

  public toggleOrientation() {
    this.setBody(this.bodies[this.orientation]);
    this.setWidthAndHeight();
  }

  public setId(id) {
    this.id = id;
  }

  public getId() {
    return this.id;   
  }

  public setType(type) {
    this.type = type;
  }

  public getType() {
    return this.type;
  }

  public setWidth(width) {
    this.width = width;
  }

  public getWidth() {
    return this.width;
  }

  public setHeight(height) {
    this.height = height;
  }

  public getHeight() {
    return this.height;
  }

  public setBody(body) {
    this.body = body;
  }

  public getBody() {
    return this.body;
  }

  public setPositionX(position) {
    this.positionX = position;
  }

  public getPositionX() {
    return this.positionX;
  }

  public setPositionY(position) {
    this.positionY = position;
  }

  public getPositionY() {
    return this.positionY;
  }
}
