'use client';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NavBar = (): React.JSX.Element => {

  const pathName = usePathname();

  const pages = [
    { href: '/', title: 'Home' },
    { href: '/about', title: 'About' },
    { href: '/projects', title: 'Projects' },
    { href: '/articles', title: 'Articles' },
  ];

  const links = [
    { href: 'https://github.com/Shimeming', icon: <FaGithub /> },
  ];

  return (
    <header
      className={`
        w-full px-32 py-8 font-medium
        flex items-center justify-between
      `}
    >
      <nav className='space-x-4'>
        {pages.map((page, index) => (
          <Link
            key={index}
            href={page.href}
            className='relative group text-xl'
          >
            {page.title}
            <span className={`
              h-0.5 inline-block bg-dark absolute left-0 -bottom-0.5
              group-hover:w-full transition-[width] ease duration-300
              ${pathName === page.href ? 'w-full' : 'w-0'}
            `}>
            </span>
          </Link>
        ))}
      </nav>
      <nav className='space-x-4'>
        {links.map((link, index) => (
          <motion.a
            key={index} href={link.href} target={'_blank'}
            className="text-3xl block"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            {link.icon}
          </motion.a>
        ))}
      </nav>

      <div className='absolute left-1/2 -translate-x-1/2'>
        <Logo />
      </div>
    </header>
  );
};

export default NavBar;