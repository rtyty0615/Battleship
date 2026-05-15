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
    this.totalShip = 0;
    this.sunkShipNum = 0;
  }

  placeShip(shipNum, shipLength, direction, coordinates) {
    const [x, y] = coordinates;
    if (direction === true) {
      if (
        x < 0 ||
        x >= this.sideLength ||
        y < 0 ||
        y >= this.sideLength - shipLength + 1
      ) {
        return true;
      }
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[x][y + i] !== 0) {
          return true;
        }
      }
      for (let i = 0; i < shipLength; i++) {
        this.grid[x][y + i] = shipNum;
      }
    } else if (direction === false) {
      if (
        x < 0 ||
        x >= this.sideLength - shipLength + 1 ||
        y < 0 ||
        y >= this.sideLength
      ) {
        return true;
      }
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[x + i][y] !== 0) {
          return true;
        }
      }
      for (let i = 0; i < shipLength; i++) {
        this.grid[x + i][y] = shipNum;
      }
    }
    this.totalShip += 1;
    const newShip = new Ship(shipNum, shipLength);
    this.shipList.push(newShip);
    console.log(this.shipList);
    return false;
  }

  receiveAttack(x, y) {
    if (x < 0 || x >= this.sideLength || y < 0 || y >= this.sideLength) {
      throw new Error("Coordinates must be in between board's side length!");
    }
    const target = this.grid[x][y];
    if (target === "x" || target < 0) {
      return { type: "already-hit", hit: false };
    }
    if (target === 0) {
      this.grid[x][y] = "x";
      return { type: "miss", hit: false };
    }
    if (target > 0) {
      this.grid[x][y] *= -1;
      const hitShip = this.shipList.find((ship) => ship.shipNum === target);
      hitShip.hit();
      const result = {
        type: "hit",
        hit: true,
        shipId: target,
        isSunk: false,
        gameOver: false,
      };
      if (hitShip.isSunk()) {
        this.sunkShipNum += 1;
        result.isSunk = true;
        result.type = "sunk";
        if (this.sunkShipNum === this.totalShip) {
          result.gameOver = true;
          result.type = "gameOver";
        }
      }
      return result;
    }
  }
}
