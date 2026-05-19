import "./styles.css";
import { Player } from "./player.js";
import { ScreenController } from "./screenController.js";

class GameController {
  constructor() {
    this.humanPlayer = new Player("Human");
    this.computerPlayer = new Player("Computer");
    this.activePlayer = "human";
    this.finalResult = false;
    this.hitShipList = [];
  }

  start() {
    this.humanPlayer.gameBoard.placeShip(1, 5, true, [0, 0]);
    this.humanPlayer.gameBoard.placeShip(2, 4, false, [0, 9]);
    this.humanPlayer.gameBoard.placeShip(3, 3, false, [3, 3]);
    this.humanPlayer.gameBoard.placeShip(4, 3, true, [7, 6]);
    this.humanPlayer.gameBoard.placeShip(5, 2, false, [8, 0]);

    this.computerPlayer.gameBoard.placeShip(1, 5, true, [0, 0]);
    this.computerPlayer.gameBoard.placeShip(2, 4, false, [0, 9]);
    this.computerPlayer.gameBoard.placeShip(3, 3, false, [3, 3]);
    this.computerPlayer.gameBoard.placeShip(4, 3, true, [7, 6]);
    this.computerPlayer.gameBoard.placeShip(5, 2, false, [8, 0]);
  }

  randomizeShips() {
    this._placeShipRandomly(this.computerPlayer);
    this._placeShipRandomly(this.humanPlayer);
    console.log(this.computerPlayer.gameBoard.grid);
    console.log(this.humanPlayer.gameBoard.grid);
  }

  _placeShipRandomly(player) {
    const shipType = [
      [1, 5],
      [2, 4],
      [3, 3],
      [4, 3],
      [5, 2],
    ];

    for (const i of shipType) {
      let result;
      do {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const direction = Math.random() >= 0.5;
        result = player.gameBoard.placeShip(i[0], i[1], direction, [x, y]);
      } while (result);
    }
  }

  playTurn(x, y) {
    const result = this.computerPlayer.gameBoard.receiveAttack(x, y);
    if (result.type === "already-hit") {
      return result;
    }

    if (result.gameOver) {
      this.finalResult = true;
      return result;
    }
    this.switchPlayerTurn();
    return result;
  }

  computerAttack() {
    let result, x, y;
    if (this.hitShipList.length !== 0) {
      const { coordinates } = this.hitShipList[0];
      if (coordinates.length === 1) {
        [x, y] = coordinates[0];
        const adjacentTarget = [
          [1, 0],
          [-1, 0],
          [0, -1],
          [0, 1],
        ];
        for (const i of adjacentTarget) {
          result = this.humanPlayer.gameBoard.receiveAttack(x + i[0], y + i[1]);
          if (result.hit || result.type === "miss") {
            [x, y] = [x + i[0], y + i[1]];
            break;
          }
        }
      } else if (coordinates.length >= 2) {
        if (coordinates[0][0] === coordinates[1][0]) {
          const row = coordinates[0][0];
          const allCols = coordinates.map((c) => c[1]);
          const minCol = Math.min(...allCols);
          const maxCol = Math.max(...allCols);
          const targets = [minCol - 1, maxCol + 1];

          for (const col of targets) {
            result = this.humanPlayer.gameBoard.receiveAttack(row, col);
            if (result.hit || result.type === "miss") {
              [x, y] = [row, col];
              break;
            }
          }
        } else if (coordinates[0][1] === coordinates[1][1]) {
          const col = coordinates[0][1];
          const allRows = coordinates.map((c) => c[0]);
          const minRow = Math.min(...allRows);
          const maxRow = Math.max(...allRows);
          const targets = [minRow - 1, maxRow + 1];
          for (const row of targets) {
            result = this.humanPlayer.gameBoard.receiveAttack(row, col);
            if (result.hit || result.type === "miss") {
              [x, y] = [row, col];
              break;
            }
          }
        }
      }
    } else {
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        result = this.humanPlayer.gameBoard.receiveAttack(x, y);
      } while (result.type === "already-hit");
    }

    if (result.hit) {
      if (result.isSunk === true) {
        this.hitShipList = this.hitShipList.filter(
          (ship) => ship.shipId !== result.shipId,
        );
      } else {
        const existingShip = this.hitShipList.find(
          (ship) => ship.shipId === result.shipId,
        );
        if (existingShip) {
          existingShip.coordinates.push([x, y]);
        } else {
          const hitShip = {
            shipId: result.shipId,
            isSunk: result.isSunk,
            coordinates: [[x, y]],
          };
          this.hitShipList.push(hitShip);
        }
      }
    }
    if (result.gameOver) {
      this.finalResult = true;
      return result;
    }
    this.switchPlayerTurn();
    return result;
  }

  switchPlayerTurn() {
    this.activePlayer = this.activePlayer === "human" ? "computer" : "human";
  }
}
const newGame = new GameController();
const newUI = new ScreenController(newGame);

// newGame.randomizeShips();

newUI.dragDrop();

// newUI.render();

// newUI.humanClick();
