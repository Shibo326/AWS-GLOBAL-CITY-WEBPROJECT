'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <ScrollReveal>
        <h1 className="font-heading tracking-hero text-6xl sm:text-7xl md:text-8xl text-primary-text mb-6 uppercase">
          SIGNAL LOST
        </h1>

        <p className="text-secondary-text text-lg max-w-md mx-auto mb-10">
          The coordinates you entered do not match any known route in our system.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-full border-2 border-accent-orange text-accent-orange font-display font-semibold tracking-wide hover:bg-accent-orange hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 focus:ring-offset-background"
        >
          Return to Base
        </Link>
      </ScrollReveal>
    </main>
  );
}
