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
      <CloudDivider variant="white" />

      {/* ═══ CLOUD ZONE — floating through clouds ═══ */}
      <StatsStrip />
      <AboutSnippet />
      <CloudDivider variant="soft" />
      <MissionBoardPreview />
      <SignalBoardPreview />
      <CloudDivider variant="soft" />
      <CrewPreview />

      {/* ═══ LAND ZONE — descending over green countryside ═══ */}
      <GrassDivider />
      <WingmanCTA />
      <EnlistSection />
      <PartnersMarquee />

      {/* ═══ RUNWAY — Rory touches down ═══ */}
      <RunwayDivider />
    </main>
  );
}
