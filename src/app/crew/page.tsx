import type { Metadata } from 'next';
import { CrewRoster } from './CrewRoster';

export const metadata: Metadata = {
  title: 'Crew Roster — AWS Cloud Club Global City',
  description:
    'Meet the officers and leaders of AWS Cloud Club -- Global City. The crew behind cloud innovation at STI.',
};

/**
 * /crew route — Full officer roster with 3D flip cards.
 */
export default function CrewPage() {
  return (
    <main id="main-content">
      <CrewRoster />
    </main>
  );
}
