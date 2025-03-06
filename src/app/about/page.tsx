import { Metadata } from 'next';
import Awards from './awards';
import Education from './education';

// import AnimatedHeading from '@/components/animated-heading';

export const metadata: Metadata = {
  title: 'About',
};

const Page = () => {

  return (
    <>
      <main className='pb-20 md:px-32'>
        <h2 className='mb-2 text-xl font-bold uppercase opacity-75'>
          About me
        </h2>
        <div className='flex flex-col gap-8'>
          <Education />
          <Awards />
        </div>
      </main>
    </>
  );
};

export default Page;
