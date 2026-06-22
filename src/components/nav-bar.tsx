'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import Container from '@/components/layout/container';
import Logo from '@/components/logo';

const pages = [
  { href: '/about', title: 'About' },
  { href: '/projects', title: 'Projects' },
  { href: '/articles', title: 'Articles' },
  { href: '/celeste', title: 'Celeste' },
];

const NavBar = (): React.JSX.Element => {
  const pathName = usePathname();

  return (
    <header className='sticky top-0 z-40 border-b border-decorative/15 bg-background/80 backdrop-blur'>
      <Container className='flex items-center justify-between gap-4 py-4'>
        <Logo />

        <nav
          aria-label='Primary'
          className='no-scrollbar flex items-center gap-4 overflow-x-auto sm:gap-6'
        >
          {pages.map((page) => {
            const active =
              pathName === page.href || pathName.startsWith(page.href + '/');
            return (
              <Link
                key={page.href}
                href={page.href}
                aria-current={active ? 'page' : undefined}
                className='group relative shrink-0 text-base font-medium transition-colors hover:text-primary sm:text-lg'
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
            className='shrink-0 text-2xl transition-colors hover:text-primary'
          >
            <FaGithub />
          </Link>
        </nav>
      </Container>
    </header>
  );
};

export default NavBar;
