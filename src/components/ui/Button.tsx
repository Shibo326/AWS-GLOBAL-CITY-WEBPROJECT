'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonMotion } from '@/components/animations/variants';

export type ButtonVariant = 'primary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  outline:
    'inline-flex items-center justify-center rounded-full border border-border bg-transparent text-primary-text font-display font-semibold text-sm tracking-[0.04em] cursor-pointer transition-colors duration-300 hover:border-accent-blue hover:text-accent-blue',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-8 py-3 text-sm',
  lg: 'px-10 py-4 text-base',
};

/**
 * Button — Reusable animated button component.
 * Uses framer-motion whileHover/whileTap with buttonMotion preset.
 * Supports primary (orange pill), ghost (border only), and outline variants.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      data-cursor="cta"
      className={cn(variantStyles[variant], sizeStyles[size], className)}
      {...buttonMotion}
      {...props}
    >
      {children}
    </motion.button>
  );
}
