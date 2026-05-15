import { GameBoard } from "./game-board.js";
export class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard();
  }
}
