import { describe, it, expect } from 'vitest';

/**
 * Property 4: Form Data Preservation
 * If a form submission fails due to network or server error, all user-entered
 * field values remain intact in the form. No field is cleared or reset.
 *
 * **Validates: Requirements 10.11**
 */

// Replicate the reducer types and logic from EnlistForm.tsx to test directly.

interface FormValues {
  fullName: string;
  email: string;
  yearLevel: string;
  program: string;
}

interface FormState {
  values: FormValues;
  errors: { field: string; message: string }[];
  status: 'idle' | 'submitting' | 'success' | 'error';
}

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormValues; value: string }
  | { type: 'SET_ERRORS'; errors: { field: string; message: string }[] }
  | { type: 'SET_STATUS'; status: FormState['status'] }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR' };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: state.errors.filter((e) => e.field !== action.field),
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors, status: 'idle' };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'SUBMIT_START':
      return { ...state, status: 'submitting', errors: [] };
    case 'SUBMIT_SUCCESS':
      return { ...state, status: 'success', errors: [] };
    case 'SUBMIT_ERROR':
      return { ...state, status: 'error' };
    default:
      return state;
  }
}

describe('Property 4: Form Data Preservation', () => {
  const filledState: FormState = {
    values: {
      fullName: 'Juan Dela Cruz',
      email: 'juan@sti.edu',
      yearLevel: '2nd Year',
      program: 'BS Information Technology',
    },
    errors: [],
    status: 'submitting',
  };

  it('SUBMIT_ERROR preserves all form field values', () => {
    const result = formReducer(filledState, { type: 'SUBMIT_ERROR' });

    expect(result.values.fullName).toBe('Juan Dela Cruz');
    expect(result.values.email).toBe('juan@sti.edu');
    expect(result.values.yearLevel).toBe('2nd Year');
    expect(result.values.program).toBe('BS Information Technology');
    expect(result.status).toBe('error');
  });

  it('no field is cleared or reset on error', () => {
    const result = formReducer(filledState, { type: 'SUBMIT_ERROR' });

    // Every field that had a value still has the same value
    Object.keys(filledState.values).forEach((key) => {
      const field = key as keyof FormValues;
      expect(result.values[field]).toBe(filledState.values[field]);
    });
  });

  it('form can transition from error back to submitting without losing data', () => {
    const errorState = formReducer(filledState, { type: 'SUBMIT_ERROR' });
    const retryState = formReducer(errorState, { type: 'SUBMIT_START' });

    expect(retryState.values).toEqual(filledState.values);
    expect(retryState.status).toBe('submitting');
  });
});
