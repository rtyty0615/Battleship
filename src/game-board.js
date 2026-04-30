// import { Ship } from "./ship.js";

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

  placeShip(shipLength, direction, coordinates) {
    // const newShip = new Ship(shipLength);
    if (direction === true) {
      for (let i = 0; i < shipLength; i++) {
        this.grid[coordinates[0]][coordinates[1] + i] = 1;
      }
    }
  }

  receiveAttack() {}
}
