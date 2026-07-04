'use client';

/**
 * SkipNav — skip-navigation link for keyboard accessibility.
 * Visually hidden by default, becomes visible on focus at top-left
 * with a 2px #4DA3FF outline. Links to #main-content.
 */
export function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:text-primary-text focus:px-4 focus:py-2 focus:outline-2 focus:outline-accent-blue focus:rounded"
    >
      Skip to main content
    </a>
  );
}
