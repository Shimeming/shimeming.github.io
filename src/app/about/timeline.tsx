import { type ReactNode } from 'react';

/** Vertical-ruled timeline container. The left border is the rule. */
export const Timeline = ({ children }: { children: ReactNode }) => (
  <div className='relative flex flex-col gap-6 border-l-2 border-primary/20'>
    {children}
  </div>
);

/**
 * One timeline entry: a node dot sitting centered on the rule (via
 * -translate-x-1/2, so it stays centered at any dot size), plus indented
 * content. Wrap each entry's body in this.
 */
export const TimelineNode = ({ children }: { children: ReactNode }) => (
  <div className='relative pl-6'>
    <span
      className='absolute left-0 top-[5px] h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background'
      aria-hidden='true'
    />
    {children}
  </div>
);
