'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'upcoming' | 'active' | 'completed';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  upcoming:
    'bg-accent-blue/20 text-accent-blue animate-status-pulse-blue',
  active:
    'bg-accent-orange/20 text-accent-orange animate-status-pulse-orange',
  completed:
    'bg-secondary-text/20 text-secondary-text',
};

/**
 * Badge — Status badge component with pulse animations.
 * Variants: upcoming (blue pulse), active (orange pulse), completed (gray static).
 * Renders as a small pill shape with uppercase monospace text.
 */
export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <motion.span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs uppercase tracking-label',
        variantStyles[variant],
        className
      )}
      aria-label={`Status: ${variant}`}
    >
      {children}
    </motion.span>
  );
}
