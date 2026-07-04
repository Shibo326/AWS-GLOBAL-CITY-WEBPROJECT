'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const pageVariants = {
  initial: {
    opacity: 1,
    y: 0,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
    >
      {children}
    </motion.div>
  );
}
