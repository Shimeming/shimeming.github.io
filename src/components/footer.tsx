import Link from 'next/link';
import Container from '@/components/layout/container';
import Seal from '@/components/ui/seal';
import { navPages } from '@/data/nav';
import site from '@/data/site';

const Footer = (): React.JSX.Element => {
  const now = new Date();
  const year = now.getFullYear();
  const lastUpdated = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <footer className='bg-surface border-t border-primary/20 text-body'>
      <Container className='pt-6'>
        {/* Columns */}
        <div className='grid grid-cols-2 gap-6 pb-6 sm:grid-cols-4'>
          {/* Brand column */}
          <div className='col-span-2 sm:col-span-1'>
            <div className='flex items-center gap-2.5'>
              <Seal as='span' size={30} />
              <span className='font-display text-sm font-bold text-foreground'>
                {site.name}
              </span>
            </div>
          </div>

          {/* Pages column */}
          <div>
            <h2 className='font-mono mb-2.5 text-[9px] font-bold uppercase tracking-widest text-primary'>
              Pages
            </h2>
            {navPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className='font-mono mb-1.5 block text-xs font-semibold text-body transition-colors hover:text-primary'
              >
                {page.title}
              </Link>
            ))}
          </div>

          {/* Elsewhere column */}
          <div>
            <h2 className='font-mono mb-2.5 text-[9px] font-bold uppercase tracking-widest text-primary'>
              Elsewhere
            </h2>
            <a
              href={site.github}
              target='_blank'
              rel='noopener noreferrer'
              className='font-mono mb-1.5 block text-xs font-semibold text-body transition-colors hover:text-primary'
            >
              GitHub ↗
            </a>
            <a
              href={`mailto:${site.email}`}
              className='font-mono mb-1.5 block text-xs font-semibold text-body transition-colors hover:text-primary'
            >
              Email ↗
            </a>
          </div>

          {/* Drawing column */}
          <div>
            <h2 className='font-mono mb-2.5 text-[9px] font-bold uppercase tracking-widest text-primary'>
              Drawing
            </h2>
            <a
              href={site.repo}
              target='_blank'
              rel='noopener noreferrer'
              className='font-mono mb-1.5 block text-xs font-semibold text-body transition-colors hover:text-primary'
            >
              View source ↗
            </a>
            <span className='font-mono mb-1.5 block text-xs font-semibold text-muted'>
              Next.js · static
            </span>
            <span className='font-mono mb-1.5 block text-xs font-semibold text-muted'>
              Blueprint v2.0
            </span>
          </div>
        </div>

        {/* Revision strip */}
        <div className='flex flex-wrap items-center justify-between gap-2 border-t border-primary/20 py-3'>
          <span className='font-mono text-[10px] font-semibold text-muted'>
            © {year} SHIMEMING · 銘
          </span>
          <span className='font-mono text-[10px] font-semibold text-muted'>
            <b className='text-primary'>REV 2.0</b>
          </span>
          <span className='font-mono text-[10px] font-semibold text-muted'>
            LAST UPDATED · {lastUpdated.toUpperCase()}
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
