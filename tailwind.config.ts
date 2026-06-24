import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

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
        /* backward-compat aliases for not-yet-rewritten components */
        secondary:   'var(--muted)',
        decorative:  'var(--muted)',
        hovered:     'var(--surface)',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)'],
        mono:    ['var(--font-space-mono)'],
        sans:    ['var(--font-noto-sans)'],
        sanstc:  ['var(--font-noto-sans-tc)'],
        caveat:  ['var(--font-caveat)', 'cursive'],
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
