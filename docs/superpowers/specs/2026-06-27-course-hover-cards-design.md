# Course Hover Cards — About Page

**Date:** 2026-06-27
**Status:** Approved design, pending implementation plan

## Problem

On the About page's Education section, course chips truncate the English course
name to `max-w-[180px]`, so the full name is never visible. Skill tags only
appear inline for courses revealed by "show more" (never for the first six), and
links sit inline under each chip. There is no way to see a course's full name, and
the inline skills/links make the chip cluster noisy.

## Goal

Make each course a compact chip that, on hover / keyboard focus / tap, reveals a
small floating card with the course's full details. Move full name, Chinese name,
metadata, skill tags, and links off the chip and into that card.

## Behavior

Each course renders as a compact **chip** showing only the **truncated English
name** (no grade on the chip).

Pointing at, focusing (Tab), or tapping a chip opens a **floating card** anchored
to it. The card contains:

- **Full English name** (untruncated) with the **Chinese name** beneath it
- A mono metadata line: **course number · credits · semester · grade**
- **Skill tags** — the wrap of skill tags (reusing the existing skill-tag style)
- **Links** — external (`link`), repo (`repoLink`), project (`projectPageLink`),
  rendered only when present

The card closes on: mouse-leave (with safe-travel, so the pointer can move from
chip into card to click a link), blur, Escape, or outside tap. It must work on
desktop hover, keyboard focus, and touch tap, and stay within the viewport near
screen edges.

## Approach

Use **`@floating-ui/react`** (new dependency) for positioning and interaction.
This is necessary, not incidental: the Education section is wrapped in
`<Reveal>` (a `motion.div` that leaves a CSS transform on its container, which
would mis-anchor `position: fixed`), and the "show more" `Collapsible` uses
`overflow: hidden` (which would clip an `absolute`-positioned card for expanded
courses). Rendering the card in a **portal to `document.body`** escapes both,
and Floating UI provides the collision handling, safe hover-travel, keyboard,
tap, dismiss, and ARIA wiring that the "works everywhere" requirement implies.

### Components

**New `src/components/ui/hover-card.tsx` — reusable primitive.**
Isolates all popover complexity from the course code.

- Props: `trigger` (the chip element) and `children` (card body). Optional
  `className` for the floating panel.
- Owns floating-ui wiring:
  - `useFloating` with `open`/`onOpenChange` state, `whileElementsMounted:
    autoUpdate`, middleware `[offset(8), flip(), shift({ padding: 8 })]`.
  - Interactions: `useHover(context, { handleClose: safePolygon() })`,
    `useFocus`, `useClick` (covers tap and provides toggle), `useDismiss`
    (Escape + outside press), `useRole` (card labels the trigger; trigger gets
    `aria-expanded` / popup semantics).
  - `useInteractions` to merge prop getters; spread reference props on the
    trigger and floating props on the panel.
- Renders the panel inside `<FloatingPortal>` (to `document.body`).
- Animates open/close with the existing `motion` dep (subtle fade + slight
  scale). Reduced-motion is already handled globally via `<MotionConfig
  reducedMotion='user'>`, so no per-component handling needed.
- No arrow — a small `offset` gap is used instead.

**`src/app/about/education.tsx` — chip + card content.**

- `CourseChip` renders `<HoverCard trigger={<button type='button'>…</button>}>`
  with the card body as `children`.
- The chip button shows only the truncated English name (drop the inline grade,
  inline skills, and inline links).
- The `showSkills` prop is **removed** — every course (the first six visible
  ones and the expanded ones) gets identical chip + card, so skills and links
  appear consistently in the card.
- The `SchoolNode` "show more" / `Collapsible` logic controlling how many chips
  are visible is unchanged. Cards work for both visible and expanded chips
  because the portal escapes the `Collapsible`'s `overflow: hidden`.

### Visual

Card matches the Blueprint design system: `bg-surface`, `border-primary/25`,
rounded, a soft shadow, ~280px max width, mono/sans fonts consistent with the
existing chips, and the existing skill-tag styling reused for the tag wrap.

### Data / types

No changes to `CourseData`, `src/data/education.json`, or any data loader — every
field the card needs (`chineseName`, `credits`, `semester`, `grade`, `skills`,
`link`, `repoLink`, `projectPageLink`) already exists.

## Out of scope / non-goals

- No changes to other About sections (Experience, Activities, Skills, Awards).
- No arrow/caret on the card.
- No new data fields.

## Verification

The repo has no component-test harness (no `@testing-library/react`), and
floating-ui positioning is not meaningfully testable in jsdom. So:

- Keep the existing `src/lib/__tests__/about.test.ts` data tests green.
- Run lint and a production build.
- Manually verify in-browser: desktop hover (including moving pointer into the
  card to click a link), keyboard Tab focus, Escape/outside-click dismiss, and a
  narrow/mobile viewport for tap + edge-collision (flip/shift).

A component-test harness will only be added if explicitly requested.

## Open risks

- `@floating-ui/react` version must support React 19 (v0.27+ does); confirm at
  install time.
- `useHover` + `useClick` coexistence: verify on touch the tap toggles cleanly
  and on desktop hover-open + click doesn't immediately close. Adjust interaction
  config if the combination misbehaves.
