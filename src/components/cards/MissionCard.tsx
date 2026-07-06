'use client';

import { motion } from 'framer-motion';
import { cardRevealVariants, cardMotion } from '@/components/animations/variants';
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

/** Status-based accent bar colors */
const statusBarColorMap: Record<MissionEvent['status'], string> = {
  ACTIVE: 'var(--accent-green)',
  UPCOMING: 'var(--accent-orange)',
  COMPLETED: '#9CA3AF',
};

/** Status dot class — green pulse for active, orange pulse for upcoming, static gray for completed */
const statusDotClassMap: Record<MissionEvent['status'], string> = {
  ACTIVE: 'pulse-dot',
  UPCOMING: 'pulse-dot-orange',
  COMPLETED: '',
};

/** Status dot inline color */
const statusDotColorMap: Record<MissionEvent['status'], string> = {
  ACTIVE: '#00C853',
  UPCOMING: '#FF8C00',
  COMPLETED: '#9CA3AF',
};

/** Status display labels */
const statusLabelMap: Record<MissionEvent['status'], string> = {
  ACTIVE: 'Active',
  UPCOMING: 'Upcoming',
  COMPLETED: 'Completed',
};

/**
 * MissionCard — Cartoon-styled event card with colored top accent bar,
 * pulsing status dot, and tag pills.
 * Renders as .card-cartoon with all mission data fields visible.
 */
export function MissionCard({ event, index }: MissionCardProps) {
  return (
    <motion.article
      className="card-cartoon relative flex flex-col gap-3 overflow-hidden"
      variants={cardRevealVariants}
      custom={index}
      {...cardMotion}
    >
      {/* 4px colored top accent bar — first child, full width, rounded top matching card radius */}
      <div
        className="w-full"
        style={{
          height: '4px',
          backgroundColor: statusBarColorMap[event.status],
        }}
        aria-hidden="true"
      />

      {/* Content area */}
      <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
        {/* Top bar: date + status badge with dot */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-[var(--secondary-text)] tracking-wide">
            {formatDate(event.date)}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-xs uppercase tracking-wider"
            aria-label={`Status: ${statusLabelMap[event.status]}`}
          >
            {/* Status dot */}
            <span
              className={`inline-block h-2 w-2 rounded-full ${statusDotClassMap[event.status]}`}
              style={{ backgroundColor: statusDotColorMap[event.status] }}
              aria-hidden="true"
            />
            {statusLabelMap[event.status]}
          </span>
        </div>

        {/* Mission title */}
        <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--primary-text)] leading-snug">
          {event.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--secondary-text)] leading-relaxed">
          {truncateDescription(event.description)}
        </p>

        {/* Tag pills */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-dashed border-[var(--border-color)]/20">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="cartoon-badge"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
