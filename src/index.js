import "./styles.css";
import { Player } from "./player.js";
import { ScreenController } from "./screenController.js";

class GameController {
  constructor() {
    this.humanPlayer = new Player("Human");
    this.computerPlayer = new Player("Computer");
    this.activePlayer = "human";
    this.result = false;
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

  humanAttack() {
    const computerBoard = document.querySelector("#computer-player-board");
    computerBoard.addEventListener("click", (event) => {
      const column = event.target.closest("[data-column]");
      if (this.activePlayer !== "human") {
        return;
      }
      if (!column) return;
      const rowId = parseInt(column.dataset.row);
      const columnId = parseInt(column.dataset.column);
      const result = this.computerPlayer.gameBoard.receiveAttack([
        columnId,
        rowId,
      ]);

      if (result.type === "already-hit") {
        return;
      }

      if (result.type === "miss") {
        column.textContent = "x";
      } else if (result.hit) {
        column.textContent = "o";
      }
      const subTitle = document.querySelector("#subtitle");
      if (result.isSunk) {
        subTitle.textContent = `Computer's Ship ${result.shipId} just sank!`;
        console.log(`Ship ${result.shipId} just sank!`);
      }

      if (result.gameOver) {
        this.result = true;
        subTitle.textContent = "All ships destroyed! Human wins!";
        console.log("All ships destroyed! Human wins!");
      }
      this.switchPlayerTurn();
      subTitle.textContent = "Computer's turn";
    });
  }

  computerAttack() {
    const humanBoard = document.querySelector("#human-player-board");
    humanBoard.addEventListener("click", (event) => {
      const column = event.target.closest("[data-column]");
      if (this.activePlayer !== "computer") {
        return;
      }
      if (!column) return;
      const rowId = parseInt(column.dataset.row);
      const columnId = parseInt(column.dataset.column);
      const result = this.humanPlayer.gameBoard.receiveAttack([
        columnId,
        rowId,
      ]);
      if (result.type === "already-hit") {
        return;
      }
      if (result.type === "miss") {
        column.textContent = "x";
      } else if (result.hit) {
        column.textContent = "o";
      }
      const subTitle = document.querySelector("#subtitle");
      if (result.isSunk) {
        subTitle.textContent = `Human's Ship ${result.shipId} just sank!`;
        console.log(`Ship ${result.shipId} just sank!`);
      }
      if (result.gameOver) {
        this.result = true;
        subTitle.textContent = "All ships destroyed! Computer wins!";
        console.log("All ships destroyed! Computer wins!");
        return;
      }
      this.switchPlayerTurn();
      subTitle.textContent = "Human's turn";
    });
  }

  switchPlayerTurn() {
    this.activePlayer = this.activePlayer === "human" ? "computer" : "human";
  }

  takeTurnAttack() {
    this.humanAttack();
    this.computerAttack();
  }
}
const newGame = new GameController();
const newUI = new ScreenController(newGame);

newGame.start();

newUI.render();
