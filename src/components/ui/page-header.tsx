import { type ReactNode } from 'react';

const PageHeader = ({
  fig,
  zh,
  title,
  aside,
}: {
  fig: string;
  zh: string;
  title: string;
  aside?: ReactNode;
}) => (
  <div className='mb-6 border-b border-primary/25 pb-4 pt-6'>
    <p className='font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary'>
      {fig} · {zh}
    </p>
    <div className='mt-2 flex flex-wrap items-baseline gap-x-3'>
      <h1 className='font-display text-[34px] font-semibold leading-tight tracking-[-0.02em] text-foreground'>
        {title}
      </h1>
      {aside}
    </div>
  </div>
);

export default PageHeader;
