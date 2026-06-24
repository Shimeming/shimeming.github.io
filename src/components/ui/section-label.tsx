const SectionLabel = ({ en, zh }: { en: string; zh: string }) => (
  <div className='mb-4 flex items-center gap-2.5'>
    <span className='whitespace-nowrap font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-primary'>
      {en} <span className='font-normal text-muted'>{zh}</span>
    </span>
    <span className='h-px flex-1 bg-primary/15' />
  </div>
);

export default SectionLabel;
