import { describe, it, expect } from 'vitest';
import { validateForm, type FormValues } from '@/lib/form-validation';

// =============================================================================
// Helper: valid form data baseline
// =============================================================================

function validFormData(): FormValues {
  return {
    fullName: 'Juan Dela Cruz',
    email: 'juan@sti.edu',
    yearLevel: '2nd',
    program: 'BS Information Technology',
  };
}

// =============================================================================
// Valid form data
// =============================================================================

describe('validateForm - valid data', () => {
  it('returns no errors when all fields are filled correctly', () => {
    const errors = validateForm(validFormData());
    expect(errors).toEqual([]);
  });

  it('accepts email with STI domain (e.g., user@sti.edu)', () => {
    const data = validFormData();
    data.email = 'user@sti.edu';
    const errors = validateForm(data);
    expect(errors).toEqual([]);
  });

  it('accepts email with STI subdomain (e.g., user@student.sti.edu.ph)', () => {
    const data = validFormData();
    data.email = 'user@student.sti.edu.ph';
    const errors = validateForm(data);
    expect(errors).toEqual([]);
  });
});

// =============================================================================
// Full name validation
// =============================================================================

describe('validateForm - fullName', () => {
  it('fails when fullName is empty', () => {
    const data = validFormData();
    data.fullName = '';
    const errors = validateForm(data);
    expect(errors.some((e) => e.field === 'fullName')).toBe(true);
    expect(errors.find((e) => e.field === 'fullName')?.message).toBe('Full name is required.');
  });

  it('fails when fullName is whitespace only', () => {
    const data = validFormData();
    data.fullName = '   ';
    const errors = validateForm(data);
    expect(errors.some((e) => e.field === 'fullName')).toBe(true);
  });

  it('fails when fullName exceeds 100 characters', () => {
    const data = validFormData();
    data.fullName = 'A'.repeat(101);
    const errors = validateForm(data);
    expect(errors.some((e) => e.field === 'fullName')).toBe(true);
    expect(errors.find((e) => e.field === 'fullName')?.message).toBe(
      'Full name must be 100 characters or fewer.'
    );
  });

  it('passes when fullName is exactly 100 characters', () => {
    const data = validFormData();
    data.fullName = 'A'.repeat(100);
    const errors = validateForm(data);
    expect(errors.some((e) => e.field === 'fullName')).toBe(false);
  });
});

// =============================================================================
// Email validation
// =============================================================================

describe('validateForm - email', () => {
  it('fails when email has no @ symbol', () => {
    const data = validFormData();
    data.email = 'usergmail.com';
    const errors = validateForm(data);
    expect(errors.some((e) => e.field === 'email')).toBe(true);
    expect(errors.find((e) => e.field === 'email')?.message).toBe('Enter a valid email address.');
  });

  it('fails when email has non-STI domain (e.g., user@gmail.com)', () => {
    const data = validFormData();
    data.email = 'user@gmail.com';
    const errors = validateForm(data);
    expect(errors.some((e) => e.field === 'email')).toBe(true);
    expect(errors.find((e) => e.field === 'email')?.message).toBe(
      'Must be an STI student email (domain must contain "sti").'
    );
  });

  it('fails when email is empty', () => {
    const data = validFormData();
    data.email = '';
    const errors = validateForm(data);
    expect(errors.some((e) => e.field === 'email')).toBe(true);
    expect(errors.find((e) => e.field === 'email')?.message).toBe('Email address is required.');
  });

  it('passes when email has STI domain (case insensitive)', () => {
    const data = validFormData();
    data.email = 'user@STI.EDU';
    const errors = validateForm(data);
    expect(errors.some((e) => e.field === 'email')).toBe(false);
  });
});

// =============================================================================
// Year level validation
// =============================================================================

describe('validateForm - yearLevel', () => {
  it('fails when yearLevel is empty', () => {
    const data = validFormData();
    data.yearLevel = '';
    const errors = validateForm(data);
    expect(errors.some((e) => e.field === 'yearLevel')).toBe(true);
    expect(errors.find((e) => e.field === 'yearLevel')?.message).toBe(
      'Please select your year level.'
    );
  });
});

// =============================================================================
// Program validation
// =============================================================================

describe('validateForm - program', () => {
  it('fails when program is empty', () => {
    const data = validFormData();
    data.program = '';
    const errors = validateForm(data);
    expect(errors.some((e) => e.field === 'program')).toBe(true);
    expect(errors.find((e) => e.field === 'program')?.message).toBe(
      'Please select your program/course.'
    );
  });
});

// =============================================================================
// Multiple errors
// =============================================================================

describe('validateForm - multiple errors', () => {
  it('returns multiple errors when multiple fields are invalid', () => {
    const data: FormValues = {
      fullName: '',
      email: 'bad-email',
      yearLevel: '',
      program: '',
    };
    const errors = validateForm(data);
    expect(errors.length).toBeGreaterThanOrEqual(4);
    const fields = errors.map((e) => e.field);
    expect(fields).toContain('fullName');
    expect(fields).toContain('email');
    expect(fields).toContain('yearLevel');
    expect(fields).toContain('program');
  });
});
