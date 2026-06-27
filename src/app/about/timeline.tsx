import { type ReactNode } from 'react';

/** Vertical-ruled timeline container. The rule is inset so node markers
 *  (logo plates) sit centred on it without overflowing the left edge. */
export const Timeline = ({ children }: { children: ReactNode }) => (
  <div className='relative flex flex-col gap-6'>
    <span
      aria-hidden='true'
      className='absolute bottom-4 left-[22px] top-4 w-0.5 -translate-x-1/2 bg-primary/20'
    />
    {children}
  </div>
);

/**
 * One timeline entry. The marker sits centred on the rule at x=22px; pass a
 * logo plate as `marker` and it becomes the node (the opaque plate masks the
 * rule behind it, so entries read as beads on the line). Falls back to the
 * small node dot when no marker is given.
 */
export const TimelineNode = ({
  marker,
  children,
}: {
  marker?: ReactNode;
  children: ReactNode;
}) => (
  <div className='relative pl-[58px]'>
    <span className='absolute left-[22px] top-1 -translate-x-1/2'>
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
