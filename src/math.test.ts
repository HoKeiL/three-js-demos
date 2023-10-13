import { calcAverage, sum } from "./math";

test("calcAverage", async function () {
  expect(calcAverage([10])).toBe(10);
  expect(calcAverage([10, 20])).toBe(15);
  expect(calcAverage([10, 0, 0])).toBeCloseTo(3.333333, 5);
});

test("sum", async function () {
  expect(sum([10])).toBe(10);
  expect(sum([])).toBe(0);
  expect(sum([-3, 3])).toBe(0);
  expect(sum([10, 0, 5])).toBe(15);
});
