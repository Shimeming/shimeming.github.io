# Homepage Redesign — "Blueprint" Design System

- **Date:** 2026-06-25
- **Branch:** `redesign-overhaul`
- **Status:** Design approved (visual exploration complete via brainstorming companion). Ready for implementation planning.
- **Scope:** Full visual reimagining of the surface. The build-time content architecture, routing, and static-export pipeline are kept.

---

## 1. Context & goals

The site is a Next.js 15 personal portfolio, statically exported to GitHub Pages at `shimeming.github.io` (user page, served at domain root, no `basePath`). Content is rendered at build time from markdown + frontmatter via `gray-matter`; projects and articles have real `/[slug]` routes with `generateStaticParams` + `generateMetadata`. Light/dark themes via `next-themes`.

**Problem being solved:** the engineering is solid, but the visual identity lives almost entirely on the homepage and evaporates on every inner page (About/Projects/Articles read as three different generic templates). Plus a set of concrete code-level flaws (see §8).

**Audience:** balanced — must read as credible to a recruiter *and* feel unmistakably personal ("personality without sacrificing scannability").

**Decisions locked during brainstorming:**
- Visual direction: **Blueprint** (chosen over "Save File / game-dev" and "Editorial / magazine").
- Heading typeface: **Space Grotesk** for display + **Space Mono** for labels/data (chosen over all-mono).
- Projects: **split-pane master/detail with a Steam-library-style live preview** (the signature interaction).
- About: **no portrait** (privacy) → engineering title block instead.
- Celeste: **kept as-is** (in-game journal); only add a "last sync" date.
- Nav + Footer designs approved.

---

## 2. Visual direction: "Blueprint — the maker who documents"

**Thesis:** Shimeming builds games, real-time graphics, and systems, and *documents what he learns on the way up* (the bilingual Hallucination dev journal; the "開始的勇氣" article; a competition-math → CS arc). The site is presented as a **working engineering drawing / field notebook**: a faint blueprint grid, a red 銘 seal, mono labels and dimension marks, handwritten margin notes, and deliberate EN/中文 bilingual typesetting.

This is intentionally **not** one of the generic AI-design defaults (cream + serif + terracotta; near-black + acid accent; broadsheet). It is differentiated by the cool blueprint palette, the bilingual seal system, and the documentation metaphor.

---

## 3. Design tokens

Both themes are first-class. Tokens live in `src/app/globals.css` (`:root` and `[data-mode='dark']`) and are exposed through `tailwind.config.ts` (replacing the current violet/pink set).

### Light ("graph paper")
| Token | Hex | Use |
|---|---|---|
| `--background` | `#F5F8F6` | page (gridded) |
| `--surface` | `#FFFFFF` | cards |
| `--surface-flat` | `#F4F7F5` | preview pane (no grid) |
| `--foreground` | `#16202A` | ink / headings |
| `--body` | `#33414F` | body text |
| `--muted` | `#41576A` / `#6B7A88` | captions, meta |
| `--primary` | `#1E5FCC` | blueprint blue — links, labels, ticks |
| `--accent` | `#C8402F` | 銘 seal / vermilion (stamps, hand notes) |
| `--grid` | `#1E5FCC` @ ~6–8% | grid lines |
| `--grade` | `#1E8A4C` | course grade accents |

### Dark ("blueprint navy")
| Token | Hex | Use |
|---|---|---|
| `--background` | `#0E1A24` | page (cyan grid) |
| `--surface` | `#13242F` | cards |
| `--surface-flat` | `#10202A` | preview pane |
| `--foreground` | `#E6EEF3` | ink |
| `--body` | `#9FB6C4` | body text |
| `--muted` | `#8FA6B5` | captions |
| `--primary` | `#5BA8FF` | sky blue |
| `--accent` | `#FF6B5A` | coral seal; hand notes `#FF9A6B` |
| `--grid` | `#38BDF8` @ ~7% | grid lines |

### Type roles
| Role | Family | Used for |
|---|---|---|
| display | **Space Grotesk** | headings, titles |
| mono | **Space Mono** | labels, eyebrows, data, FIG ticks, dates, course chips, spec tables |
| body | **Noto Sans** + **Noto Sans TC** | paragraphs, EN/中文 |
| hand | **Caveat** | margin notes, small personal accents |

Type scale fixes the current `text-2xl → md:text-6xl` jump with intermediate steps (add `sm`/`lg` breakpoints to the hero and section headings).

---

## 4. Signature kit (repeats on every page)

1. **Engineering grid background** — faint, theme-aware (blue on light, cyan on dark). The through-line.
2. **Red 銘 seal** — the logo, the "featured" stamp, the award marker, the footer/title-block mark.
3. **`FIG.` captions — scoped, not decorative.** Used only where the content genuinely is a figure/plate: the project-detail cover, the About/Articles page eyebrows as section figure refs. **Not** as per-card numbering in the projects index (that was rejected as decoration during brainstorming).
4. **Caveat margin notes** — handwritten side-notes in the margin rail of long-form notes.
5. **Bilingual EN/中文 typesetting** — deliberate pairing (e.g., `Education 學歷`, project 中文 subtitles).
6. **Engineering title block** (About) and **revision footer** — the drawing's metadata cartouche.

---

## 5. Global shell

### Nav (`src/components/nav-bar.tsx`)
- 銘 **seal** logo + `SHIMEMING` wordmark (Space Mono).
- Links (Space Mono, uppercase): About · Projects · Articles · Celeste. Active state = blueprint-blue with a 2px underline.
- GitHub icon + **theme toggle moved into the header** (mono `◐/☀` control).
- Sticky, `backdrop-blur`, hairline blueprint border. Keep the existing horizontal-scroll-on-overflow behavior for narrow screens.
- **Remove** the fixed bottom-right floating `DarkModeToggle` from `layout.tsx`.

### Footer (new — `src/components/footer.tsx`)
Styled as the drawing's **title/revision block**:
- 銘 seal + name + Caveat tagline ("worth doing badly").
- Columns: **Pages** (nav repeat) · **Elsewhere** (GitHub, Email) · **Drawing** (View source, "Next.js · static", design version).
- Revision strip: `© 2026 SHIMEMING · 銘` · `REV 2.0` · `LAST UPDATED · <build month>`.

### Container
`src/components/layout/container.tsx` kept as the shared width primitive.

---

## 6. Pages

### 6.1 Home (`src/app/page.tsx`)
Blueprint hero: mono eyebrow (`Personal site · 個人網站`), Space Grotesk `h1` with a Caveat note (`銘 = to inscribe ↗`), one-line bio, primary "View projects →" + mono email. The `AnimatedHeading` word-stagger is retained but retimed to the new scale. The waterfall hero image is **removed** (it implied a landscape, not a person).
- *Optional (user opt-in):* a small "featured build + latest note" strip under the hero for immediate cross-linking. Kept out of the core scope unless requested.

### 6.2 Projects index (`src/app/projects/page.tsx` + list/card components)
**Split-pane master/detail** — the signature page:
- **Left:** a scannable list of rows (small thumbnail, name in Space Grotesk, `year · stack` in mono, category chip). Lives on the blueprint grid.
- **Right:** a **flat preview surface** that swaps content on hover/focus of a row — Steam-library style. Shows a larger preview (screenshot / gif), 中文 subtitle, a mono spec block, "what I did" bullets, full tags, and Repo/Play/Notes buttons. Default state = the **featured** project (seal stamp), so the pane is never empty.
- **No decorative numbering.** Lead signal = category + year + stack.
- **Interaction rules:** the pane updates on **keyboard focus** too (accessible, not hover-only); panel content is supplementary (the detail page is the source of truth). On **touch / narrow screens**, the layout collapses to a single-column list and a tap opens the full detail page — the split pane is the wide-screen experience only.

### 6.3 Project detail (`src/app/projects/[slug]/page.tsx`)
- **Figure plate:** cover framed with corner ticks + a `FIG.NN — <NAME>` caption (replaces the current full-bleed gradient header).
- Title (Space Grotesk) + 中文 subtitle.
- **Spec table** (mono): Year / Role / Stack / Links.
- Short abstract (from `description` + `overview`).
- **Notes** rendered in a **readable measure (~65–70ch)** in a two-column layout: prose column + a margin rail of **Caveat side-notes**. This fixes the current full-width (`prose max-w-none`) sprawl.

### 6.4 About (`src/app/about/*`)
- Intro prose + an engineering **title block** (no photo): 銘 seal, name, and a mono grid (Role / Based / Focus / GPA / Lang).
- **Education** as a measured **ruler**: node markers on a vertical rule, mono years, CGPA called out, course chips showing grades; `+N more` expander reveals the full list. Existing per-course skills/links surface on expand (replaces the current invisible-`<Tag>` spacer hack).
- **Awards** as **stamped records**: red-seal marker + EN title + 中文 subtitle, in a two-column grid.

### 6.5 Articles (`src/app/articles/*`)
- **Log list:** date (mono, left rail) · bilingual title (Space Grotesk + 中文) · **full-width excerpt** (no `max-width` — that cap belongs only on the long-form body) · reading time + language/type tags.
- Detail page (`[slug]`): body uses the **measure-limited** prose width; same margin-note treatment available.

### 6.6 Celeste (`src/app/celeste/page.tsx`) — **kept as-is**
The in-game white journal over the Celeste background stays exactly as designed (it deliberately mimics the in-game journal regardless of theme — see existing memory). **Only change:** surface the existing `lastUpdate` as a clean "Last sync" label. **Do not** apply blueprint framing, `FIG.` plate, grid, intro prose, or stat chips here.

### 6.7 404 (`src/app/not-found.tsx`)
Keep the branded minimal page; restyle into the blueprint tokens/type.

---

## 7. Content model changes (frontmatter)

### Projects (`public/projects/<slug>/content.md`)
Add (all optional, with sensible fallbacks):
- `year` — e.g. `2024` (recruiter scan + sort).
- `role` — e.g. `Gameplay + Architecture`.
- `category` — one of `Game | Graphics | Web | Systems | School` (drives the index category chip; the only truly new required-ish field).
- `stack` — short array, or derive from existing `tags`.
- `preview` — path to a screenshot or short **gif** for the hover pane (falls back to `coverImage`). Gifs especially for the games.
- `featured: true` — marks the default/stamped project.

Keep existing: `projectName`, `coverImage`, `description`, `overview[]`, `tags[]`, `links[]`.

**Margin notes:** authoring convention for Caveat side-notes in project/article markdown — e.g. a `> note: …` blockquote prefix or a small custom remark handling. Lightweight; details in the implementation plan.

### Articles (`public/articles/<slug>.md`)
- `excerpt` — optional; otherwise derive the first ~30 words from the body.
- `lang` — `EN | 中文`.
- Reading time — **derived** at build (word count), not authored.

Keep existing: `title`, `date`. Render `date` via a `<time>` element with consistent formatting.

---

## 8. Code-level fixes (folded into the redesign)

1. **`scripts/update-content.js` footgun** — it regenerates `src/data/projects.ts` in `readdir` (alphabetical) order, silently clobbering the curated portfolio order. Fix: preserve/merge the curated order (or drive order from a `date`/`order` field), and make the script idempotent. Generate `src/data/articles.ts` too (currently hand-maintained — inconsistent).
2. **`getProjectSummaries()` reads full markdown** just to strip it — parse frontmatter only for summaries (or accept as build-time cost, documented).
3. **Invisible `<Tag>Placeholder</Tag>` spacer hack** in `awards.tsx` / `education.tsx` — removed by the new layouts.
4. **Dead Tailwind globs** — drop `./src/pages/**` and `./src/helpers/**` from `content` (neither exists).
5. **Frontmatter cast without validation** (`data as ProjectMetadata`) — add a light runtime guard so malformed frontmatter fails with a clear message.
6. **Lists are `'use client'` only for entrance animations** — prefer server components + CSS / minimal motion to cut client JS where the new designs allow.
7. **No default social card** — add `openGraph`/`twitter` + a default OG image in root `layout.tsx`.
8. **Stale README** — rewrite to describe the real architecture (build-time content, `update-content`, slug routes, blueprint system).
9. **`prose max-w-none`** — constrain long-form reading measure (§6.3, §6.5).
10. **Fonts (`src/lib/fonts.ts`)** — add Space Grotesk + Space Mono; drop Poppins (`font-poppins`, only used by the Celeste journal — re-point or keep solely there) and Geist Mono (replaced by Space Mono). Keep Noto Sans, Noto Sans TC, Caveat.
11. **Dead `accent` token / missing "rainbow" logo** — resolved: the palette is redefined (vermilion seal *is* the accent and is actually used); the logo becomes the seal.

---

## 9. Accessibility & motion (quality floor)

- Visible keyboard focus on every interactive element (carry the existing `focus-visible:outline` pattern into blueprint colors).
- Hover-revealed content (project preview pane) also triggers on **focus**, is dismissable, and never the only path to information (detail pages hold the full content) — satisfies WCAG 1.4.13.
- `prefers-reduced-motion` respected (existing CSS guard + `MotionConfig reducedMotion="user"`); the pane swap degrades to instant.
- Check contrast of `--muted`/`--body` on `--background`/`--surface` in both themes (the old slate-on-cream pairings were borderline).
- Touch fallback for the split pane (§6.2).

---

## 10. Out of scope

- Analytics, comments, search, CMS, RSS (could be future work).
- The optional homepage "featured strip" (§6.1) unless the user opts in.
- Writing the actual bio copy and the second article (user-authored content).

---

## 11. Open questions for implementation

1. **`category`** values — confirm the closed set (`Game | Graphics | Web | Systems | School`) and assign one per existing project.
2. **Preview assets** — which projects get a gif vs a static screenshot; keep gif sizes modest for the static bundle.
3. **Margin-note authoring** — confirm the `> note:` convention vs an alternative before implementation.
4. **GPA in the title block** — confirm it stays public (it's already on the current site).
