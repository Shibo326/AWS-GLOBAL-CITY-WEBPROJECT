'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';
import { staggerContainer } from '@/components/animations/variants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import AnnouncementRow from '@/components/cards/AnnouncementRow';
import { announcements } from '@/data/announcements';
import type { Announcement } from '@/types';

/**
 * Formats an ISO date string to a readable timestamp for AnnouncementRow.
 * e.g. "2025-06-01" → "06.01.2025"
 */
function formatTimestamp(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}.${day}.${year}`;
}

/**
 * Returns the 5 most recent announcements, with pinned entries at the top
 * regardless of date, and remaining entries sorted by date (most recent first).
 */
function getDisplayedSignals(allAnnouncements: Announcement[]): Announcement[] {
  const pinned = [...allAnnouncements]
    .filter((a) => a.pinned)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const unpinned = [...allAnnouncements]
    .filter((a) => !a.pinned)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return [...pinned, ...unpinned].slice(0, 5);
}

/**
 * SignalBoardPreview — Announcement feed for the home page airfield zone.
 * Displays the 5 most recent signals with pinned entries appearing first.
 * Uses AnnouncementRow components and stagger container for scroll-triggered animations.
 */
export default function SignalBoardPreview() {
  const signals = getDisplayedSignals(announcements);

  return (
    <section className="section-padding" aria-label="Recent announcements">
      <div className="container-site">
        {/* Section label */}
        <SectionLabel text="SIGNALS" dotColor="var(--accent-green)" className="mb-4" />

        {/* Section title */}
        <h2
          className="text-3xl md:text-4xl uppercase tracking-wide mb-8"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-text)' }}
        >
          Signal Board
        </h2>

        {/* Signal entries */}
        <motion.div
          className="flex flex-col"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {signals.map((announcement) => (
            <AnnouncementRow
              key={announcement.id}
              text={announcement.content}
              timestamp={formatTimestamp(announcement.date)}
              pinned={announcement.pinned}
            />
          ))}
        </motion.div>

        {/* View All Signals link */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/signals"
            className="inline-flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-orange)',
            }}
          >
            View All Signals
            <IconArrowRight size={16} stroke={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
