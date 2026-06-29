'use client';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { runThemeTransition } from '@/lib/theme-transition';

// ref: https://jfelix.info/blog/using-react-spring-to-animate-svg-icons-dark-mode-toggle

const properties = {
  sun: {
    r: 9,
    transform: 'rotate(40deg)',
    cx: 12,
    cy: 4,
    opacity: 0,
  },
  moon: {
    r: 5,
    transform: 'rotate(90deg)',
    cx: 30,
    cy: 0,
    opacity: 1,
  },
};

const ThemeToggleButton = ({
  className = '',
}: {
  className?: string;
}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount guard for next-themes: resolvedTheme is only known on the client,
    // so flip `mounted` after hydration to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDarkMode = mounted && resolvedTheme === 'dark';

  const toggleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDarkMode ? 'light' : 'dark';
    // Ink bleed spreads from the centre of the toggle icon.
    const rect = event.currentTarget.getBoundingClientRect();
    const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    runThemeTransition(next, origin, setTheme);
  };

  const { r, transform, cx, cy, opacity } = isDarkMode ? properties.sun : properties.moon;

  return (
    <button
      type='button'
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        rounded-md p-1 cursor-pointer text-body
        hover:text-primary transition-colors
        focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        ${className}
      `}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        animate={{ transform }}
        transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
      >
        <mask id="moon-mask-toggle">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <motion.circle
            stroke="none"
            fill="black"
            cx={cx} cy={cy} r={r}
            transition={{ duration: 0.5, type: 'spring' }}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          r={r}
          fill="currentColor"
          mask="url(#moon-mask-toggle)"
          initial={false}
          animate={{ r }}
          transition={{ duration: 0.5, type: 'spring' }}
        />
        <motion.g stroke="currentColor" opacity={opacity} transition={{ duration: 0.5 }}>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.svg>
    </button>
  );
};

export default ThemeToggleButton;
