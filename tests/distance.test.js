import { distance } from "../unfold.js";

test("distance 1", () => {
  expect(distance({ x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 })).toBeCloseTo(Math.sqrt(1 + 1 + 1));
});

test("distance 2", () => {
  expect(distance({ x: 2, y: 5, z: 7 }, { x: 14, y: 14, z: 12 })).toBeCloseTo(Math.sqrt(12 * 12 + 9 * 9 + 5 * 5));
});

test("distance 3", () => {
  expect(distance({ x: 6, y: 7, z: 17 }, { x: 24, y: 34, z: 120 })).toBeCloseTo(
    Math.sqrt(18 * 18 + 27 * 27 + 103 * 103)
  );
});
