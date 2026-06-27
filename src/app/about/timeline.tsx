import { type ReactNode } from 'react';

/** Vertical-ruled timeline container. Each entry draws its own connector
 *  segment down to the next one (see TimelineNode), so the rule starts at the
 *  first logo plate and stops cleanly at the last — no trailing tail past it. */
export const Timeline = ({ children }: { children: ReactNode }) => (
  <div className='flex flex-col gap-1'>{children}</div>
);

/**
 * One timeline entry. The 44px logo plate is the node marker, centred on the
 * spine at x=42px (the left padding falls out of the geometry). A `::before`
 * draws a logo-width band from this plate down to the next node's — suppressed
 * on the last node via `not-last`, and masked behind the opaque plates so the
 * entries read as nodes mounted on one continuous spine. On hover (pointer
 * devices only) the row gets a quiet primary wash, a straight left accent bar
 * (an `::after` rect, kept vertical via a small top/bottom inset so it doesn't
 * bow along the rounded corners the way an inset shadow would), and its own
 * spine segment brightens — the band flows downward toward the next entry.
 * Falls back to a small dot when no marker is given.
 */
export const TimelineNode = ({
  marker,
  children,
}: {
  marker?: ReactNode;
  children: ReactNode;
}) => (
  <div
    className="relative rounded-[10px] py-3 pr-3 pl-[80px] transition-colors duration-200 hover:bg-primary/[0.04] after:absolute after:left-0 after:top-2.5 after:bottom-2.5 after:w-[3px] after:rounded-full after:bg-primary after:opacity-0 after:transition-opacity after:duration-200 after:content-[''] hover:after:opacity-100 not-last:before:absolute not-last:before:left-[42px] not-last:before:top-[34px] not-last:before:h-[calc(100%_+_0.25rem)] not-last:before:w-11 not-last:before:-translate-x-1/2 not-last:before:rounded-md not-last:before:bg-primary/12 not-last:before:transition-colors not-last:before:duration-200 not-last:before:content-[''] not-last:hover:before:bg-primary/30"
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
