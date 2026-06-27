# Course Hover Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** On the About page, render each course as a compact name-only chip that reveals a floating card (full name, Chinese name, metadata, skill tags, links) on hover / keyboard focus / tap.

**Architecture:** A reusable `HoverCard` UI primitive wraps `@floating-ui/react` and renders its panel in a portal to `document.body` (escaping the `Reveal` motion transform and `Collapsible` `overflow: hidden`). `education.tsx`'s `CourseChip` uses it: the chip is the trigger, the card body is the children.

**Tech Stack:** Next 16 (App Router), React 19, Tailwind 4, `motion` (animation), `@floating-ui/react` (new), TypeScript, pnpm, Vitest.

## Global Constraints

- Package manager is **pnpm**. Use `pnpm` for all install/script commands.
- `@floating-ui/react` must support React 19 — install **`@floating-ui/react@^0.27`** or newer.
- **No changes** to `CourseData`/`EducationData` types, `src/data/education.json`, or any data loader. Every field used already exists: `englishName`, `chineseName`, `courseNumber`, `credits`, `semester`, `grade`, `skills`, `link`, `repoLink`, `projectPageLink`.
- Reduced-motion is handled globally by `<MotionConfig reducedMotion='user'>` — do **not** add per-component reduced-motion handling.
- Use existing Blueprint tokens for styling: `bg-surface`, `border-primary/25`, `text-foreground`, `text-muted`, `text-body`, `text-grade`. Match the existing chip/skill-tag look.
- Both client files start with `'use client';`.
- No automated component test is added (no `@testing-library/react` in repo; floating-ui positioning isn't testable in jsdom). Each task's "test cycle" is `pnpm lint` + `pnpm build` + `pnpm test` (existing data tests) passing, plus manual in-browser checks.

---

### Task 1: `HoverCard` primitive

**Files:**
- Modify: `package.json` (add `@floating-ui/react` dependency)
- Create: `src/components/ui/hover-card.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `HoverCard` (default + named export) with props
  `{ trigger: ReactNode; children: ReactNode; className?: string }`.
  `trigger` is the always-visible reference element; `children` is the floating
  panel body; `className` styles the floating panel.

- [ ] **Step 1: Install the dependency**

```bash
pnpm add @floating-ui/react
```

Expected: `@floating-ui/react` (>= 0.27) added to `dependencies` in `package.json`; `pnpm-lock.yaml` updated.

- [ ] **Step 2: Create the primitive**

Create `src/components/ui/hover-card.tsx` with exactly this content:

```tsx
'use client';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import { type ReactNode, useState } from 'react';

/**
 * Floating info card anchored to a trigger. Opens on hover (with safe-travel so
 * the pointer can move into the card to click links), keyboard focus, and tap;
 * closes on leave / blur / Escape / outside press. Rendered in a portal so it
 * escapes ancestor transforms (Reveal) and overflow:hidden (Collapsible).
 *
 * `transform: false` makes Floating UI position via top/left instead of a
 * transform, so motion can animate scale without fighting the positioning.
 */
export const HoverCard = ({
  trigger,
  children,
  className = '',
}: {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
  });

  const hover = useHover(context, { handleClose: safePolygon() });
  const focus = useFocus(context);
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'label' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <span
        ref={refs.setReference}
        className='inline-flex'
        {...getReferenceProps()}
      >
        {trigger}
      </span>
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={floatingStyles}
              className={`z-50 origin-top ${className}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              {...getFloatingProps()}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};

export default HoverCard;
```

- [ ] **Step 3: Typecheck + lint the new file**

Run: `pnpm lint`
Expected: PASS, no errors referencing `hover-card.tsx`.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml src/components/ui/hover-card.tsx
git commit -m "feat: add HoverCard floating primitive"
```

---

### Task 2: Course chips use `HoverCard`

**Files:**
- Modify: `src/app/about/education.tsx`

**Interfaces:**
- Consumes: `HoverCard` from `@/components/ui/hover-card` (Task 1).
- Produces: updated `CourseChip` (no `showSkills` prop). `SchoolNode` renders
  `<CourseChip course={c} />` for both visible and expanded courses.

- [ ] **Step 1: Add the import**

In `src/app/about/education.tsx`, add to the import block (near the other `@/` imports):

```tsx
import HoverCard from '@/components/ui/hover-card';
```

- [ ] **Step 2: Replace the `CourseChip` component**

Replace the entire current `CourseChip` definition (the `/* ── course chip ── */` block) with:

```tsx
/* ── course chip + hover card ─────────────────────────────────────── */
const CourseChip = ({ course }: { course: CourseData }) => {
  const hasLinks = course.link || course.repoLink || course.projectPageLink;

  const trigger = (
    <button
      type='button'
      className='flex items-center rounded-[5px] border border-primary/25 bg-surface px-2 py-1 font-mono text-[11px] text-body transition-colors hover:border-primary/50 cursor-default'
    >
      <span className='truncate max-w-[180px]'>{course.englishName}</span>
    </button>
  );

  return (
    <HoverCard
      trigger={trigger}
      className='w-[280px] max-w-[calc(100vw-2rem)] rounded-md border border-primary/25 bg-surface p-3 shadow-lg'
    >
      <p className='font-sans text-[13px] font-semibold leading-snug text-foreground'>
        {course.englishName}
      </p>
      <p className='font-sans text-[12px] leading-snug text-muted'>
        {course.chineseName}
      </p>

      <p className='mt-1.5 font-mono text-[10px] text-muted'>
        {course.courseNumber} · {course.credits} cr · {course.semester}
        {course.grade && (
          <>
            {' · '}
            <span className='font-bold text-grade'>{course.grade}</span>
          </>
        )}
      </p>

      {course.skills && course.skills.length > 0 && (
        <div className='mt-2 flex flex-wrap gap-1'>
          {course.skills.map((skill) => (
            <span
              key={skill}
              className='rounded-xs border border-foreground/20 px-1.5 py-px font-mono text-[9px] text-muted'
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {hasLinks && (
        <div className='mt-2 flex items-center gap-3 border-t border-primary/15 pt-2'>
          {course.link && (
            <Link
              href={course.link}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 font-mono text-[10px] text-muted transition-colors hover:text-primary'
              aria-label={`${course.englishName} link`}
            >
              <FaLink className='text-[10px]' /> link
            </Link>
          )}
          {course.repoLink && (
            <Link
              href={course.repoLink}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 font-mono text-[10px] text-muted transition-colors hover:text-primary'
              aria-label={`${course.englishName} repository`}
            >
              <FaGithub className='text-[10px]' /> repo
            </Link>
          )}
          {course.projectPageLink && (
            <Link
              href={course.projectPageLink}
              className='flex items-center gap-1 font-mono text-[10px] text-muted transition-colors hover:text-primary'
            >
              ↗ project
            </Link>
          )}
        </div>
      )}
    </HoverCard>
  );
};
```

- [ ] **Step 3: Drop `showSkills` from the expanded course chips**

In `SchoolNode`, in the `hidden.map(...)` block inside the `Collapsible`, change:

```tsx
<CourseChip key={`${c.courseNumber}-${c.semester}`} course={c} showSkills={true} />
```

to:

```tsx
<CourseChip key={`${c.courseNumber}-${c.semester}`} course={c} />
```

(The visible `visible.map(...)` chips already pass only `course`, so they need no change.)

- [ ] **Step 4: Lint**

Run: `pnpm lint`
Expected: PASS. No unused-import warnings (`Link`, `FaGithub`, `FaLink` are still used inside the card).

- [ ] **Step 5: Run existing tests**

Run: `pnpm test`
Expected: PASS — `src/lib/__tests__/about.test.ts` unaffected (no data/loader changes).

- [ ] **Step 6: Production build**

Run: `pnpm build`
Expected: build succeeds; `/about` compiles with no type errors.

- [ ] **Step 7: Manual in-browser verification**

Run `pnpm dev`, open `/about`, scroll to Education, and confirm:
- Chips show the truncated English name only (no grade on the chip).
- Hovering a chip opens a card with full name, Chinese name, `course# · N cr · semester · grade`, skill tags, and any links.
- Moving the pointer from chip into the card keeps it open and links are clickable.
- Tab focuses a chip and opens its card; Escape / clicking outside closes it.
- Expand "show more" — expanded chips behave identically (cards not clipped).
- Narrow the window to a mobile width: tap toggles a card, and a chip near the right edge produces a card that flips/shifts to stay on screen.

- [ ] **Step 8: Commit**

```bash
git add src/app/about/education.tsx
git commit -m "feat: course chips reveal details in a hover card"
```

---

## Self-Review

**Spec coverage:**
- Compact chip = truncated English name, no grade → Task 2 Step 2 trigger. ✓
- Card: full name + Chinese name → Task 2 Step 2. ✓
- Metadata line `course# · credits · semester · grade` → Task 2 Step 2. ✓
- Skill tags in card (existing tag style) → Task 2 Step 2. ✓
- Links in card, only when present → Task 2 Step 2 (`hasLinks`). ✓
- Hover + focus + tap, safe-travel, dismiss, viewport collision → Task 1 (`useHover`+`safePolygon`, `useFocus`, `useClick`, `useDismiss`, `flip`/`shift`). ✓
- Portal escapes Reveal transform + Collapsible overflow → Task 1 `FloatingPortal`. ✓
- `showSkills` removed; visible + expanded chips identical → Task 2 Steps 2–3. ✓
- No data/type changes → Global Constraints; no task touches types/json. ✓
- Verification via lint/build/data-tests/manual → Task 2 Steps 4–7. ✓

**Placeholder scan:** None — all code blocks are complete and literal.

**Type consistency:** `HoverCard` prop names (`trigger`, `children`, `className`) match between Task 1 definition and Task 2 usage. `CourseChip` signature `{ course: CourseData }` matches both call sites in `SchoolNode`.

**Known limitation (accepted):** Links inside the portal'd card are not part of the natural Tab order after the trigger; keyboard focus reveals the card's info but deep tabbing into its links is not wired (out of scope for this personal-site feature, consistent with the spec's pragmatic verification stance).
