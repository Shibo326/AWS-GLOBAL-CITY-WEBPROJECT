'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/components/animations/variants';

/**
 * AboutSnippet — Two-column section with club description and animated tiger card.
 * Desktop (>=768px): text left, tiger card right.
 * Mobile (<768px): text above, card below.
 * Uses Framer Motion stagger container for scroll-triggered entrance.
 */
export default function AboutSnippet() {
  return (
    <section className="section-padding bg-zone-warm" aria-label="About the club">
      <motion.div
        className="container-site grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left column — text */}
        <motion.div variants={fadeInUp} className="relative flex flex-col gap-4">
          {/* Warm sunshine glow behind text */}
          <div
            className="absolute -inset-8 pointer-events-none"
            aria-hidden="true"
            style={{
              background: 'radial-gradient(ellipse at 30% 40%, rgba(251, 191, 36, 0.08) 0%, transparent 60%)',
            }}
          />
          <div className="relative">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-text">
              A Different Kind of Cloud Club
            </h2>
            {/* Cartoon hand-drawn underline */}
            <div
              className="mt-2 h-[4px] w-[45%] rounded-full rotate-[-1deg]"
              aria-hidden="true"
              style={{
                background: 'linear-gradient(90deg, var(--accent-orange), var(--accent-pink), var(--accent-purple))',
              }}
            />
          </div>
          <p className="font-body text-base leading-body text-secondary-text">
            We are not your typical AWS chapter. At STI Global City, we combine
            cloud computing with artificial intelligence to build solutions that
            matter. Founded in 2024, our crew of 120+ cloud pilots pushes the
            boundaries of what student organizations can ship. From deploying
            ML models on SageMaker to architecting serverless systems, we
            treat every project like a real mission.
          </p>
        </motion.div>

        {/* Right column — tiger mascot card with cartoon border */}
        <motion.div variants={fadeInUp} className="flex justify-center md:justify-end">
          <div
            className="bg-[#FFF8E1] rounded-[28px] p-6 w-[250px] h-[300px] md:w-[300px] md:h-[360px] flex items-center justify-center border-[3px] border-[#2D2D44] shadow-[5px_5px_0px_#2D2D44] rotate-[1deg] hover:rotate-[-1deg] hover:shadow-[7px_7px_0px_#C56200] transition-all duration-300"
            data-cursor="tiger"
          >
            <img
              src="/images/rory-waving.png"
              alt="Rory the Cloud Pilot mascot"
              className="w-[180px] h-[240px] md:w-[220px] md:h-[280px] object-contain animate-[float_4s_ease-in-out_infinite]"
              draggable={false}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
