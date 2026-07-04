'use client';

import { useReducer } from 'react';
import { motion } from 'framer-motion';
import { FormField } from './FormField';
import { Button } from '@/components/ui/Button';
import { programs } from '@/lib/constants';
import { scrollRevealVariants, staggerContainer } from '@/components/animations/variants';
import { validateForm } from '@/lib/form-validation';
import type { FormValidationError } from '@/types';
import type { FormValues } from '@/lib/form-validation';

interface FormState {
  values: FormValues;
  errors: FormValidationError[];
  status: 'idle' | 'submitting' | 'success' | 'error';
}

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormValues; value: string }
  | { type: 'SET_ERRORS'; errors: FormValidationError[] }
  | { type: 'SET_STATUS'; status: FormState['status'] }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR' };

// =============================================================================
// Reducer
// =============================================================================

const initialState: FormState = {
  values: {
    fullName: '',
    email: '',
    yearLevel: '',
    program: '',
  },
  errors: [],
  status: 'idle',
};

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



// =============================================================================
// Component
// =============================================================================

interface EnlistFormProps {
  onSubmit?: (data: FormValues) => Promise<{ success: boolean }>;
}

/**
 * EnlistForm — Self-contained membership form with useReducer state management.
 * Validates all fields inline before submission.
 */
export function EnlistForm({ onSubmit }: EnlistFormProps) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const getError = (field: keyof FormValues): string | undefined => {
    return state.errors.find((e) => e.field === field)?.message;
  };

  const handleFieldChange = (field: keyof FormValues) => (value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const errors = validateForm(state.values);
    if (errors.length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }

    // Submit
    dispatch({ type: 'SUBMIT_START' });

    try {
      const submitFn = onSubmit || defaultSubmit;
      const result = await submitFn(state.values);
      if (result.success) {
        dispatch({ type: 'SUBMIT_SUCCESS' });
      } else {
        dispatch({ type: 'SUBMIT_ERROR' });
      }
    } catch {
      dispatch({ type: 'SUBMIT_ERROR' });
    }
  };

  // Success state: show confirmation card
  if (state.status === 'success') {
    return (
      <section className="section-padding">
        <div className="container-site">
          <motion.div
            className="bg-card rounded-card p-8 max-w-lg mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <h2 className="font-heading text-2xl tracking-hero text-primary-text uppercase mb-4">
              APPLICATION RECEIVED
            </h2>
            <p className="text-secondary-text font-body">
              Your application has been received and will be reviewed within 48 hours.
              Welcome aboard, future Cloud Pilot.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-site max-w-2xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Heading */}
          <motion.div variants={scrollRevealVariants} className="text-center mb-10">
            <h1 className="font-heading tracking-hero text-hero text-primary-text">
              ENLIST AS CLOUD PILOT
            </h1>
            <p className="text-secondary-text font-body mt-3">
              Complete the form below to begin your application.
            </p>
          </motion.div>

          {/* Error banner */}
          {state.status === 'error' && (
            <motion.div
              className="bg-red-400/10 border border-red-400/30 rounded-lg p-4 mb-6 text-center"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              role="alert"
            >
              <p className="text-red-400 text-sm font-body">
                Submission could not be completed. Please check your connection and try again.
              </p>
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            variants={scrollRevealVariants}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6"
          >
            {/* Grid: 2 cols on desktop, 1 col mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Full Name"
                name="fullName"
                type="text"
                value={state.values.fullName}
                onChange={handleFieldChange('fullName')}
                error={getError('fullName')}
                placeholder="Juan Dela Cruz"
              />
              <FormField
                label="STI Student Email"
                name="email"
                type="email"
                value={state.values.email}
                onChange={handleFieldChange('email')}
                error={getError('email')}
                placeholder="yourname@sti.edu"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Year Level"
                name="yearLevel"
                type="select"
                options={['1st Year', '2nd Year', '3rd Year', '4th Year']}
                value={state.values.yearLevel}
                onChange={handleFieldChange('yearLevel')}
                error={getError('yearLevel')}
                placeholder="Select year level"
              />
              <FormField
                label="Program / Course"
                name="program"
                type="select"
                options={programs}
                value={state.values.program}
                onChange={handleFieldChange('program')}
                error={getError('program')}
                placeholder="Select your program"
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-center pt-4">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={state.status === 'submitting'}
                className={state.status === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}
              >
                {state.status === 'submitting' ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Default mock submission (replaced by real API in task 11.2)
// =============================================================================

async function defaultSubmit(): Promise<{ success: boolean }> {
  // Simulate API call with 1.5s delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true };
}
