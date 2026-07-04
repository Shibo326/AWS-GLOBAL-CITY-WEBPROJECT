'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'select';
  options?: readonly string[] | string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

const inputStyles =
  'w-full bg-surface border border-border rounded-lg px-4 py-3 text-primary-text font-body placeholder:text-secondary-text/50 focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors';

const errorInputStyles = 'border-red-400 focus:border-red-400 focus:ring-red-400';

/**
 * FormField — Reusable form input/select field with inline error display.
 * Supports text, email, and select types with consistent styling.
 */
export function FormField({
  label,
  name,
  type,
  options,
  value,
  onChange,
  error,
  placeholder,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-mono text-xs tracking-label text-secondary-text uppercase"
      >
        {label}
      </label>

      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputStyles, 'appearance-none', error && errorInputStyles)}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238A9BB5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            backgroundSize: '16px',
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <option value="" disabled>
            {placeholder || 'Select an option'}
          </option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(inputStyles, error && errorInputStyles)}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${name}-error`}
            role="alert"
            className="text-xs text-red-400"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
