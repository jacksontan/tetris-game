import TetrisEnumType from '../Enums/tetris-enum-type';

export default abstract class TetrisPiece {
  private id;
  private type;
  private width;
  private height;
  private body;
  private positionX = 9;
  private positionY = 0;
  private oldPositionX = this.positionX;
  private oldPositionY = this.positionY;
  public orientation = 0;
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
    this.positionX--;
  }

  public moveRight() {
    this.oldPositionX = this.positionX;
    this.positionX++;
  }

  public moveUp() {
    this.oldPositionY = this.positionY;
    this.positionY--;
  }

  public moveDown() {
    this.oldPositionY = this.positionY;
    this.positionY++;
  }

  public rotateClockwise() {
    this.orientation++;
    if(this.orientation >= this.bodies.length) {
      this.orientation = 0;
    }
    this.toggleOrientation();
  }

  public rotateCounterClockwise() {
    this.orientation--;
    if(this.orientation < 0) {
      this.orientation = this.bodies.length - 1;
    }
    this.toggleOrientation();
  }

  public revertPosition() {
    this.positionX = this.oldPositionX;
    this.positionY = this.oldPositionY;
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
