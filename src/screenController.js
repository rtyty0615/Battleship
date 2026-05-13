import "./styles.css";

export class ScreenController {
  constructor(game) {
    this.game = game;
  }

  print() {
    const x = this.game.humanPlayer.gameBoard.sideLength;
    console.log(x);
  }

  render() {
    const gameBoard = this.game.humanPlayer.gameBoard;
    const body = document.querySelector("body");

    const header = document.createElement("header");
    const battelshipTitle = document.createElement("h1");
    battelshipTitle.textContent = "Battleship";
    const battelshipSubtitle = document.createElement("h2");
    battelshipSubtitle.id = "subtitle";
    battelshipSubtitle.textContent = "Human's turn";
    header.append(battelshipTitle, battelshipSubtitle);
    body.append(header);

    const main = document.createElement("main");

    const humanPlayer = document.createElement("div");
    humanPlayer.id = "human-player";
    const humanPlayerTitle = document.createElement("h2");
    humanPlayerTitle.id = "human-player-title";
    humanPlayerTitle.textContent = "Human Player Board";

    const humanPlayerBoard = document.createElement("div");
    humanPlayerBoard.id = "human-player-board";

    for (let i = 0; i < gameBoard.sideLength; i++) {
      const row = document.createElement("div");
      row.dataset.row = i;
      humanPlayerBoard.appendChild(row);
      for (let j = 0; j < gameBoard.sideLength; j++) {
        const column = document.createElement("div");
        column.dataset.column = j;
        column.dataset.row = i;
        row.appendChild(column);
      }
    }
    humanPlayer.append(humanPlayerTitle, humanPlayerBoard);

    const computerPlayer = document.createElement("div");
    computerPlayer.id = "computer-player";
    const computerPlayerTitle = document.createElement("h2");
    computerPlayerTitle.id = "computer-player-title";
    computerPlayerTitle.textContent = "Computer Player Board";

    const computerPlayerBoard = document.createElement("div");
    computerPlayerBoard.id = "computer-player-board";
    for (let i = 0; i < gameBoard.sideLength; i++) {
      const row = document.createElement("div");
      row.dataset.row = i;
      computerPlayerBoard.appendChild(row);
      for (let j = 0; j < gameBoard.sideLength; j++) {
        const column = document.createElement("div");
        column.dataset.column = j;
        column.dataset.row = i;
        row.appendChild(column);
      }
    }
    computerPlayer.append(computerPlayerTitle, computerPlayerBoard);

    main.append(humanPlayer, computerPlayer);
    body.append(main);
  }

  click() {}
}
