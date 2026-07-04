'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { navLinks } from '@/lib/constants';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-[20px] bg-[#0D0E12]/85 border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative group"
          >
            <Image
              src="/logo.jpg"
              alt="AWS Cloud Club Global City Logo"
              width={48}
              height={48}
              className="rounded-full transition-all duration-600 ease-in-out group-hover:rotate-[360deg] group-hover:shadow-[0_0_16px_rgba(196,149,106,0.4)]"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isEnlist = link.label === 'Enlist';

              if (isEnlist) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-cursor="cta"
                    className="btn-primary text-sm"
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group/link relative font-display font-medium text-sm transition-colors duration-250 ${
                    isActive
                      ? 'text-accent-blue'
                      : 'text-secondary-text hover:text-accent-blue'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {/* Active indicator with shared layout animation */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-blue"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover underline animation (0% → 100% width from left, 250ms) */}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent-blue transition-[width] duration-250 ease-out group-hover/link:w-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden flex flex-col items-center justify-center w-11 h-11 gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span
              className={`block w-6 h-0.5 bg-primary-text transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary-text transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary-text transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}

// ─── Mobile Menu Component ──────────────────────────────────────────────────────

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden" id="mobile-menu">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute top-0 right-0 h-full w-[280px] bg-surface border-l border-border p-8 pt-24 flex flex-col gap-6"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {navLinks.map((link, i) => {
          const isActive = pathname === link.href;
          const isEnlist = link.label === 'Enlist';

          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className={`block text-lg font-display font-medium ${
                  isEnlist
                    ? 'btn-primary text-center mt-4'
                    : isActive
                    ? 'text-accent-blue'
                    : 'text-primary-text hover:text-accent-blue'
                }`}
                aria-current={isActive ? 'page' : undefined}
                data-cursor={isEnlist ? 'cta' : undefined}
              >
                {link.label}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
