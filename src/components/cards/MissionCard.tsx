'use client';

import { motion } from 'framer-motion';
import { cardRevealVariants, cardMotion } from '@/components/animations/variants';
import { Badge } from '@/components/ui/Badge';
import type { MissionEvent } from '@/types';

interface MissionCardProps {
  event: MissionEvent;
  index: number;
}

/**
 * Formats an ISO date string to "MMM DD, YYYY" format.
 * e.g. "2025-07-19" → "Jul 19, 2025"
 */
function formatDate(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Truncates a string to maxLength characters and adds ellipsis if needed.
 */
function truncateDescription(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

/** Maps event status to Badge variant */
const statusVariantMap: Record<MissionEvent['status'], 'upcoming' | 'active' | 'completed'> = {
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

/** Status-based card accent colors */
const statusAccentMap: Record<MissionEvent['status'], string> = {
  UPCOMING: 'hover:border-sky-300 hover:shadow-[0_8px_30px_rgba(56,189,248,0.12)]',
  ACTIVE: 'hover:border-orange-300 hover:shadow-[0_8px_30px_rgba(255,153,0,0.12)]',
  COMPLETED: 'hover:border-emerald-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]',
};

/**
 * MissionCard — Enhanced event card with scan-line sweep animation,
 * location display, tags, and status-aware hover effects.
 * Tells the story of each mission with richer visual hierarchy.
 */
export function MissionCard({ event, index }: MissionCardProps) {
  return (
    <motion.article
      className={`scan-line group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 ${statusAccentMap[event.status]}`}
      variants={cardRevealVariants}
      custom={index}
      {...cardMotion}
    >
      {/* Top bar: date + status */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-secondary-text tracking-wide">
          {formatDate(event.date)}
        </span>
        <Badge variant={statusVariantMap[event.status]}>
          {event.status}
        </Badge>
      </div>

      {/* Event name */}
      <h3 className="font-display font-semibold text-lg text-primary-text leading-snug">
        {event.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-secondary-text leading-relaxed">
        {truncateDescription(event.description)}
      </p>

      {/* Location (if available) */}
      {event.location && (
        <div className="flex items-center gap-1.5 mt-auto pt-2">
          <svg
            className="h-3.5 w-3.5 text-secondary-text/70 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="font-mono text-[11px] text-secondary-text/70 truncate">
            {event.location}
          </span>
        </div>
      )}

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-border/50">
          {event.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-accent-green/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Decorative corner accent — subtle flight path indicator */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: event.status === 'UPCOMING'
            ? 'radial-gradient(circle at top right, rgba(56, 189, 248, 0.08), transparent 70%)'
            : event.status === 'ACTIVE'
            ? 'radial-gradient(circle at top right, rgba(255, 153, 0, 0.08), transparent 70%)'
            : 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.08), transparent 70%)',
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}
