import { expect, test } from 'vitest';
import { mergeOrder } from '../order.mjs';

test('preserves curated order, appends new, drops missing', () => {
  expect(mergeOrder(['b', 'a', 'c'], ['a', 'b', 'd'])).toEqual(['b', 'a', 'd']);
});
test('empty curated falls back to discovered sorted', () => {
  expect(mergeOrder([], ['c', 'a', 'b'])).toEqual(['a', 'b', 'c']);
});
