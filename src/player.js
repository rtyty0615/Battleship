import { GameBoard } from "./game-board";
class Player {
  constructor(name) {
    this.name = name;
    this.game = new GameBoard();
  }
}

const humanPlayer = new Player("Human");
const computerPlayer = new Player("Computer");

export { humanPlayer, computerPlayer };
