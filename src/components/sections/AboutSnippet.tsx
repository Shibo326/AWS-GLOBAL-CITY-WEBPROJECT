'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/components/animations/variants';

/**
 * AboutSnippet — Two-column section with club description and animated tiger card.
 * Desktop (>=768px): text left, tiger card right.
 * Mobile (<768px): text above, card below.
 * Uses Framer Motion stagger container for scroll-triggered entrance.
 *
 * NOTE: The parent page.tsx wraps this in a ZoneSection with zone="cloud",
 * so this component does NOT set its own background.
 */
export default function AboutSnippet() {
  return (
    <section className="section-padding" aria-label="About the club">
      <motion.div
        className="container-site grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left column — text */}
        <motion.div variants={fadeInUp} className="relative flex flex-col gap-4">
          <div className="relative">
            <h2
              className="font-bold text-2xl md:text-3xl"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-text)' }}
            >
              A Different Kind of Cloud Club
            </h2>
            {/* Headline underline — single solid orange bar */}
            <div
              className="mt-2 h-[3px] w-[60px] rounded-full"
              aria-hidden="true"
              style={{ background: 'var(--accent-orange)' }}
            />
          </div>
          <p
            className="text-base leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--secondary-text)' }}
          >
            We are not your typical AWS chapter. At STI Global City, we combine
            cloud computing with artificial intelligence to build solutions that
            matter. Founded in 2024, our crew of 120+ cloud pilots pushes the
            boundaries of what student organizations can ship. From deploying
            ML models on SageMaker to architecting serverless systems, we
            treat every project like a real mission.
          </p>
        </motion.div>

        {/* Right column — tiger mascot card with cartoon styling */}
        <motion.div variants={fadeInUp} className="flex justify-center md:justify-end">
          <div
            className="card-cartoon p-6 w-[250px] h-[300px] md:w-[300px] md:h-[360px] flex items-center justify-center rotate-[1deg] hover:rotate-[-1deg] transition-all duration-300"
            data-cursor="tiger"
          >
            <img
              src="/images/rory-waving.png"
              alt="Rory the Cloud Pilot mascot"
              className="w-[180px] h-[240px] md:w-[220px] md:h-[280px] object-contain float-rory"
              draggable={false}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
