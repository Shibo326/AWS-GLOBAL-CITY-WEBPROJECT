'use client';

import { motion } from 'framer-motion';
import { events } from '@/data/events';
import { MissionCard } from '@/components/cards/MissionCard';
import { staggerContainer } from '@/components/animations/variants';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { MissionEvent } from '@/types';

// ─── Constants ───────────────────────────────────────────────────────────────

const statusOrder: MissionEvent['status'][] = ['UPCOMING', 'ACTIVE', 'COMPLETED'];

const statusLabels: Record<MissionEvent['status'], string> = {
  UPCOMING: 'UPCOMING MISSIONS',
  ACTIVE: 'ACTIVE MISSIONS',
  COMPLETED: 'COMPLETED MISSIONS',
};

/** Narrative copy for each mission status — storytelling layer */
const statusNarrative: Record<MissionEvent['status'], { headline: string; body: string }> = {
  UPCOMING: {
    headline: 'Flight Plan Filed',
    body: 'These missions are on the horizon. Fuel up, check your instruments, and prepare for takeoff.',
  },
  ACTIVE: {
    headline: 'Currently Airborne',
    body: "Missions in progress — we're cruising at altitude. Join the formation before we touch down.",
  },
  COMPLETED: {
    headline: 'Mission Debriefing',
    body: 'Successful landings. Review the flight logs from our completed operations.',
  },
};

/** Status-specific icon/decoration */
const statusIcons: Record<MissionEvent['status'], string> = {
  UPCOMING: '🛫',
  ACTIVE: '✈️',
  COMPLETED: '🛬',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * MissionBoardContent — Clean content component for the /missions page.
 *
 * This component renders ONLY the mission listing content. It does NOT render:
 * - Hero sections (PageHero handles that at page level)
 * - Zone backgrounds (parent ZoneSection provides the ground zone)
 * - WaveDividers (page.tsx handles zone transitions)
 * - Ambient effects like GreenClouds
 *
 * All text inherits from the parent ground zone's warm cream background.
 */
export function MissionBoardContent() {
  const groups = groupAndSortEvents(events);
  const hasAnyEvents = events.length > 0;

  const activeGroups = statusOrder.filter(
    (status) => groups[status].length > 0
  );

  return (
    <div className="section-padding">
      <div className="container-site">
        {/* ── Flight Status Summary Pills ── */}
        <ScrollReveal>
          <div className="flex items-center gap-3 flex-wrap mb-12">
            {activeGroups.map((status, i) => (
              <div key={status} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--border-color)] bg-white/70 backdrop-blur-sm px-3 py-1.5 font-mono text-xs uppercase tracking-wider"
                  style={{ color: 'var(--secondary-text)' }}
                >
                  <span aria-hidden="true">{statusIcons[status]}</span>
                  {groups[status].length} {status.toLowerCase()}
                </span>
                {i < activeGroups.length - 1 && (
                  <span
                    className="font-mono text-xs"
                    style={{ color: 'var(--accent-orange)' }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Empty State ── */}
        {!hasAnyEvents && (
          <ScrollReveal>
            <div className="card-cartoon p-8 text-center">
              <p
                className="text-lg font-medium"
                style={{ color: 'var(--secondary-text)' }}
              >
                No missions currently scheduled. Check back soon, pilot. ✈️
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* ── Status Groups ── */}
        {hasAnyEvents &&
          activeGroups.map((status) => {
            const groupEvents = groups[status];
            const narrative = statusNarrative[status];

            return (
              <div key={status} className="mb-16 last:mb-0">
                {/* Section header with narrative */}
                <ScrollReveal>
                  <SectionLabel text={statusLabels[status]} />

                  <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                    <h2
                      className="font-[family-name:var(--font-display)] font-semibold text-2xl md:text-3xl"
                      style={{ color: 'var(--primary-text)' }}
                    >
                      {narrative.headline}
                    </h2>
                    <span className="text-2xl" aria-hidden="true">
                      {statusIcons[status]}
                    </span>
                  </div>

                  <p
                    className="mt-2 max-w-lg"
                    style={{ color: 'var(--secondary-text)' }}
                  >
                    {narrative.body}
                  </p>
                </ScrollReveal>

                {/* Cards grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
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
              </div>
            );
          })}

        {/* ── Bottom CTA — warm, inherits ground zone background ── */}
        {hasAnyEvents && (
          <ScrollReveal>
            <div className="text-center mt-16 pt-12 border-t border-[var(--border-color)]/10">
              <h2
                className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl tracking-wide uppercase"
                style={{ color: 'var(--primary-text)' }}
              >
                READY FOR YOUR FIRST MISSION?
              </h2>
              <p
                className="mt-3 max-w-md mx-auto"
                style={{ color: 'var(--secondary-text)' }}
              >
                Join the squadron and get access to all upcoming workshops,
                hackathons, and cloud adventures.
              </p>
              <a href="/enlist" className="btn-primary mt-6 inline-flex">
                Enlist as Cloud Pilot
              </a>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
