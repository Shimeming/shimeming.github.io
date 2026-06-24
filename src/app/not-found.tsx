import Link from 'next/link';
import Container from '@/components/layout/container';

const NotFound = () => {
  return (
    <main className='bp-grid flex flex-1 items-center'>
      <Container className='flex flex-col items-center gap-6 py-20 text-center'>
        <p className='font-mono text-sm uppercase tracking-widest text-primary'>
          Fig. 404
        </p>
        <p className='font-display text-7xl font-bold text-primary sm:text-8xl'>
          404
        </p>
        <p className='font-caveat text-2xl text-muted'>
          Lost your way?
        </p>
        <Link
          href='/'
          className='mt-2 inline-flex items-center gap-2 rounded bg-primary px-5 py-2.5 font-mono text-background transition hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        >
          ↤ Home
        </Link>
      </Container>
    </main>
  );
};

export default NotFound;
