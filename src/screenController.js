import "./styles.css";
import { newGame } from "./index.js";

export class ScreenController {
  constructor(game) {
    this.game = game;
    this.placeShipList = [];
    this.shipTotalNum = 0;
    this.isHorizontal = true;
    this.abortController = new AbortController();
  }

  print() {
    const x = this.game.computerPlayer.gameBoard.grid;
    console.log(x);
    const y = this.game.humanPlayer.gameBoard.grid;
    console.log(y);
  }

  placeShipMenu() {
    const body = document.querySelector("body");
    body.innerHTML = "";
    const header = document.createElement("header");
    const battelshipTitle = document.createElement("h1");
    battelshipTitle.textContent = "Battleship";
    header.append(battelshipTitle);
    body.append(header);

    const main = document.createElement("main");
    const humanPlayer = document.createElement("div");
    humanPlayer.id = "human-player";
    const humanPlayerBoard = document.createElement("div");
    humanPlayerBoard.id = "human-player-board";
    humanPlayerBoard.classList.add("target-zone");

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
          column.classList.add("placed-ship-cell");
        }
      }
    }
    humanPlayer.append(humanPlayerBoard);

    const instruction = document.createElement("div");
    instruction.id = "instruction";
    const subtitleContainer = document.createElement("div");
    subtitleContainer.id = "subtitle-container";
    const battleshipSubtitle = document.createElement("h2");
    battleshipSubtitle.id = "subtitle";
    battleshipSubtitle.textContent = "Place your Ship:";
    const directionButton = document.createElement("button");
    directionButton.id = "direction-btn";
    directionButton.textContent = this.isHorizontal ? "Vertical" : "Horizontal";
    subtitleContainer.append(battleshipSubtitle, directionButton);

    const shipList = document.createElement("div");
    shipList.classList.add(
      "ship-list",
      this.isHorizontal ? "horizontal-list" : "vertical-list",
    );

    const fleetConfig = [
      { num: 1, len: 5, title: "Ship No.1", id: "ship-one" },
      { num: 2, len: 4, title: "Ship No.2", id: "ship-two" },
      { num: 3, len: 3, title: "Ship No.3", id: "ship-three" },
      { num: 4, len: 3, title: "Ship No.4", id: "ship-four" },
      { num: 5, len: 2, title: "Ship No.5", id: "ship-five" },
    ];
    this.shipTotalNum = fleetConfig.length;
    const orientationClass = this.isHorizontal
      ? "horizontal-body"
      : "vertical-body";

    fleetConfig.forEach((shipData) => {
      const ship = document.createElement("div");
      ship.id = shipData.id;

      const shipTitle = document.createElement("h3");
      shipTitle.textContent = shipData.title;

      const shipBody = document.createElement("div");
      shipBody.classList.add("ship-body", orientationClass);
      shipBody.id = `${shipData.id}-body`;
      shipBody.dataset.num = shipData.num;
      shipBody.dataset.len = shipData.len;

      if (this.placeShipList.includes(shipData.num)) {
        shipBody.classList.add("already-place");
      } else {
        shipBody.draggable = true;
      }

      for (let i = 0; i < shipData.len; i++) {
        const cell = document.createElement("div");
        shipBody.append(cell);
      }

      ship.append(shipTitle, shipBody);
      shipList.append(ship);
    });

    instruction.append(subtitleContainer, shipList);
    main.append(humanPlayer, instruction);
    body.append(main);
  }

  dragDrop() {
    const body = document.querySelector("body");

    body.addEventListener(
      "dragstart",
      (ev) => {
        if (!ev.target.classList?.contains("ship-body")) return;

        ev.dataTransfer.setData("ship-num", ev.target.dataset.num);
        ev.dataTransfer.setData("ship-len", ev.target.dataset.len);
        const direction = ev.target.classList.contains("horizontal-body")
          ? true
          : false;
        ev.dataTransfer.setData("ship-dir", direction);
      },
      { signal: this.abortController.signal },
    );

    body.addEventListener(
      "dragover",
      (ev) => {
        const cell = ev.target.closest?.("div[data-row]");
        if (!cell || !ev.target.closest?.(".target-zone")) return;
        ev.preventDefault();

        cell.style.backgroundColor = "red";
      },
      { signal: this.abortController.signal },
    );

    body.addEventListener(
      "dragleave",
      (ev) => {
        const cell = ev.target.closest?.("div[data-row]");
        if (!cell || !ev.target.closest?.(".target-zone")) return;
        cell.style.backgroundColor = "";
      },
      { signal: this.abortController.signal },
    );

    body.addEventListener(
      "drop",
      async (ev) => {
        const cell = ev.target.closest?.("div[data-row]");
        if (!cell || !ev.target.closest?.(".target-zone")) return;
        ev.preventDefault();

        cell.style.backgroundColor = "";

        const shipNum = parseInt(ev.dataTransfer.getData("ship-num"));
        const shipLength = parseInt(ev.dataTransfer.getData("ship-len"));
        const direction = ev.dataTransfer.getData("ship-dir") === "true";

        const dropCell = ev.target.closest("div[data-row]");
        if (!dropCell) return;

        if (!shipNum || !shipLength) return;
        const x = parseInt(ev.target.dataset.row);
        const y = parseInt(ev.target.dataset.column);
        const result = this.game.humanPlayer.gameBoard.placeShip(
          shipNum,
          shipLength,
          direction,
          [x, y],
        );
        if (result) {
          return;
        }
        this.placeShipList.push(shipNum);
        this.placeShipMenu();
        this.switchDirection();
        if (this.shipTotalNum === this.placeShipList.length) {
          await new Promise((r) => setTimeout(r, 1000));
          this.render();
          this.humanClick();
          this.game.randomizeShips();
        }
      },
      { signal: this.abortController.signal },
    );
  }

  switchDirection() {
    const directionButton = document.querySelector("#direction-btn");
    const shipList = document.querySelector(".ship-list");
    const ships = document.querySelectorAll(".ship-body");
    directionButton.addEventListener("click", () => {
      this.isHorizontal = !this.isHorizontal;
      ships.forEach((ship) => {
        ship.classList.toggle("horizontal-body");
        ship.classList.toggle("vertical-body");
      });
      shipList.classList.toggle("horizontal-list");
      shipList.classList.toggle("vertical-list");
      directionButton.textContent = this.isHorizontal
        ? "Vertical"
        : "Horizontal";
    });
  }

  async render(message = "Your turn") {
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
    const humanPlayer = document.createElement("div");
    humanPlayer.id = "human-player";
    const humanPlayerTitle = document.createElement("h3");
    humanPlayerTitle.id = "human-player-title";
    humanPlayerTitle.textContent = "Your Board";

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
        if (shipCell === "x") {
          column.classList.add("miss");
        } else {
          if (shipCell !== 0) {
            column.classList.add("placed-ship-cell");
            if (shipCell < 0) {
              column.classList.add("hit");
            }
          }
        }
      }
    }
    humanPlayer.append(humanPlayerTitle, humanPlayerBoard);

    const computerPlayer = document.createElement("div");
    computerPlayer.id = "computer-player";
    const computerPlayerTitle = document.createElement("h3");
    computerPlayerTitle.id = "computer-player-title";
    computerPlayerTitle.textContent = "Computer Player's Board";

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
          column.classList.add("miss");
        }
        if (shipCell < 0) {
          column.classList.add("placed-ship-cell");
          column.classList.add("hit");
        }
      }
    }

    computerPlayer.append(computerPlayerTitle, computerPlayerBoard);

    main.append(humanPlayer, computerPlayer);
    body.append(main);

    if (this.game.finalResult) {
      await new Promise((r) => setTimeout(r, 1000));
      const newGameContainer = document.createElement("div");
      newGameContainer.id = "new-game-container";
      const newGameBtn = document.createElement("button");
      newGameBtn.textContent = "New Game";
      newGameBtn.id = "new-game-btn";
      newGameBtn.addEventListener("click", () => {
        this.abortController.abort();
        newGame();
      });
      newGameContainer.append(newGameBtn);
      body.append(newGameContainer);
    }
  }

  humanClick() {
    const computerBoard = document.querySelector("body");
    computerBoard.addEventListener(
      "click",
      async (event) => {
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
          this.render("All ships destroyed! You win!");
          return;
        }
        await this.computerTurn();
        return;
      },
      { signal: this.abortController.signal },
    );
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
