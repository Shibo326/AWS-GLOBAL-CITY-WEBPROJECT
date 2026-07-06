'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconChevronDown } from '@tabler/icons-react';
import { Button } from '@/components/ui';
import { CartoonClouds, CartoonSun } from '@/components/decorations';
import { fadeInUp, staggerContainer } from '@/components/animations/variants';

/**
 * HeroSection — Full viewport hero with sky zone background.
 * Uses .zone-sky solid background color and .zone-section for WaveDivider support.
 * Layers:
 *   - CartoonClouds (illustrated SVG clouds with drift animation)
 *   - CartoonSun (rotating sun illustration, top-right)
 *   - Rory mascot with .float-rory animation
 *   - Text content (headline, subheadline, CTAs, scroll indicator)
 */
export default function HeroSection() {
  const handleScrollDown = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section
      className="zone-sky zone-section relative h-screen w-full overflow-hidden"
      aria-label="Hero section"
    >
      {/* Cartoon illustrated clouds */}
      <CartoonClouds count={7} />

      {/* Cartoon sun — top right */}
      <CartoonSun />

      {/* Rory mascot — centered above text content */}
      <div className="absolute inset-0 flex items-start justify-center pt-[12vh] md:pt-[10vh] z-10">
        <div className="float-rory" aria-hidden="true">
          <img
            src="/images/rory-waving.png"
            alt=""
            className="w-[240px] h-[300px] md:w-[340px] md:h-[420px] object-contain select-none pointer-events-none"
            style={{ filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))' }}
            draggable={false}
          />
        </div>
      </div>

      {/* Text content — positioned below mascot */}
      <div className="relative z-20 flex flex-col items-center justify-end w-full h-full px-6 text-center pb-[18vh] md:pb-[14vh]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-hero font-heading tracking-hero leading-none select-none"
            style={{
              color: '#FFFFFF',
              textShadow: '4px 4px 0px rgba(0, 0, 0, 0.25), -2px -2px 0px rgba(255, 255, 255, 0.15)',
              WebkitTextStroke: '2px rgba(0, 0, 0, 0.1)',
            }}
          >
            CLEARED FOR TAKEOFF
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="mt-3 font-mono tracking-label text-sm md:text-base"
            style={{ color: '#FFFFFF', textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)' }}
          >
            AWS Cloud Club — Global City
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/missions" className="inline-flex">
              <Button variant="outline" size="md">
                View Missions
              </Button>
            </Link>
            <Link href="/enlist" className="inline-flex">
              <Button variant="primary" size="md">
                Join Now
              </Button>
            </Link>
          </motion.div>

          {/* Campus tagline */}
          <motion.p
            variants={fadeInUp}
            className="mt-4 font-mono text-xs tracking-label"
            style={{ color: 'rgba(255, 255, 255, 0.8)', textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)' }}
          >
            STI College Global City, Taguig
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          onClick={handleScrollDown}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70 cursor-pointer bg-transparent border-none"
          aria-label="Scroll down"
        >
          <span className="text-xs font-mono tracking-label uppercase">
            Scroll
          </span>
          <motion.div className="animate-scroll-bounce">
            <IconChevronDown size={20} stroke={1.5} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
