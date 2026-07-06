import PageHero from '@/components/hero/PageHero';
import ZoneSection from '@/components/zones/ZoneSection';
import WaveDivider from '@/components/zones/WaveDivider';
import { ZONE_COLORS } from '@/lib/zones';
import { EnlistFormWrapper } from '@/components/forms/EnlistFormWrapper';

export const metadata = {
  title: 'Enlist — AWS Cloud Club Global City',
  description: 'Apply for membership in AWS Cloud Club — STI Global City. Open to all STI students.',
};

/**
 * /enlist route — Membership application form page.
 * Zone flow: sky → ground → night
 */
export default function EnlistPage() {
  return (
    <main>
      {/* Sky zone — PageHero */}
      <PageHero
        title="ENLIST"
        subtitle="Ready to join the Cloud Pilots? Start your application here."
        nextZoneColor={ZONE_COLORS.ground}
      />

      {/* Ground zone — Enrollment form */}
      <ZoneSection zone="ground" id="main-content" className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <div className="card-cartoon p-6 md:p-8 focus-within:border-[var(--accent-orange)]">
            <EnlistFormWrapper />
          </div>
        </div>

        {/* WaveDivider: ground → night */}
        <WaveDivider type={3} fillColor={ZONE_COLORS.night} />
      </ZoneSection>
    </main>
  );
}
