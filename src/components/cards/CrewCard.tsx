interface CrewCardProps {
  name: string;
  role: string;
  office: string;
  accentColor: string;
}

/**
 * Compute initials from a name string.
 * - First letter of first word + first letter of last word (uppercase)
 * - If single word, just first letter
 */
export function computeInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * CrewCard — Cartoon-styled officer card with initials avatar.
 * Displays a colored top bar, circular initials avatar, name, and role.
 * No photograph, no 3D flip animation.
 */
export function CrewCard({ name, role, office, accentColor }: CrewCardProps) {
  const initials = computeInitials(name);

  return (
    <div className="card-cartoon flex flex-col items-center overflow-hidden">
      {/* Colored top bar */}
      <div
        className="w-full h-1 rounded-t-[14px]"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      {/* Card content */}
      <div className="flex flex-col items-center px-5 py-6 gap-4">
        {/* Circular initials avatar — 64px diameter */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        >
          <span className="text-white font-bold text-xl select-none">
            {initials}
          </span>
        </div>

        {/* Name */}
        <h3
          className="text-lg text-center leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {name}
        </h3>

        {/* Role */}
        <p
          className="text-sm text-center text-secondary-text"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {role}
        </p>

        {/* Office label */}
        <span className="text-xs text-secondary-text uppercase tracking-wider font-mono">
          {office.replace(' Office', '')}
        </span>
      </div>
    </div>
  );
}
