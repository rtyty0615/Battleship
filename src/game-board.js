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
    const [x, y] = coordinates;

    if (direction === true) {
      if (
        x < 0 ||
        x >= this.sideLength ||
        y < 0 ||
        y >= this.sideLength - shipLength + 1
      ) {
        throw new Error("Coordinates must be in between board's side length!");
      }
      for (let i = 0; i < shipLength; i++) {
        this.grid[x][y + i] = 1;
      }
    } else if (direction === false) {
      for (let i = 0; i < shipLength; i++) {
        this.grid[x + i][y] = 1;
      }
    }
  }

  receiveAttack() {}
}
