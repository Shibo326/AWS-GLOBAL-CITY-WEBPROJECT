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
          <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-text">
            Got questions? Ask the Wingman.
          </h2>
          <p className="text-secondary-text text-base font-medium">
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

        {/* Right column — cartoon speech bubble chat preview */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center lg:justify-end"
        >
          <div
            className="max-w-[320px] w-full flex flex-col gap-4 bg-card border-[3px] border-[#2D2D44] rounded-[24px] p-5 shadow-[4px_4px_0px_#1B5E20]"
            aria-hidden="true"
          >
            {/* User message — right-aligned, cartoon style */}
            <div className="flex justify-end">
              <div className="bg-[#FFF3E0] text-primary-text rounded-[16px] rounded-br-[4px] px-3.5 py-2.5 text-sm font-medium border-2 border-[#2D2D44] shadow-[2px_2px_0px_#2D2D44]">
                How do I join the club?
              </div>
            </div>

            {/* Rory speech bubble — left-aligned */}
            <div className="flex justify-start">
              <div className="bg-white text-primary-text rounded-[16px] rounded-bl-[4px] px-3.5 py-2.5 text-sm font-medium border-2 border-[#2D2D44] shadow-[2px_2px_0px_#2D2D44]">
                Ready to get your wings? Head to the Enlist page... ✈️
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
