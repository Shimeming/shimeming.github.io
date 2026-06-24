import { expect, test } from 'vitest';
import { readingTime } from '../reading-time';

test('short text is 1 min', () => { expect(readingTime('hello world')).toBe(1); });
test('counts CJK', () => { expect(readingTime('字'.repeat(800))).toBe(2); });
