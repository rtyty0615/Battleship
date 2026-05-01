export class Ship {
  constructor(shipNum, length) {
    this.shipNum = shipNum;
    this.len = length;
    this.hitNum = 0;
    this.sunk = false;
  }

  hit() {
    this.hitNum += 1;
  }

  isSunk() {
    this.sunk = this.hitNum >= this.len;
    return this.sunk;
  }
}
