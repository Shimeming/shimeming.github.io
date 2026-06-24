import { AwardData } from '@/types/about';

/* Alternate ★ / ✓ stamps */
const STAMPS = ['★', '✓'] as const;

const AwardCard = ({
  award,
  index,
}: {
  award: AwardData;
  index: number;
}) => {
  const stamp = STAMPS[index % STAMPS.length];

  return (
    <div className='flex items-start gap-3 rounded-[9px] border border-primary/20 bg-surface p-3'>
      {/* Seal / medal marker */}
      <span
        className='grid h-[26px] w-[26px] shrink-0 -rotate-[4deg] place-items-center rounded-[6px] bg-accent font-mono text-[11px] font-bold text-white shadow-[0_2px_0_rgba(154,44,32,0.6)]'
        aria-hidden='true'
      >
        {stamp}
      </span>
      <div>
        <p className='font-display text-[13.5px] font-semibold leading-[1.25] text-foreground'>
          {award.englishTitle}
        </p>
        {award.chineseTitle && (
          <p className='mt-0.5 font-sanstc text-[11px] text-muted'>
            {award.chineseTitle}
          </p>
        )}
      </div>
    </div>
  );
};

/* Section label (same pattern as education) */
const SectionLabel = ({ en, zh }: { en: string; zh: string }) => (
  <div className='mb-4 flex items-center gap-2.5'>
    <span className='whitespace-nowrap font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-primary'>
      {en} <span className='font-normal text-muted'>{zh}</span>
    </span>
    <span className='h-px flex-1 bg-primary/15' />
  </div>
);

const Awards = ({ awards }: { awards: AwardData[] }) => {
  return (
    <section>
      <SectionLabel en='Awards' zh='獲獎' />
      <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2'>
        {awards.map((award, i) => (
          <AwardCard key={i} award={award} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Awards;
