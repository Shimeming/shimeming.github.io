import { expect, test } from 'vitest';
import projectOrder from '@/data/projects';
import { getProjectSummaries } from '../projects';

test('summaries cover all curated projects and carry no body', () => {
  const summaries = getProjectSummaries();
  expect(summaries.length).toBe(projectOrder.length);
  for (const p of summaries) {
    expect(p.slug).toBeTruthy();
    expect(p.metadata.projectName).toBeTruthy();
    expect(p.coverImage).toBeTruthy();
    expect(typeof p.hasNote).toBe('boolean');
    expect('content' in p).toBe(false);
  }
});
