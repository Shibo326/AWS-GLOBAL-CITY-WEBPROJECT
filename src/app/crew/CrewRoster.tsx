'use client';

import { motion } from 'framer-motion';
import { officers } from '@/data/officers';
import { CrewCard } from '@/components/cards/CrewCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { cardRevealVariants } from '@/components/animations/variants';

/** Stagger container with 60ms delay between cards */
const crewStaggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

/**
 * CrewRoster — Client component rendering the full officer grid
 * with staggered entrance animations and 3D flip cards.
 */
export function CrewRoster() {
  const sortedOfficers = [...officers].sort((a, b) => a.order - b.order);

  return (
    <section className="section-padding container-site">
      {/* Heading */}
      <ScrollReveal className="mb-10">
        <h1 className="font-heading tracking-hero text-primary-text text-4xl md:text-5xl">
          CREW ROSTER
        </h1>
        <p className="mt-3 text-secondary-text text-base md:text-lg">
          The officers and leaders of AWS Cloud Club -- Global City
        </p>
      </ScrollReveal>

      {/* Officer Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={crewStaggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {sortedOfficers.map((officer) => (
          <motion.div key={officer.id} variants={cardRevealVariants}>
            <CrewCard officer={officer} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
