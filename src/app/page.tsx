import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import AnimatedHeading from '@/components/animated-heading';
import Container from '@/components/layout/container';
import profilePic from '@public/pictures/home-page-pic_softEdge.png';

const Page = () => {
  return (
    <main className='flex flex-1 items-center'>
      <Container className='flex flex-col-reverse items-center gap-8 py-12 md:flex-row md:justify-between md:gap-12'>
        <div className='w-full md:w-1/2'>
          <AnimatedHeading
            text="Here's Shimeming"
            wordAppearInterval={0.3}
          />
          <p className='mt-3 font-caveat text-2xl text-primary'>
            If a thing is worth doing, it is worth doing badly.
          </p>
          <div className='mt-6 flex flex-wrap items-center gap-4'>
            <Link
              href='/projects'
              className='inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-background transition hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
            >
              View projects <FaArrowRightLong />
            </Link>
            <Link
              href='mailto:b11902140@csie.ntu.edu.tw'
              className='inline-flex items-center gap-2 text-secondary transition-colors hover:text-primary'
            >
              <MdOutlineAlternateEmail />
              b11902140@csie.ntu.edu.tw
            </Link>
          </div>
        </div>

        <div className='w-44 shrink-0 sm:w-60 md:w-2/5'>
          <Image
            src={profilePic}
            alt='A waterfall in a lush green forest'
            className='h-auto w-full'
            priority
            sizes='(max-width: 768px) 15rem, 40vw'
          />
        </div>
      </Container>
    </main>
  );
};

export default Page;
