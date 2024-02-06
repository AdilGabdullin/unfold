import { isOpposite } from "../unfold.js";

function p(x, y, z) {
  return { x, y, z };
}

test("isOpposite", () => {
  expect(isOpposite(p(0, 0), p(3, 4), p(0, 4), p(3, 0))).toBeTruthy();
  expect(isOpposite(p(0, 0), p(3, 4), p(0, 4), p(-13, 20))).toBeFalsy();
  expect(isOpposite(p(7, 0), p(7, 4), p(6, 4), p(8, 0))).toBeTruthy();
  expect(isOpposite(p(8, 0), p(8, 4), p(4, 4), p(3, 20))).toBeFalsy();
  expect(isOpposite(p(7, 10), p(7, 10), p(6, 4), p(8, 11))).toBeTruthy();
  expect(isOpposite(p(8, 14), p(8, 14), p(4, 4), p(3, 2))).toBeFalsy();
});
