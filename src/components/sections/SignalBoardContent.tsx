'use client';

import { motion } from 'framer-motion';
import {
  IconAntenna,
  IconCalendarEvent,
  IconMapPin,
  IconPinnedFilled,
  IconRadar2,
  IconTrophy,
  IconSpeakerphone,
  IconUserPlus,
} from '@tabler/icons-react';
import { staggerContainer, fadeInUp } from '@/components/animations/variants';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { announcements } from '@/data/announcements';
import { events } from '@/data/events';
import type { Announcement } from '@/types';

// ---------- Utilities ----------

function getSortedSignals(allAnnouncements: Announcement[]): Announcement[] {
  const pinned = [...allAnnouncements]
    .filter((a) => a.pinned)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const unpinned = [...allAnnouncements]
    .filter((a) => !a.pinned)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return [...pinned, ...unpinned];
}

function formatDate(isoDate: string): string {
  return new Date(isoDate + 'T00:00:00').toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTimestamp(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}.${day}.${year}`;
}

const categoryIcons: Record<string, typeof IconSpeakerphone> = {
  event: IconCalendarEvent,
  achievement: IconTrophy,
  recruitment: IconUserPlus,
  general: IconSpeakerphone,
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  UPCOMING: { label: 'UPCOMING', color: 'text-accent-blue', bg: 'bg-accent-blue/10 border-accent-blue/25' },
  ACTIVE: { label: 'LIVE NOW', color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/25' },
  COMPLETED: { label: 'COMPLETE', color: 'text-secondary-text', bg: 'bg-cloud-soft border-border' },
};

// ---------- Component ----------

export function SignalBoardContent() {
  const signals = getSortedSignals(announcements);

  const featuredEvents = [...events]
    .sort((a, b) => {
      const priority = { ACTIVE: 0, UPCOMING: 1, COMPLETED: 2 };
      const pDiff = priority[a.status] - priority[b.status];
      if (pDiff !== 0) return pDiff;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 6);

  return (
    <div className="py-12 md:py-16">

      {/* ═══ EVENT HIGHLIGHTS ═══ */}
      <section className="section-padding relative">
        {/* Subtle atmosphere */}
        <div className="absolute top-0 left-0 right-0 h-[200px] pointer-events-none" aria-hidden="true"
          style={{ background: 'linear-gradient(to bottom, rgba(186, 230, 253, 0.1) 0%, transparent 100%)' }}
        />

        <div className="container-site relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-2">
              <IconRadar2 size={22} className="text-accent-orange" stroke={1.5} />
              <h2 className="font-heading tracking-hero text-primary-text text-3xl md:text-4xl">
                MISSION RADAR
              </h2>
            </div>
            <p className="text-secondary-text text-sm mb-8">
              Active and upcoming flight plans on the board
            </p>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {featuredEvents.map((event) => {
              const status = statusConfig[event.status];
              return (
                <motion.article
                  key={event.id}
                  className="card-cloud overflow-hidden group relative"
                  variants={fadeInUp}
                >
                  {/* Top gradient bar based on status */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background: event.status === 'ACTIVE'
                        ? 'linear-gradient(90deg, #10B981, #38BDF8)'
                        : event.status === 'UPCOMING'
                        ? 'linear-gradient(90deg, #FF9900, #F59E0B)'
                        : 'linear-gradient(90deg, #94A3B8, #CBD5E1)',
                    }}
                  />

                  <div className="p-5">
                    {/* Status + date row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border rounded-full ${status.bg}`}>
                        {event.status === 'ACTIVE' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        )}
                        <span className={status.color}>{status.label}</span>
                      </span>
                      <span className="font-mono text-[10px] text-secondary-text">
                        {formatDate(event.date)}
                      </span>
                    </div>

                    {/* Tag */}
                    {event.tags?.[0] && (
                      <span className="inline-block font-mono text-[9px] uppercase tracking-[0.15em] text-accent-blue/70 bg-accent-blue/5 border border-accent-blue/10 rounded px-2 py-0.5 mb-3">
                        {event.tags[0]}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="font-display font-semibold text-base text-primary-text group-hover:text-accent-orange transition-colors duration-300 line-clamp-2 mb-2">
                      {event.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-secondary-text line-clamp-2 mb-3">
                      {event.description}
                    </p>

                    {/* Location */}
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-secondary-text/60">
                        <IconMapPin size={12} stroke={1.5} />
                        <span className="font-mono text-[10px] truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ SIGNAL FEED ═══ */}
      <section className="section-padding relative">
        {/* Subtle decorative elements */}
        <div className="absolute top-12 right-8 pointer-events-none opacity-[0.03]" aria-hidden="true">
          <IconAntenna size={200} stroke={0.5} className="text-primary-text" />
        </div>

        <div className="container-site relative z-10 max-w-4xl">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-2">
              <IconSpeakerphone size={22} className="text-accent-orange" stroke={1.5} />
              <h2 className="font-heading tracking-hero text-primary-text text-3xl md:text-4xl">
                ALL TRANSMISSIONS
              </h2>
            </div>
            <p className="text-secondary-text text-sm mb-10">
              Pinned signals marked with priority. All frequencies logged below.
            </p>
          </ScrollReveal>

          {/* Pinned Signals */}
          <motion.div
            className="flex flex-col gap-4 mb-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {signals.filter(s => s.pinned).map((signal) => {
              const CatIcon = categoryIcons[signal.category || 'general'] || IconSpeakerphone;
              return (
                <motion.div
                  key={signal.id}
                  className="relative flex items-start gap-4 p-4 rounded-xl bg-card border border-accent-orange/15 shadow-sm hover:shadow-md hover:border-accent-orange/30 transition-all duration-300"
                  variants={fadeInUp}
                >
                  {/* Priority pin */}
                  <div className="absolute -top-2 -left-2">
                    <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shadow-sm">
                      <IconPinnedFilled size={11} className="text-white" />
                    </div>
                  </div>

                  {/* Category icon */}
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent-orange/10 flex items-center justify-center mt-0.5">
                    <CatIcon size={18} className="text-accent-orange" stroke={1.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-primary-text leading-relaxed">
                      {signal.content}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="font-mono text-[10px] text-secondary-text tracking-wider">
                        {formatTimestamp(signal.date)}
                      </span>
                      <span className="font-mono text-[10px] text-accent-orange/60 uppercase tracking-wider">
                        ● priority
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Separator */}
          <div className="flex items-center gap-4 mb-8" aria-hidden="true">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[10px] text-secondary-text/50 uppercase tracking-widest">
              all signals
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Regular Signals Feed */}
          <motion.div
            className="flex flex-col gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {signals.filter(s => !s.pinned).map((signal) => {
              const CatIcon = categoryIcons[signal.category || 'general'] || IconSpeakerphone;
              return (
                <motion.div
                  key={signal.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-card hover:shadow-sm border border-transparent hover:border-border transition-all duration-300 group"
                  variants={fadeInUp}
                >
                  {/* Category icon */}
                  <div className="flex-shrink-0 w-7 h-7 rounded-md bg-cloud-soft flex items-center justify-center mt-0.5 group-hover:bg-accent-blue/10 transition-colors">
                    <CatIcon size={14} className="text-secondary-text group-hover:text-accent-blue transition-colors" stroke={1.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-primary-text leading-relaxed">
                      {signal.content}
                    </p>
                    <span className="inline-block font-mono text-[10px] text-secondary-text/60 mt-1.5 tracking-wider">
                      {formatTimestamp(signal.date)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
