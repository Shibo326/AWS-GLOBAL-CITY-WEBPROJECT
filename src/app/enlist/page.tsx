import { EnlistFormWrapper } from '@/components/forms/EnlistFormWrapper';

export const metadata = {
  title: 'Enlist — AWS Cloud Club Global City',
  description: 'Apply for membership in AWS Cloud Club — STI Global City. Open to all STI students.',
};

/**
 * /enlist route — Membership application form page.
 */
export default function EnlistPage() {
  return (
    <main id="main-content">
      <EnlistFormWrapper />
    </main>
  );
}
