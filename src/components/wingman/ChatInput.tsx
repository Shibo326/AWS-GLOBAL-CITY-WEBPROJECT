'use client';

import { useState, useRef, type FormEvent, type KeyboardEvent } from 'react';
import { IconArrowUp } from '@tabler/icons-react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

/**
 * ChatInput — Text input with submit button for the Wingman chat.
 * Validates: empty messages are not submitted, max 500 characters with inline indicator.
 * Disabled while Rory is processing a response.
 */
export default function ChatInput({ onSubmit, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue('');
    setShowLimitWarning(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (newValue: string) => {
    if (newValue.length <= 500) {
      setValue(newValue);
      setShowLimitWarning(newValue.length > 450);
    } else {
      setShowLimitWarning(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-1">
      {showLimitWarning && (
        <span className="text-[10px] text-secondary-text font-mono px-4">
          Max 500 characters
        </span>
      )}
      <div className="flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-accent-blue focus-within:border-accent-blue transition-all">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            disabled ? 'Rory is thinking...' : 'Ask Rory anything...'
          }
          className="flex-1 bg-transparent text-primary-text text-sm placeholder:text-secondary-text outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Message input"
          maxLength={500}
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-blue text-background flex items-center justify-center transition-opacity disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-blue/80"
          aria-label="Send message"
        >
          <IconArrowUp size={16} stroke={2.5} />
        </button>
      </div>
    </form>
  );
}
