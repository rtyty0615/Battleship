import "./styles.css";
import { Player } from "./player.js";
import { ScreenController } from "./screenController.js";

class GameController {
  constructor() {
    this.humanPlayer = new Player("Human");
    this.computerPlayer = new Player("Computer");
    this.activePlayer = "human";
    this.finalResult = false;
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
    let result;
    do {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      result = this.humanPlayer.gameBoard.receiveAttack(x, y);
    } while (result.type === "already-hit");

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

newGame.randomizeShips();

newUI.render();

newUI.humanClick();
