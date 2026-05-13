import { GameBoard } from "./game-board.js";
export class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard();
  }

  initializeShip(shipNum, shipLength, direction, coordinates) {
    this.gameBoard.placeShip(shipNum, shipLength, direction, coordinates);
  }
}
