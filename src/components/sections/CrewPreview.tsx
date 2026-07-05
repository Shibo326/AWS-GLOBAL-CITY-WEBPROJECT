'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { CrewCard } from '@/components/cards/CrewCard';
import { officers } from '@/data/officers';

/** Stagger container with 60ms between cards */
const crewStaggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

/**
 * CrewPreview — Displays first 6 officers as 3D flip cards on the home page.
 * Grid: 1 col mobile, 2 cols tablet, 3 cols desktop.
 * Cards stagger in with 60ms delay between each.
 */
export default function CrewPreview() {
  const displayedOfficers = officers
    .sort((a, b) => a.order - b.order)
    .slice(0, 6);

  return (
    <section className="section-padding" aria-label="Crew preview">
      <div className="container-site">
        {/* Section label */}
        <SectionLabel text="YOUR CREW" showCursor className="mb-8" />

        {/* Officer cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={crewStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {displayedOfficers.map((officer) => (
            <CrewCard key={officer.id} officer={officer} />
          ))}
        </motion.div>

        {/* CTA button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/crew"
            className="inline-flex items-center gap-2 font-display font-semibold text-sm tracking-[0.04em] rounded-full border-2 border-accent-orange px-8 py-3 text-primary-text transition-all duration-300 hover:bg-accent-orange hover:text-white hover:-translate-y-1"
          >
            Meet the Full Crew
            <IconArrowRight size={16} stroke={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
