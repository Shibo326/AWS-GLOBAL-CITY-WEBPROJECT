'use client';

import { motion } from 'framer-motion';
import { springEntry } from '@/components/animations/variants';
import type { Announcement } from '@/types';

interface SignalEntryProps {
  announcement: Announcement;
}

/**
 * Formats an ISO date string to "[MM.DD.YYYY]" terminal-style timestamp.
 * Pads single digits with leading zeros.
 * e.g. "2025-06-01" → "[06.01.2025]"
 */
function formatTimestamp(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `[${month}.${day}.${year}]`;
}

/**
 * SignalEntry — A single announcement entry with terminal/log aesthetic.
 * Monospace text, left-aligned, with optional amber pulse dot for pinned signals.
 * Uses springEntry variant for scroll-triggered slide-in from right.
 * Timestamp fades in 200ms after the text appears.
 */
export function SignalEntry({ announcement }: SignalEntryProps) {
  return (
    <motion.div
      className="flex items-start gap-3"
      variants={springEntry}
    >
      {/* Pinned indicator — amber pulsing dot */}
      {announcement.pinned && (
        <span
          className="amber-pulse mt-1.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-amber-500"
          aria-label="Pinned announcement"
        />
      )}

      {/* Content text */}
      <span className="font-mono text-sm text-primary-text">
        {announcement.content}
      </span>

      {/* Timestamp — fades in 200ms after text appears */}
      <motion.span
        className="flex-shrink-0 font-mono text-sm text-secondary-text whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {formatTimestamp(announcement.date)}
      </motion.span>
    </motion.div>
  );
}
