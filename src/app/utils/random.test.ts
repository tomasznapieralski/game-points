import { getRandomInt } from './random';

test('Test the function input/output', () => {
  for (let i = 0; i < 100; i++) {
    expect(getRandomInt(0, 10)).toBeLessThanOrEqual(10);
    expect(getRandomInt(0, 10)).toBeGreaterThanOrEqual(0);
  }

  expect(getRandomInt(1, 1)).toBe(1);
  expect(getRandomInt(1, 0)).toBe(1);
});
