import "./styles.css";

export class ScreenController {
  constructor(game) {
    this.game = game;
  }

  print() {
    const x = this.game.computerPlayer.gameBoard.grid;
    console.log(x);
    const y = this.game.humanPlayer.gameBoard.grid;
    console.log(y);
  }

  render() {
    const body = document.querySelector("body");
    body.innerHTML = "";
    const header = document.createElement("header");
    const battelshipTitle = document.createElement("h1");
    battelshipTitle.textContent = "Battleship";
    const battelshipSubtitle = document.createElement("h2");
    battelshipSubtitle.id = "subtitle";
    battelshipSubtitle.textContent = "Human's turn";
    header.append(battelshipTitle, battelshipSubtitle);
    body.append(header);
    const main = document.createElement("main");
    main.innerHTML = "";
    const humanPlayer = document.createElement("div");
    humanPlayer.id = "human-player";
    const humanPlayerTitle = document.createElement("h2");
    humanPlayerTitle.id = "human-player-title";
    humanPlayerTitle.textContent = "Human Player Board";

    const humanPlayerBoard = document.createElement("div");
    humanPlayerBoard.id = "human-player-board";

    const gameBoardHuman = this.game.humanPlayer.gameBoard;
    for (let i = 0; i < gameBoardHuman.sideLength; i++) {
      const row = document.createElement("div");
      row.dataset.row = i;
      humanPlayerBoard.appendChild(row);
      for (let j = 0; j < gameBoardHuman.sideLength; j++) {
        const column = document.createElement("div");
        column.dataset.column = j;
        column.dataset.row = i;
        row.appendChild(column);
        const shipCell = gameBoardHuman.grid[i][j];
        if (shipCell !== 0) {
          column.textContent = shipCell;
        }
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

    const gameBoardComputer = this.game.computerPlayer.gameBoard;
    for (let i = 0; i < gameBoardComputer.sideLength; i++) {
      const row = document.createElement("div");
      row.dataset.row = i;
      computerPlayerBoard.appendChild(row);
      for (let j = 0; j < gameBoardComputer.sideLength; j++) {
        const column = document.createElement("div");
        column.dataset.column = j;
        column.dataset.row = i;
        row.appendChild(column);
        const shipCell = gameBoardComputer.grid[i][j];
        if (shipCell < 0 || shipCell === "x") {
          column.textContent = shipCell;
        }
      }
    }

    computerPlayer.append(computerPlayerTitle, computerPlayerBoard);

    main.append(humanPlayer, computerPlayer);
    body.append(main);
  }

  humanClick() {
    const computerBoard = document.querySelector("body");
    computerBoard.addEventListener("click", (event) => {
      const column = event.target.closest("[data-column]");
      if (this.game.activePlayer !== "human") {
        return;
      }
      if (!column) return;
      const rowId = parseInt(column.dataset.row);
      const columnId = parseInt(column.dataset.column);
      const result = this.game.playTurn(rowId, columnId);
      this.print();
      this.render();
      const subTitle = document.querySelector("#subtitle");
      if (result.type === "miss" || result.hit) {
        console.log(this.game.activePlayer);
      }
      if (result.isSunk) {
        subTitle.textContent = `Computer's Ship ${result.shipId} just sank!`;
        console.log(`Ship ${result.shipId} just sank!`);
      }

      if (result.gameOver) {
        subTitle.textContent = "All ships destroyed! Human wins!";
        console.log("All ships destroyed! Human wins!");
      }
      this.game.computerAttack();
      this.render();
      return;
    });
  }
}
