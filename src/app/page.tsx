'use client';

import { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Above fold — imported normally (critical path)
import HeroSection from '@/components/hero/HeroSection';
import LoadSequence from '@/components/hero/LoadSequence';
import StatsStrip from '@/components/sections/StatsStrip';

// Below fold — lazy loaded for performance
const AboutSnippet = dynamic(() => import('@/components/sections/AboutSnippet'));
const MissionBoardPreview = dynamic(() => import('@/components/sections/MissionBoardPreview'));
const SignalBoardPreview = dynamic(() => import('@/components/sections/SignalBoardPreview'));
const CrewPreview = dynamic(() => import('@/components/sections/CrewPreview'));
const WingmanCTA = dynamic(() => import('@/components/sections/WingmanCTA'));
const EnlistSection = dynamic(() => import('@/components/sections/EnlistSection'));
const PartnersMarquee = dynamic(() => import('@/components/sections/PartnersMarquee'));

export default function Home() {
  // LoadSequence calls setLoadComplete via LoadContext internally.
  // This callback is for any additional page-level logic on load complete.
  const handleLoadComplete = useCallback(() => {
    // Load sequence finished — sections are now interactive
  }, []);

  return (
    <main id="main-content" className="relative">
      {/* Load Sequence overlay — plays once per session */}
      <LoadSequence onComplete={handleLoadComplete} />

      {/* Hero Section — visible after load sequence */}
      <HeroSection />

      {/* Stats Strip — above fold on long screens */}
      <StatsStrip />

      {/* Below-fold sections — lazy loaded */}
      <AboutSnippet />
      <MissionBoardPreview />
      <SignalBoardPreview />
      <CrewPreview />
      <WingmanCTA />
      <EnlistSection />
      <PartnersMarquee />
    </main>
  );
}
