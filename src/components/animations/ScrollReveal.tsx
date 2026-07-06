'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Delay before animation starts (in seconds) */
  delay?: number;
}

/**
 * Wrapper component that reveals children on scroll using Framer Motion.
 * Animates from opacity:0, translateY:30px to opacity:1, translateY:0.
 * Supports staggered children and respects prefers-reduced-motion.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  // When reduced motion is preferred, show content immediately without animation
  const initial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 30 };

  const animate = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
      }}
    >
      {children}
    </motion.div>
  );
}
