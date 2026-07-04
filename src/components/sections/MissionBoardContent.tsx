'use client';

import { motion } from 'framer-motion';
import { events } from '@/data/events';
import { MissionCard } from '@/components/cards/MissionCard';
import { staggerContainer } from '@/components/animations/variants';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { MissionEvent } from '@/types';

const statusOrder: MissionEvent['status'][] = ['UPCOMING', 'ACTIVE', 'COMPLETED'];

const statusLabels: Record<MissionEvent['status'], string> = {
  UPCOMING: 'UPCOMING MISSIONS',
  ACTIVE: 'ACTIVE MISSIONS',
  COMPLETED: 'COMPLETED MISSIONS',
};

function groupAndSortEvents(allEvents: MissionEvent[]) {
  const groups: Record<MissionEvent['status'], MissionEvent[]> = {
    UPCOMING: [],
    ACTIVE: [],
    COMPLETED: [],
  };

  for (const event of allEvents) {
    groups[event.status].push(event);
  }

  // Sort each group by date ascending
  for (const status of statusOrder) {
    groups[status].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  return groups;
}

/**
 * MissionBoardContent — Client component rendering the full events listing
 * grouped by status with stagger animations and responsive grid.
 */
export function MissionBoardContent() {
  const groups = groupAndSortEvents(events);
  const hasAnyEvents = events.length > 0;

  // Determine which groups have content for spacing logic
  const activeGroups = statusOrder.filter(
    (status) => groups[status].length > 0
  );

  return (
    <div className="section-padding container-site">
      {/* Page heading */}
      <ScrollReveal>
        <h1 className="font-heading tracking-hero text-4xl md:text-5xl lg:text-6xl text-primary-text">
          MISSION BOARD
        </h1>
      </ScrollReveal>

      {/* Empty state */}
      {!hasAnyEvents && (
        <p className="mt-12 text-secondary-text text-lg">
          No missions currently scheduled. Check back soon, pilot.
        </p>
      )}

      {/* Status groups */}
      {hasAnyEvents &&
        activeGroups.map((status, groupIndex) => {
          const groupEvents = groups[status];

          return (
            <section
              key={status}
              className={groupIndex === 0 ? 'mt-8' : 'mt-12'}
            >
              <ScrollReveal>
                <SectionLabel text={statusLabels[status]} />
              </ScrollReveal>

              <motion.div
                className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {groupEvents.map((event, index) => (
                  <motion.div key={event.id}>
                    <MissionCard event={event} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          );
        })}
    </div>
  );
}
