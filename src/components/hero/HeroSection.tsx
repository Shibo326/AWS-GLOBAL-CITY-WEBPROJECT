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
        background: 'linear-gradient(180deg, #1565C0 0%, #29B6F6 25%, #4FC3F7 50%, #81D4FA 75%, #B3E5FC 100%)',
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
 * CloudShapes — Cartoon fluffy clouds with defined shapes.
 * Solid white fill with visible soft outline — like illustrated storybook clouds.
 * No blur — crisp cartoon shapes.
 */
function CloudShapes() {
  const clouds = [
    {
      top: '8%', left: '-3%', width: 280, height: 110,
      borderRadius: '60% 80% 50% 70% / 60% 40% 70% 50%',
      opacity: 0.9,
    },
    {
      top: '18%', left: '62%', width: 240, height: 95,
      borderRadius: '50% 70% 60% 80% / 70% 50% 60% 40%',
      opacity: 0.85,
    },
    {
      top: '42%', left: '10%', width: 320, height: 120,
      borderRadius: '70% 50% 80% 60% / 50% 70% 40% 60%',
      opacity: 0.7,
    },
    {
      top: '52%', left: '68%', width: 200, height: 85,
      borderRadius: '60% 70% 50% 80% / 60% 50% 70% 40%',
      opacity: 0.75,
    },
    {
      top: '72%', left: '25%', width: 300, height: 105,
      borderRadius: '80% 60% 70% 50% / 40% 60% 50% 70%',
      opacity: 0.6,
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
            background: '#FFFFFF',
            border: '2.5px solid rgba(100, 150, 200, 0.25)',
            boxShadow: '3px 4px 0px rgba(100, 150, 200, 0.15), inset 0 -20px 40px rgba(200, 230, 255, 0.3)',
          }}
        />
      ))}
    </>
  );
}
