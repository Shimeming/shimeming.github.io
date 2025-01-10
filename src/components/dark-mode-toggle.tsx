'use client';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

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
  // springConfig: { mass: 4, tension: 250, friction: 35 },
};

const DarkModeToggle = ({
  className = '',
}: {
  className?: string;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
    // if(theme) document.documentElement.setAttribute('data-theme', theme);
  };

  const { r, transform, cx, cy, opacity } = isDarkMode ? properties.sun : properties.moon;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={toggleDarkMode}
      className={`no-transition w-8 h-8 cursor-pointer ${className}`}
      animate={{ transform }}
      transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
    >
      <mask id="moon-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <motion.circle
          stroke="none"
          fill="black"
          cx={cx} cy={cy} r={r}
          transition={{ duration: 0.5, type: 'spring'}}
        />
      </mask>
      <motion.circle
        cx="12"
        cy="12"
        r={r}
        fill="currentColor"
        mask="url(#moon-mask)"
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
  );
};

export default DarkModeToggle;
