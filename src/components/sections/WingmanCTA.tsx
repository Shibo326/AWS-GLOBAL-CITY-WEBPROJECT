'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/components/animations/variants';
import WingmanChatPreview from '@/components/sections/WingmanChatPreview';

/**
 * WingmanCTA — Call-to-action section promoting the AI Wingman (Rory).
 * Two-column layout: headline + CTA on left, chat preview mockup on right.
 * Uses hangar zone background (warm green #D4E8D4) with dark text for contrast.
 *
 * Validates: Requirements 5.8, 19.3
 */
export default function WingmanCTA() {
  return (
    <section
      className="section-padding"
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
          <h2
            className="font-display font-bold text-2xl md:text-3xl"
            style={{ color: 'var(--primary-text)' }}
          >
            Got questions? Ask the Wingman.
          </h2>
          <p
            className="text-base font-medium"
            style={{ color: 'var(--secondary-text)' }}
          >
            Rory knows everything about the club — officers, events,
            departments, and how to join. Get instant answers without leaving
            the page.
          </p>
          <div className="mt-4">
            <Link href="/wingman">
              <button className="btn-primary">Launch Wingman</button>
            </Link>
          </div>
        </motion.div>

        {/* Right column — chat preview mockup */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center lg:justify-end"
        >
          <div
            className="max-w-[320px] w-full card-cartoon p-5"
            aria-hidden="true"
          >
            <WingmanChatPreview />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
