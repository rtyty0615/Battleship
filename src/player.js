import { GameBoard } from "./game-board";
class Player {
  constructor(name) {
    this.name = name;
    this.game = new GameBoard();
  }

  initializeShip(shipNum, shipLength, direction, coordinates) {
    this.game.placeShip(shipNum, shipLength, direction, coordinates);
  }
}

export { Player };
