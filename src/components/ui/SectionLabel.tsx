'use client';

import { cn } from '@/lib/utils';

interface SectionLabelProps {
  text: string;
  showCursor?: boolean;
  dotColor?: string;
  className?: string;
}

/**
 * SectionLabel — Cartoon badge-style callsign labels.
 * Chunky, colorful, with a playful star prefix instead of chevron.
 * Optionally shows a blinking dot before the text.
 */
export function SectionLabel({
  text,
  showCursor = true,
  dotColor,
  className,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-label px-3 py-1.5 bg-[#FFF3E0] border-2 border-[#2D2D44] rounded-full shadow-[2px_2px_0px_#2D2D44] text-[#2D2D44]',
        className
      )}
    >
      {dotColor && (
        <span
          className="inline-block h-2.5 w-2.5 rounded-full animate-blink-green border border-[#2D2D44]"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      )}
      <span>
        <span className="text-accent-orange mr-1" aria-hidden="true">★</span>
        {text}
        {showCursor && (
          <span className="typewriter-cursor" aria-hidden="true" />
        )}
      </span>
    </span>
  );
}
