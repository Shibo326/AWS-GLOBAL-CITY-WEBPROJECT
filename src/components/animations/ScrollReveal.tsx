'use client';

import { motion } from 'framer-motion';
import { scrollRevealVariants } from './variants';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Viewport intersection threshold (0 to 1) */
  threshold?: number;
  /** Whether the animation plays only once */
  once?: boolean;
}

/**
 * Wrapper component that reveals children on scroll using Framer Motion
 * whileInView with the scrollRevealVariants.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      transition={delay > 0 ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
