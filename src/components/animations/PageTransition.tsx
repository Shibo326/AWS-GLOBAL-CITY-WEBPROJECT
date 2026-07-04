'use client';

import { motion } from 'framer-motion';
import { pageVariants } from './variants';

interface PageTransitionProps {
  children: React.ReactNode;
  /** Unique key for AnimatePresence route transitions (typically the pathname) */
  routeKey: string;
  className?: string;
}

/**
 * Wraps page content with a motion.div that applies pageVariants
 * (initial/enter/exit with blur + translateY) for route transitions.
 * Should be used inside an AnimatePresence in the app template.
 */
export default function PageTransition({
  children,
  routeKey,
  className,
}: PageTransitionProps) {
  return (
    <motion.div
      key={routeKey}
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
