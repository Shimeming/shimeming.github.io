import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import { notoSans, notoSansTC, geistMono, caveat } from '@/helpers/fonts';
import ThemeProviderWrapper from '@/helpers/ThemeProviderWrapper';
import DarkModeToggle from '@/components/DarkModeToggle';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Shimeming\'s Blog',
    default: 'Shimeming\'s Blog',
  },
  description: 'Shimeming\'s Blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${notoSans.variable} ${notoSansTC.variable} ${geistMono.variable} ${caveat.variable}
          font-sans antialiased
          bg-light text-dark
          w-full min-h-screen
        `}
      >
        <ThemeProviderWrapper>
          <NavBar />
          <div className='
            w-full h-full z-0 bg-light px-32
          '>
            {children}
            <div className='fixed bottom-4 right-8 z-30 p-4'>
              <DarkModeToggle />
            </div>
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
};
