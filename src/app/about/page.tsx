import { Metadata } from 'next';
import AnimatedHeading from '@/components/AnimatedHeading';
import Education from './education';

export const metadata: Metadata = {
  title: 'About',
};

const Page = () => {

  return (
    <>
      <main>
        <AnimatedHeading
          text="I am shimeming"
          className="!text-9xl !uppercase mb-16"
          wordAppearInterval={1}
          wordAnimateDuration={0}
        />
        <div className='grid grid-cols-8'>
          <section className='col-span-5'>
            <h2 className='mb-2 text-xl font-bold uppercase text-dark/75'>
              About me
            </h2>
            <div className='flex flex-col items-start justify-start'>
              <div className='flex flex-col font-medium gap-2'>
                <p>lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala</p>
                <p>lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala</p>
                <p>lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala</p>
                <p>lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala</p>
                <p>lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala</p>
                <p>lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala</p>
                <p>lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala</p>
                <p>lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala lalalala lala lalalala lalala lalala</p>
              </div>
            </div>
          </section>
          <section className='ml-4 col-span-3 flex flex-col'>
            <Education />
          </section>
        </div>
      </main>
    </>
  );
};

export default Page;
