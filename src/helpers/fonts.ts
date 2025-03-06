import { Geist_Mono, Noto_Sans, Noto_Sans_TC, Caveat, Poppins } from 'next/font/google';

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

export const poppinsSemiBold = Poppins({
  weight: '600',
  variable: '--font-poppins-semi-bold',
  subsets: ['latin'],
});
