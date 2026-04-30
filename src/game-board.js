import { Ship } from "./ship.js";

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
    this.shipList = [];
  }

  placeShip(shipNum, shipLength, direction, coordinates) {
    const newShip = new Ship(shipNum, shipLength);
    this.shipList.push(newShip);
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
      if (
        x < 0 ||
        x >= this.sideLength - shipLength + 1 ||
        y < 0 ||
        y >= this.sideLength
      ) {
        throw new Error("Coordinates must be in between board's side length!");
      }
      for (let i = 0; i < shipLength; i++) {
        this.grid[x + i][y] = 1;
      }
    }
  }

  receiveAttack(coordinates) {
    const [x, y] = coordinates;
    if (x < 0 || x >= this.sideLength || y < 0 || y >= this.sideLength) {
      throw new Error("Coordinates must be in between board's side length!");
    }
    if (this.grid[x][y] === 0) {
      this.grid[x][y] = "x";
    } else if (this.grid[x][y] === 1) {
      this.grid[x][y] = 3;
    }
  }
}
