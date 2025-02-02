import { Metadata } from 'next';
import AnimatedHeading from '@/components/animated-heading';
import Education from './education';

export const metadata: Metadata = {
  title: 'About',
};

const Page = () => {

  return (
    <>
      <main className='pb-20'>
        <AnimatedHeading
          text="I am shimeming"
          className="md:!text-9xl !uppercase md:mb-8"
          wordAppearInterval={1}
          wordAnimateDuration={0}
        />
        <div className='
          flex flex-col items-start justify-start gap-4
          md:grid md:grid-cols-8
        '>
          <section className='md:col-span-5'>
            <h2 className='mb-2 text-xl font-bold uppercase opacity-75'>
              About me
            </h2>
            <div className='flex flex-col items-start justify-start'>
              <div className='flex flex-col font-medium gap-2'>
                我實在不知道這裡要寫什麼呀！
              </div>
            </div>
          </section>
          <section className='md:ml-4 md:col-span-3 flex flex-col'>
            <Education />
          </section>
        </div>
      </main>
    </>
  );
};

export default Page;
