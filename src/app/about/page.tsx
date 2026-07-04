import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About — AWS Cloud Club Global City',
  description:
    'Learn about AWS Cloud Club at STI Global City — our founding story, milestones, seven Skill Builder departments, and six operational offices.',
};

export default function AboutPage() {
  return <AboutContent />;
}
