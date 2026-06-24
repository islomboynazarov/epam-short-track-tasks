import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 10, b: 4, action: Action.Subtract, expected: 6 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 8, action: Action.Exponentiate, expected: 256 },
  { a: 1, b: 2, action: 'invalid', expected: null },
  { a: 'x', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
}); 