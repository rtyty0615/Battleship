export class GameBoard {
  constructor(sideLength = 10) {
    this.sideLength = sideLength;
    const arr = [];
    for (let i = 0; i < sideLength; i++) {
      const arrRow = [];
      for (let j = 0; j < sideLength; j++) {
        arrRow.push(0);
      }
      arr.push(arrRow);
    }
    this.grid = arr;
  }

  receiveAttack() {}

  isSunk() {
    if (this.len === this.hitNum) {
      this.sunk = true;
    }
  }
}
