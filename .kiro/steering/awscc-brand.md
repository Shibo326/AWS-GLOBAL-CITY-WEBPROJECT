# AWS Cloud Club Global City — Brand & Design System

## Brand Identity

- **Club Name:** AWS Cloud Club — Global City
- **Institution:** STI College Global City, Taguig, Philippines
- **Founded:** 2024
- **Facebook:** https://www.facebook.com/awslcstiglobal
- **Mascot:** Tiger wearing aviator goggles — the "Cloud Pilot" persona
- **Aesthetic:** Top Gun meets AWS — dark, bold, aviation-coded, AI-focused identity
- **Feeling:** Like booting up a classified mission briefing system. Dark, cinematic, purposeful.

---

## Color System

| Token | Hex / Value | Usage |
|-------|-------------|-------|
| Background | `#0A0C10` | Deep cockpit black — page background |
| Surface | `#111318` | Dark panel — section backgrounds |
| Card | `#161B24` | Instrument panel gray — card backgrounds |
| Primary Text | `#F5F0E8` | Cream/off-white (pulled from logo) |
| Secondary Text | `#8A9BB5` | Muted blue-gray — captions, metadata |
| Accent 1 | `#FF9900` | AWS orange — use SPARINGLY, CTAs only |
| Accent 2 | `#4DA3FF` | Electric sky blue — hover states, glows |
| Border | `rgba(255,255,255,0.06)` | Subtle dividers |
| Glow | `rgba(77,163,255,0.12)` | Subtle ambient glow — never neon |

### Color Usage Rules

- AWS orange (`#FF9900`) is reserved for primary CTAs and critical emphasis only
- Electric sky blue (`#4DA3FF`) for hover states, active states, and ambient glow effects
- Background effects (blurred ellipses, grid, scanlines) use the glow token
- Never use saturated neon — all glows must remain subtle and atmospheric

---

## Typography

| Role | Font | Weight | Style Notes |
|------|------|--------|-------------|
| Hero Headings | Bebas Neue | 400 | ALL CAPS, letter-spacing: 0.08em |
| Section Titles | Space Grotesk | 600 | Mixed case |
| Body | Inter | 400 | 16px, line-height: 1.75 |
| Labels/Tags | JetBrains Mono | 400 | Small caps, letter-spacing: 0.12em |
| Pull Quotes | Playfair Display | Italic | Rare, accent use only |

### Typography Rules

- All hero and major headings use Bebas Neue in ALL CAPS
- Section headings use Space Grotesk semibold
- Body text always Inter at 16px with generous line-height
- Monospace labels for metadata, timestamps, status tags
- Playfair Display italic reserved for rare editorial pull quotes only

---

## Pages / Routes

| Route | Name | Description |
|-------|------|-------------|
| `/` | Home | All major sections previewed |
| `/about` | About | Club story, timeline, departments |
| `/missions` | Mission Board | Full events list styled as flight missions |
| `/crew` | Crew Roster | Officers with 3D card flip |
| `/signals` | Signal Board | Announcements feed |
| `/wingman` | AI Wingman | Full-page AI chatbot |
| `/enlist` | Enlist | Join/Membership form |
| `/apply` | Apply | Redirect alias → `/enlist` |

---

## Home Page Section Order

1. **Hero** — Full viewport, 4-layer parallax, star field, clouds, tiger mascot, headline "CLEARED FOR TAKEOFF"
2. **Stats Strip** — Members count, events held, certifications earned, years active (count-up animation)
3. **About Snippet** — Two columns: text + tiger mascot card with animated border
4. **Mission Board Preview** — 3 event cards with scan-line sweep, status badges
5. **Signal Board Preview** — Terminal aesthetic, typewriter reveal, timestamps
6. **Crew Preview** — 4–6 officer cards, glow border hover
7. **AI Wingman CTA** — Headline + mini chat preview mockup
8. **Enlist Section** — "Cleared to Join" recruitment area (military briefing aesthetic, stamp animation, benefit cards, orange CTA)
9. **Partners Marquee** — Infinite scroll, grayscale to color on hover
10. **Footer** — Minimal, tiger watermark, social icons

---

## Animation System

### Page Load Sequence (0ms → 2400ms)
1. Logo fade in
2. Type-in effect
3. Cloud fog reveal
4. Tiger mascot fade
5. Navigation reveal

### Scroll Animations
- Intersection Observer triggered
- Properties: opacity + translateY
- Duration: 600ms
- Stagger: 80ms between elements

### Component Animations
| Component | Animation |
|-----------|-----------|
| Hero | 4-layer parallax, mouse parallax on tiger (±8deg) |
| Navigation | Transparent → frosted glass on scroll |
| Mission Board cards | Scan-line sweep, hover lift, status badge pulse |
| Signal Board | Typewriter text reveal + spring overshoot |
| Crew Roster | 3D card flip (rotateY 180deg) |
| AI Wingman FAB | Pulse idle, clip-path expand on click |
| Enlist section | Stamp-in headline, stagger cards, orange glow pulse |
| Stats | Count-up with easeOutExpo |
| Partners marquee | 40s infinite loop, pause on hover |
| Custom cursor | Dot + ring, targeting reticle on tiger hover |

### Background Effects
- Blurred gradient ellipses
- Subtle grid overlay
- Scanline texture
- Star field twinkle

### Performance Rules
- All BG effects paused when tab hidden (Page Visibility API)
- GPU-accelerated only (transform + opacity)
- No layout-triggering animations

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom CSS for animations |
| Animation | Framer Motion (scroll reveals, spring) + GSAP (hero sequence, parallax) |
| 3D Effects | CSS perspective + transform-style: preserve-3d |
| Cursor | Vanilla JS (~30 lines) |
| Particles | tsParticles (lightweight, GPU-accelerated) |
| Fonts | Google Fonts — Bebas Neue, Space Grotesk, JetBrains Mono, Inter |
| Icons | Tabler Icons (outline style only) |
| Deployment | Vercel |

---

## Enlist Section Specifications

- **Background:** Subtle atmospheric texture, mission briefing room feel
- **Top Label:** `▸ RECRUITMENT HANGAR — OPEN` with blinking green dot
- **Headline:** "READY TO FLY?" in Bebas Neue
- **Benefit Cards (3):** Cloud Training, Real Projects, Community
- **Primary CTA:** "Enlist as Cloud Pilot" (AWS orange pill button)
- **Secondary CTA:** "Learn More About the Club" (ghost button)
- **Small Text:** "Open to all STI Global City students. Applications reviewed within 48 hours."

---

## Design Principles

1. **Dark-first** — Every element designed for the dark cockpit background
2. **Cinematic** — Motion and layout evoke film/aviation UI
3. **Purposeful restraint** — Orange is rare, glow is subtle, motion is intentional
4. **Military precision** — Grid-aligned, typographically disciplined
5. **Accessible** — Sufficient contrast ratios despite dark theme, keyboard navigable
6. **Performance** — GPU-only animations, visibility-aware, no jank
