'use client';

import { motion } from 'framer-motion';
import { events } from '@/data/events';
import { MissionCard } from '@/components/cards/MissionCard';
import { staggerContainer } from '@/components/animations/variants';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GreenClouds } from '@/components/effects/GreenClouds';
import { CloudDivider } from '@/components/effects/CloudDivider';
import type { MissionEvent } from '@/types';

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
    body: 'Missions in progress — we\'re cruising at altitude. Join the formation before we touch down.',
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
 * MissionBoardContent — Full events listing with aviation storytelling,
 * green cloud ambient effects, and progressive "altitude descent" theming.
 * The page reads like a flight journey: upcoming (high altitude) → active (cruising) → completed (landed).
 */
export function MissionBoardContent() {
  const groups = groupAndSortEvents(events);
  const hasAnyEvents = events.length > 0;

  const activeGroups = statusOrder.filter(
    (status) => groups[status].length > 0
  );

  return (
    <div className="relative">
      {/* === HERO SECTION === */}
      <section className="relative overflow-hidden bg-zone-sky pt-24 pb-16">
        {/* Green cloud ambient — top placement */}
        <GreenClouds variant="top" />

        <div className="container-site relative z-10">
          <ScrollReveal>
            <SectionLabel text="MISSION CONTROL — LIVE" dotColor="#10B981" showCursor={false} />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="mt-4 font-heading tracking-hero text-5xl md:text-6xl lg:text-7xl text-primary-text">
              MISSION BOARD
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-lg text-secondary-text leading-relaxed">
              Every workshop, hackathon, and community event is a flight mission.
              Track our squadron&apos;s journey from pre-flight planning to successful landing.
            </p>
          </ScrollReveal>

          {/* Flight path progress indicator */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              {activeGroups.map((status, i) => (
                <div key={status} className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/70 backdrop-blur-sm px-3 py-1.5 font-mono text-xs uppercase tracking-label text-secondary-text">
                    <span aria-hidden="true">{statusIcons[status]}</span>
                    {groups[status].length} {status.toLowerCase()}
                  </span>
                  {i < activeGroups.length - 1 && (
                    <span className="text-accent-orange font-mono text-xs" aria-hidden="true">→</span>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cloud divider: sky → content zones */}
      <CloudDivider variant="white" />

      {/* Empty state */}
      {!hasAnyEvents && (
        <div className="section-padding container-site">
          <p className="text-secondary-text text-lg">
            No missions currently scheduled. Check back soon, pilot.
          </p>
        </div>
      )}

      {/* === STATUS GROUPS === */}
      {hasAnyEvents &&
        activeGroups.map((status, groupIndex) => {
          const groupEvents = groups[status];
          const narrative = statusNarrative[status];

          // Alternate zone backgrounds for visual storytelling
          const zoneClass =
            status === 'UPCOMING'
              ? 'bg-zone-cloud'
              : status === 'ACTIVE'
              ? 'bg-zone-landing'
              : 'bg-zone-cloud-soft';

          // Green clouds placement per section
          const cloudVariant =
            status === 'UPCOMING'
              ? 'top'
              : status === 'ACTIVE'
              ? 'middle'
              : 'bottom';

          return (
            <section
              key={status}
              className={`relative overflow-hidden ${zoneClass} py-16 md:py-20`}
            >
              {/* Green clouds ambient layer */}
              <GreenClouds variant={cloudVariant as 'top' | 'middle' | 'bottom'} />

              <div className="container-site relative z-10">
                {/* Section header with narrative */}
                <ScrollReveal>
                  <div className="mb-8">
                    <SectionLabel text={statusLabels[status]} />

                    <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                      <h2 className="font-display font-semibold text-2xl md:text-3xl text-primary-text">
                        {narrative.headline}
                      </h2>
                      <span className="text-2xl" aria-hidden="true">{statusIcons[status]}</span>
                    </div>

                    <p className="mt-2 max-w-lg text-secondary-text">
                      {narrative.body}
                    </p>
                  </div>
                </ScrollReveal>

                {/* Flight path line connector (visual storytelling element) */}
                <div className="relative">
                  {/* Vertical flight path line */}
                  {status !== 'COMPLETED' && (
                    <div
                      className="absolute left-6 top-0 bottom-0 w-px hidden lg:block"
                      style={{
                        background: status === 'UPCOMING'
                          ? 'linear-gradient(180deg, rgba(56, 189, 248, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%)'
                          : 'linear-gradient(180deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 100%)',
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Cards grid */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              </div>

              {/* Section divider between groups */}
              {groupIndex < activeGroups.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0">
                  <svg
                    viewBox="0 0 1440 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className="w-full h-[40px] md:h-[60px]"
                    aria-hidden="true"
                  >
                    <path
                      d="M0,60 L0,30 C240,10 480,50 720,30 C960,10 1200,45 1440,25 L1440,60 Z"
                      fill="rgba(16, 185, 129, 0.06)"
                    />
                    <path
                      d="M0,60 L0,42 C300,30 600,55 900,38 C1200,22 1350,48 1440,40 L1440,60 Z"
                      fill="rgba(16, 185, 129, 0.04)"
                    />
                  </svg>
                </div>
              )}
            </section>
          );
        })}

      {/* === BOTTOM CTA SECTION === */}
      <section className="relative overflow-hidden bg-zone-landing py-16 md:py-20">
        <GreenClouds variant="bottom" />

        <div className="container-site relative z-10 text-center">
          <ScrollReveal>
            <h2 className="font-heading tracking-hero text-3xl md:text-4xl text-primary-text">
              READY FOR YOUR FIRST MISSION?
            </h2>
            <p className="mt-3 text-secondary-text max-w-md mx-auto">
              Join the squadron and get access to all upcoming workshops, hackathons, and cloud adventures.
            </p>
            <a
              href="/enlist"
              className="btn-primary mt-6 inline-flex"
            >
              Enlist as Cloud Pilot
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
