import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* blueprint tokens */
        background:  'var(--background)',
        surface:     'var(--surface)',
        surfaceFlat: 'var(--surface-flat)',
        foreground:  'var(--foreground)',
        body:        'var(--body)',
        muted:       'var(--muted)',
        primary:     'var(--primary)',
        accent:      'var(--accent)',
        grade:       'var(--grade)',
        hand:        'var(--hand)',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)'],
        mono:    ['var(--font-space-mono)'],
        sans:    ['var(--font-noto-sans)'],
        sanstc:  ['var(--font-noto-sans-tc)'],
        caveat:  ['var(--font-caveat)', 'var(--font-hand-tc)', 'cursive'],
        poppins: ['var(--font-poppins-semi-bold)'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
} satisfies Config;
