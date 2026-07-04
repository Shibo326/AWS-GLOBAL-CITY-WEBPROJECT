'use client';

import { motion } from 'framer-motion';
import { stampVariants } from './variants';

interface StampInProps {
  children: React.ReactNode;
  className?: string;
  /** Viewport intersection threshold (0 to 1) */
  threshold?: number;
  /** Whether the animation plays only once */
  once?: boolean;
}

/**
 * Wraps children in a motion.div that applies the stamp-in effect
 * (scale 1.08 + rotate -1deg to scale 1 + rotate 0) when scrolled into view.
 */
export default function StampIn({
  children,
  className,
  threshold = 0.15,
  once = true,
}: StampInProps) {
  return (
    <motion.div
      className={className}
      variants={stampVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
    >
      {children}
    </motion.div>
  );
}
