# Homepage "Blueprint" Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the visual surface of the Next.js portfolio into the "Blueprint" design system (engineering-drawing aesthetic, EN/中文, split-pane project index), keeping the build-time content architecture and slug routing, and fixing the code-level flaws from review.

**Architecture:** Next.js 15 App Router, static export (`output: 'export'`) to GitHub Pages at root. Content stays build-time (fs + gray-matter, server components); only the presentation layer (tokens, fonts, components, page layouts) changes, plus small additions to the content libs and frontmatter. One new client island (the Projects split-pane) and a relocated theme toggle.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind 3, `motion`, `next-themes`, `gray-matter`, `react-markdown`. New: **vitest** (dev-only, for content-lib logic), Google fonts **Space Grotesk** + **Space Mono**.

## Global Constraints

- **Design source of truth (two artifacts, copy from them — do not re-derive):**
  - Spec: `docs/superpowers/specs/2026-06-25-homepage-blueprint-redesign-design.md` — tokens, page intent, content-model, fixes.
  - Approved mockups (exact HTML/CSS for each page): `.superpowers/brainstorm/915391-1782318706/content/` — `blueprint-system.html` (hero + tokens), `split-pane-v2.html` (Projects index), `projects.html` (project detail plate), `about-articles-v2.html` (About + Articles), `celeste-shell.html` (nav + footer). These hold the literal colors, type, spacing, and structure that were approved. Lift CSS/markup from them; translate to Tailwind classes / token vars.
- **Tokens (verbatim).** Light: `--background:#F5F8F6`, `--surface:#FFFFFF`, `--surface-flat:#F4F7F5`, `--foreground:#16202A`, `--body:#33414F`, `--muted:#41576A`, `--primary:#1E5FCC`, `--accent:#C8402F`, `--grade:#1E8A4C`, grid line `#1E5FCC`@7%. Dark: `--background:#0E1A24`, `--surface:#13242F`, `--surface-flat:#10202A`, `--foreground:#E6EEF3`, `--body:#9FB6C4`, `--muted:#8FA6B5`, `--primary:#5BA8FF`, `--accent:#FF6B5A`, hand `#FF9A6B`, grid line `#38BDF8`@7%.
- **Type roles (verbatim).** display = Space Grotesk; mono = Space Mono; body = Noto Sans + Noto Sans TC; hand = Caveat.
- **Platform:** must keep `output: 'export'` working (`images.unoptimized`, no server-only runtime APIs). Every UI task ends green on `npm run build`.
- **`FIG.` numbering is scoped to genuine figures** (project-detail cover plate) — never decorative per-card numbering.
- **Celeste page stays as-is** except a "last sync" label (Task C6). Do not blueprint-frame it.
- **A11y floor (every interactive element):** visible `focus-visible` outline in `--primary`; hover-revealed content also opens on focus and is never the only path to info; `prefers-reduced-motion` respected.
- **UI verification checklist (the "test" for every visual task, since there is no component test runner):**
  1. `npm run build` succeeds (static export emits).
  2. `npm run lint` passes.
  3. `npm run dev`, open the page, visually compare against the named mockup in **both** light and dark; check keyboard focus + a narrow viewport (~375px).
- **Commit cadence:** one commit per task, conventional-commit subject. Branch: `redesign-overhaul`.

---

## File Structure

**New files**
- `vitest.config.ts` — test runner config (node env, exclude `.next`/`out`).
- `src/components/footer.tsx` — site footer (drawing title/revision block).
- `src/components/theme-toggle-button.tsx` — the toggle (moved out of layout; reused by nav). *(Rename of current `dark-mode-toggle.tsx` logic; keep the SVG animation.)*
- `src/app/projects/projects-index.tsx` — the split-pane master/detail client island.
- `src/components/ui/seal.tsx` — the 銘 seal (logo + stamp variants).
- `src/components/ui/figure-plate.tsx` — cover + corner-tick + FIG caption wrapper (project detail).
- `src/components/ui/title-block.tsx` — About engineering title block.
- `src/lib/reading-time.ts` — word-count → minutes.
- `src/lib/__tests__/*.test.ts` — unit tests for the lib logic.

**Modified files**
- `package.json` — add `test` script + vitest dev deps.
- `tailwind.config.ts` — new color tokens, font families, remove dead globs (`src/pages`, `src/helpers`).
- `src/app/globals.css` — blueprint tokens (light/dark) + grid background utility.
- `src/lib/fonts.ts` — add Space Grotesk/Mono; drop Geist Mono; keep Poppins only for the Celeste journal.
- `src/app/layout.tsx` — font vars, default OpenGraph metadata, remove floating toggle, add `<Footer/>`.
- `src/components/nav-bar.tsx` — blueprint nav + theme toggle in header.
- `src/app/page.tsx` — blueprint hero (remove waterfall image).
- `src/app/not-found.tsx` — blueprint restyle.
- `scripts/update-content.js` — preserve curated order; also emit `articles.ts`.
- `src/lib/projects.ts`, `src/types/project.d.ts` — new fields + validation + summary-only read.
- `src/lib/articles.ts`, `src/types/article.d.ts` — excerpt/lang + reading time.
- `src/data/projects.ts` — gains `category` etc. via per-project frontmatter (data file stays an ordered slug list).
- `src/app/projects/project-card.tsx` → folded into `projects-index.tsx` (list row + preview pane).
- `src/app/projects/[slug]/page.tsx` — figure plate + spec table + notes measure.
- `src/app/about/*`, `src/app/articles/*` — new layouts.
- `src/app/celeste/page.tsx` — surface `lastUpdate`.
- `src/components/markdown.tsx` — reading measure + margin-note handling.
- `public/projects/*/content.md`, `public/articles/*.md` — new frontmatter.
- `README.md` — rewrite.

---

## Phase A — Design foundation

### Task A1: Test tooling + dead-glob cleanup

**Files:**
- Modify: `package.json`, `tailwind.config.ts:6-11`
- Create: `vitest.config.ts`, `src/lib/__tests__/smoke.test.ts`

**Interfaces:**
- Produces: `npm test` runs vitest; later tasks add `*.test.ts` under `src/lib/__tests__/`.

- [ ] **Step 1:** Add dev deps + script. In `package.json` add to `devDependencies`: `"vitest": "^2.1.8"`, and to `scripts`: `"test": "vitest run"`, `"test:watch": "vitest"`. Run `npm install`.
- [ ] **Step 2:** Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: { environment: 'node', include: ['src/**/*.test.ts'], exclude: ['node_modules', '.next', 'out'] },
});
```
- [ ] **Step 3 (failing test):** `src/lib/__tests__/smoke.test.ts`:
```ts
import { expect, test } from 'vitest';
test('vitest runs', () => { expect(1 + 1).toBe(2); });
```
- [ ] **Step 4:** Run `npm test` → expect PASS (1 test).
- [ ] **Step 5:** Remove dead Tailwind content globs. In `tailwind.config.ts` delete the `./src/pages/**` and `./src/helpers/**` lines, leaving `./src/components/**` and `./src/app/**`.
- [ ] **Step 6:** Run `npm run build` → expect success. **Commit:** `chore: add vitest, drop dead tailwind globs`.

### Task A2: Fonts swap

**Files:**
- Modify: `src/lib/fonts.ts`, `src/app/layout.tsx:4,26-31`

**Interfaces:**
- Produces: font CSS vars `--font-space-grotesk`, `--font-space-mono`, `--font-noto-sans`, `--font-noto-sans-tc`, `--font-caveat`, `--font-poppins-semi-bold` (Celeste only).

- [ ] **Step 1:** Rewrite `src/lib/fonts.ts` — keep `notoSans`, `notoSansTC`, `caveat`, `poppinsSemiBold`; **remove** `geistMono`; **add**:
```ts
import { Space_Grotesk, Space_Mono } from 'next/font/google';
export const spaceGrotesk = Space_Grotesk({ variable: '--font-space-grotesk', subsets: ['latin'], weight: ['400','500','600','700'] });
export const spaceMono = Space_Mono({ variable: '--font-space-mono', subsets: ['latin'], weight: ['400','700'] });
```
- [ ] **Step 2:** In `layout.tsx` update the import and the `<body>` className to include `spaceGrotesk.variable` and `spaceMono.variable`; remove `geistMono`. Keep `notoSans`/`notoSansTC`/`caveat`/`poppinsSemiBold`.
- [ ] **Step 3:** Run `npm run build` → success (fonts fetched at build). **Commit:** `feat: swap to Space Grotesk + Space Mono`.

### Task A3: Blueprint tokens + grid utility

**Files:**
- Modify: `src/app/globals.css:17-37`, `tailwind.config.ts:13-30`

- [ ] **Step 1:** In `globals.css`, replace the `:root` and `[data-mode='dark']` blocks with the verbatim token sets from **Global Constraints** (map each to the existing var names: `--background`, `--foreground`, `--color-primary`→`--primary`, add `--surface`, `--surface-flat`, `--body`, `--muted`, `--accent`, `--grade`; keep `--color-*` names that Tailwind reads, or rename consistently in step 2).
- [ ] **Step 2:** In `tailwind.config.ts` `theme.extend.colors`, set: `background`, `surface`, `surfaceFlat`, `foreground`, `body`, `muted`, `primary`, `accent`, `grade` → their vars. Set `fontFamily`: `display:['var(--font-space-grotesk)']`, `mono:['var(--font-space-mono)']`, `sans:['var(--font-noto-sans)']`, `sanstc:['var(--font-noto-sans-tc)']`, `caveat:['var(--font-caveat)','cursive']`, `poppins:['var(--font-poppins-semi-bold)']`.
- [ ] **Step 3:** Add a `bp-grid` utility in `globals.css` `@layer utilities` (lift exact values from `blueprint-system.html` `.lt`/`.dk`):
```css
.bp-grid { background-image:linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px); background-size:26px 26px; }
```
Define `--grid-line:rgba(30,95,204,.07)` light / `rgba(56,189,248,.07)` dark in the token blocks.
- [ ] **Step 4:** Temporarily apply `bg-background text-body bp-grid` on `<body>`; `npm run dev` and confirm both themes render the grid + colors (compare `blueprint-system.html`). Revert the temporary body classes if pages set their own. **Commit:** `feat: blueprint color + grid tokens`.

### Task A4: Nav + theme toggle in header

**Files:**
- Create: `src/components/theme-toggle-button.tsx`, `src/components/ui/seal.tsx`
- Modify: `src/components/nav-bar.tsx`, `src/app/layout.tsx:38-40` (remove floating toggle), delete `src/components/dark-mode-toggle.tsx`

**Interfaces:**
- Produces: `<Seal/>` (props: `as?: 'span'|'link'`, `size?`), `<ThemeToggleButton/>` (client). `<NavBar/>` unchanged export.

- [ ] **Step 1:** Move the SVG-animation toggle from `dark-mode-toggle.tsx` into `theme-toggle-button.tsx` (same logic; render a compact mono `◐/☀` control matching `celeste-shell.html` `.toggle`). Keep `'use client'`, `next-themes`, `mounted` guard, `aria-label`.
- [ ] **Step 2:** Create `seal.tsx` — the 銘 mark per `celeste-shell.html` `.seal` (rounded square, `bg-accent`, white 銘 in `font-sanstc`, drop-shadow). `as='link'` wraps in `next/link href="/"` with `aria-label="Home"`.
- [ ] **Step 3:** Rewrite `nav-bar.tsx` to the `celeste-shell.html` `.nav`: `<Seal as="link"/>` + `SHIMEMING` wordmark (mono), mono uppercase links (About/Projects/Articles/Celeste) with blueprint-blue active underline (keep `usePathname` active logic + `no-scrollbar overflow-x-auto`), GitHub icon, `<ThemeToggleButton/>`. Sticky + `backdrop-blur` + hairline border.
- [ ] **Step 4:** In `layout.tsx` remove the `fixed bottom-4 right-8` toggle `<div>`. Delete `dark-mode-toggle.tsx`.
- [ ] **Step 5:** UI verification checklist (nav in both themes, active state, keyboard focus, narrow scroll). **Commit:** `feat: blueprint nav with in-header theme toggle`.

### Task A5: Footer

**Files:**
- Create: `src/components/footer.tsx`
- Modify: `src/app/layout.tsx` (render `<Footer/>` after `{children}`)

- [ ] **Step 1:** Build `footer.tsx` from `celeste-shell.html` `.foot`: seal + name + Caveat tagline; columns **Pages** (nav links), **Elsewhere** (GitHub, `mailto:`), **Drawing** (View source link, "Next.js · static", "Blueprint v2.0"); revision strip `© <year> SHIMEMING · 銘` / `REV 2.0` / `LAST UPDATED · <Month YYYY>` (compute month from `new Date()` at build — server component, fine for static export). Email/links pulled to a small `src/data/site.ts` const (`email`, `github`, `repo`).
- [ ] **Step 2:** Render in `layout.tsx` inside the flex column, after the page `<div>`, so it sits at the bottom.
- [ ] **Step 3:** UI verification checklist. **Commit:** `feat: add site footer (title/revision block)`.

### Task A6: 404 restyle

**Files:** Modify `src/app/not-found.tsx`

- [ ] **Step 1:** Restyle the existing branded 404 into blueprint tokens/type (mono `FIG. 404`, Space Grotesk heading, Caveat note, primary "↤ Home" link). Keep it minimal.
- [ ] **Step 2:** `npm run build`; visit `/nonexistent` via `out/404.html` or dev. UI verification checklist. **Commit:** `style: blueprint 404`.

---

## Phase B — Content model + libs (TDD)

### Task B1: Fix `update-content.js` ordering footgun

**Files:**
- Modify: `scripts/update-content.js`
- Create: `src/lib/order.ts`, `src/lib/__tests__/order.test.ts`

**Interfaces:**
- Produces: `mergeOrder(curated: string[], discovered: string[]): string[]` — keeps `curated` order for known slugs, appends new discovered slugs (alphabetical) at the end, drops slugs no longer present.

- [ ] **Step 1 (failing test):** `order.test.ts`:
```ts
import { expect, test } from 'vitest';
import { mergeOrder } from '../order';
test('preserves curated order, appends new, drops missing', () => {
  expect(mergeOrder(['b','a','c'], ['a','b','d'])).toEqual(['b','a','d']);
});
test('empty curated falls back to discovered sorted', () => {
  expect(mergeOrder([], ['c','a','b'])).toEqual(['a','b','c']);
});
```
- [ ] **Step 2:** Run `npm test` → FAIL (no `order.ts`).
- [ ] **Step 3:** Implement `src/lib/order.ts`:
```ts
export function mergeOrder(curated: string[], discovered: string[]): string[] {
  const present = new Set(discovered);
  const kept = curated.filter((s) => present.has(s));
  const known = new Set(kept);
  const added = discovered.filter((s) => !known.has(s)).sort();
  return [...kept, ...added];
}
```
- [ ] **Step 4:** Run `npm test` → PASS.
- [ ] **Step 5:** Rewrite `scripts/update-content.js` to: read existing `src/data/projects.ts` slugs (regex the array), read `public/projects` dirs (skip `_`-prefixed), `mergeOrder(...)`, write back. Do the same for articles → `src/data/articles.ts` from `public/articles/*.md`. Remove commented-out dead code. (Import `mergeOrder` via a tiny inline copy or `tsx`-free require; simplest: duplicate the 4-line function in the script and note it mirrors `order.ts` — both covered by the test's logic.)
- [ ] **Step 6:** Run `npm run update-content`; `git diff src/data/projects.ts` → order unchanged (curated order preserved). **Commit:** `fix: update-content preserves curated order; emit articles list`.

### Task B2: Project frontmatter fields + validation

**Files:**
- Modify: `src/types/project.d.ts`, `src/lib/projects.ts`
- Create: `src/lib/__tests__/projects-meta.test.ts`

**Interfaces:**
- Produces: `ProjectMetadata` gains optional `year?: number`, `role?: string`, `category?: 'Game'|'Graphics'|'Web'|'Systems'|'School'`, `stack?: string[]`, `preview?: string`, `featured?: boolean`. `assertProjectMetadata(data, slug): ProjectMetadata` throws a clear error if `projectName`/`description` missing.

- [ ] **Step 1 (failing test):**
```ts
import { expect, test } from 'vitest';
import { assertProjectMetadata } from '../projects';
test('throws on missing projectName', () => {
  expect(() => assertProjectMetadata({ description: 'x' }, 'foo')).toThrow(/foo.*projectName/);
});
test('passes valid metadata through', () => {
  const m = assertProjectMetadata({ projectName: 'A', description: 'd' }, 'a');
  expect(m.projectName).toBe('A');
});
```
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Add the optional fields to `project.d.ts`. In `projects.ts` add and export `assertProjectMetadata(data, slug)` (throws `Error(\`Project "${slug}": missing required frontmatter "projectName"\`)` etc.); call it inside `readProject` replacing the bare `data as ProjectMetadata`.
- [ ] **Step 4:** `npm test` → PASS; `npm run build` → success (existing content still valid). **Commit:** `feat: project frontmatter fields + validation`.

### Task B3: Summary read = frontmatter only

**Files:**
- Modify: `src/lib/projects.ts`
- Create: `src/lib/__tests__/projects-summary.test.ts`

**Interfaces:**
- Produces: `getProjectSummaries()` returns `ProjectSummary[]` (no `content`) without retaining bodies; behavior unchanged for callers.

- [ ] **Step 1 (failing test):** assert `getProjectSummaries()` returns the curated count and each item has `slug`, `metadata.projectName`, `coverImage`, `hasNote`, and **no** `content` key. (Run against real `public/projects` — it's build-time data.)
- [ ] **Step 2:** `npm test` → FAIL if `content` leaks (it currently maps then strips; tighten so summaries never carry the body).
- [ ] **Step 3:** Refactor `readProject` into `readProjectMeta(slug)` (frontmatter + coverImage + hasNote, parses but discards body) and `readProject(slug)` (adds `content`). `getProjectSummaries` uses `readProjectMeta`.
- [ ] **Step 4:** `npm test` → PASS; `npm run build` → success. **Commit:** `perf: project summaries read frontmatter only`.

### Task B4: Article excerpt, lang, reading time

**Files:**
- Modify: `src/types/article.d.ts`, `src/lib/articles.ts`
- Create: `src/lib/reading-time.ts`, `src/lib/__tests__/reading-time.test.ts`

**Interfaces:**
- Produces: `readingTime(body: string): number` (minutes, min 1, CJK-aware: counts CJK chars/400 + latin words/200, ceil). `ArticleSummary` gains `excerpt: string`, `lang?: 'EN'|'中文'`, `readingMinutes: number`.

- [ ] **Step 1 (failing test):** `reading-time.test.ts`:
```ts
import { expect, test } from 'vitest';
import { readingTime } from '../reading-time';
test('short text is 1 min', () => { expect(readingTime('hello world')).toBe(1); });
test('counts CJK', () => { expect(readingTime('字'.repeat(800))).toBe(2); });
```
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement `reading-time.ts` (CJK regex `\p{Script=Han}`, latin `\w+`; `Math.max(1, Math.ceil(cjk/400 + words/200))`).
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** In `articles.ts`, derive `excerpt` (frontmatter `excerpt` else first ~30 words of body, strip markdown), `lang` (frontmatter), `readingMinutes = readingTime(content)`; add to summary type.
- [ ] **Step 6:** `npm run build` → success. **Commit:** `feat: article excerpt + lang + reading time`.

---

## Phase C — Pages

> Each task: build the JSX to mirror the named mockup, wire real data, run the **UI verification checklist**, commit. Lift exact classes/structure from the mockup; use token colors (`bg-surface`, `text-primary`, etc.) and font utilities (`font-display`, `font-mono`, `font-sanstc`, `font-caveat`).

### Task C1: Home hero

**Files:** Modify `src/app/page.tsx`

- [ ] **Step 1:** Replace the hero with `blueprint-system.html` `.h-hero` structure: mono eyebrow `Personal site · 個人網站`, Space Grotesk `h1` (keep `<AnimatedHeading>`, retimed; intermediate `sm:`/`lg:` sizes), Caveat note `銘 = to inscribe ↗`, one-line bio, primary "View projects →" button + mono `mailto:` (from `src/data/site.ts`). **Remove** the waterfall `<Image>` and its import. Apply `bp-grid` to the hero section.
- [ ] **Step 2:** UI verification checklist (both themes, reduced-motion shows text without stagger jump). **Commit:** `feat: blueprint home hero`.

### Task C2: Projects index (split-pane)

**Files:**
- Create: `src/app/projects/projects-index.tsx` (client)
- Modify: `src/app/projects/page.tsx`, delete `projects-list.tsx` + `project-card.tsx` (folded in)

**Interfaces:**
- Consumes: `getProjectSummaries(): ProjectSummary[]` (B2/B3).
- Produces: `<ProjectsIndex projects={summaries}/>`.

- [ ] **Step 1:** `page.tsx` (server) passes `getProjectSummaries()` to `<ProjectsIndex/>` with the blueprint page header (`FIG. INDEX · 作品集`, `Projects`, count).
- [ ] **Step 2:** Build `projects-index.tsx` from `split-pane-v2.html`: left list of rows (thumbnail via `next/image` of `coverImage` or `preview`, name `font-display`, `year · stack` mono, category chip), right flat preview surface (`bg-surfaceFlat`). Default selected = the `featured` project (fallback first). On row **hover and focus**, set selected → swap the right surface (use React state + `onMouseEnter`/`onFocus`; not CSS-only, so keyboard works). Right surface = preview image, 中文 subtitle, mono spec block, "what I did" bullets (from `overview`), tags, links.
- [ ] **Step 3:** Responsive: below `md`, hide the preview pane; rows become full-width and the whole row is a `<Link href={/projects/${slug}}>` (tap → detail). At `md+`, the row stays focusable and a visible "open →" link navigates. Ensure the detail page is always reachable.
- [ ] **Step 4:** A11y: rows are buttons/links with `focus-visible` outline; preview is `aria-live="polite"` region; respects reduced-motion (instant swap).
- [ ] **Step 5:** UI verification checklist + explicitly test keyboard tab-through updates the pane, and 375px collapses to list. **Commit:** `feat: split-pane projects index with live preview`.

### Task C3: Project detail — figure plate + spec + notes measure

**Files:**
- Create: `src/components/ui/figure-plate.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`, `src/components/markdown.tsx`

- [ ] **Step 1:** `figure-plate.tsx` from `projects.html` `.dt-plate`/`.dt-cover`: `next/image` cover + four corner ticks + `FIG.NN — <NAME>` caption. Props: `src`, `alt`, `fig`, `caption`.
- [ ] **Step 2:** Rewrite `[slug]/page.tsx` body: `<FigurePlate/>`, title `font-display` + 中文 subtitle (if present), mono **spec table** (Year/Role/Stack/Links from metadata), abstract (`description` + `overview` bullets), then `<MarkdownWrapper/>` when `hasNote`. Keep `generateStaticParams`/`generateMetadata`.
- [ ] **Step 3:** In `markdown.tsx`, constrain the long-form body to a reading measure: wrap prose in `max-w-[68ch]` (remove the page-level `max-w-none` sprawl) and add the Caveat margin-note treatment: render Markdown blockquotes beginning `note:` as a right-margin `<aside>` in `font-caveat text-accent` (custom `blockquote` component in react-markdown that detects the `note:` prefix; otherwise normal blockquote). Two-column at `lg+`, stacked below.
- [ ] **Step 4:** UI verification checklist on a real project (`/projects/hallucination`) — both themes, code blocks still highlight, measure is readable, a `> note: …` line renders in the margin. **Commit:** `feat: project detail figure plate + readable notes`.

### Task C4: About — title block + ruler + stamps

**Files:**
- Create: `src/components/ui/title-block.tsx`
- Modify: `src/app/about/page.tsx`, `src/app/about/education.tsx`, `src/app/about/awards.tsx`

- [ ] **Step 1:** `title-block.tsx` from `about-articles-v2.html` `.tblock`: seal + name + mono grid (Role/Based/Focus/GPA/Lang) — values from a small `src/data/site.ts` profile const. **No portrait.**
- [ ] **Step 2:** `about/page.tsx`: blueprint header (`FIG. 02 · 關於`, `About`), intro prose + Caveat accent + `<TitleBlock/>` (2-col → stack).
- [ ] **Step 3:** Rewrite `education.tsx` to the ruler (`.edu`/`.node`): vertical rule, node markers, mono years, CGPA, course chips with grade (`text-grade`), `+N more ▾` expander (keep the existing `Collapsible` for the full list; reuse per-course skills/links inside the expanded panel). **Remove the invisible `<Tag>Placeholder</Tag>` spacer.**
- [ ] **Step 4:** Rewrite `awards.tsx` to stamped records (`.award`): seal marker + EN title + 中文 subtitle, 2-col grid. **Remove the invisible placeholder spacer.**
- [ ] **Step 5:** UI verification checklist (expand/collapse works, both themes, narrow stack). **Commit:** `feat: blueprint about (title block, ruler, stamps)`.

### Task C5: Articles — log list + detail measure

**Files:** Modify `src/app/articles/page.tsx`, `src/app/articles/article-list.tsx`, `src/app/articles/article-card.tsx`, `src/app/articles/[slug]/page.tsx`

- [ ] **Step 1:** `articles/page.tsx`: blueprint header (`FIG. 03 · 札記`, `Articles & Notes`).
- [ ] **Step 2:** Rewrite `article-card.tsx` to the log entry (`about-articles-v2.html` `.entry`): mono `<time>` date + reading minutes, bilingual title, **full-width excerpt (no max-width)**, lang/type tag chips, hover bg, arrow. `article-list.tsx` keeps the staggered reveal (or drop motion for a CSS fade — lighter).
- [ ] **Step 3:** `[slug]/page.tsx`: ensure the body uses the C3 measure-limited `<MarkdownWrapper/>`; render date via `<time>`.
- [ ] **Step 4:** UI verification checklist (`/articles`, `/articles/courage-to-start`). **Commit:** `feat: blueprint articles log`.

### Task C6: Celeste — last-sync only

**Files:** Modify `src/app/celeste/page.tsx`

- [ ] **Step 1:** Add a small, unobtrusive "Last sync · {progressData.lastUpdate}" label (mono) positioned over the existing layout — **do not** change the journal, background, or add blueprint framing. Verify the in-game white journal is untouched.
- [ ] **Step 2:** UI verification checklist. **Commit:** `feat: show Celeste last-sync date`.

---

## Phase D — Polish

### Task D1: Default OpenGraph + metadata

**Files:** Modify `src/app/layout.tsx`; add `public/og-default.png` (or `src/app/opengraph-image.*`)

- [ ] **Step 1:** Add `openGraph` (title/description/url/siteName/locale, `images:['/og-default.png']`) and `twitter` (`summary_large_image`) to root `metadata`. Create a 1200×630 default card (simple blueprint: 銘 seal + name + tagline — generate a static PNG into `public/`).
- [ ] **Step 2:** `npm run build`; confirm `<meta property="og:image">` present in `out/index.html`. **Commit:** `feat: default OG/Twitter card`.

### Task D2: README rewrite

**Files:** Modify `README.md`

- [ ] **Step 1:** Rewrite to describe the real architecture: build-time content (gray-matter), `npm run update-content` (now order-preserving), slug routes, the blueprint design system, dev/build/test commands, deploy (GitHub Pages static export). Remove the "under construction" + YouTube-tutorial lines; fix the clone URL. **Commit:** `docs: rewrite README`.

### Task D3: A11y + contrast + reduced-motion pass

**Files:** Touch any component flagged below.

- [ ] **Step 1:** Verify contrast of `--body`/`--muted` on `--background`/`--surface` in both themes (target ≥ 4.5:1 for body text); nudge token values if short and update the spec/Global Constraints note.
- [ ] **Step 2:** Tab through every page; confirm visible `focus-visible` rings and that the projects preview updates on focus.
- [ ] **Step 3:** With OS reduced-motion on, confirm no large entrance jumps and the pane swap is instant (existing CSS guard + `MotionConfig reducedMotion="user"` already in `theme-provider`/layout — verify it wraps motion users).
- [ ] **Step 4:** `npm run build` + `npm run lint` clean. **Commit:** `fix: a11y, contrast, reduced-motion pass`.

### Task D4: Final verification

- [ ] **Step 1:** `npm test` (all green), `npm run lint`, `npm run build`. Serve `out/` and click every route (`/`, `/about`, `/projects`, each project, `/articles`, the article, `/celeste`, a 404) in light + dark + 375px.
- [ ] **Step 2:** Confirm no console errors and the floating toggle is gone. **Commit:** `chore: final redesign verification` (if any fixes).

---

## Self-Review

**Spec coverage:**
- §3 tokens → A3. §3 type roles → A2/A3. §4 signature kit → seal A4, FIG plate C3, margin notes C3, title block C4, footer A5, grid A3. §5 nav/footer/toggle → A4/A5. §6.1 home → C1. §6.2 projects index → C2. §6.3 detail → C3. §6.4 about → C4. §6.5 articles → C5. §6.6 celeste → C6. §6.7 404 → A6. §7 content model → B2/B4 + content-md edits (done within C tasks when authoring real values; field plumbing in B). §8 fixes: update-content B1, full-md read B3, placeholder hack C4, dead globs A1, validation B2, client-JS C2 (state island only), OG D1, README D2, prose width C3, fonts A2. §9 a11y → D3 + per-task checklist.
- **Gap noted:** populating real frontmatter values (`category`, `preview`, `year`, `role`) into each `public/projects/*/content.md` and writing bio/2nd-article copy are **content tasks for the user** (spec §10/§11) — the plan wires the fields and falls back gracefully; values land as the user fills them.

**Placeholder scan:** logic tasks carry full test + impl code; UI tasks point to specific named mockups (concrete artifacts, not "TBD"). No "add error handling"-style hand-waves.

**Type consistency:** `mergeOrder`, `assertProjectMetadata`, `readProjectMeta`/`readProject`, `readingTime`, `ProjectSummary`/`ArticleSummary` field names are used consistently across B1–B4 and C2/C5.
