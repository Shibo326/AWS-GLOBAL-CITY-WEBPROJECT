'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useInView, motion } from 'framer-motion';

interface CountUpProps {
  /** Target number to count up to */
  target: number;
  /** Duration of the count-up in seconds (controls spring dynamics) */
  duration?: number;
  /** Suffix appended after the number (e.g., "+") */
  suffix?: string;
  /** CSS class name for styling */
  className?: string;
}

/**
 * Animated number counter using Framer Motion's useMotionValue + useSpring.
 * Triggers when the element scrolls into view. Formats with thousands separators.
 */
export default function CountUp({
  target,
  duration = 1.8,
  suffix = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
    duration: duration,
  });

  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (displayRef.current) {
        const rounded = Math.round(latest);
        displayRef.current.textContent =
          rounded.toLocaleString('en-US') + suffix;
      }
    });

    return unsubscribe;
  }, [springValue, suffix]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <span ref={displayRef}>0{suffix}</span>
    </motion.span>
  );
}
