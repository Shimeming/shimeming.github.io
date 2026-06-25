import { expect, test } from 'vitest';
import { assertProjectMetadata } from '../projects';

test('throws on missing projectName', () => {
  expect(() => assertProjectMetadata({ description: 'x' }, 'foo')).toThrow(/foo.*projectName/);
});
test('passes valid metadata through', () => {
  const m = assertProjectMetadata({ projectName: 'A', description: 'd' }, 'a');
  expect(m.projectName).toBe('A');
});
