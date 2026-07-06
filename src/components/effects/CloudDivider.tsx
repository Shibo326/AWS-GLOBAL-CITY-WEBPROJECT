interface CloudDividerProps {
  /** Flip vertically — clouds on top instead of bottom */
  flip?: boolean;
  /** @deprecated — variant is ignored; kept for backwards compatibility */
  variant?: 'white' | 'soft' | 'warm';
  /** Additional classes */
  className?: string;
}

/**
 * CloudDivider — Puffy cartoon cumulus clouds marking the sky-to-cloud transition.
 * Multiple round bumpy cloud shapes (like real cartoon clouds) that cover the bottom,
 * creating the illusion of descending through a cloud layer.
 * Uses layered white clouds of different sizes at different heights.
 */
export function CloudDivider({ flip = false, className = '' }: CloudDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        height: 'clamp(100px, 16vw, 180px)',
        marginTop: '-2px',
        marginBottom: '-2px',
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      {/* Sky background that matches the hero above */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #B3E5FC 0%, #C8E8FC 60%, #FFFDE7 100%)' }}
      />

      <svg
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* === BACK LAYER: Small distant clouds (lighter, higher) === */}
        
        {/* Small cloud top-left */}
        <ellipse cx="120" cy="55" rx="45" ry="28" fill="white" opacity="0.6" />
        <ellipse cx="155" cy="50" rx="35" ry="22" fill="white" opacity="0.6" />
        <ellipse cx="90" cy="52" rx="30" ry="20" fill="white" opacity="0.5" />

        {/* Small cloud top-center */}
        <ellipse cx="620" cy="42" rx="40" ry="24" fill="white" opacity="0.5" />
        <ellipse cx="655" cy="38" rx="32" ry="20" fill="white" opacity="0.5" />
        <ellipse cx="590" cy="44" rx="28" ry="18" fill="white" opacity="0.4" />

        {/* Small cloud top-right */}
        <ellipse cx="1100" cy="48" rx="38" ry="22" fill="white" opacity="0.55" />
        <ellipse cx="1135" cy="44" rx="30" ry="18" fill="white" opacity="0.5" />
        <ellipse cx="1070" cy="50" rx="26" ry="16" fill="white" opacity="0.45" />

        {/* Small cloud far right */}
        <ellipse cx="1350" cy="52" rx="35" ry="20" fill="white" opacity="0.5" />
        <ellipse cx="1380" cy="48" rx="28" ry="17" fill="white" opacity="0.45" />

        {/* === MID LAYER: Medium clouds (semi-opaque, middle height) === */}

        {/* Medium cloud left */}
        <ellipse cx="200" cy="85" rx="60" ry="35" fill="white" opacity="0.85" />
        <ellipse cx="250" cy="78" rx="50" ry="30" fill="white" opacity="0.85" />
        <ellipse cx="160" cy="82" rx="42" ry="26" fill="white" opacity="0.8" />
        <ellipse cx="290" cy="84" rx="38" ry="24" fill="white" opacity="0.8" />

        {/* Medium cloud center-left */}
        <ellipse cx="500" cy="78" rx="55" ry="32" fill="white" opacity="0.8" />
        <ellipse cx="545" cy="72" rx="45" ry="28" fill="white" opacity="0.8" />
        <ellipse cx="460" cy="80" rx="40" ry="25" fill="white" opacity="0.75" />

        {/* Medium cloud center-right */}
        <ellipse cx="850" cy="82" rx="58" ry="34" fill="white" opacity="0.85" />
        <ellipse cx="900" cy="76" rx="48" ry="28" fill="white" opacity="0.85" />
        <ellipse cx="810" cy="84" rx="38" ry="24" fill="white" opacity="0.8" />

        {/* Medium cloud right */}
        <ellipse cx="1250" cy="80" rx="52" ry="30" fill="white" opacity="0.8" />
        <ellipse cx="1295" cy="74" rx="42" ry="26" fill="white" opacity="0.8" />
        <ellipse cx="1210" cy="82" rx="36" ry="22" fill="white" opacity="0.75" />

        {/* === FRONT LAYER: Large puffy clouds (fully opaque, covers bottom) === */}

        {/* Big cloud #1 — left side */}
        <ellipse cx="80" cy="130" rx="80" ry="45" fill="#FFFDE7" />
        <ellipse cx="150" cy="120" rx="70" ry="42" fill="#FFFDE7" />
        <ellipse cx="220" cy="125" rx="65" ry="38" fill="#FFFDE7" />
        <ellipse cx="30" cy="135" rx="55" ry="35" fill="#FFFDE7" />
        <ellipse cx="280" cy="132" rx="50" ry="32" fill="#FFFDE7" />

        {/* Big cloud #2 — center-left */}
        <ellipse cx="400" cy="125" rx="75" ry="44" fill="#FFFDE7" />
        <ellipse cx="470" cy="118" rx="68" ry="40" fill="#FFFDE7" />
        <ellipse cx="340" cy="130" rx="58" ry="36" fill="#FFFDE7" />
        <ellipse cx="530" cy="128" rx="52" ry="34" fill="#FFFDE7" />

        {/* Big cloud #3 — center */}
        <ellipse cx="650" cy="122" rx="72" ry="43" fill="#FFFDE7" />
        <ellipse cx="720" cy="115" rx="65" ry="40" fill="#FFFDE7" />
        <ellipse cx="590" cy="128" rx="55" ry="35" fill="#FFFDE7" />
        <ellipse cx="785" cy="125" rx="50" ry="32" fill="#FFFDE7" />

        {/* Big cloud #4 — center-right */}
        <ellipse cx="900" cy="128" rx="70" ry="42" fill="#FFFDE7" />
        <ellipse cx="970" cy="120" rx="65" ry="38" fill="#FFFDE7" />
        <ellipse cx="840" cy="132" rx="55" ry="34" fill="#FFFDE7" />
        <ellipse cx="1035" cy="126" rx="48" ry="30" fill="#FFFDE7" />

        {/* Big cloud #5 — right side */}
        <ellipse cx="1150" cy="124" rx="68" ry="40" fill="#FFFDE7" />
        <ellipse cx="1220" cy="118" rx="62" ry="38" fill="#FFFDE7" />
        <ellipse cx="1090" cy="130" rx="52" ry="34" fill="#FFFDE7" />
        <ellipse cx="1280" cy="126" rx="48" ry="32" fill="#FFFDE7" />

        {/* Big cloud #6 — far right */}
        <ellipse cx="1360" cy="126" rx="65" ry="40" fill="#FFFDE7" />
        <ellipse cx="1420" cy="130" rx="55" ry="36" fill="#FFFDE7" />
        <ellipse cx="1300" cy="132" rx="48" ry="30" fill="#FFFDE7" />

        {/* Solid cream fill at very bottom to ensure seamless connection */}
        <rect x="0" y="145" width="1440" height="35" fill="#FFFDE7" />
      </svg>
    </div>
  );
}

export default CloudDivider;
