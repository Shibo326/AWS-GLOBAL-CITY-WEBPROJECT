interface AnnouncementRowProps {
  text: string;
  timestamp: string;
  pinned?: boolean;
}

export default function AnnouncementRow({ text, timestamp, pinned }: AnnouncementRowProps) {
  return (
    <div className="flex items-center gap-3 py-3 px-4 border-b border-[var(--border-color)]/10">
      {/* Pinned indicator or alignment placeholder */}
      {pinned ? (
        <span
          className="pulse-dot-orange shrink-0"
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'var(--accent-orange)',
          }}
          aria-label="Pinned"
        />
      ) : (
        <span className="shrink-0" style={{ width: 8, height: 8 }} aria-hidden="true" />
      )}

      {/* Timestamp */}
      <span
        className="text-xs whitespace-nowrap"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--secondary-text)',
          minWidth: '5.5rem',
        }}
      >
        {timestamp}
      </span>

      {/* Announcement text */}
      <span
        className="text-sm"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--primary-text)',
        }}
      >
        {text}
      </span>
    </div>
  );
}
