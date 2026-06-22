import DarkModeToggle from '@/components/dark-mode-toggle';
import NavBar from '@/components/nav-bar';
import ThemeProviderWrapper from '@/components/providers/theme-provider';
import { poppinsSemiBold, notoSans, notoSansTC, geistMono, caveat } from '@/lib/fonts';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://shimeming.github.io'),
  title: {
    template: '%s | Shimeming',
    default: 'Shimeming',
  },
  description: 'Personal site of Shimeming — projects, notes, and more.',
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
          ${poppinsSemiBold.variable}
          font-sans antialiased
          flex min-h-screen flex-col
        `}
      >
        <ThemeProviderWrapper>
          <NavBar />
          <div className='flex flex-1 flex-col'>
            {children}
          </div>
          <div className='fixed bottom-4 right-8 z-30'>
            <DarkModeToggle />
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
};
