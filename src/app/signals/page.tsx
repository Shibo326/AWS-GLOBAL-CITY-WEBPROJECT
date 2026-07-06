import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import ZoneSection from '@/components/zones/ZoneSection';
import WaveDivider from '@/components/zones/WaveDivider';
import { ZONE_COLORS } from '@/lib/zones';
import { SignalBoardContent } from '@/components/sections/SignalBoardContent';

export const metadata: Metadata = {
  title: 'Announcements — AWS Cloud Club Global City',
  description:
    'All club announcements and communications from AWS Cloud Club — STI Global City.',
};

/**
 * /signals route — Full announcement feed with zone flow: sky → cloud → night
 */
export default function SignalsPage() {
  return (
    <main>
      {/* Sky zone — PageHero with WaveDivider to cloud */}
      <PageHero
        title="SIGNAL BOARD"
        subtitle="Announcements, updates, and intel from mission control"
        nextZoneColor={ZONE_COLORS.cloud}
      />

      {/* Cloud zone — Signal board content */}
      <ZoneSection zone="cloud" id="main-content">
        <SignalBoardContent />
        <WaveDivider type={3} fillColor={ZONE_COLORS.night} />
      </ZoneSection>

      {/* Night zone — end of page (Footer handled by layout.tsx) */}
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
