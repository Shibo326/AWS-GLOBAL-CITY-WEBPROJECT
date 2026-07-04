import { NextResponse } from 'next/server';
import { programs } from '@/lib/constants';

// =============================================================================
// Types
// =============================================================================

interface EnlistRequestBody {
  fullName: string;
  email: string;
  yearLevel: string;
  program: string;
}

interface ValidationError {
  field: string;
  message: string;
}

// =============================================================================
// Validation
// =============================================================================

function validateSubmission(body: EnlistRequestBody): ValidationError[] {
  const errors: ValidationError[] = [];

  // Full Name: 1-100 characters
  if (!body.fullName || !body.fullName.trim()) {
    errors.push({ field: 'fullName', message: 'Full name is required.' });
  } else if (body.fullName.trim().length > 100) {
    errors.push({ field: 'fullName', message: 'Full name must be 100 characters or fewer.' });
  }

  // Email: must contain "@" and domain must include "sti"
  if (!body.email || !body.email.trim()) {
    errors.push({ field: 'email', message: 'Email address is required.' });
  } else {
    const atIndex = body.email.indexOf('@');
    if (atIndex === -1) {
      errors.push({ field: 'email', message: 'Enter a valid email address.' });
    } else {
      const domain = body.email.slice(atIndex + 1).toLowerCase();
      if (!domain.includes('sti')) {
        errors.push({ field: 'email', message: 'Must be an STI student email (domain must contain "sti").' });
      }
    }
  }

  // Year Level: must be selected
  const validYearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  if (!body.yearLevel) {
    errors.push({ field: 'yearLevel', message: 'Please select your year level.' });
  } else if (!validYearLevels.includes(body.yearLevel)) {
    errors.push({ field: 'yearLevel', message: 'Invalid year level selected.' });
  }

  // Program: must be selected from predefined list
  if (!body.program) {
    errors.push({ field: 'program', message: 'Please select your program/course.' });
  } else if (!programs.includes(body.program as typeof programs[number])) {
    errors.push({ field: 'program', message: 'Invalid program selected.' });
  }

  return errors;
}

// =============================================================================
// POST Handler
// =============================================================================

export async function POST(request: Request) {
  try {
    const body: EnlistRequestBody = await request.json();

    // Server-side validation
    const errors = validateSubmission(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Build submission record with timestamp
    const submission = {
      fullName: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      yearLevel: body.yearLevel,
      program: body.program,
      submittedAt: new Date().toISOString(),
    };

    // Log the submission (for development visibility)
    console.log('[ENLIST] New application received:', submission);

    // -----------------------------------------------------------------
    // TODO: Integration placeholder
    // Add Discord webhook notification or Google Sheets integration here.
    // Example:
    //   await sendToDiscordWebhook(submission);
    //   await appendToGoogleSheet(submission);
    // -----------------------------------------------------------------

    return NextResponse.json(
      { success: true, message: 'Application received' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, errors: [{ field: 'general', message: 'Invalid request body.' }] },
      { status: 400 }
    );
  }
}
