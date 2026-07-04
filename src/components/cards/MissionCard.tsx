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

/**
 * MissionCard — Event card with scan-line sweep animation on viewport entry,
 * hover lift with glow border, and status badge positioning.
 */
export function MissionCard({ event, index }: MissionCardProps) {
  return (
    <motion.div
      className="scan-line relative flex flex-col gap-3 rounded-card border border-border bg-card p-5"
      variants={cardRevealVariants}
      custom={index}
      {...cardMotion}
    >
      {/* Status badge — top right */}
      <div className="absolute top-4 right-4">
        <Badge variant={statusVariantMap[event.status]}>
          {event.status}
        </Badge>
      </div>

      {/* Date */}
      <span className="font-mono text-xs text-secondary-text">
        {formatDate(event.date)}
      </span>

      {/* Event name */}
      <h3 className="font-display font-semibold text-lg text-primary-text pr-24">
        {event.name}
      </h3>

      {/* Description — truncated to 120 chars */}
      <p className="text-sm text-secondary-text line-clamp-3">
        {truncateDescription(event.description)}
      </p>
    </motion.div>
  );
}
