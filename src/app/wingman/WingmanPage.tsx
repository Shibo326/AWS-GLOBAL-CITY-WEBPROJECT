'use client';

import { motion } from 'framer-motion';
import WingmanPanel from '@/components/wingman/WingmanPanel';

/**
 * WingmanPage — Cockpit-style chat interface with Rory.
 * Features:
 * - Cockpit-styled header with Rory's avatar, status indicator, and personality
 * - Centered chat panel with frosted glass styling
 * - Responsive layout filling available viewport within the hangar zone
 */
export default function WingmanPage() {
  return (
    <div className="relative flex flex-col min-h-[70vh] py-8 md:py-12">
      {/* Header — cockpit command bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 flex items-center gap-4 px-6 py-4 mx-4 md:mx-auto md:max-w-3xl w-full rounded-xl border border-white/30"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Rory avatar with glow ring */}
        <div className="relative flex-shrink-0">
          <div
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent-orange/50 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #FF9900 0%, #F59E0B 50%, #FBBF24 100%)',
              boxShadow: '0 0 20px rgba(255,153,0,0.25)',
            }}
          >
            <img
              src="/images/rory-curious.png"
              alt=""
              className="w-full h-full object-contain scale-110"
              draggable={false}
            />
          </div>
          {/* Online indicator */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-accent-green border-2 border-white shadow-sm" />
        </div>

        {/* Title and status */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-xl tracking-wider text-primary-text uppercase">
              Rory
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-widest uppercase bg-accent-orange/10 text-accent-orange border border-accent-orange/20">
              AI Wingman
            </span>
          </div>
          <p className="text-xs text-secondary-text font-mono flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            Online — Ready to assist, pilot
          </p>
        </div>

        {/* Cockpit badge — right side */}
        <div className="ml-auto hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-white/50">
          <span className="text-[10px] font-mono text-secondary-text uppercase tracking-widest">
            Flight Deck
          </span>
          <span className="text-[10px] font-mono text-accent-orange font-medium">
            v2.0
          </span>
        </div>
      </motion.header>

      {/* Chat area — frosted glass container */}
      <div className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-4 py-4 min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="h-full rounded-2xl overflow-hidden shadow-xl border border-white/40"
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            minHeight: '500px',
          }}
        >
          <WingmanPanel />
        </motion.div>
      </div>
    </div>
  );
}
