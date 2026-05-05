import { Player } from "./player";

export class Game {
  constructor() {
    this.humanPlayer = new Player("Human");
    this.computerPlayer = new Player("Computer");
  }

  render() {
    const body = document.querySelector("body");

    const header = document.createElement("header");
    const battelshipTitle = document.createElement("h1");
    battelshipTitle.textContent = "Battleship";
    const battelshipSubtitle = document.createElement("h2");
    battelshipSubtitle.textContent = "Who's turn";
    header.append(battelshipTitle, battelshipSubtitle);
    body.append(header);

    const main = document.createElement("main");

    const humanPlayer = document.createElement("div");
    humanPlayer.id = "human-player";
    const humanPlayerTitle = document.createElement("h2");
    humanPlayerTitle.id = "human-player-title";
    humanPlayerTitle.textContent = "Human Player";

    const humanPlayerBoard = document.createElement("div");
    humanPlayerBoard.id = "human-player-board";
    for (let i = 0; i < 10; i++) {
      const row = document.createElement("div");
      row.dataset.row = i;
      humanPlayerBoard.appendChild(row);
      for (let j = 0; j < 10; j++) {
        const column = document.createElement("div");
        column.dataset.column = j;
        row.appendChild(column);
      }
    }
    humanPlayer.append(humanPlayerTitle, humanPlayerBoard);

    const computerPlayer = document.createElement("div");
    computerPlayer.id = "computer-player";
    const computerPlayerTitle = document.createElement("h2");
    computerPlayerTitle.id = "computer-player-title";
    computerPlayerTitle.textContent = "Computer Player";

    const computerPlayerBoard = document.createElement("div");
    computerPlayerBoard.id = "computer-player-board";
    for (let i = 0; i < 10; i++) {
      const row = document.createElement("div");
      row.dataset.row = i;
      computerPlayerBoard.appendChild(row);
      for (let j = 0; j < 10; j++) {
        const column = document.createElement("div");
        column.dataset.column = j;
        column.addEventListener("click", () => {});
        row.appendChild(column);
      }
    }
    computerPlayer.append(computerPlayerTitle, computerPlayerBoard);

    main.append(humanPlayer, computerPlayer);
    body.append(main);
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
}
// const newGame = new Game();

// newGame.render();
