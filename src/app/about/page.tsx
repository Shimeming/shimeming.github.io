import { type Metadata } from 'next';
import Container from '@/components/layout/container';
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
        <h1 className='mb-6 text-xl font-bold uppercase opacity-75'>
          About me
        </h1>
        <div className='flex flex-col gap-8'>
          <Education education={education} />
          <Awards awards={awards} />
        </div>
      </Container>
    </main>
  );
};

export default Page;
