'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconChevronDown } from '@tabler/icons-react';
import { Button } from '@/components/ui';
import ParallaxLayer from './ParallaxLayer';
import TigerMascot from './TigerMascot';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeInUp, staggerContainer } from '@/components/animations/variants';
import { parallaxSpeeds } from '@/lib/constants';

// Dynamic import tsParticles to avoid SSR issues
const ParticlesField = dynamic(() => import('./ParticlesField'), { ssr: false });

/**
 * HeroSection — Full viewport hero with 4-layer parallax:
 * Layer 1 (z-0): tsParticles star field
 * Layer 2 (z-10): Cloud shapes (blurred ellipses)
 * Layer 3 (z-20): Tiger mascot with mouse tracking
 * Layer 4 (z-30): Text content (headline, subheadline, CTAs, scroll indicator)
 *
 * On mobile, reduces to 2 active layers (starfield + text).
 */
export default function HeroSection() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollDown = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle warm radial glow centered behind mascot */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 600px 400px at 50% 38%, rgba(77, 163, 255, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Warm bottom glow — runway lights effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none z-[5]"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to top, rgba(196, 149, 106, 0.04) 0%, transparent 100%)',
        }}
      />

      {/* Layer 1: Star field (z-0) */}
      <ParallaxLayer
        speed={parallaxSpeeds.starField}
        className="z-0"
      >
        <div className="w-full h-full" aria-hidden="true">
          {mounted && !prefersReducedMotion && <ParticlesField />}
        </div>
      </ParallaxLayer>

      {/* Layer 2: Cloud shapes (z-10) — hidden on mobile */}
      <ParallaxLayer
        speed={parallaxSpeeds.clouds}
        className="z-10"
        mobileHidden
      >
        <div className="w-full h-full" aria-hidden="true">
          <CloudShapes />
        </div>
      </ParallaxLayer>

      {/* Layer 3: Tiger mascot (z-20) — positioned in top-center area */}
      <ParallaxLayer
        speed={isMobile ? 0 : parallaxSpeeds.tigerMascot}
        className="z-20"
      >
        <div className="absolute inset-0 flex items-start justify-center pt-[12vh] md:pt-[10vh]" aria-hidden="true">
          <TigerMascot />
        </div>
      </ParallaxLayer>

      {/* Layer 4: Text content (z-30) — positioned below mascot */}
      <ParallaxLayer
        speed={isMobile ? 0 : parallaxSpeeds.headline}
        className="z-30"
      >
        <div className="flex flex-col items-center justify-end w-full h-full px-6 text-center pb-[18vh] md:pb-[14vh]">
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
                background: 'linear-gradient(180deg, #FFFFFF 20%, #B8D4F0 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              CLEARED FOR TAKEOFF
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="mt-3 font-mono text-secondary-text tracking-label text-sm md:text-base"
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
              className="mt-4 font-mono text-xs text-secondary-text/60 tracking-label"
            >
              STI College Global City, Taguig
            </motion.p>
          </motion.div>

          {/* Scroll indicator — anchored at bottom */}
          <motion.button
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onClick={handleScrollDown}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-secondary-text cursor-pointer bg-transparent border-none"
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
      </ParallaxLayer>
    </section>
  );
}

/**
 * CloudShapes — Subtle atmospheric haze that adds depth.
 * Very low opacity, evenly distributed, and well-blurred to avoid white blotches.
 */
function CloudShapes() {
  const clouds = [
    { top: '20%', left: '5%', width: 200, height: 80, opacity: 0.02 },
    { top: '30%', left: '65%', width: 240, height: 90, opacity: 0.015 },
    { top: '55%', left: '25%', width: 180, height: 70, opacity: 0.02 },
    { top: '65%', left: '70%', width: 160, height: 60, opacity: 0.015 },
    { top: '80%', left: '40%', width: 220, height: 80, opacity: 0.012 },
  ];

  return (
    <>
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.width,
            height: cloud.height,
            opacity: cloud.opacity,
            background: 'radial-gradient(ellipse, rgba(77, 163, 255, 0.3) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            filter: 'blur(80px)',
          }}
        />
      ))}
    </>
  );
}
