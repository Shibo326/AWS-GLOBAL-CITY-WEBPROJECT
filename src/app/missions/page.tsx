import { MissionBoardContent } from '@/components/sections/MissionBoardContent';

export const metadata = {
  title: 'Mission Board — AWS Cloud Club Global City',
  description:
    'View all missions, workshops, and events from AWS Cloud Club — STI Global City. Sorted by status: upcoming, active, and completed.',
};

/**
 * /missions route — Full events listing styled as flight missions.
 */
export default function MissionsPage() {
  return (
    <main id="main-content">
      <MissionBoardContent />
    </main>
  );
}
