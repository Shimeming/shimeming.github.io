import { type Metadata } from 'next';
import Container from '@/components/layout/container';
import TitleBlock from '@/components/ui/title-block';
import { getAwards, getEducation } from '@/lib/about';
import Awards from './awards';
import Education from './education';

export const metadata: Metadata = {
  title: 'About',
};

const Page = () => {
  const education = getEducation();
  const awards = getAwards();

  return (
    <main className='pb-20'>
      <Container>
        {/* Blueprint header */}
        <div className='mb-6 border-b border-primary/25 pb-4 pt-6'>
          <p className='font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary'>
            FIG. 02 · 關於
          </p>
          <h1 className='mt-2 font-display text-[34px] font-semibold leading-tight tracking-[-0.02em] text-foreground'>
            About
          </h1>
        </div>

        {/* Bio block: prose left + TitleBlock right */}
        <div className='mb-8 grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_270px]'>
          <p className='font-sans text-[15px] leading-[1.65] text-body'>
            CS student at NTU, graduating 2026. I came up through competition
            math{' '}
            <span className='inline-block -rotate-2 font-caveat text-[17px] font-bold text-accent'>
              — ISEF, TISF ↗
            </span>{' '}
            and fell for <strong>building things</strong>: games, real-time
            graphics, and systems. I document what I learn on the way up.
          </p>
          <TitleBlock />
        </div>

        {/* Education & Awards */}
        <div className='flex flex-col gap-10'>
          <Education education={education} />
          <Awards awards={awards} />
        </div>
      </Container>
    </main>
  );
};

export default Page;
