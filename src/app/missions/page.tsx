import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import ZoneSection from '@/components/zones/ZoneSection';
import WaveDivider from '@/components/zones/WaveDivider';
import { ZONE_COLORS } from '@/lib/zones';
import { MissionBoardContent } from '@/components/sections/MissionBoardContent';

export const metadata: Metadata = {
  title: 'Mission Board — AWS Cloud Club Global City',
  description:
    'View all missions, workshops, and events from AWS Cloud Club — STI Global City. Sorted by status: upcoming, active, and completed.',
};

/**
 * /missions route — Full events listing styled as flight missions.
 * Zone flow: sky → ground → night (footer handles night via layout.tsx)
 */
export default function MissionsPage() {
  return (
    <main>
      {/* Sky zone — Page hero with wave transition to ground */}
      <PageHero
        title="MISSION BOARD"
        subtitle="All club events, workshops, and activities"
        nextZoneColor={ZONE_COLORS.ground}
      />

      {/* Ground zone — Main missions content */}
      <ZoneSection zone="ground" id="main-content">
        <MissionBoardContent />
      </ZoneSection>

      {/* WaveDivider: ground → night (footer handles night zone) */}
      <ZoneSection zone="ground" className="pb-0 pt-0">
        <WaveDivider type={3} fillColor={ZONE_COLORS.night} />
      </ZoneSection>
    </main>
  );
}
