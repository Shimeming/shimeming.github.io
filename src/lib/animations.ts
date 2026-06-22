export const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const cardHoverSmall = {
  whileHover: { scale: 1.02 },
  transition: { type: 'spring', stiffness: 300 },
};
