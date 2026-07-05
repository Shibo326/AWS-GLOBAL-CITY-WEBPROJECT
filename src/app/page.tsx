'use client';

import { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Above fold — imported normally (critical path)
import HeroSection from '@/components/hero/HeroSection';
import LoadSequence from '@/components/hero/LoadSequence';
import StatsStrip from '@/components/sections/StatsStrip';
import { CloudDivider } from '@/components/effects/CloudDivider';
import { GrassDivider } from '@/components/effects/GrassDivider';
import { RunwayDivider } from '@/components/effects/RunwayDivider';

// Below fold — lazy loaded for performance
const AboutSnippet = dynamic(() => import('@/components/sections/AboutSnippet'));
const MissionBoardPreview = dynamic(() => import('@/components/sections/MissionBoardPreview'));
const SignalBoardPreview = dynamic(() => import('@/components/sections/SignalBoardPreview'));
const CrewPreview = dynamic(() => import('@/components/sections/CrewPreview'));
const WingmanCTA = dynamic(() => import('@/components/sections/WingmanCTA'));
const EnlistSection = dynamic(() => import('@/components/sections/EnlistSection'));
const PartnersMarquee = dynamic(() => import('@/components/sections/PartnersMarquee'));

export default function Home() {
  const handleLoadComplete = useCallback(() => {}, []);

  return (
    <main id="main-content" className="relative">
      <LoadSequence onComplete={handleLoadComplete} />

      {/* ═══ SKY ZONE — Rory is flying high ═══ */}
      <HeroSection />

      {/* Sky → Cloud transition (only zone-boundary divider) */}
      <CloudDivider />

      {/* ═══ CLOUD ZONE — floating through warm cream sections ═══ */}
      <StatsStrip />
      <AboutSnippet />
      <MissionBoardPreview />
      <SignalBoardPreview />
      <CrewPreview />

      {/* Cloud → Land transition (only zone-boundary divider) */}
      <GrassDivider />

      {/* ═══ LAND ZONE — descending over green countryside ═══ */}
      <WingmanCTA />
      <EnlistSection />
      <PartnersMarquee />

      {/* Land → Runway transition (only zone-boundary divider) */}
      <RunwayDivider />
    </main>
  );
}
