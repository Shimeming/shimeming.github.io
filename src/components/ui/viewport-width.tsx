'use client';
import { useEffect, useState } from 'react';

/**
 * Blueprint dimension annotation that reads the real viewport width and keeps
 * it in sync on resize. Renders nothing until mounted to avoid a hydration
 * mismatch (the static export can't know the width at build time).
 */
const ViewportWidth = ({ className = '' }: { className?: string }) => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <span className={className}>
      ↤ {width ?? '—'}px ↦
    </span>
  );
};

export default ViewportWidth;
