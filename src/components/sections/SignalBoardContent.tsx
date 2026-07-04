'use client';

import { motion } from 'framer-motion';
import { staggerContainer } from '@/components/animations/variants';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { SignalEntry } from '@/components/cards/SignalEntry';
import { announcements } from '@/data/announcements';
import type { Announcement } from '@/types';

/**
 * Returns all announcements sorted: pinned first (most recent first among pinned),
 * then non-pinned (most recent first).
 */
function getSortedSignals(allAnnouncements: Announcement[]): Announcement[] {
  const pinned = [...allAnnouncements]
    .filter((a) => a.pinned)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const unpinned = [...allAnnouncements]
    .filter((a) => !a.pinned)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return [...pinned, ...unpinned];
}

/**
 * SignalBoardContent — Client component rendering the full terminal-styled
 * announcement feed. Displays all signals with pinned entries at the top,
 * using stagger container + spring entrance animations.
 */
export function SignalBoardContent() {
  const signals = getSortedSignals(announcements);

  return (
    <section className="section-padding">
      <div className="container-site">
        {/* Page heading */}
        <ScrollReveal>
          <h1 className="font-heading tracking-hero text-primary-text text-4xl md:text-5xl lg:text-6xl">
            ANNOUNCEMENTS
          </h1>
          <p className="mt-3 text-secondary-text text-base md:text-lg">
            All club announcements and communications
          </p>
        </ScrollReveal>

        {/* Terminal-styled feed */}
        <motion.div
          className="mt-12 flex flex-col gap-4 font-mono"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {signals.map((announcement) => (
            <SignalEntry key={announcement.id} announcement={announcement} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
