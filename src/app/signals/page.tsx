import { SignalBoardContent } from '@/components/sections/SignalBoardContent';

export const metadata = {
  title: 'Announcements — AWS Cloud Club Global City',
  description:
    'All club announcements and communications from AWS Cloud Club — STI Global City.',
};

/**
 * /signals route — Full terminal-styled announcement feed.
 */
export default function SignalsPage() {
  return (
    <main id="main-content">
      <SignalBoardContent />
    </main>
  );
}
