import { type Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/layout/container';
import PageHeader from '@/components/ui/page-header';
import TitleBlock from '@/components/ui/title-block';
import {
  getActivities,
  getAwards,
  getEducation,
  getExperience,
  getSkills,
} from '@/lib/about';
import Awards from './awards';
import Education from './education';
import RoleTimeline from './experience';
import Skills from './skills';

export const metadata: Metadata = {
  title: 'About',
};

const Page = () => {
  const education = getEducation();
  const awards = getAwards();
  const experience = getExperience();
  const activities = getActivities();
  const skills = getSkills();

  return (
    <main className='pb-20'>
      <Container>
        <PageHeader fig='FIG. 02' zh='關於' title='About' />

        {/* Bio block: prose left + TitleBlock right */}
        <div className='mb-8 grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_270px]'>
          <p className='font-sans text-[15px] leading-[1.65] text-body'>
            CS student at NTU. I finished my BSc in 2025 and I&apos;m now in the
            MSc program, researching NLP &amp; LLMs — currently model routing —
            in Yun-Nung Chen&apos;s{' '}
            <Link
              href='https://www.csie.ntu.edu.tw/~miulab/'
              target='_blank'
              rel='noopener noreferrer'
              className='font-semibold text-primary underline-offset-2 hover:underline'
            >
              MiuLab
            </Link>
            .{' '}
            <span className='inline-block -rotate-2 font-caveat text-[17px] font-bold text-accent'>
              銘 = to inscribe ↗
            </span>{' '}
            I love exploring new technology and building things.
          </p>
          <TitleBlock />
        </div>

        {/* Experience · Education · Activities · Skills · Awards */}
        <div className='flex flex-col gap-10'>
          <RoleTimeline en='Experience' zh='經歷' roles={experience} />
          <Education education={education} />
          <RoleTimeline en='Activities' zh='活動' roles={activities} />
          <Skills groups={skills} />
          <Awards awards={awards} />
        </div>
      </Container>
    </main>
  );
};

export default Page;
