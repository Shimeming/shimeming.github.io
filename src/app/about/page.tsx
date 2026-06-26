import { type Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/layout/container';
import PageHeader from '@/components/ui/page-header';
import Reveal from '@/components/ui/reveal';
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
  description:
    'Shimeming — CS student at NTU researching NLP & LLMs (model routing) at MiuLab, with a background in games and graphics.',
  alternates: { canonical: '/about' },
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
        <Reveal>
          <PageHeader fig='FIG. 02' zh='關於' title='About' />
        </Reveal>

        {/* Bio */}
        <Reveal delay={0.08}>
          <p className='mb-8 max-w-[68ch] font-sans text-[15px] leading-[1.65] text-body'>
            CS student at NTU. I finished my BSc in 2025 and I&apos;m now in the
            MSc program, researching NLP &amp; LLMs — currently model routing — in
            Yun-Nung Chen&apos;s{' '}
            <Link
              href='https://www.csie.ntu.edu.tw/~miulab/'
              target='_blank'
              rel='noopener noreferrer'
              className='font-semibold text-primary underline-offset-2 hover:underline'
            >
              MiuLab
            </Link>
            . I love exploring new technology and building things.
          </p>
        </Reveal>

        {/* Experience · Education · Activities · Skills · Awards */}
        <div className='flex flex-col gap-10'>
          <Reveal delay={0.16}>
            <RoleTimeline en='Experience' zh='經歷' roles={experience} />
          </Reveal>
          <Reveal>
            <Education education={education} />
          </Reveal>
          <Reveal>
            <RoleTimeline en='Activities' zh='活動' roles={activities} />
          </Reveal>
          <Reveal>
            <Skills groups={skills} />
          </Reveal>
          <Reveal>
            <Awards awards={awards} />
          </Reveal>
        </div>
      </Container>
    </main>
  );
};

export default Page;
