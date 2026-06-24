import Link from 'next/link';
import AnimatedHeading from '@/components/animated-heading';
import site from '@/data/site';

const Page = () => {
  return (
    <main className='flex flex-1 items-center'>
      <section className='bp-grid w-full px-6 py-12 sm:px-10'>
        {/* Mono eyebrow */}
        <p className='font-mono text-xs uppercase tracking-[0.14em] text-primary'>
          Personal site · 個人網站
        </p>

        {/* Heading + Caveat note */}
        <div className='flex flex-wrap items-baseline gap-x-3'>
          <AnimatedHeading
            text="Hi, I'm Shimeming"
            wordAppearInterval={0.12}
          />
          <span className='-rotate-3 inline-block font-caveat text-xl text-accent'>
            銘 = to inscribe ↗
          </span>
        </div>

        {/* Subtitle */}
        <p className='mt-3 max-w-[42ch] text-body'>
          A CS student at NTU who builds games &amp; graphics — and writes down everything he figures out on the way up.
        </p>

        {/* Button row */}
        <div className='mt-5 flex flex-wrap items-center gap-4'>
          <Link
            href='/projects'
            className='inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wide text-background transition hover:opacity-90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            View projects →
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className='font-mono text-sm text-muted transition-colors hover:text-primary'
          >
            ↳ {site.email}
          </Link>
        </div>

        {/* Thin dimension rule */}
        <div className='relative mt-5 h-px bg-primary/20'>
          <span className='absolute -top-5 right-0 font-mono text-[9px] tracking-[0.1em] text-primary/60'>
            ↤ 1440px ↦
          </span>
        </div>
      </section>
    </main>
  );
};

export default Page;
