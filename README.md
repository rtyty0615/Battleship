# Battleship

A full-featured, browser-based implementation of the classic game Battleship. Built from the ground up using strictly Vanilla JavaScript, HTML5, and CSS3, and bundled with Webpack.

This project emphasizes modular, object-oriented programming (OOP), native DOM interactions, and intelligent game logic.

## 🔗 Live Demo

[Play Battleship Here](https://rtyty0615.github.io/Battleship/)

---

## Key Features

- **Interactive Ship Placement Phase:**
  - Utilizes the native HTML5 Drag and Drop API for fluid ship placement.
  - Real-time grid highlighting (`dragover` / `dragleave`) to preview valid drop zones.
  - Dynamic axis switching (Horizontal/Vertical) maintaining state across DOM updates.
- **Smart "Hunt and Target" AI:**
  - The computer opponent doesn't just guess randomly. Upon hitting a ship, it enters a "Hunt" mode, targeting adjacent cells. Once a second hit is registered, it intelligently determines the ship's axis and continues firing along that line until the ship sinks.
- **Robust Memory Management:**
  - Implements `AbortController` to safely sever global event listeners between game loops, ensuring a completely memory-safe environment with no "ghost listeners" or memory leaks upon game resets.
- **Modular Architecture:**
  - Strict separation of concerns following the MVC (Model-View-Controller) design pattern. The UI rendering (`ScreenController`) is entirely decoupled from the business logic (`GameController`, `GameBoard`, `Ship`).
- **Clean UI/UX:**
  - Responsive, flexbox-driven grid layouts.
  - Universal text-selection disabling (`user-select: none`) to prevent accidental highlighting during rapid clicking and dragging.
  - Absolute-positioned modal interfaces to prevent layout shifting.

---

## Technologies & Tools Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Build Tool:** Webpack (bundled for production optimization)
- **Package Manager:** npm
- **Deployment:** GitHub Pages (`gh-pages`)

---

## 🏗️ Project Architecture

The application is structured using ES6 Classes to ensure modularity and scalability:

- `Ship.js`: Manages individual ship lengths, hit counts, and sunk status.
- `GameBoard.js`: Handles 2D grid generation, coordinate validation, ship placement logic, and receiving attacks.
- `Player.js`: Connects a player entity (Human or Computer) to their respective `GameBoard`.
- `GameController.js`: Manages the core game loop, turn-taking, AI targeting algorithms, and win-state validation.
- `ScreenController.js`: Handles all DOM manipulation, Drag and Drop events, and user inputs.

---

## 🚀 Installation & Local Setup

To run this project locally, ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. **Clone the repository:**

```bash
   git clone [https://github.com/](https://github.com/)<your-github-username>/<your-repo-name>.git
   cd <your-repo-name>
```
