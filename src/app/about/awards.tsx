import SectionLabel from '@/components/ui/section-label';
import { AwardData } from '@/types/about';

const AwardCard = ({
  award,
}: {
  award: AwardData;
}) => {
  return (
    <div className='flex items-start gap-3 rounded-[9px] border border-primary/20 bg-surface p-3'>
      {/* Seal / medal marker */}
      <span
        className='grid h-[26px] w-[26px] shrink-0 rotate-[-4deg] place-items-center rounded-[6px] bg-accent font-mono text-[11px] font-bold text-white shadow-[0_2px_0_rgba(154,44,32,0.6)]'
        aria-hidden='true'
      >
        ★
      </span>
      <div>
        <p className='font-display text-[13.5px] font-semibold leading-tight text-foreground'>
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

const Awards = ({ awards }: { awards: AwardData[] }) => {
  return (
    <section>
      <SectionLabel en='Awards' zh='獲獎' />
      <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2'>
        {awards.map((award) => (
          <AwardCard key={award.englishTitle} award={award} />
        ))}
      </div>
    </section>
  );
};

export default Awards;
