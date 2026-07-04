import type { Metadata } from 'next';
import WingmanPage from './WingmanPage';

export const metadata: Metadata = {
  title: 'Wingman — AWS Cloud Club Global City',
  description:
    'Chat with Rory, the AI Wingman for AWS Cloud Club — STI Global City. Ask about officers, events, departments, membership, and more.',
};

export default function Page() {
  return <WingmanPage />;
}
