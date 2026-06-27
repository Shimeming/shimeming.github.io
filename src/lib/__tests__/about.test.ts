import { expect, test } from 'vitest';
import { getActivities, getEducation, getExperience, getSkills } from '../about';

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

test('every specialization course number resolves to exactly one real course', () => {
  for (const school of getEducation()) {
    const courseNumbers = (school.courses ?? []).map((c) => c.courseNumber);
    for (const spec of school.specializations ?? []) {
      expect(spec.code).toBeTruthy();
      expect(spec.courses.length).toBeGreaterThan(0);
      for (const ref of spec.courses) {
        const matches = courseNumbers.filter((cn) => cn === ref);
        expect(
          matches.length,
          `specialization ${spec.code} references "${ref}", which matched ${matches.length} courses in ${school.school}`,
        ).toBe(1);
      }
    }
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
