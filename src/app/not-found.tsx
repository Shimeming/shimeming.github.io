import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import Container from '@/components/layout/container';

const NotFound = () => {
  return (
    <main className='flex flex-1 items-center'>
      <Container className='flex flex-col items-center gap-4 py-20 text-center'>
        <p className='text-7xl font-bold text-primary sm:text-8xl'>404</p>
        <p className='font-caveat text-2xl text-decorative'>
          Lost your way?
        </p>
        <Link
          href='/'
          className='mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-background transition hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        >
          Back home <FaArrowRightLong />
        </Link>
      </Container>
    </main>
  );
};

export default NotFound;
