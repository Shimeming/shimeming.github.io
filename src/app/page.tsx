import { type Metadata } from 'next';
import Link from 'next/link';
import AnimatedHeading from '@/components/animated-heading';
import GridInkTrail from '@/components/grid-ink-trail';
import Container from '@/components/layout/container';
import JsonLd from '@/components/seo/json-ld';
import ViewportWidth from '@/components/ui/viewport-width';
import site from '@/data/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.github],
  jobTitle: 'CS Student & Researcher',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'National Taiwan University',
  },
  knowsAbout: ['NLP', 'LLMs', 'Game development', 'Computer graphics'],
};

const Page = () => {
  return (
    <main className='bp-grid relative flex flex-1 items-center overflow-hidden'>
      <JsonLd data={personSchema} />
      <GridInkTrail />
      <Container as='section' className='relative z-10 w-full py-12'>
        {/* Mono eyebrow */}
        <p className='font-mono text-xs uppercase tracking-[0.14em] text-primary'>
          Personal site · 個人網站
        </p>

        {/* Heading */}
        <AnimatedHeading
          text="Hi, I'm Shimeming"
          wordAppearInterval={0.12}
        />

        {/* Subtitle */}
        <p className='mt-3 max-w-[42ch] text-body'>
          A CS student at NTU who researches NLP &amp; LLMs and builds games &amp; graphics — writing down everything he figures out on the way up.
        </p>

        {/* Handwritten tagline */}
        <p className='mt-3 -rotate-1 font-caveat text-lg font-bold text-accent'>
          if it&apos;s worth doing, it&apos;s worth doing badly
        </p>

        {/* Button row */}
        <div className='mt-5 flex flex-wrap items-center gap-4'>
          <Link
            href='/projects'
            className='inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wide text-background transition hover:opacity-90 active:scale-95 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
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
          <ViewportWidth className='absolute -top-5 right-0 font-mono text-[9px] tracking-widest text-primary/60' />
        </div>
      </Container>
    </main>
  );
};

export default Page;
