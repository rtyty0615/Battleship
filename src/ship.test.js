import { Ship } from "./ship.js";

test("ship should initialize with zero hits", () => {
  const shipOne = new Ship(3);
  expect(shipOne.hitNum).toBe(0);
});

test("ship should add up to 1 after 1 hit", () => {
  const shipOne = new Ship(3);
  shipOne.hit();
  expect(shipOne.hitNum).toBe(1);
});

test("ship should sunk when hitNum equals to ", () => {
  const shipOne = new Ship(2);
  shipOne.hit();
  shipOne.hit();
  expect(shipOne.hitNum).toBe(2);
  shipOne.isSunk();
  expect(shipOne.sunk).toBe(true);
});
