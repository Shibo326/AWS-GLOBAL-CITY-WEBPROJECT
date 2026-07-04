'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { panelVariants } from '@/components/animations/variants';
import WingmanPanel from './WingmanPanel';

/**
 * WingmanFAB — Floating Action Button for Rory AI Wingman.
 * Visible on all pages except /wingman.
 * Expands into a chat panel with clip-path animation on click.
 */
export default function WingmanFAB() {
  const pathname = usePathname();
  const [panelOpen, setPanelOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  // Don't render on /wingman page
  if (pathname === '/wingman') {
    return null;
  }

  return (
    <>
      {/* FAB Button */}
      {!panelOpen && (
        <motion.button
          ref={fabRef}
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent-orange shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-2"
          aria-label="Open Rory AI Wingman chat"
          data-cursor="cta"
          animate={
            !isHovered
              ? {
                  scale: [1, 1.05, 1],
                  transition: {
                    repeat: Infinity,
                    repeatDelay: 3.4,
                    duration: 0.6,
                  },
                }
              : { scale: 1 }
          }
        >
          <img
            src="/images/rory-waving.png"
            alt=""
            className="w-9 h-9 object-contain"
            draggable={false}
          />
        </motion.button>
      )}

      {/* Expandable Chat Panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            role="dialog"
            aria-label="Rory AI Wingman chat panel"
            aria-modal="true"
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed bottom-24 right-6 z-40 flex w-[360px] max-h-[500px] flex-col overflow-hidden rounded-card border border-border bg-card shadow-xl"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="font-display text-sm font-semibold text-primary-text">
                Rory &mdash; AI Wingman
              </h2>
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-secondary-text transition-colors hover:bg-surface hover:text-primary-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue"
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
