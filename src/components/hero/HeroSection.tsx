  'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconChevronDown } from '@tabler/icons-react';
import { Button } from '@/components/ui';
import ParallaxLayer from './ParallaxLayer';
import TigerMascot from './TigerMascot';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { fadeInUp, staggerContainer } from '@/components/animations/variants';
import { parallaxSpeeds } from '@/lib/constants';

/**
 * HeroSection — Full viewport hero with solid sky gradient background.
 * No particles (performance). 3 active layers:
 * Layer 1 (z-10): Cloud shapes (CSS, no JS)
 * Layer 2 (z-20): Tiger mascot with mouse tracking
 * Layer 3 (z-30): Text content (headline, subheadline, CTAs, scroll indicator)
 *
 * Background is a rich sky-blue gradient that establishes the SKY ZONE.
 */
export default function HeroSection() {
  const isMobile = useIsMobile();

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
      style={{
        background: 'linear-gradient(180deg, #0369A1 0%, #38BDF8 30%, #7DD3FC 55%, #BAE6FD 75%, #E0F2FE 100%)',
      }}
    >
      {/* Sky atmosphere glow behind mascot */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 700px 500px at 50% 38%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 153, 0, 0.05) 40%, transparent 70%)',
        }}
      />

      {/* Warm sunrise glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[160px] pointer-events-none z-[5]"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.6) 0%, transparent 100%)',
        }}
      />

      {/* Layer 1: Cloud shapes (z-10) — hidden on mobile */}
      <ParallaxLayer
        speed={parallaxSpeeds.clouds}
        className="z-10"
        mobileHidden
      >
        <div className="w-full h-full" aria-hidden="true">
          <CloudShapes />
        </div>
      </ParallaxLayer>

      {/* Layer 2: Tiger mascot (z-20) — positioned in top-center area */}
      <ParallaxLayer
        speed={isMobile ? 0 : parallaxSpeeds.tigerMascot}
        className="z-20"
      >
        <div className="absolute inset-0 flex items-start justify-center pt-[12vh] md:pt-[10vh]" aria-hidden="true">
          <TigerMascot />
        </div>
      </ParallaxLayer>

      {/* Layer 3: Text content (z-30) — positioned below mascot */}
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
                color: '#FFFFFF',
                textShadow: '0 2px 20px rgba(12, 74, 110, 0.4), 0 4px 40px rgba(0, 0, 0, 0.15)',
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

          {/* Scroll indicator — anchored at bottom */}
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
      </ParallaxLayer>
    </section>
  );
}

/**
 * CloudShapes — Floating cloud shapes with natural morphology.
 * Uses irregular border-radius to create fluffy cloud silhouettes.
 * Clouds are wider than tall, with gentle drift animation.
 */
function CloudShapes() {
  const clouds = [
    {
      top: '10%', left: '-5%', width: 320, height: 100,
      borderRadius: '60% 80% 50% 70% / 60% 40% 70% 50%',
      opacity: 0.6, blur: 20,
    },
    {
      top: '20%', left: '60%', width: 280, height: 90,
      borderRadius: '50% 70% 60% 80% / 70% 50% 60% 40%',
      opacity: 0.4, blur: 25,
    },
    {
      top: '45%', left: '15%', width: 400, height: 120,
      borderRadius: '70% 50% 80% 60% / 50% 70% 40% 60%',
      opacity: 0.3, blur: 30,
    },
    {
      top: '55%', left: '70%', width: 250, height: 80,
      borderRadius: '60% 70% 50% 80% / 60% 50% 70% 40%',
      opacity: 0.35, blur: 22,
    },
    {
      top: '75%', left: '30%', width: 350, height: 110,
      borderRadius: '80% 60% 70% 50% / 40% 60% 50% 70%',
      opacity: 0.25, blur: 28,
    },
  ];

  return (
    <>
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="cloud-drift absolute pointer-events-none"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.width,
            height: cloud.height,
            borderRadius: cloud.borderRadius,
            opacity: cloud.opacity,
            filter: `blur(${cloud.blur}px)`,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(241,245,249,0.6) 100%)',
            boxShadow: '0 8px 32px rgba(148, 163, 184, 0.1)',
          }}
        />
      ))}
    </>
  );
}
