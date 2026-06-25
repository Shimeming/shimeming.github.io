import { type Metadata } from 'next';
import Container from '@/components/layout/container';
import PageHeader from '@/components/ui/page-header';
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
        <PageHeader fig="FIG. 02" zh="關於" title="About" />

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
