import { GameBoard } from "./game-board";

test("gameboard should initialize with 10*10 squares", () => {
  const gameBoardOne = new GameBoard();
  expect(gameBoardOne.grid).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("horizontal: gameboard should include new ships coordinates when placing ships", () => {
  const gameBoardOne = new GameBoard();
  gameBoardOne.placeShip(1, 3, true, [0, 0]);
  expect(gameBoardOne.grid).toEqual([
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  gameBoardOne.placeShip(2, 5, true, [3, 2]);
  expect(gameBoardOne.grid).toEqual([
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  gameBoardOne.placeShip(3, 5, true, [9, 5]);
  expect(gameBoardOne.grid).toEqual([
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 3, 3, 3],
  ]);
});

test("horizontal: gameboard should throw error if coordinates are outside of board", () => {
  const gameBoardOne = new GameBoard();
  expect(() => gameBoardOne.placeShip(1, 3, true, [-1, 0])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.placeShip(2, 3, true, [0, -1])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.placeShip(3, 2, true, [9, 9])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.placeShip(4, 3, true, [9, 8])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.placeShip(5, 5, true, [9, 6])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.placeShip(6, 3, true, [10, 0])).toThrow(
    "Coordinates must be in between board's side length!",
  );
});

test("vertical: gameboard should include new ships coordinates when placing ships", () => {
  const gameBoardOne = new GameBoard();
  gameBoardOne.placeShip(1, 3, false, [0, 0]);
  expect(gameBoardOne.grid).toEqual([
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  gameBoardOne.placeShip(2, 5, false, [3, 2]);
  expect(gameBoardOne.grid).toEqual([
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  gameBoardOne.placeShip(3, 5, false, [5, 9]);
  expect(gameBoardOne.grid).toEqual([
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  ]);
});

test("vertical: gameboard should throw error if coordinates are outside of board", () => {
  const gameBoardOne = new GameBoard();
  expect(() => gameBoardOne.placeShip(1, 3, false, [-1, 0])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.placeShip(2, 3, false, [0, -1])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.placeShip(3, 2, false, [9, 9])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.placeShip(4, 3, false, [8, 9])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.placeShip(5, 5, false, [6, 9])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.placeShip(6, 3, false, [0, 10])).toThrow(
    "Coordinates must be in between board's side length!",
  );
});

test("receiveAttack: gameboard should throw error if coordinates are outside of board", () => {
  const gameBoardOne = new GameBoard();
  expect(() => gameBoardOne.receiveAttack([0, -1])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.receiveAttack([-1, 0])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.receiveAttack([10, 0])).toThrow(
    "Coordinates must be in between board's side length!",
  );
  expect(() => gameBoardOne.receiveAttack([0, 10])).toThrow(
    "Coordinates must be in between board's side length!",
  );
});

test("receiveAttack: gameboard should mark missed when attacks miss ships", () => {
  const gameBoardOne = new GameBoard();

  gameBoardOne.placeShip(1, 3, true, [0, 0]);
  gameBoardOne.placeShip(2, 5, true, [3, 2]);
  gameBoardOne.placeShip(3, 5, true, [9, 5]);
  gameBoardOne.receiveAttack([1, 4]);
  gameBoardOne.receiveAttack([7, 3]);
  expect(gameBoardOne.grid).toEqual([
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, "x", 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "x", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 3, 3, 3],
  ]);
});

test("receiveAttack: gameboard should return nothing if attacks same cells", () => {
  const gameBoardOne = new GameBoard();

  gameBoardOne.placeShip(1, 3, true, [0, 0]);
  gameBoardOne.placeShip(2, 5, true, [3, 2]);
  gameBoardOne.placeShip(3, 5, true, [9, 5]);
  gameBoardOne.receiveAttack([1, 4]);
  gameBoardOne.receiveAttack([7, 3]);

  gameBoardOne.receiveAttack([7, 3]);
  expect(gameBoardOne.grid).toEqual([
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, "x", 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "x", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 3, 3, 3],
  ]);
  gameBoardOne.receiveAttack([0, 0]);
  expect(gameBoardOne.grid).toEqual([
    [-1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, "x", 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "x", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 3, 3, 3],
  ]);
  gameBoardOne.receiveAttack([0, 0]);
  expect(gameBoardOne.grid).toEqual([
    [-1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, "x", 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "x", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 3, 3, 3],
  ]);
});

test("receiveAttack: gameboard should mark attacked ship's cell as negative number", () => {
  const gameBoardOne = new GameBoard();

  gameBoardOne.placeShip(1, 3, true, [0, 0]);
  gameBoardOne.placeShip(2, 5, true, [3, 2]);
  gameBoardOne.placeShip(3, 5, true, [9, 5]);
  gameBoardOne.receiveAttack([1, 4]);
  gameBoardOne.receiveAttack([7, 3]);
  gameBoardOne.receiveAttack([0, 0]);
  expect(gameBoardOne.grid).toEqual([
    [-1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, "x", 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "x", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 3, 3, 3],
  ]);

  gameBoardOne.receiveAttack([9, 9]);
  expect(gameBoardOne.grid).toEqual([
    [-1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, "x", 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "x", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 3, 3, -3],
  ]);
});
