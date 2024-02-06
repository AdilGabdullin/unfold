import { triangulate } from "../unfold.js";

function p(x, y, z) {
  return { x, y, z };
}

test("triangulate 1", () => {
  const { x, y } = triangulate(p(0, 0, 0), p(3, 4, 0), 3, 4, p(0, 10, 0));
  expect(x).toBeCloseTo(3);
  expect(y).toBeCloseTo(0);
});

test("triangulate 2", () => {
  const { x, y } = triangulate(p(1, 2, 0), p(5, 1, 0), 5, 4, p(0, 0, 0));
  expect(x).toBeCloseTo(5);
  expect(y).toBeCloseTo(5);
});

test("triangulate zero cases 1", () => {
  const { x, y } = triangulate(
    { x: -1.0948757240525822, y: 0.8362276711278316 },
    { x: 39.91010892493341, y: 1.0365622323557506 },
    0,
    41.00547402481771
  );
  expect(x).toBeCloseTo(-1.0948757240525822);
  expect(y).toBeCloseTo(0.8362276711278316);
});

test("triangulate zero cases 2", () => {
  const { x, y } = triangulate(
    { x: -1.0948757240525822, y: 0.8362276711278316 },
    { x: 39.91010892493341, y: 1.0365622323557506 },
    41.00547402481771,
    0
  );
  expect(x).toBeCloseTo(39.91010892493341);
  expect(y).toBeCloseTo(1.0365622323557506);
});
