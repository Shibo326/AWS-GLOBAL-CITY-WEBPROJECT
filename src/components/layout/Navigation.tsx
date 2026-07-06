'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { navLinks } from '@/lib/constants';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 100);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // On home page before scroll: white text on sky zone
  // After scroll or on subpages: dark text on frosted white glass
  const useWhiteText = isHome && !scrolled;

  return (
    <>
      {/* Skip Navigation Link — first focusable element */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-white focus:text-[var(--primary-text)] focus:rounded-lg focus:outline-3 focus:outline-[var(--accent-orange)]"
      >
        Skip to main content
      </a>

      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'nav-scrolled bg-white/95 backdrop-blur-md border-b border-[var(--border-color)]/10'
            : 'nav-transparent bg-[rgba(135,206,235,0.2)] backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative group min-h-12 min-w-12 flex items-center justify-center"
          >
            <Image
              src="/logo.jpg"
              alt="AWS Cloud Club Global City Logo"
              width={48}
              height={48}
              className="rounded-full border-[3px] border-[#2D2D44] shadow-[2px_2px_0px_#2D2D44] transition-all duration-600 ease-in-out group-hover:rotate-[360deg] group-hover:shadow-[3px_3px_0px_#C56200]"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isEnlist = link.label === 'Join Now';

              if (isEnlist) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-cursor="cta"
                    className="btn-primary text-sm min-h-12 flex items-center"
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group/link relative font-display font-medium text-sm transition-colors duration-250 min-h-12 flex items-center ${
                    isActive
                      ? 'text-accent-orange'
                      : useWhiteText
                      ? 'text-white/90 hover:text-white'
                      : 'text-secondary-text hover:text-accent-orange'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {/* Active indicator with shared layout animation */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-orange"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover underline animation (0% → 100% width from left, 250ms) */}
                  {!isActive && (
                    <span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-[width] duration-250 ease-out group-hover/link:w-full ${
                      useWhiteText ? 'bg-white' : 'bg-accent-orange'
                    }`} />
                  )}
                </Link>
              );
            })}

            {/* Theme Toggle — between nav links and Join Now */}
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden flex flex-col items-center justify-center min-h-12 min-w-12 gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span
              aria-hidden="true"
              className={`block w-6 h-0.5 transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              } ${useWhiteText ? 'bg-white' : 'bg-primary-text'}`}
            />
            <span
              aria-hidden="true"
              className={`block w-6 h-0.5 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              } ${useWhiteText ? 'bg-white' : 'bg-primary-text'}`}
            />
            <span
              aria-hidden="true"
              className={`block w-6 h-0.5 transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              } ${useWhiteText ? 'bg-white' : 'bg-primary-text'}`}
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
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  // Focus trap: cycle Tab through focusable elements in the menu
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabTrap);
    // Focus the close button when menu opens
    closeButtonRef.current?.focus();

    return () => document.removeEventListener('keydown', handleTabTrap);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 md:hidden"
      id="mobile-menu"
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Full-screen overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-white/95 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Menu content — full screen centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="absolute top-6 right-6 min-h-12 min-w-12 flex items-center justify-center rounded-lg text-[var(--primary-text)] hover:text-[var(--accent-orange)] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
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

        {/* Navigation Links */}
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            const isEnlist = link.label === 'Join Now';

            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`block text-lg font-display font-medium min-h-12 flex items-center justify-center px-4 ${
                    isEnlist
                      ? 'btn-primary text-center mt-4'
                      : isActive
                      ? 'text-accent-orange'
                      : 'text-primary-text hover:text-accent-orange'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  data-cursor={isEnlist ? 'cta' : undefined}
                >
                  {link.label}
                </Link>
              </motion.div>
            );
          })}

          {/* Theme Toggle in mobile menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navLinks.length * 0.05, type: 'spring', stiffness: 300 }}
            className="mt-4"
          >
            <ThemeToggle />
          </motion.div>
        </nav>
      </div>
    </div>
  );
}
