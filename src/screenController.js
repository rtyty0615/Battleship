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

  render(message = "Your turn") {
    const body = document.querySelector("body");
    body.innerHTML = "";
    const header = document.createElement("header");
    const battelshipTitle = document.createElement("h1");
    battelshipTitle.textContent = "Battleship";
    const battelshipSubtitle = document.createElement("h2");
    battelshipSubtitle.id = "subtitle";
    battelshipSubtitle.textContent = message;
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
          if (shipCell < 0) {
            column.style.backgroundColor = "red";
          }
          if (shipCell === "x") {
            column.style.backgroundColor = "blue";
          }
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
        if (shipCell === "x") {
          column.textContent = shipCell;
          column.style.backgroundColor = "blue";
        }
        if (shipCell < 0) {
          column.textContent = shipCell;
          column.style.backgroundColor = "red";
        }
      }
    }

    computerPlayer.append(computerPlayerTitle, computerPlayerBoard);

    main.append(humanPlayer, computerPlayer);
    body.append(main);
  }

  humanClick() {
    const computerBoard = document.querySelector("body");
    computerBoard.addEventListener("click", async (event) => {
      if (this.game.activePlayer !== "human" || this.game.finalResult) {
        return;
      }
      if (!event.target.closest("#computer-player-board")) return;
      const column = event.target.closest("[data-column]");
      if (!column) return;
      this.render("You are aiming...");
      const rowId = parseInt(column.dataset.row);
      const columnId = parseInt(column.dataset.column);
      const result = this.game.playTurn(rowId, columnId);
      if (result.type === "already-hit") {
        this.render();
        return;
      }
      await new Promise((r) => setTimeout(r, 1000));

      if (result.type === "miss") {
        this.render("You miss!");
      }
      if (result.hit) {
        this.render("You hit the enemy's ship!");
      }
      if (result.isSunk) {
        await new Promise((r) => setTimeout(r, 1000));
        this.render(`Computer's Ship ${result.shipId} just sank!`);
      }

      if (result.gameOver) {
        await new Promise((r) => setTimeout(r, 1000));
        this.render("All ships destroyed! You wins!");
        return;
      }
      await this.computerTurn();
      return;
    });
  }

  async computerTurn() {
    await new Promise((r) => setTimeout(r, 1000));
    this.render("Computer is aiming...");
    const result = this.game.computerAttack();

    await new Promise((r) => setTimeout(r, 1000));
    if (result.type === "miss") {
      this.render("Computer misses!");
    }
    if (result.hit) {
      this.render("Computer hits your ship!");
    }
    if (result.isSunk) {
      await new Promise((r) => setTimeout(r, 1000));
      this.render(`Your Ship ${result.shipId} just sank!`);
    }

    if (result.gameOver) {
      await new Promise((r) => setTimeout(r, 1000));
      this.render("All ships destroyed! Computer wins!");
      return;
    }
    await new Promise((r) => setTimeout(r, 1000));
    this.render();
  }
}
