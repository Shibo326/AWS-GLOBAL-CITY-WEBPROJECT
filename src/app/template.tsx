import type { ReactNode } from 'react';

/**
 * Template — Thin wrapper around page content.
 * Kept minimal to avoid unnecessary Framer Motion overhead per route change.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
