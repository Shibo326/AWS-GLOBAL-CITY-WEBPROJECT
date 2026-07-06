import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import ZoneSection from '@/components/zones/ZoneSection';
import { ZONE_COLORS } from '@/lib/zones';
import { CrewRoster } from './CrewRoster';

export const metadata: Metadata = {
  title: 'Crew Roster — AWS Cloud Club Global City',
  description:
    'Meet the officers and leaders of AWS Cloud Club — Global City. The crew behind cloud innovation at STI.',
};

/**
 * /crew route — Full officer roster grouped by office.
 * Zone flow: sky → hangar → night (footer handles night via layout.tsx)
 */
export default function CrewPage() {
  return (
    <main>
      {/* Sky zone — Page hero with wave transition to hangar */}
      <PageHero
        title="CREW ROSTER"
        subtitle="Meet the Cloud Pilots steering this mission"
        nextZoneColor={ZONE_COLORS.hangar}
      />

      {/* Hangar zone — Main crew content */}
      <ZoneSection zone="hangar" id="main-content">
        <CrewRoster />
      </ZoneSection>
    </main>
  );
}
