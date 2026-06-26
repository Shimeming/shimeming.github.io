import Link from 'next/link';
import { type ReactNode } from 'react';

/**
 * Blueprint-style "back to index" link for the top of detail pages
 * (e.g. a project or article). Keeps the back affordance consistent across
 * the site instead of each page rolling its own.
 */
const BackLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <Link
    href={href}
    className='mb-6 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:text-primary/70 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
  >
    <span aria-hidden='true'>←</span> {children}
  </Link>
);

export default BackLink;
