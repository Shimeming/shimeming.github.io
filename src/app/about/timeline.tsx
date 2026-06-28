import { type ReactNode } from 'react';

/** Vertical-ruled timeline container. Each entry draws its own connector
 *  segment down to the next one (see TimelineNode), so the rule starts at the
 *  first logo plate and stops cleanly at the last — no trailing tail past it. */
export const Timeline = ({ children }: { children: ReactNode }) => (
  <div className='flex flex-col gap-1'>{children}</div>
);

/**
 * One timeline entry. The 44px logo plate is the node marker, centred on the
 * spine at x=42px (the left padding falls out of the geometry). Two thin 2px
 * rules share that x:
 *
 *  - `::before` is the resting spine: a hairline from this plate down to the
 *    next node's, suppressed on the last node via `not-last`. It paints below
 *    the plate (first child), so it tucks under the opaque plates and the
 *    entries read as nodes mounted on one continuous rule.
 *  - `::after` is the hover highlight: a `primary` gradient that fades to
 *    nothing at the bottom, scoped to this entry's own slot (plate-bottom to
 *    just shy of the row bottom — it never reaches the next logo). On hover it
 *    draws top->down by easing `scaleY` 0->1 from its top origin. It paints
 *    above the plate (last child), so it starts just below the plate rather
 *    than crossing it.
 *
 * The row also takes a whisper-quiet primary wash on hover so the active entry
 * reads as a lane. Falls back to a small dot when no marker is given.
 */
export const TimelineNode = ({
  marker,
  children,
}: {
  marker?: ReactNode;
  children: ReactNode;
}) => (
  <div
    className="relative rounded-[10px] py-3 pr-3 pl-[80px] transition-colors duration-200 hover:bg-primary/[0.025] not-last:before:absolute not-last:before:left-[42px] not-last:before:top-[34px] not-last:before:h-[calc(100%_+_0.25rem)] not-last:before:w-[2px] not-last:before:-translate-x-1/2 not-last:before:bg-primary/20 not-last:before:content-[''] after:absolute after:left-[42px] after:top-[56px] after:bottom-2.5 after:w-[2px] after:-translate-x-1/2 after:origin-top after:scale-y-0 after:bg-gradient-to-b after:from-primary/80 after:to-primary/0 after:transition-transform after:duration-[450ms] after:ease-[cubic-bezier(0.22,1,0.36,1)] after:content-[''] hover:after:scale-y-100"
  >
    <span className='absolute left-[42px] top-3 -translate-x-1/2'>
      {marker ?? (
        <span
          className='block h-3 w-3 rounded-full bg-primary ring-4 ring-background'
          aria-hidden='true'
        />
      )}
    </span>
    {children}
  </div>
);
