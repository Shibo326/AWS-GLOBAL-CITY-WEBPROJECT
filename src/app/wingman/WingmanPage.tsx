'use client';

import WingmanPanel from '@/components/wingman/WingmanPanel';

/**
 * WingmanPage — Full-viewport dedicated chat interface with Rory.
 * Header bar with avatar and title, chat area fills remaining height.
 * WingmanPanel handles all chat logic, messages, input, and accessibility.
 */
export default function WingmanPage() {
  return (
    <main id="main-content" className="flex flex-col h-screen bg-background">
      {/* Header bar */}
      <header className="flex items-center gap-3 bg-surface border-b border-border px-6 py-4">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-orange text-background flex items-center justify-center font-heading text-lg font-bold"
          aria-hidden="true"
        >
          R
        </div>
        <div className="flex items-baseline gap-2">
          <h1 className="font-display font-semibold text-primary-text text-lg">
            Rory
          </h1>
          <span className="text-secondary-text text-sm">AI Wingman</span>
        </div>
      </header>

      {/* Chat area — centered and constrained on desktop */}
      <div className="flex-1 overflow-hidden w-full max-w-3xl mx-auto">
        <WingmanPanel />
      </div>
    </main>
  );
}
