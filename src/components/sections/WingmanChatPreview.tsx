'use client';

/**
 * WingmanChatPreview — Chat bubble mockup demonstrating the AI Wingman feature.
 * Renders a user question bubble (right-aligned) and a Rory response bubble (left-aligned).
 * Used within the WingmanCTA section to preview the chatbot experience.
 *
 * Validates: Requirements 9.6
 */
export default function WingmanChatPreview() {
  return (
    <div className="flex flex-col gap-4" style={{ fontFamily: 'var(--font-body)' }}>
      {/* User question bubble — right-aligned */}
      <div className="flex justify-end">
        <div
          className="px-4 py-3 text-white text-sm font-medium"
          style={{
            backgroundColor: 'var(--accent-orange)',
            borderRadius: '16px 16px 4px 16px',
            maxWidth: '80%',
          }}
        >
          What events are coming up this semester?
        </div>
      </div>

      {/* Rory response bubble — left-aligned */}
      <div className="flex flex-col items-start">
        <span
          className="text-xs mb-1"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--secondary-text)',
          }}
        >
          Rory
        </span>
        <div
          className="px-4 py-3 text-sm font-medium"
          style={{
            backgroundColor: '#FFFFFF',
            color: 'var(--primary-text)',
            border: '2px solid var(--border-color)',
            borderRadius: '16px 16px 16px 4px',
            maxWidth: '80%',
          }}
        >
          We have 3 upcoming missions! 🚀 Check the Mission Board for AWS Workshop, Cloud Deploy Day, and Study Jam.
        </div>
      </div>
    </div>
  );
}
