'use client';

import { cn } from '@/lib/utils';

interface SectionLabelProps {
  text: string;
  showCursor?: boolean;
  dotColor?: string;
  className?: string;
}

/**
 * SectionLabel — Renders aviation-style callsign labels in JetBrains Mono.
 * Uses a "▸" chevron prefix for a cockpit HUD feel instead of generic "//".
 * Optionally shows a blinking cursor after the text.
 * If dotColor is provided, shows a blinking dot before the text.
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
        'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-secondary-text',
        className
      )}
    >
      {dotColor && (
        <span
          className="inline-block h-2 w-2 rounded-full animate-blink-green"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      )}
      <span>
        <span className="text-accent-blue mr-1" aria-hidden="true">▸</span>
        {text}
        {showCursor && (
          <span className="typewriter-cursor" aria-hidden="true" />
        )}
      </span>
    </span>
  );
}
