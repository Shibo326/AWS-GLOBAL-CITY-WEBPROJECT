import type { FormValidationError } from '@/types';

// =============================================================================
// AWS Cloud Club — Form Validation Logic
// Extracted from EnlistForm for testability.
// =============================================================================

export interface FormValues {
  fullName: string;
  email: string;
  yearLevel: string;
  program: string;
}

/**
 * Validates the enlist form fields and returns an array of validation errors.
 * Returns an empty array if all fields are valid.
 */
export function validateForm(values: FormValues): FormValidationError[] {
  const errors: FormValidationError[] = [];

  // Full Name: 1-100 characters
  if (!values.fullName.trim()) {
    errors.push({ field: 'fullName', message: 'Full name is required.' });
  } else if (values.fullName.trim().length > 100) {
    errors.push({ field: 'fullName', message: 'Full name must be 100 characters or fewer.' });
  }

  // Email: must contain "@" and domain must include "sti"
  if (!values.email.trim()) {
    errors.push({ field: 'email', message: 'Email address is required.' });
  } else {
    const atIndex = values.email.indexOf('@');
    if (atIndex === -1) {
      errors.push({ field: 'email', message: 'Enter a valid email address.' });
    } else {
      const domain = values.email.slice(atIndex + 1).toLowerCase();
      if (!domain.includes('sti')) {
        errors.push({ field: 'email', message: 'Must be an STI student email (domain must contain "sti").' });
      }
    }
  }

  // Year Level: must be selected
  if (!values.yearLevel) {
    errors.push({ field: 'yearLevel', message: 'Please select your year level.' });
  }

  // Program: must be selected
  if (!values.program) {
    errors.push({ field: 'program', message: 'Please select your program/course.' });
  }

  return errors;
}
