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
    this.humanPlayer.initializeShip(1, 5, true, [0, 0]);
    this.humanPlayer.initializeShip(2, 4, false, [0, 9]);
    this.humanPlayer.initializeShip(3, 3, false, [3, 3]);
    this.humanPlayer.initializeShip(4, 3, true, [7, 6]);
    this.humanPlayer.initializeShip(5, 2, false, [8, 0]);

    this.computerPlayer.initializeShip(1, 5, true, [0, 0]);
    this.computerPlayer.initializeShip(2, 4, false, [0, 9]);
    this.computerPlayer.initializeShip(3, 3, false, [3, 3]);
    this.computerPlayer.initializeShip(4, 3, true, [7, 6]);
    this.computerPlayer.initializeShip(5, 2, false, [8, 0]);
  }

  playTurn(x, y) {
    const result = this.computerPlayer.gameBoard.receiveAttack(x, y);
    if (result.type === "already-hit") {
      return;
    }

    if (result.gameOver) {
      this.finalResult = true;
      return result;
    }
    this.switchPlayerTurn();
    return result;
  }

  computerAttack() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const result = this.humanPlayer.gameBoard.receiveAttack(x, y);
    if (result.type === "already-hit") {
      this.computerAttack();
      return;
    }
    this.switchPlayerTurn();
    console.log(this.activePlayer);
  }

  switchPlayerTurn() {
    this.activePlayer = this.activePlayer === "human" ? "computer" : "human";
  }
}
const newGame = new GameController();
const newUI = new ScreenController(newGame);

newGame.start();

newUI.render();

newUI.humanClick();
