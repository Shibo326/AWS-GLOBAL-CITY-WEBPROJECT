'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  /** The full text to reveal character by character */
  text: string;
  /** Delay between each character reveal in milliseconds */
  charDelay?: number;
  /** CSS class name applied to the wrapper span */
  className?: string;
  /** Whether the typewriter animation should start */
  start?: boolean;
  /** Callback fired when the full text has been revealed */
  onComplete?: () => void;
}

/**
 * Renders text character by character with a configurable delay,
 * simulating a typewriter effect. Shows a blinking cursor at the end.
 */
export default function TypewriterText({
  text,
  charDelay = 50,
  className,
  start = true,
  onComplete,
}: TypewriterTextProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!start) {
      setDisplayedCount(0);
      setIsComplete(false);
      return;
    }

    if (displayedCount >= text.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedCount((prev) => prev + 1);
    }, charDelay);

    return () => clearTimeout(timeout);
  }, [start, displayedCount, text.length, charDelay, onComplete]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, displayedCount)}
      </span>
      <span
        aria-hidden="true"
        className={`inline-block w-[2px] h-[1em] bg-current align-middle ml-[1px] ${
          isComplete ? 'animate-blink' : ''
        }`}
        style={{
          animation: isComplete ? 'blink 1s step-end infinite' : 'none',
        }}
      />
    </span>
  );
}
