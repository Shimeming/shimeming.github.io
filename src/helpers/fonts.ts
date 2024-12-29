import { Geist_Mono, Noto_Sans, Noto_Sans_TC, Caveat } from 'next/font/google';

export const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

export const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  preload: false,
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
});
