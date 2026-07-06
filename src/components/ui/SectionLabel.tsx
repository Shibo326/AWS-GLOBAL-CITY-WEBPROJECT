'use client';

import { cn } from '@/lib/utils';

interface SectionLabelProps {
  text: string;
  dotColor?: string; // default: 'var(--accent-orange)' or tailwind class
  className?: string;
  /** @deprecated No longer rendered — kept for backwards compatibility */
  showCursor?: boolean;
}

/**
 * SectionLabel — Pill-shaped badge with a colored dot indicator
 * and uppercase monospace text. Used above section headings.
 */
export function SectionLabel({
  text,
  dotColor = 'var(--accent-orange)',
  className,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-4 py-1.5 rounded-full',
        'border-2 border-[var(--border-color)]',
        'bg-white/50',
        'text-xs uppercase tracking-wider',
        'font-mono',
        className
      )}
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span
        className="inline-block h-2 w-2 rounded-full shrink-0"
        style={{ backgroundColor: dotColor }}
        aria-hidden="true"
      />
      {text}
    </span>
  );
}
