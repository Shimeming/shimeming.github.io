# About & Home Page Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix home/navbar alignment, unify duplicated layout code, and surface CV content (Experience, Activities, Skills) on the About page.

**Architecture:** Next.js 15 App Router, static export. Pages compose a shared `Container` plus presentational components. Content lives in `src/data/*.json`, typed in `src/types/about.d.ts`, read through pure getters in `src/lib/about.ts`. Data getters are unit-tested with Vitest (node env); presentational/layout changes are verified via `npm run lint` + `npm run build` + visual inspection (there is no component-test harness in this repo).

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Vitest.

## Global Constraints

- Static export build must pass: `npm run build`.
- Lint must pass: `npm run lint`.
- Vitest tests live in `src/lib/__tests__/*.test.ts`, node environment, imported via `@/` alias. Only `src/**/*.test.ts` files are collected.
- Follow existing styling idioms: design tokens (`text-primary`, `bg-surface`, `border-primary/20`, `font-mono`, `font-display`, `font-sans`, `text-body`, `text-muted`, `text-foreground`), the `Container` layout wrapper, and `SectionLabel` for section titles.
- Use `Link` from `next/link` for internal/external links; external links get `target='_blank' rel='noopener noreferrer'`.
- Commit after each task.

---

### Task 1: Home page alignment + global scrollbar gutter

Fix the home hero so its content aligns with navbar/footer (wrap in `Container`, keep the blueprint grid full-bleed), and reserve the scrollbar gutter globally so navbar/footer slots don't shift between short and long pages. `not-found.tsx` already uses `Container` correctly — no change there.

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: existing `Container` (`@/components/layout/container`), supports `as` prop.
- Produces: none consumed by later tasks.

- [ ] **Step 1: Wrap home content in Container**

Replace the entire body of `src/app/page.tsx` with:

```tsx
import Link from 'next/link';
import Container from '@/components/layout/container';
import AnimatedHeading from '@/components/animated-heading';
import site from '@/data/site';

const Page = () => {
  return (
    <main className='bp-grid flex flex-1 items-center'>
      <Container as='section' className='w-full py-12'>
        {/* Mono eyebrow */}
        <p className='font-mono text-xs uppercase tracking-[0.14em] text-primary'>
          Personal site · 個人網站
        </p>

        {/* Heading + Caveat note */}
        <div className='flex flex-wrap items-baseline gap-x-3'>
          <AnimatedHeading
            text="Hi, I'm Shimeming"
            wordAppearInterval={0.12}
          />
          <span className='-rotate-3 inline-block font-caveat text-xl text-accent'>
            銘 = to inscribe ↗
          </span>
        </div>

        {/* Subtitle */}
        <p className='mt-3 max-w-[42ch] text-body'>
          A CS student at NTU who builds games &amp; graphics — and writes down everything he figures out on the way up.
        </p>

        {/* Button row */}
        <div className='mt-5 flex flex-wrap items-center gap-4'>
          <Link
            href='/projects'
            className='inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wide text-background transition hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            View projects →
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className='font-mono text-sm text-muted transition-colors hover:text-primary'
          >
            ↳ {site.email}
          </Link>
        </div>

        {/* Thin dimension rule */}
        <div className='relative mt-5 h-px bg-primary/20'>
          <span className='absolute -top-5 right-0 font-mono text-[9px] tracking-[0.1em] text-primary/60'>
            ↤ 1440px ↦
          </span>
        </div>
      </Container>
    </main>
  );
};

export default Page;
```

(Changes vs. current: `bp-grid` moves to `<main>`; the `<section>` becomes `<Container as='section'>`; the `px-6 ... sm:px-10` inline padding is dropped so Container's `px-4 sm:px-6 lg:px-8` governs.)

- [ ] **Step 2: Reserve scrollbar gutter globally**

In `src/app/globals.css`, add an `html` rule. Place it immediately above the existing `body {` rule:

```css
html {
  scrollbar-gutter: stable;
}
```

- [ ] **Step 3: Lint + build**

Run: `npm run lint && npm run build`
Expected: both succeed, no new warnings/errors.

- [ ] **Step 4: Visual verification**

Run `npm run dev`, open `/`. Confirm: home eyebrow/heading left edge lines up under the navbar "SHIMEMING" wordmark and over the footer columns; content stops at ~1152px on a wide window. Navigate between `/` (short) and `/about` (long) — the navbar links/seal stay in the same horizontal position (no jump).

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "fix: align home content to Container, reserve scrollbar gutter"
```

---

### Task 2: Match favicon color to the seal

The on-site `Seal` uses the accent color (`#C8402F`); the favicon `icon.svg` is purple (`#7c3aed`). Repaint the favicon to match.

**Files:**
- Modify: `src/app/icon.svg`

- [ ] **Step 1: Change the fill**

In `src/app/icon.svg`, change the rect fill from `#7c3aed` to `#C8402F`:

```svg
<rect width="64" height="64" rx="14" fill="#C8402F"/>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Visual verification**

Open the dev server; confirm the browser-tab favicon is now the same red-orange as the seal in the navbar.

- [ ] **Step 4: Commit**

```bash
git add src/app/icon.svg
git commit -m "fix: match favicon color to on-site seal accent"
```

---

### Task 3: Extract shared nav links

The `pages` array is duplicated in `nav-bar.tsx` and `footer.tsx`. Move it to a single data module.

**Files:**
- Create: `src/data/nav.ts`
- Modify: `src/components/nav-bar.tsx`
- Modify: `src/components/footer.tsx`

**Interfaces:**
- Produces: `navPages: readonly { href: string; title: string }[]` from `@/data/nav`.

- [ ] **Step 1: Create the data module**

Create `src/data/nav.ts`:

```ts
export const navPages = [
  { href: '/about', title: 'About' },
  { href: '/projects', title: 'Projects' },
  { href: '/articles', title: 'Articles' },
  { href: '/celeste', title: 'Celeste' },
] as const;
```

- [ ] **Step 2: Use it in nav-bar**

In `src/components/nav-bar.tsx`: delete the local `const pages = [...]` block; add `import { navPages } from '@/data/nav';` to the imports; replace `pages.map(` with `navPages.map(`.

- [ ] **Step 3: Use it in footer**

In `src/components/footer.tsx`: delete the local `const pages = [...]` block; add `import { navPages } from '@/data/nav';` to the imports; replace `pages.map(` with `navPages.map(`.

- [ ] **Step 4: Lint + build**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 5: Commit**

```bash
git add src/data/nav.ts src/components/nav-bar.tsx src/components/footer.tsx
git commit -m "refactor: share nav links via data/nav"
```

---

### Task 4: Unified PageHeader component

The blueprint header is duplicated in `about/page.tsx` and `articles/page.tsx`, with a larger variant in `projects/page.tsx`. Extract one component and apply it to all three (Projects' build-count moves to an `aside` slot).

**Files:**
- Create: `src/components/ui/page-header.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/articles/page.tsx`
- Modify: `src/app/projects/page.tsx`

**Interfaces:**
- Produces: `PageHeader` (default export) with props `{ fig: string; zh: string; title: string; aside?: React.ReactNode }`.

- [ ] **Step 1: Create the component**

Create `src/components/ui/page-header.tsx`:

```tsx
import { type ReactNode } from 'react';

const PageHeader = ({
  fig,
  zh,
  title,
  aside,
}: {
  fig: string;
  zh: string;
  title: string;
  aside?: ReactNode;
}) => (
  <div className='mb-6 border-b border-primary/25 pb-4 pt-6'>
    <p className='font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary'>
      {fig} · {zh}
    </p>
    <div className='mt-2 flex flex-wrap items-baseline gap-x-3'>
      <h1 className='font-display text-[34px] font-semibold leading-tight tracking-[-0.02em] text-foreground'>
        {title}
      </h1>
      {aside}
    </div>
  </div>
);

export default PageHeader;
```

- [ ] **Step 2: Apply to Articles**

In `src/app/articles/page.tsx`: add `import PageHeader from '@/components/ui/page-header';`. Replace the entire `{/* Blueprint header */}` `<div>...</div>` block with:

```tsx
<PageHeader fig="FIG. 03" zh="札記" title="Articles & Notes" />
```

- [ ] **Step 3: Apply to Projects**

In `src/app/projects/page.tsx`: add `import PageHeader from '@/components/ui/page-header';`. Replace the entire `<header className='mb-8'>...</header>` block with:

```tsx
<PageHeader
  fig="FIG. INDEX"
  zh="作品集"
  title="Projects"
  aside={
    <span className='font-mono text-sm text-muted'>
      {projects.length} {projects.length === 1 ? 'build' : 'builds'}
    </span>
  }
/>
```

- [ ] **Step 4: Apply to About**

In `src/app/about/page.tsx`: add `import PageHeader from '@/components/ui/page-header';`. Replace the entire `{/* Blueprint header */}` `<div>...</div>` block with:

```tsx
<PageHeader fig="FIG. 02" zh="關於" title="About" />
```

- [ ] **Step 5: Lint + build**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 6: Visual verification**

Open `/about`, `/articles`, `/projects`. All three headers share the same bordered 34px style; Projects shows the build count to the right of the title.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/page-header.tsx src/app/about/page.tsx src/app/articles/page.tsx src/app/projects/page.tsx
git commit -m "refactor: unify page headers via PageHeader component"
```

---

### Task 5: Experience/Activities/Skills data, types, and getters (TDD)

Add typed CV data and pure getters, tested with Vitest following the existing `src/lib/__tests__` pattern.

**Files:**
- Modify: `src/types/about.d.ts`
- Create: `src/data/experience.json`
- Create: `src/data/activities.json`
- Create: `src/data/skills.json`
- Modify: `src/lib/about.ts`
- Create: `src/lib/__tests__/about.test.ts`

**Interfaces:**
- Produces:
  - `RoleData { role: string; org: string; period: string; location?: string; bullets?: string[] }`
  - `SkillGroup { category: string; items: string[] }`
  - `getExperience(): RoleData[]`, `getActivities(): RoleData[]`, `getSkills(): SkillGroup[]`

- [ ] **Step 1: Add types**

Append to `src/types/about.d.ts`:

```ts
export interface RoleData {
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets?: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}
```

- [ ] **Step 2: Create the data files**

Create `src/data/experience.json`:

```json
{
  "experience": [
    {
      "role": "Machine Learning Scientist Intern",
      "org": "Appier",
      "period": "Summer 2026 – Spring 2027",
      "location": "Taipei, Taiwan"
    },
    {
      "role": "Quantitative Researcher Intern",
      "org": "WorldQuant",
      "period": "Summer 2025",
      "location": "Taipei, Taiwan",
      "bullets": [
        "Analyzed US equity markets to identify patterns and predictive indicators.",
        "Developed alphas (predictive signals) from academic literature and market analysis, tested with statistical modeling."
      ]
    },
    {
      "role": "Teaching Assistant, CSIE Core Courses",
      "org": "National Taiwan University",
      "period": "Spring 2024 & Fall 2025",
      "location": "Taipei, Taiwan",
      "bullets": [
        "Data Structures & Algorithms (Spring 2024); C Programming (Fall 2025).",
        "Designed and reviewed programming problems."
      ]
    }
  ]
}
```

Create `src/data/activities.json`:

```json
{
  "activities": [
    {
      "role": "Co-Minister, Academic Department",
      "org": "NTUCSIE Student Association",
      "period": "Fall 2024 – Fall 2025",
      "bullets": [
        "Led 20+ students planning and running academic events.",
        "Organized the Freshmen ICPC, a student-run programming & CTF contest."
      ]
    }
  ]
}
```

Create `src/data/skills.json`:

```json
{
  "skills": [
    {
      "category": "Languages",
      "items": ["C#", "C/C++", "CUDA", "Python", "TypeScript", "SQL"]
    },
    {
      "category": "Technologies",
      "items": ["Unity", "Git", "React", "TailwindCSS", "GitHub CI", "Linux", "AI-integrated workflows"]
    }
  ]
}
```

- [ ] **Step 3: Write the failing test**

Create `src/lib/__tests__/about.test.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/about.test.ts`
Expected: FAIL — `getExperience`/`getActivities`/`getSkills` not exported from `../about`.

- [ ] **Step 5: Add the getters**

In `src/lib/about.ts`, add imports at the top and getters at the bottom. The file becomes:

```ts
import activitiesData from '@/data/activities.json';
import awardsData from '@/data/awards.json';
import educationData from '@/data/education.json';
import experienceData from '@/data/experience.json';
import skillsData from '@/data/skills.json';
import { AwardData, EducationData, RoleData, SkillGroup } from '@/types/about';

export function getEducation(): EducationData[] {
  return educationData.education as EducationData[];
}

export function getAwards(): AwardData[] {
  return awardsData.awards as AwardData[];
}

export function getExperience(): RoleData[] {
  return experienceData.experience as RoleData[];
}

export function getActivities(): RoleData[] {
  return activitiesData.activities as RoleData[];
}

export function getSkills(): SkillGroup[] {
  return skillsData.skills as SkillGroup[];
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/about.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 7: Full test suite + build**

Run: `npm test && npm run build`
Expected: all tests pass; build succeeds (confirms JSON `resolveJsonModule` import works under Next).

- [ ] **Step 8: Commit**

```bash
git add src/types/about.d.ts src/data/experience.json src/data/activities.json src/data/skills.json src/lib/about.ts src/lib/__tests__/about.test.ts
git commit -m "feat: add experience/activities/skills data, types, getters"
```

---

### Task 6: Experience & Activities timeline component

A reusable vertical-rule timeline (mirrors `education.tsx`'s visual language) used for both Experience and Activities sections.

**Files:**
- Create: `src/app/about/experience.tsx`

**Interfaces:**
- Consumes: `RoleData` from `@/types/about`; `SectionLabel` from `@/components/ui/section-label`.
- Produces: `RoleTimeline` (default export) with props `{ en: string; zh: string; roles: RoleData[] }`.

- [ ] **Step 1: Create the component**

Create `src/app/about/experience.tsx`:

```tsx
import SectionLabel from '@/components/ui/section-label';
import { RoleData } from '@/types/about';

const RoleNode = ({ role }: { role: RoleData }) => (
  <div className='relative mb-6 pl-6'>
    {/* Timeline node dot */}
    <span
      className='absolute -left-[17px] top-[5px] h-3 w-3 rounded-full bg-primary ring-4 ring-background'
      aria-hidden='true'
    />

    <p className='font-mono text-[11px] font-bold text-primary'>{role.period}</p>

    <h3 className='mt-0.5 font-display text-[17px] font-semibold leading-snug tracking-[-0.01em] text-foreground'>
      {role.role}
    </h3>

    <p className='font-sans text-[13px] text-muted'>
      {role.org}
      {role.location ? ` · ${role.location}` : ''}
    </p>

    {role.bullets && role.bullets.length > 0 && (
      <ul className='mt-2 flex flex-col gap-1'>
        {role.bullets.map((bullet, i) => (
          <li
            key={i}
            className='relative pl-4 font-sans text-[13px] leading-[1.5] text-body before:absolute before:left-0 before:text-primary before:content-["▹"]'
          >
            {bullet}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const RoleTimeline = ({
  en,
  zh,
  roles,
}: {
  en: string;
  zh: string;
  roles: RoleData[];
}) => (
  <section>
    <SectionLabel en={en} zh={zh} />
    <div className='relative border-l-2 border-primary/20 pl-0'>
      {roles.map((role, i) => (
        <RoleNode key={i} role={role} />
      ))}
    </div>
  </section>
);

export default RoleTimeline;
```

- [ ] **Step 2: Lint + build**

Run: `npm run lint && npm run build`
Expected: both succeed (component is unused so far — that's fine; it's wired up in Task 8).

- [ ] **Step 3: Commit**

```bash
git add src/app/about/experience.tsx
git commit -m "feat: add RoleTimeline component for experience/activities"
```

---

### Task 7: Skills component

Grouped skill chips under a SectionLabel, reusing the existing mono-chip styling.

**Files:**
- Create: `src/app/about/skills.tsx`

**Interfaces:**
- Consumes: `SkillGroup` from `@/types/about`; `SectionLabel` from `@/components/ui/section-label`.
- Produces: `Skills` (default export) with props `{ groups: SkillGroup[] }`.

- [ ] **Step 1: Create the component**

Create `src/app/about/skills.tsx`:

```tsx
import SectionLabel from '@/components/ui/section-label';
import { SkillGroup } from '@/types/about';

const Skills = ({ groups }: { groups: SkillGroup[] }) => (
  <section>
    <SectionLabel en='Skills' zh='技能' />
    <div className='flex flex-col gap-3'>
      {groups.map((group) => (
        <div
          key={group.category}
          className='flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-3'
        >
          <span className='shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-primary sm:w-[110px]'>
            {group.category}
          </span>
          <div className='flex flex-wrap gap-1.5'>
            {group.items.map((item) => (
              <span
                key={item}
                className='rounded-[5px] border border-primary/25 bg-surface px-2 py-1 font-mono text-[11px] text-body'
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
```

- [ ] **Step 2: Lint + build**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/skills.tsx
git commit -m "feat: add Skills component"
```

---

### Task 8: Assemble About page + fix bio

Wire the new sections into the About page in the agreed order and rewrite the bio (fix the raw-URL-in-handwriting bug and the graduation date).

**Files:**
- Modify: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `getExperience`, `getActivities`, `getSkills` (Task 5); `RoleTimeline` (Task 6); `Skills` (Task 7); existing `Education`, `Awards`, `TitleBlock`, `PageHeader` (Task 4).

- [ ] **Step 1: Rewrite the page**

Replace the entire contents of `src/app/about/page.tsx` with:

```tsx
import { type Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/layout/container';
import PageHeader from '@/components/ui/page-header';
import TitleBlock from '@/components/ui/title-block';
import {
  getActivities,
  getAwards,
  getEducation,
  getExperience,
  getSkills,
} from '@/lib/about';
import Awards from './awards';
import Education from './education';
import RoleTimeline from './experience';
import Skills from './skills';

export const metadata: Metadata = {
  title: 'About',
};

const Page = () => {
  const education = getEducation();
  const awards = getAwards();
  const experience = getExperience();
  const activities = getActivities();
  const skills = getSkills();

  return (
    <main className='pb-20'>
      <Container>
        <PageHeader fig='FIG. 02' zh='關於' title='About' />

        {/* Bio block: prose left + TitleBlock right */}
        <div className='mb-8 grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_270px]'>
          <p className='font-sans text-[15px] leading-[1.65] text-body'>
            CS student at NTU. I finished my BSc in 2025 and I&apos;m now in the
            MSc program, researching NLP &amp; LLMs — currently model routing —
            in Yun-Nung Chen&apos;s{' '}
            <Link
              href='https://www.csie.ntu.edu.tw/~miulab/'
              target='_blank'
              rel='noopener noreferrer'
              className='font-semibold text-primary underline-offset-2 hover:underline'
            >
              MiuLab
            </Link>
            .{' '}
            <span className='inline-block -rotate-2 font-caveat text-[17px] font-bold text-accent'>
              銘 = to inscribe ↗
            </span>{' '}
            I love exploring new technology and building things.
          </p>
          <TitleBlock />
        </div>

        {/* Experience · Education · Activities · Skills · Awards */}
        <div className='flex flex-col gap-10'>
          <RoleTimeline en='Experience' zh='經歷' roles={experience} />
          <Education education={education} />
          <RoleTimeline en='Activities' zh='活動' roles={activities} />
          <Skills groups={skills} />
          <Awards awards={awards} />
        </div>
      </Container>
    </main>
  );
};

export default Page;
```

- [ ] **Step 2: Lint + build**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Visual verification**

Open `/about`. Confirm: bio reads correctly with "MiuLab" as a working link (no raw URL, no rotated URL); sections appear in order Bio → Experience → Education → Activities → Skills → Awards; Experience/Activities render as timelines with bullets; Skills shows Languages/Technologies chip rows.

- [ ] **Step 4: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: surface experience/activities/skills on About, fix bio"
```

---

## Final verification

- [ ] `npm test` — all tests pass.
- [ ] `npm run lint` — clean.
- [ ] `npm run build` — static export succeeds.
- [ ] Manual pass over `/`, `/about`, `/articles`, `/projects` for alignment, header consistency, favicon color, and the new About sections.
