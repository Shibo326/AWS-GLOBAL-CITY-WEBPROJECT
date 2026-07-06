import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import ZoneSection from '@/components/zones/ZoneSection';
import WaveDivider from '@/components/zones/WaveDivider';
import { ZONE_COLORS } from '@/lib/zones';
import WingmanPage from './WingmanPage';

export const metadata: Metadata = {
  title: 'Wingman — AWS Cloud Club Global City',
  description:
    'Chat with Rory, the AI Wingman for AWS Cloud Club — STI Global City. Ask about officers, events, departments, membership, and more.',
};

/**
 * /wingman route — AI Wingman chat interface.
 * Zone flow: sky → hangar → night (footer handles night via layout.tsx)
 */
export default function Page() {
  return (
    <main>
      {/* Sky zone — Page hero with wave transition to hangar */}
      <PageHero
        title="AI WINGMAN"
        subtitle="Your cloud-smart copilot — ask Rory anything"
        roryVariant="curious"
        nextZoneColor={ZONE_COLORS.hangar}
      />

      {/* Hangar zone — Main wingman chat interface */}
      <ZoneSection zone="hangar" id="main-content">
        <WingmanPage />
      </ZoneSection>

      {/* Wave transition to night zone (footer) */}
      <ZoneSection zone="hangar" className="pb-0 pt-0">
        <WaveDivider type={3} fillColor={ZONE_COLORS.night} />
      </ZoneSection>
    </main>
  );
}
