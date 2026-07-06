'use client';

import { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Above fold — imported normally (critical path)
import HeroSection from '@/components/hero/HeroSection';
import LoadSequence from '@/components/hero/LoadSequence';
import StatsStrip from '@/components/sections/StatsStrip';

// Zone infrastructure
import ZoneSection from '@/components/zones/ZoneSection';
import WaveDivider from '@/components/zones/WaveDivider';
import { ZONE_COLORS } from '@/lib/zones';

// Cartoon world decorations
import { CartoonClouds, GrassOverlay } from '@/components/decorations';

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
    <main className="relative">
      <LoadSequence onComplete={handleLoadComplete} />

      {/* ═══ SKY ZONE — Rory is flying high ═══ */}
      <ZoneSection zone="sky" id="main-content">
        <HeroSection />
        <WaveDivider type={1} fillColor={ZONE_COLORS.cloud} />
      </ZoneSection>

      {/* ═══ CLOUD ZONE — floating through warm cream sections ═══ */}
      <ZoneSection zone="cloud">
        <CartoonClouds count={4} className="opacity-40" />
        <StatsStrip />
        <AboutSnippet />
        <WaveDivider type={2} fillColor={ZONE_COLORS.ground} />
      </ZoneSection>

      {/* ═══ GROUND ZONE — missions on solid earth ═══ */}
      <ZoneSection zone="ground">
        <GrassOverlay bladeCount={35} variant="ground" />
        <MissionBoardPreview />
        <WaveDivider type={3} fillColor={ZONE_COLORS.airfield} />
      </ZoneSection>

      {/* ═══ AIRFIELD ZONE — signals from the tarmac ═══ */}
      <ZoneSection zone="airfield">
        <GrassOverlay bladeCount={25} variant="airfield" />
        <SignalBoardPreview />
        <WaveDivider type={1} fillColor={ZONE_COLORS.hangar} />
      </ZoneSection>

      {/* ═══ HANGAR ZONE — crew quarters ═══ */}
      <ZoneSection zone="hangar">
        <GrassOverlay bladeCount={20} variant="airfield" />
        <CrewPreview />
        <WaveDivider type={4} fillColor={ZONE_COLORS.hangar} />
      </ZoneSection>

      {/* ═══ WINGMAN ZONE — preparing for takeoff (warm green) ═══ */}
      <ZoneSection zone="hangar">
        <WingmanCTA />
        <WaveDivider type={2} fillColor={ZONE_COLORS.ground} />
      </ZoneSection>

      {/* ═══ GROUND ZONE — warm cream enlistment & partners ═══ */}
      <ZoneSection zone="ground">
        <EnlistSection />
        <PartnersMarquee />
        <WaveDivider type={3} fillColor={ZONE_COLORS.night} />
      </ZoneSection>
    </main>
  );
}
