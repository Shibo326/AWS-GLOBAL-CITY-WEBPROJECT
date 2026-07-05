'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';
import { staggerContainer } from '@/components/animations/variants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SignalEntry } from '@/components/cards/SignalEntry';
import { announcements } from '@/data/announcements';
import type { Announcement } from '@/types';

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
 * SignalBoardPreview — Terminal-styled announcement feed for the home page.
 * Displays the 5 most recent signals with pinned entries appearing first.
 * Uses stagger container for scroll-triggered spring entrance animations.
 */
export default function SignalBoardPreview() {
  const signals = getDisplayedSignals(announcements);

  return (
    <section className="section-padding bg-zone-cloud-soft" aria-label="Recent announcements">
      <div className="container-site">
        {/* Section label */}
        <SectionLabel text="ANNOUNCEMENTS" showCursor className="mb-8" />

        {/* Signal entries */}
        <motion.div
          className="flex flex-col gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {signals.map((announcement) => (
            <SignalEntry key={announcement.id} announcement={announcement} />
          ))}
        </motion.div>

        {/* Open Signal Board link */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/signals"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-accent-orange hover:text-primary-text transition-colors"
          >
            View All Announcements
            <IconArrowRight size={16} stroke={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
