'use client';

import { useState, useRef, type FormEvent, type KeyboardEvent } from 'react';
import { IconSend2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

/**
 * ChatInput — Premium input field with animated send button.
 * Features:
 * - Frosted glass container with orange focus ring
 * - Animated send button with scale effect
 * - Character limit indicator (500 max)
 * - Disabled state while Rory is processing
 */
export default function ChatInput({ onSubmit, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const canSubmit = value.trim().length > 0 && !disabled;

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue('');
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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 border ${
          isFocused
            ? 'border-accent-orange/50 shadow-lg shadow-accent-orange/10 bg-white'
            : 'border-border/60 bg-white/90 shadow-sm'
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={
            disabled ? 'Rory is thinking...' : 'Ask Rory anything...'
          }
          className="flex-1 bg-transparent text-primary-text text-sm placeholder:text-secondary-text/70 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Message input"
          maxLength={500}
        />

        {/* Character count — shown near limit */}
        {value.length > 400 && (
          <span className="text-[10px] font-mono text-secondary-text/60 tabular-nums">
            {value.length}/500
          </span>
        )}

        {/* Send button */}
        <motion.button
          type="submit"
          disabled={!canSubmit}
          whileHover={canSubmit ? { scale: 1.1 } : {}}
          whileTap={canSubmit ? { scale: 0.9 } : {}}
          className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
            canSubmit
              ? 'bg-gradient-to-br from-accent-orange to-accent-warm text-white shadow-md shadow-accent-orange/25 cursor-pointer'
              : 'bg-border/30 text-secondary-text/40 cursor-not-allowed'
          }`}
          aria-label="Send message"
        >
          <IconSend2 size={18} stroke={2} />
        </motion.button>
      </div>

      {/* Helper text */}
      <p className="text-[10px] text-secondary-text/50 font-mono text-center mt-2 tracking-wide">
        Rory answers questions about AWS Cloud Club — STI Global City
      </p>
    </form>
  );
}
