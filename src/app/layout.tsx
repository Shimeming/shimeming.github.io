import Footer from '@/components/footer';
import NavBar from '@/components/nav-bar';
import ThemeProviderWrapper from '@/components/providers/theme-provider';
import { poppinsSemiBold, notoSans, notoSansTC, spaceGrotesk, spaceMono, caveat } from '@/lib/fonts';
import type { Metadata } from 'next';

import './globals.css';

const description = 'Personal site of Shimeming — projects, notes, and more.';

export const metadata: Metadata = {
  metadataBase: new URL('https://shimeming.github.io'),
  title: {
    template: '%s | Shimeming',
    default: 'Shimeming',
  },
  description,
  openGraph: {
    title: 'Shimeming',
    description,
    url: 'https://shimeming.github.io',
    siteName: 'Shimeming',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shimeming',
    description,
  },
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
          ${notoSans.variable} ${notoSansTC.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${caveat.variable}
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
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
};
