import { expect, test } from 'vitest';
import { getActivities, getExperience, getSkills } from '../about';

test('experience entries are well-formed', () => {
  const roles = getExperience();
  expect(roles.length).toBeGreaterThan(0);
  for (const r of roles) {
    expect(r.role).toBeTruthy();
    expect(r.org).toBeTruthy();
    expect(r.period).toBeTruthy();
  }
});

test('activities entries are well-formed', () => {
  const roles = getActivities();
  expect(roles.length).toBeGreaterThan(0);
  for (const r of roles) {
    expect(r.role).toBeTruthy();
    expect(r.org).toBeTruthy();
    expect(r.period).toBeTruthy();
  }
});

test('skill groups carry a category and non-empty items', () => {
  const groups = getSkills();
  expect(groups.length).toBeGreaterThan(0);
  for (const g of groups) {
    expect(g.category).toBeTruthy();
    expect(g.items.length).toBeGreaterThan(0);
  }
});
