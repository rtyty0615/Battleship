export class Ship {
  constructor(length) {
    this.len = length;
    this.hitNum = 0;
    this.sunk = false;
  }

  hit() {
    this.hitNum += 1;
  }

  isSunk() {
    if (this.len === this.hitNum) {
      this.sunk = true;
    }
  }
}
