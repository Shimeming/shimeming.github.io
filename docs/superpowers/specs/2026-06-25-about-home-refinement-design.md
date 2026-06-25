# About & Home Page Refinement — Design

Date: 2026-06-25
Branch: redesign-overhaul

## Goal

Refine the home and about pages of the homepage: fix layout/alignment
inconsistencies, remove duplicated layout code, and surface CV content
(Experience, Activities, Skills) that the site does not yet show.

## Scope

Five workstreams, ordered low-risk → higher-touch:

1. Layout alignment (home + not-found + navbar)
2. Logo/favicon color consistency
3. Refactor duplicated layout code
4. New About content: Experience, Activities, Skills
5. Bio copy fixes

Out of scope (explicitly deferred): adding a portrait/photography.

---

## 1. Layout alignment

### 1a. Home content x-margin

**Problem:** `app/page.tsx` does not use `<Container>`. It uses
`bp-grid w-full px-6 py-12 sm:px-10` — no `max-width`, no `mx-auto`, and
different horizontal padding than the navbar/footer (which both use
`<Container>` = `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8`). So home
content stretches full-width on wide screens and its left/right inset does
not line up with the navbar wordmark or footer columns.

**Fix:** keep the blueprint graph-paper grid full-bleed on `<main>`, but move
content into `<Container>` so it aligns with every other page. The user likes
the graph-paper + dimension-rule motif — keep both untouched.

```tsx
<main className='bp-grid flex flex-1 items-center'>
  <Container as='section' className='w-full py-12'>
    … existing hero content, minus the px-6 sm:px-10 …
  </Container>
</main>
```

Apply the same Container wrap to `app/not-found.tsx` (currently
`bp-grid flex flex-1 items-center` with content directly inside).

The decorative `↤ 1440px ↦` dimension label stays as-is (a liked motif).

### 1b. Navbar slot shift across pages

**Problem:** navbar/footer slot positions appear to differ between short pages
(home, Articles — no vertical scrollbar) and long pages (About, Projects,
Celeste — scrollbar present). The scrollbar removes ~15px of viewport width,
shifting the centered `max-w-6xl` container. There is no `scrollbar-gutter`
set anywhere.

**Fix:** in `globals.css`, reserve the scrollbar gutter globally:

```css
html { scrollbar-gutter: stable; }
```

This keeps layout width constant whether or not a scrollbar is present, so the
navbar/footer slots land in the same place on every page.

---

## 2. Logo / favicon color consistency

**Problem:** the web logo (`Seal`, `src/components/ui/seal.tsx`) uses
`bg-accent` (`#C8402F` light / `#FF6B5A` dark — red-orange). The favicon
(`src/app/icon.svg`) is filled `#7c3aed` (purple). They don't match.

**Fix:** repaint `icon.svg`'s background rect from `#7c3aed` to the light-mode
accent `#C8402F` so the favicon matches the on-site seal. (Favicons can't be
theme-aware; the light accent is the canonical brand color.) The existing
`rx="14"` already matches the seal's rounded-rect ratio.

---

## 3. Refactor duplicated layout code

### 3a. Shared nav links

The `pages` array is duplicated verbatim in `nav-bar.tsx` and `footer.tsx`.

**Fix:** new `src/data/nav.ts` exporting `navPages`; import in both.

```ts
// src/data/nav.ts
export const navPages = [
  { href: '/about', title: 'About' },
  { href: '/projects', title: 'Projects' },
  { href: '/articles', title: 'Articles' },
  { href: '/celeste', title: 'Celeste' },
] as const;
```

### 3b. Shared page header

The "blueprint header" (`FIG. 0X · 漢字` eyebrow + `<h1>`) is duplicated inline
in `about/page.tsx` and `articles/page.tsx`, with a third, larger variant in
`projects/page.tsx`. Per the user: title styles of About/Projects/Articles
should be roughly the same.

**Fix:** new `src/components/ui/page-header.tsx`:

```tsx
const PageHeader = ({ fig, zh, title, aside }: {
  fig: string; zh: string; title: string; aside?: React.ReactNode;
}) => ( … bordered 34px style, same as current About/Articles, with an
        optional `aside` slot rendered baseline-aligned next to the h1 … );
```

- About: `<PageHeader fig="FIG. 02" zh="關於" title="About" />`
- Articles: `<PageHeader fig="FIG. 03" zh="札記" title="Articles & Notes" />`
- Projects: `<PageHeader fig="FIG. INDEX" zh="作品集" title="Projects"
    aside={<span>{n} builds</span>} />` — Projects shifts from its current
    4xl/5xl heading to the unified 34px bordered style; the build count moves
    into the `aside` slot.

---

## 4. New About content

All content sourced from the user's CV (`private-docs/CV.zip → main.typ`).

### 4a. Data + types

New JSON files following the existing `data/*.json` + `types/about.d.ts`
pattern, with getters in `src/lib/about.ts`:

- `data/experience.json`
- `data/activities.json`
- `data/skills.json`

New interfaces in `src/types/about.d.ts`:

```ts
export interface RoleData {
  role: string;          // title
  org: string;           // subtitle
  period: string;        // e.g. "Summer 2025"
  location?: string;
  bullets?: string[];
}

export interface SkillGroup {
  category: string;      // "Languages" | "Technologies"
  items: string[];
}
```

`RoleData` is shared by both Experience and Activities.

### 4b. Experience + Activities components

New `src/app/about/experience.tsx` exports a `RoleTimeline` that renders a
vertical-rule timeline (node dot + period + role/org + bullets), reusing the
same visual language as `education.tsx`'s `SchoolNode`. Used twice:

- Experience section: `<SectionLabel en="Experience" zh="經歷" />` + timeline
- Activities section: `<SectionLabel en="Activities" zh="活動" />` + timeline

(Activities is a separate section per the user's choice, not folded into
Experience.) If a `RoleData` has no bullets, render role/org/period only.

**Experience data:**

- Machine Learning Scientist Intern — Appier — Summer 2026 – Spring 2027 —
  Taipei, Taiwan (no bullets)
- Quantitative Researcher Intern — WorldQuant — Summer 2025 — Taipei, Taiwan
  - Analyzed US equity markets to identify patterns and predictive indicators.
  - Developed alphas (predictive signals) from academic literature and market
    analysis, tested with statistical modeling.
- Teaching Assistant, CSIE Core Courses — National Taiwan University —
  Spring 2024 & Fall 2025 — Taipei, Taiwan
  - Data Structures & Algorithms (Spring 2024); C Programming (Fall 2025).
  - Designed and reviewed programming problems.

**Activities data:**

- Co-Minister, Academic Department — NTUCSIE Student Association —
  Fall 2024 – Fall 2025
  - Led 20+ students planning and running academic events.
  - Organized the Freshmen ICPC, a student-run programming & CTF contest.

### 4c. Skills component

New `src/app/about/skills.tsx`: `<SectionLabel en="Skills" zh="技能" />` with
grouped chip rows, reusing the existing chip styling (the bordered mono chip
used by course chips). One row per category.

**Skills data:**

- Languages: C#, C/C++, CUDA, Python, TypeScript, SQL
- Technologies: Unity, Git, React, TailwindCSS, GitHub CI, Linux,
  AI-integrated workflows

### 4d. About page assembly

Order: Bio → Experience → Education → Activities → Skills → Awards.
(Bio→Experience→Education→Skills→Awards with the separate Activities section
placed after Education, before Skills.)

---

## 5. Bio copy fixes

**Problems in `about/page.tsx`:**
- The MiuLab URL is wrapped in a `font-caveat -rotate-2` span, so the raw URL
  renders as rotated handwriting mid-sentence (a bug).
- "graduated 2026" contradicts the CV (BSc through Fall 2025, MSc ongoing).

**Fix:** rewrite the bio paragraph:

> CS student at NTU. I finished my BSc in 2025 and I'm now in the MSc program,
> researching NLP & LLMs — currently model routing — in Yun-Nung Chen's
> **MiuLab** *(real link to https://www.csie.ntu.edu.tw/~miulab/)*.
> I love exploring new technology and building things.

Keep a short handwritten caveat motif (e.g. `銘 = to inscribe ↗`) as a
styled aside, not wrapping a URL.

---

## Testing / verification

- `npm run build` (static export) succeeds.
- Visual check: home hero left/right edges align with navbar wordmark and
  footer columns; content constrained to 1152px on wide screens.
- Visual check: navbar slots land in the same place on a short page (home) and
  a long page (About) — no horizontal shift.
- Favicon and on-site seal are the same color.
- About page renders Experience, Activities, Skills sections from data;
  bio link works and date is correct.

## Files touched

- `src/app/page.tsx`, `src/app/not-found.tsx` (Container wrap)
- `src/app/globals.css` (scrollbar-gutter)
- `src/app/icon.svg` (color)
- `src/data/nav.ts` (new), `src/components/nav-bar.tsx`, `src/components/footer.tsx`
- `src/components/ui/page-header.tsx` (new), `src/app/{about,articles,projects}/page.tsx`
- `src/types/about.d.ts`, `src/lib/about.ts`
- `src/data/experience.json`, `src/data/activities.json`, `src/data/skills.json` (new)
- `src/app/about/experience.tsx`, `src/app/about/skills.tsx` (new)
- `src/app/about/page.tsx` (assembly + bio)
