import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import ZoneSection from '@/components/zones/ZoneSection';
import WaveDivider from '@/components/zones/WaveDivider';
import { ZONE_COLORS } from '@/lib/zones';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About — AWS Cloud Club Global City',
  description:
    'Learn about AWS Cloud Club at STI Global City — our founding story, milestones, seven Skill Builder departments, and six operational offices.',
};

export default function AboutPage() {
  return (
    <main>
      {/* Sky zone — PageHero with WaveDivider to cloud */}
      <PageHero
        title="ABOUT US"
        subtitle="The origin story of AWS Cloud Club — Global City"
        nextZoneColor={ZONE_COLORS.cloud}
      />

      {/* Cloud zone — Origin story content with WaveDivider to ground */}
      <ZoneSection zone="cloud" id="main-content">
        <AboutContent section="origin" />
        <WaveDivider type={3} fillColor={ZONE_COLORS.ground} />
      </ZoneSection>

      {/* Ground zone — Timeline and departments with WaveDivider to night */}
      <ZoneSection zone="ground">
        <AboutContent section="timeline-departments" />
        <WaveDivider type={4} fillColor={ZONE_COLORS.night} />
      </ZoneSection>

      {/* Night zone — end of page content (Footer handled by layout.tsx) */}
      <ZoneSection zone="night" className="py-12">
        <div className="container-site text-center">
          <p className="text-sm opacity-60 font-mono uppercase tracking-wider">
            ▸ End of transmission
          </p>
        </div>
      </ZoneSection>
    </main>
  );
}
