'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/components/animations/variants';
import { Button } from '@/components/ui/Button';

/**
 * WingmanCTA — Call-to-action section promoting the AI Wingman (Rory).
 * Two-column layout: headline + CTA on left, decorative chat mockup on right.
 * Uses bg-surface to visually separate from surrounding sections.
 */
export default function WingmanCTA() {
  return (
    <section
      className="section-padding bg-zone-landing"
      aria-label="AI Wingman call to action"
    >
      <motion.div
        className="container-site grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left column — text + CTA */}
        <motion.div variants={fadeInUp} className="flex flex-col gap-4">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-primary-text">
            Got questions? Ask the Wingman.
          </h2>
          <p className="text-secondary-text text-base">
            Rory knows everything about the club — officers, events,
            departments, and how to join. Get instant answers without leaving
            the page.
          </p>
          <div className="mt-4">
            <Link href="/wingman">
              <Button variant="primary">Launch Wingman</Button>
            </Link>
          </div>
        </motion.div>

        {/* Right column — decorative chat preview mockup */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center lg:justify-end"
        >
          <div
            className="card-land max-w-[320px] w-full flex flex-col gap-3"
            aria-hidden="true"
          >
            {/* User message — right-aligned */}
            <div className="flex justify-end">
              <div className="bg-accent-orange/10 text-primary-text rounded-lg px-3 py-2 text-sm max-w-[85%]">
                How do I join the club?
              </div>
            </div>

            {/* Rory message — left-aligned */}
            <div className="flex justify-start">
              <div className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-primary-text max-w-[85%]">
                Ready to get your wings? Head to the Enlist page...
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
