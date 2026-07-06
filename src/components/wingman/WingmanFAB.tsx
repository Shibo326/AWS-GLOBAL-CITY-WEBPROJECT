'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import WingmanPanel from './WingmanPanel';

/**
 * WingmanFAB — Floating Action Button for Rory AI Wingman.
 * Visible on all pages except /wingman.
 * Uses CSS fab-pulse class for idle animation (gentle scale oscillation).
 * Expands into a chat panel with clip-path animation on click.
 */
export default function WingmanFAB() {
  const pathname = usePathname();
  const [panelOpen, setPanelOpen] = useState(false);
  const fabRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = useCallback(() => {
    setPanelOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setPanelOpen(false);
    // Return focus to FAB button on close
    setTimeout(() => {
      fabRef.current?.focus();
    }, 350);
  }, []);

  // Focus management: focus close button when panel opens
  useEffect(() => {
    if (panelOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [panelOpen]);

  // Escape key closes the panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && panelOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [panelOpen, handleClose]);

  // Don't render on /wingman page (Requirement 15.3)
  if (pathname === '/wingman') {
    return null;
  }

  return (
    <>
      {/* FAB Button — idle pulse via CSS fab-pulse class (Requirement 15.1)
          Reduced motion handled by the .fab-pulse class in cartoon-keyframes.css (Requirement 15.4) */}
      {!panelOpen && (
        <button
          ref={fabRef}
          onClick={handleOpen}
          className="fab-pulse fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_4px_20px_rgba(139,94,60,0.4)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--accent-orange)] focus-visible:outline-offset-[3px] overflow-hidden border-2 border-[rgba(196,149,106,0.4)]"
          style={{
            background: 'linear-gradient(135deg, #8B5E3C 0%, #C4956A 50%, #FF9900 100%)',
          }}
          aria-label="Open Rory AI Wingman chat"
          data-cursor="cta"
        >
          <img
            src="/images/rory-curious.png"
            alt=""
            aria-hidden="true"
            className="w-10 h-10 object-contain"
            draggable={false}
          />
        </button>
      )}

      {/* Expandable Chat Panel — clip-path circle expand animation (Requirement 15.2) */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            role="dialog"
            aria-label="Rory AI Wingman chat panel"
            aria-modal="true"
            initial={{ clipPath: 'circle(28px at calc(100% - 34px) calc(100% - 34px))' }}
            animate={{
              clipPath: 'circle(100% at center)',
              transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            exit={{
              clipPath: 'circle(28px at calc(100% - 34px) calc(100% - 34px))',
              transition: { duration: 0.3, ease: 'easeIn' },
            }}
            className="fixed bottom-24 right-6 z-40 flex w-[360px] max-h-[500px] flex-col overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--border-color)] bg-white shadow-xl"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-[var(--border-color)] px-4 py-3 bg-[var(--zone-cloud)]">
              <h2 className="text-sm font-semibold text-[var(--primary-text)]" style={{ fontFamily: 'var(--font-heading)' }}>
                Rory &mdash; AI Wingman
              </h2>
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--secondary-text)] transition-colors hover:bg-[var(--zone-cloud)] hover:text-[var(--primary-text)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--accent-orange)] focus-visible:outline-offset-[3px]"
                aria-label="Close chat panel"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-hidden">
              <WingmanPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
