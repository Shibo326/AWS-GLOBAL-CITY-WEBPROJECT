'use client';

import { EnlistForm } from './EnlistForm';

interface FormValues {
  fullName: string;
  email: string;
  yearLevel: string;
  program: string;
}

/**
 * Client wrapper that wires the EnlistForm to the real /api/enlist endpoint.
 * Keeps the parent page as a Server Component for metadata export.
 */
export function EnlistFormWrapper() {
  const handleSubmit = async (data: FormValues): Promise<{ success: boolean }> => {
    try {
      const response = await fetch('/api/enlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return { success: true };
      }

      // 400, 500, or other non-ok response
      return { success: false };
    } catch {
      // Network failure (fetch throws)
      return { success: false };
    }
  };

  return <EnlistForm onSubmit={handleSubmit} />;
}
