'use client';
import { motion, type Variants } from 'motion/react';
import { type ReactNode } from 'react';

/**
 * Shared entrance-motion primitives used across the site (about, projects,
 * articles) so every page fades in with the same feel. Reduced-motion users
 * keep the opacity fade but skip the translate — handled globally by
 * <MotionConfig reducedMotion='user'>.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.5;
const DISTANCE = 12;

/** Animate once, a touch before the block is fully in view. */
export const revealViewport = { once: true, margin: '0px 0px -10% 0px' } as const;

/** Container that staggers its <RevealItem> children. Pair the two. */
export const revealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

/** Per-child (and standalone) fade-and-rise. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
};

/**
 * Fade-and-rise a single block when it scrolls into view (or immediately, if
 * already on screen at load). Optional `delay` lets a cluster of blocks cascade.
 */
const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: DISTANCE }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={revealViewport}
    transition={{ duration: DURATION, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

export default Reveal;
