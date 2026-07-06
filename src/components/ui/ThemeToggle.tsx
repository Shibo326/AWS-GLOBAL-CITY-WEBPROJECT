'use client';

import { useTheme } from '@/contexts/ThemeContext';

/**
 * ThemeToggle — Cartoon-styled button that switches between day and night mode.
 * Shows sun icon in dark mode (click to go light), moon icon in light mode (click to go dark).
 * Meets 48px minimum touch target. Uses cartoon button styling.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        relative flex items-center justify-center
        min-h-[48px] min-w-[48px] w-12 h-12
        rounded-full border-2 border-[var(--border-color)]
        shadow-[2px_2px_0px_var(--border-color)]
        transition-all duration-200
        hover:translate-x-[-2px] hover:translate-y-[-2px]
        hover:shadow-[4px_4px_0px_var(--border-color)]
        active:translate-x-[1px] active:translate-y-[1px]
        active:shadow-[1px_1px_0px_var(--border-color)]
        ${isDark
          ? 'bg-[#242438] text-yellow-300'
          : 'bg-white text-[var(--primary-text)]'
        }
      `}
    >
      {isDark ? (
        /* Sun icon — shown in dark mode, click to go light */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon icon — shown in light mode, click to go dark */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
