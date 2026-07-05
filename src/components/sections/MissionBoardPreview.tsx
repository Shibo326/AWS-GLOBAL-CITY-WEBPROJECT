'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';
import { staggerContainer } from '@/components/animations/variants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { MissionCard } from '@/components/cards/MissionCard';
import { events } from '@/data/events';
import type { MissionEvent } from '@/types';

/** Status priority for sorting: UPCOMING first, ACTIVE second, COMPLETED last */
const STATUS_ORDER: Record<MissionEvent['status'], number> = {
  UPCOMING: 0,
  ACTIVE: 1,
  COMPLETED: 2,
};

/**
 * Returns events sorted by status priority (UPCOMING > ACTIVE > COMPLETED),
 * then by date ascending within the same status group.
 */
function getSortedEvents(allEvents: MissionEvent[]): MissionEvent[] {
  return [...allEvents]
    .sort((a, b) => {
      const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      if (statusDiff !== 0) return statusDiff;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .slice(0, 3);
}

/**
 * MissionBoardPreview — Displays up to 3 mission event cards on the home page.
 * Events are sorted: UPCOMING first, then ACTIVE, then COMPLETED.
 * Within the same status, sorted by date ascending.
 */
export default function MissionBoardPreview() {
  const displayedEvents = getSortedEvents(events);

  return (
    <section className="section-padding bg-zone-cloud" aria-label="Active missions preview">
      <div className="container-site">
        {/* Section label */}
        <SectionLabel text="ACTIVE MISSIONS" showCursor className="mb-8" />

        {/* Event cards grid or empty state */}
        {displayedEvents.length === 0 ? (
          <p className="text-secondary-text text-sm font-mono">
            No missions currently scheduled.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {displayedEvents.map((event, index) => (
              <MissionCard key={event.id} event={event} index={index} />
            ))}
          </motion.div>
        )}

        {/* View All link */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/missions"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-accent-orange hover:text-primary-text transition-colors"
          >
            View All Missions
            <IconArrowRight size={16} stroke={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
