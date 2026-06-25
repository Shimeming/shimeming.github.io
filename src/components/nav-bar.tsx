'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import Container from '@/components/layout/container';
import ThemeToggleButton from '@/components/theme-toggle-button';
import Seal from '@/components/ui/seal';
import { navPages } from '@/data/nav';

const NavBar = (): React.JSX.Element => {
  const pathName = usePathname();

  return (
    <header className='sticky top-0 z-40 border-b border-primary/20 bg-background/80 backdrop-blur'>
      <Container className='flex items-center justify-between gap-4 py-3'>
        {/* Brand: seal + wordmark */}
        <div className='flex items-center gap-2.5 shrink-0'>
          <Seal as='link' size={32} />
          <span className='font-mono text-xs font-bold tracking-wide text-foreground uppercase select-none'>
            SHIMEMING
          </span>
        </div>

        {/* Nav links + tools */}
        <nav
          aria-label='Primary'
          className='no-scrollbar flex items-center gap-4 overflow-x-auto sm:gap-5'
        >
          {navPages.map((page) => {
            const active =
              pathName === page.href || pathName.startsWith(page.href + '/');
            return (
              <Link
                key={page.href}
                href={page.href}
                aria-current={active ? 'page' : undefined}
                className={`
                  group relative shrink-0
                  font-mono text-xs font-bold uppercase tracking-widest
                  transition-colors hover:text-primary
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                  ${active ? 'text-primary' : 'text-body'}
                `}
              >
                {page.title}
                <span
                  className={`
                    absolute -bottom-0.5 left-0 h-0.5 bg-primary
                    transition-[width] duration-300 ease-in-out
                    group-hover:w-full
                    ${active ? 'w-full' : 'w-0'}
                  `}
                />
              </Link>
            );
          })}

          <Link
            href='https://github.com/Shimeming'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub profile'
            className='shrink-0 text-lg text-body transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm'
          >
            <FaGithub />
          </Link>

          <ThemeToggleButton />
        </nav>
      </Container>
    </header>
  );
};

export default NavBar;
