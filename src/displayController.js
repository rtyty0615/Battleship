// import { humanPlayer, computerPlayer } from "./player";
// import "./styles.css";

class Game {
  constructor() {}

  render() {
    const body = document.querySelector("body");
    const header = document.createElement("header");
    const battelshipTitle = document.createElement("h1");
    battelshipTitle.textContent = "Battleship";
    header.append(battelshipTitle);
    body.append(header);
    // const main = document.createElement("main");
  }
}
const game = new Game();

game.render();
