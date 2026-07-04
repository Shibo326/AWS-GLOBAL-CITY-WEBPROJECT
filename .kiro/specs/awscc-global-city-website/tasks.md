# Implementation Plan: AWS Cloud Club — Global City Website

## Overview

A dark cinematic Next.js 14 website for AWS Cloud Club — STI Global City with aviation-coded UI, GSAP + Framer Motion animations, a client-side AI chatbot (Rory), 3D crew cards, parallax hero, and statically generated pages. Implementation follows an incremental approach: foundational setup → shared components → page-by-page build → integration → testing.

## Tasks

- [x] 1. Project setup and foundational configuration
  - [x] 1.1 Initialize Next.js 14 project with App Router and install all dependencies
    - Create Next.js 14 app with TypeScript, Tailwind CSS, ESLint
    - Install production deps: framer-motion, gsap, @tsparticles/react, @tsparticles/slim, @tabler/icons-react, tailwind-merge, clsx
    - Install dev deps: vitest, @testing-library/react, @testing-library/jest-dom, prettier
    - Configure tsconfig.json with path aliases (@/ for src)
    - _Requirements: 20.1, 20.3, 20.4_

  - [x] 1.2 Configure Tailwind CSS with full color system, typography, and custom theme
    - Set up tailwind.config.ts with color tokens (background #0A0C10, surface #111318, card #161B24, primary-text #F5F0E8, secondary-text #8A9BB5, accent-orange #FF9900, accent-blue #4DA3FF, border, glow)
    - Configure Google Fonts via next/font/google: Bebas Neue, Space Grotesk, JetBrains Mono, Inter, Playfair Display with font-display: swap
    - Add custom spacing, breakpoints (mobile: 0, tablet: 768, desktop: 1024), and typography utilities
    - Create globals.css with Tailwind directives, CSS variables, and base styles
    - _Requirements: 15.4, 20.3_

  - [x] 1.3 Create TypeScript types, constants, and data layer
    - Create src/types/index.ts with all interfaces: MissionEvent, Officer, SocialLink, Announcement, Partner, StatMetric, EnlistFormData, FormValidationError, KnowledgeEntry, ChatMessage, MatchResult
    - Create src/lib/constants.ts with color tokens, breakpoints, timing values
    - Create src/data/events.ts with sample MissionEvent data (3+ events with UPCOMING/ACTIVE/COMPLETED statuses)
    - Create src/data/officers.ts with sample Officer data (6+ officers)
    - Create src/data/announcements.ts with sample Announcement data (5+ entries, some pinned)
    - Create src/data/partners.ts with sample Partner data
    - Create src/data/stats.ts with StatMetric data (members, events, certifications, years)
    - _Requirements: 4.2, 6.1, 7.1, 8.1, 11.1_

  - [x] 1.4 Create root layout, template with AnimatePresence, and shared providers
    - Create src/app/layout.tsx as Server Component: load fonts, set metadata/OG tags, wrap in providers
    - Create src/app/template.tsx with AnimatePresence page transition wrapper (pageVariants: initial/enter/exit with blur + translateY)
    - Create CursorContext and LoadContext providers
    - Configure CSP headers in next.config.js
    - _Requirements: 17.2, 17.3, 20.3_

- [x] 2. Animation system and reusable utilities
  - [x] 2.1 Create Framer Motion variant library and animation components
    - Create src/components/animations/variants.ts with all variants: scrollRevealVariants, cardRevealVariants, staggerContainer, springEntry, fadeInUp, scaleIn, slideFromLeft, slideFromRight, pageVariants, stampVariants, benefitCardVariants, chatBubbleVariants, typingIndicatorVariants, panelVariants, mobileMenuVariants, menuItemVariants
    - Create src/components/animations/ScrollReveal.tsx wrapper component (whileInView, once: true, threshold 0.15)
    - Create src/components/animations/TypewriterText.tsx for character-by-character text reveal
    - Create src/components/animations/CountUp.tsx using useMotionValue + useSpring for number animation with easeOutExpo
    - Create src/components/animations/StampIn.tsx for stamp effect (scale 1.08 → 1.0, rotate -1 → 0)
    - Create src/components/animations/PageTransition.tsx (motion.div with pageVariants)
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

  - [x] 2.2 Create custom hooks for animations and responsiveness
    - Create src/hooks/useIntersectionObserver.ts (configurable threshold, once option)
    - Create src/hooks/useParallax.ts (scroll-linked transform with speed factor)
    - Create src/hooks/usePageVisibility.ts (pause/resume callbacks on visibilitychange)
    - Create src/hooks/useReducedMotion.ts (detect prefers-reduced-motion: reduce)
    - Create src/hooks/useCountUp.ts (trigger count-up when element is in view, easeOutExpo over 1.8s)
    - Create src/hooks/useMediaQuery.ts (responsive breakpoint detection)
    - _Requirements: 13.6, 13.7, 15.1, 19.4, 20.6_

  - [x] 2.3 Create CSS keyframe animations and custom styles
    - Create src/styles/globals.css with keyframes: status-pulse-blue, status-pulse-orange, scroll-indicator-bounce, marquee-scroll, blink-green-dot, glow-pulse-orange, gradient-border-rotate
    - Create src/styles/cursor.css with cursor dot, ring, reticle, and state classes
    - Create src/styles/animations.css with scan-line-sweep, typewriter-caret, border-draw keyframes
    - _Requirements: 6.4, 10.1, 11.1, 12.1, 13.2, 13.3, 13.4_

- [x] 3. Background effects and custom cursor
  - [x] 3.1 Implement BackgroundEffects container with Page Visibility API pause/resume
    - Create src/components/effects/BackgroundEffects.tsx as client component
    - Implement GradientEllipses.tsx: 8-12 blurred white ellipses (blur 40-80px, opacity 0.02-0.04) drifting across viewport in 60-120s
    - Implement GridOverlay.tsx: 1px lines at 40px intervals, rgba(255,255,255,0.03)
    - Implement Scanlines.tsx: repeating linear gradient, 2px height, opacity 0.015
    - Implement StarField.tsx: 60-80 positioned dots (1-2px) with random twinkle keyframes
    - Integrate usePageVisibility hook to pause/resume all RAF loops and particle animations
    - All animations use only transform + opacity (GPU-accelerated)
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 20.6, 20.7_

  - [x] 3.2 Implement CustomCursor in vanilla JavaScript
    - Create src/components/effects/CustomCursor.tsx as client wrapper that mounts vanilla JS via useEffect
    - Implement ~30 lines vanilla JS: 8px dot (instant follow) + 32px ring (lerp 0.12 per RAF)
    - Implement cursor states: default, hover-cta (48px ring, orange 20% fill), hover-tiger (reticle crosshairs), hover-interactive (dot hidden)
    - Read data-cursor attributes from hovered elements for state changes
    - Disable entirely below 768px viewport width (no listeners, no DOM elements)
    - Use only transform: translate3d() for GPU acceleration
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

- [x] 4. Shared layout components
  - [x] 4.1 Implement Navigation with frosted glass transition and mobile menu
    - Create src/components/layout/Navigation.tsx (client component with scroll listener)
    - Transparent at top → frosted glass (backdrop-filter blur) on scroll past 80px, 300ms transition
    - Club logo on left with 360deg rotation on hover (600ms ease-in-out)
    - Links: Home, About, Missions, Crew, Signals, Wingman, Enlist with hover underline animation (0→100% width, 250ms, #4DA3FF)
    - Fixed position, above all content layers (z-index)
    - Active page indicator using motion.span with layoutId="nav-indicator"
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.8_

  - [x] 4.2 Implement MobileMenu with Framer Motion slide panel
    - Create src/components/layout/MobileMenu.tsx
    - Hamburger icon triggers slide-from-right panel (below 768px)
    - AnimatePresence with mobileMenuVariants (spring stiffness 300, damping 30)
    - Backdrop fade overlay, close on: X tap, outside tap, link selection
    - Menu items stagger in (60ms delay each) with spring animation
    - Focus trap within panel when open, Escape to close
    - Hamburger morphs to X icon
    - _Requirements: 3.6, 3.7, 19.1, 19.6_

  - [x] 4.3 Implement Footer with social links and tiger watermark
    - Create src/components/layout/Footer.tsx
    - Social icon links (GitHub, LinkedIn, Facebook, Instagram) using Tabler Icons outline, target="_blank" rel="noopener noreferrer"
    - Tiger mascot watermark at 5-8% opacity as background element
    - Tagline "Built by Cloud Pilots. Powered by AWS." in JetBrains Mono
    - Quick navigation links and copyright notice with dynamic year
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6_

  - [x] 4.4 Implement SkipNav and accessibility foundations
    - Create src/components/ui/SkipNav.tsx: skip-navigation link (sr-only, visible on focus)
    - Links to #main-content anchor, styled with 2px #4DA3FF outline on focus
    - Add aria-current="page" logic to navigation active link
    - Ensure all interactive elements have visible focus indicators (2px outline, #4DA3FF, 3:1 contrast)
    - Add prefers-reduced-motion detection that disables decorative animations globally
    - _Requirements: 19.1, 19.4, 19.5, 19.7_

- [x] 5. Checkpoint - Verify foundation
  - Ensure the app builds without errors, all layout components render, navigation works across routes, and background effects display correctly. Ask the user if questions arise.

- [x] 6. Home page — Hero section and load sequence
  - [x] 6.1 Implement cinematic GSAP load sequence (2400ms timeline)
    - Create src/components/hero/LoadSequence.tsx (client component)
    - GSAP timeline: 0ms logo fadeIn (600ms), 400ms spring-scale (0.95→1.0), 800ms typewriter "AWS CLOUD CLUB" (50ms/char), 1200ms slideUp "GLOBAL CITY", 1600ms cloud fog from edges, 2000ms tiger fadeIn (400ms), 2400ms nav+CTAs reveal
    - Disable scroll during sequence (overflow: hidden on body)
    - Check sessionStorage for skip flag — if present, show final state immediately
    - Set sessionStorage flag on sequence completion
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9_

  - [x] 6.2 Implement HeroSection with 4-layer parallax and tsParticles star field
    - Create src/components/hero/HeroSection.tsx (client component)
    - 100vh container with 4 parallax layers: star field (0.1x), clouds (0.2x), tiger mascot (0.5x), headline (1.0x)
    - Integrate tsParticles (dynamic import, ssr: false) for GPU-accelerated star field background
    - Create src/components/hero/ParallaxLayer.tsx for scroll-linked transforms via GSAP ScrollTrigger
    - Create src/components/hero/TigerMascot.tsx with mouse tracking: ±8deg rotation, lerp 0.08, RAF
    - Headline "CLEARED FOR TAKEOFF" in Bebas Neue, ALL CAPS, letter-spacing 0.08em, font-size clamp(64px, 10vw, 120px)
    - Subheadline "AWS Cloud Club — Global City" in JetBrains Mono, letter-spacing 0.12em
    - Two CTAs: "View Missions" (outline) and "Enlist Now" (filled #FF9900)
    - Animated scroll indicator (chevron-down bounce) at viewport bottom
    - Mobile: reduce to 2 parallax layers, disable mouse parallax
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 15.2_

- [x] 7. Home page — Content sections (above fold)
  - [x] 7.1 Implement StatsStrip with count-up animation
    - Create src/components/sections/StatsStrip.tsx (client component)
    - Display 4 metrics from stats.ts data with count-up from 0 to target over 1.8s (easeOutExpo)
    - Trigger when 50% visible (Intersection Observer)
    - Labels in JetBrains Mono, small caps, letter-spacing 0.12em
    - Hold final values after completion — no re-trigger on subsequent scrolls
    - If visible on initial load, trigger immediately
    - Integer formatting with thousands separators
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 7.2 Implement AboutSnippet with animated tiger card border
    - Create src/components/sections/AboutSnippet.tsx
    - Two-column layout (≥768px): text left, tiger card right; stacked on mobile
    - Heading "A Different Kind of Cloud Club" with 3-4 lines body text (AI niche, STI Global City, 2024 founding)
    - ScrollReveal: animate from 24px below + opacity 0, 600ms, stagger 80ms, threshold 0.2, plays once
    - Tiger mascot card with animated border draw (clockwise, glow token rgba(77,163,255,0.12), 1200ms)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 7.3 Implement MissionBoardPreview with scan-line sweep cards
    - Create src/components/sections/MissionBoardPreview.tsx
    - Create src/components/cards/MissionCard.tsx
    - Display max 3 event cards from data, ordered by date (UPCOMING first)
    - Card content: name, date, description (truncated 120 chars + ellipsis), status badge
    - Scan-line sweep animation on viewport entry (1px bright line top→bottom, 600ms)
    - Hover: translateY(-8px) lift + glow border
    - Status badge pulses: UPCOMING blue 2s loop, ACTIVE orange 1.2s loop, COMPLETED gray static
    - "View All Missions" button navigating to /missions
    - Empty state message if no events
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [x] 8. Home page — Content sections (below fold)
  - [x] 8.1 Implement SignalBoardPreview with typewriter reveal
    - Create src/components/sections/SignalBoardPreview.tsx
    - Create src/components/cards/SignalEntry.tsx
    - Display 5 most recent announcements from data
    - Monospace font (JetBrains Mono), left-aligned, timestamp prefix "[MM.DD.YYYY]"
    - Entry animation: spring slide from right + typewriter text reveal + timestamp fade 200ms after text
    - Pinned entries: pulsing amber dot (opacity 1→0.3→1, 1.5s loop)
    - "Open Signal Board" button navigating to /signals
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 8.2 Implement CrewPreview with 3D card flip
    - Create src/components/sections/CrewPreview.tsx
    - Create src/components/cards/CrewCard.tsx
    - Display 4-6 officer cards from data in a grid
    - Front face: grayscale photo, name, role tag
    - Back face: full-color photo, role description (≤150 chars), up to 4 social links
    - 3D flip: rotateY 180deg on click/tap, 500ms ease-in-out, CSS perspective 1000px, transform-style preserve-3d
    - Hover glow border (#4DA3FF with glow token)
    - Stagger entrance: 60ms between cards
    - "Meet the Full Crew" CTA → /crew
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [x] 8.3 Implement WingmanCTA section
    - Create src/components/sections/WingmanCTA.tsx
    - Headline + mini chat preview mockup
    - Aviation-themed copy inviting visitors to chat with Rory
    - CTA button navigating to /wingman
    - ScrollReveal with fadeInUp variant
    - _Requirements: 9.5_

  - [x] 8.4 Implement EnlistSection with stamp animation and benefit cards
    - Create src/components/sections/EnlistSection.tsx
    - Create src/components/cards/BenefitCard.tsx
    - Top label "▸ RECRUITMENT HANGAR — OPEN" with blinking green dot (opacity 1→0→1, 1s loop)
    - Headline "READY TO FLY?" in Bebas Neue with stamp-in effect (scale 1.08 + rotate -1deg → 1.0 + 0deg, 400ms ease-out)
    - 3 benefit cards (Cloud Training, Real Projects, Community) with Tabler icons, staggered reveal (100ms delay, from translateY 30px), hover lift translateY -6px
    - Primary CTA "Enlist as Cloud Pilot" (#FF9900 pill button, orange glow pulse every 3s)
    - Secondary CTA "Learn More About the Club" (ghost button)
    - Small text disclaimer
    - Primary CTA navigates to /enlist
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.8_

  - [x] 8.5 Implement PartnersMarquee with infinite scroll
    - Create src/components/sections/PartnersMarquee.tsx
    - Create src/components/cards/PartnerLogo.tsx
    - Infinite horizontal scroll (40s loop desktop, 20s mobile), duplicated logos for seamless loop
    - Gradient fade overlay on left/right edges
    - Logos grayscale by default, full color on hover (300ms transition)
    - Pause scroll on hover
    - Hide section entirely if fewer than 2 logos
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 9. Checkpoint - Home page verification
  - Ensure the home page renders all 10 sections correctly, animations trigger on scroll, load sequence plays once per session, and responsive layout works across breakpoints. Ask the user if questions arise.

- [x] 10. AI Wingman chatbot system
  - [x] 10.1 Create Wingman knowledge base and matching engine
    - Create src/data/wingman-kb.ts with comprehensive knowledge base covering all 7 domains (identity, officers, membership, events, departments, buildhers, application)
    - Include 15-20+ entries with keywords, questions, Rory's aviation-themed answers, follow-up chips, and priority scores
    - Create src/lib/wingman-engine.ts: normalize(), tokenize(), calculateOverlap(), matchQuery() with MATCH_THRESHOLD 0.25 and priority weighting
    - Fallback message directs to Facebook page
    - Pure deterministic function (no randomness)
    - _Requirements: 9.1, 9.6_

  - [x] 10.2 Implement WingmanFAB with clip-path expansion panel
    - Create src/components/wingman/WingmanFAB.tsx (client component)
    - FAB displayed on all pages except /wingman with Rory icon
    - Pulse animation when idle for 4+ seconds (scale 1→1.05)
    - Click expands to chat panel via clip-path circle from bottom-right (panelVariants)
    - Close button collapses with reverse animation
    - Focus management: open → focus to input, close → focus back to FAB
    - Escape key closes panel
    - ARIA live region for response announcements
    - _Requirements: 9.2, 9.3, 9.4, 9.7, 9.8, 19.6_

  - [x] 10.3 Implement WingmanPanel and ChatBubble components
    - Create src/components/wingman/WingmanPanel.tsx (chat panel inside FAB)
    - Create src/components/wingman/ChatBubble.tsx (distinct user vs wingman bubbles, spring animation)
    - Create src/components/wingman/ChatInput.tsx (text input + submit, validation: 1-500 chars)
    - Welcome message auto-sent on panel open
    - Simulated typing delay (600-1000ms) before Rory responds
    - Follow-up suggestion chips (clickable pills from followUp array)
    - Rory avatar (tiger icon) next to responses
    - Topic indicator dots on messages
    - Message bubbles enter with spring (y: 12→0, opacity: 0→1)
    - _Requirements: 9.1, 9.7, 9.9_

  - [x]* 10.4 Write property test for Wingman matching engine determinism
    - **Property 5: Wingman Determinism**
    - Given the same normalized input, matchQuery always returns the same result
    - Test with randomized inputs that the output is a pure function of (input, knowledgeBase)
    - **Validates: Requirements 9.1, 9.6**

- [x] 11. Enlist page — Membership form
  - [x] 11.1 Implement EnlistForm with validation and submission
    - Create src/components/forms/EnlistForm.tsx (client component with useReducer)
    - Create src/components/forms/FormField.tsx (reusable input with inline error display)
    - Required fields: full name (1-100 chars), STI student email (domain validation), year level (select: 1st-4th), program/course (select from predefined list)
    - Inline validation errors adjacent to each invalid field on submit attempt
    - Form does NOT submit if any field is invalid or empty
    - Motion input fields with focus border animation
    - _Requirements: 10.7, 10.9, 10.10_

  - [x] 11.2 Implement form submission handler and error recovery
    - Create src/app/enlist/page.tsx with full enlist page layout
    - Implement form submission via serverless API route (src/app/api/enlist/route.ts)
    - On success: display confirmation message ("Application received, reviewed within 48 hours")
    - On network/server error: display error message, preserve ALL entered form data for retry
    - Prevent double-submission while request is in-flight
    - _Requirements: 10.9, 10.11_

  - [x]* 11.3 Write property test for form data preservation on error
    - **Property 4: Form Data Preservation**
    - If submission fails, all user-entered field values remain intact — no field cleared or reset
    - **Validates: Requirements 10.11**

- [x] 12. Secondary route pages
  - [x] 12.1 Implement About page (/about)
    - Create src/app/about/page.tsx
    - Club origin story, mission statement, AI-focused niche description
    - Visual timeline with 3+ milestones since 2024, scroll-triggered reveal (opacity + translateY, 600ms, stagger 80ms, chronological order)
    - Department cards with Tabler icons, department name, description (≤120 chars)
    - Timeline milestones hidden until scroll reveal activates
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

  - [x] 12.2 Implement Missions page (/missions)
    - Create src/app/missions/page.tsx
    - Full events listing from data, ordered by date ascending
    - Grouped by status: UPCOMING first, then ACTIVE, then COMPLETED
    - Reuse MissionCard component with scan-line and hover animations
    - Responsive: 1 col mobile, 2+1 tablet, 3 col desktop
    - Empty state message if no events
    - _Requirements: 6.6, 6.7, 15.1, 15.5_

  - [x] 12.3 Implement Crew page (/crew)
    - Create src/app/crew/page.tsx
    - Full officer roster using CrewCard with 3D flip
    - Grid layout: 1 per row mobile, 2 per row tablet, 3 per row desktop
    - All officers displayed with stagger entrance animation
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 15.1, 15.5_

  - [x] 12.4 Implement Signals page (/signals)
    - Create src/app/signals/page.tsx
    - All announcements in terminal-styled feed (same format as preview)
    - Ordered most recent to oldest
    - SignalEntry components with spring + typewriter animation
    - Pinned entries with amber dot indicator
    - _Requirements: 7.1, 7.2, 7.4, 7.5_

  - [x] 12.5 Implement Wingman full page (/wingman)
    - Create src/app/wingman/page.tsx
    - Full-viewport chat interface (no FAB on this page)
    - Header with Rory avatar and title
    - Reuse ChatBubble, ChatInput components from WingmanPanel
    - Same matching engine and knowledge base
    - Welcome message on mount
    - Focus trap and ARIA live region
    - _Requirements: 9.5, 9.9, 19.2, 19.6_

- [x] 13. Routing, redirects, and error pages
  - [x] 13.1 Implement /apply redirect and 404 page
    - Create src/app/apply/route.ts: HTTP 308 redirect to /enlist, preserving query params and URL fragments
    - Create src/app/not-found.tsx: custom 404 page with shared layout (Navigation + Footer), styled with aviation theme
    - Verify all routes resolve correctly: /, /about, /missions, /crew, /signals, /wingman, /enlist
    - _Requirements: 17.1, 17.2, 17.3, 17.4_

  - [x]* 13.2 Write property test for redirect completeness
    - **Property 7: Redirect Completeness**
    - /apply → /enlist preserves all query parameters and URL fragments
    - For any URL /apply?x=1#section, target is /enlist?x=1#section
    - **Validates: Requirements 17.1**

- [x] 14. Checkpoint - All pages and routing
  - Ensure all routes render correctly, page transitions work via AnimatePresence, the /apply redirect preserves params, and the 404 page displays properly. Ask the user if questions arise.

- [x] 15. Responsive design and accessibility polish
  - [x] 15.1 Implement responsive breakpoint behaviors
    - Verify all multi-column layouts stack to single column below 768px
    - Crew cards: 1/row mobile, 2/row tablet, 3/row desktop
    - Mission cards: 1 col mobile, 2+1 tablet, 3 col desktop
    - Parallax: reduce to 2 layers on mobile, disable mouse tracking
    - Partners marquee: 20s loop on mobile
    - Touch targets: min 44×44px on mobile for all interactive elements
    - Hero headline: clamp(64px, 10vw, 120px)
    - Min text sizes: 14px secondary, 16px body
    - Custom cursor: disabled below 768px
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7_

  - [x] 15.2 Implement full accessibility compliance
    - Verify keyboard navigation: Tab for sequential, Enter/Space for activation, Escape for overlays, Arrow keys within groups
    - Add ARIA labels on all interactive components, status badges, icon-only buttons
    - ARIA live regions on Wingman chat responses and dynamic content
    - Focus indicators: 2px outline #4DA3FF on all focusable elements, 3:1 contrast ratio
    - Focus trap in Wingman panel and mobile menu (open → focus in, close → focus back to trigger)
    - Skip navigation link: first focusable element, visible on focus, links to #main-content
    - Verify contrast ratios: 4.5:1 body text, 3:1 large text
    - prefers-reduced-motion: disable parallax, particles, scan-lines, typewriter, glow pulses, marquee, cursor; preserve focus indicators, content toggles, nav open/close
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7_

- [x] 16. Performance optimization
  - [x] 16.1 Implement code splitting, lazy loading, and performance targets
    - Dynamic import tsParticles (ssr: false)
    - Dynamic import GSAP hero sequence (ssr: false)
    - Lazy load below-fold sections: MissionBoardPreview, SignalBoardPreview, CrewPreview, WingmanCTA, EnlistSection, PartnersMarquee
    - Lazy load below-fold images via next/image with blur placeholder
    - Tiger mascot: priority loading (above fold)
    - Officer photos: lazy loaded
    - Partner logos: lazy loaded, small dimensions
    - Font loading: preload Bebas Neue + Inter (critical), async Space Grotesk + JetBrains Mono
    - Verify CLS < 0.1 (reserved image dimensions, font-display: swap)
    - Verify all animations use only transform + opacity
    - Add will-change hints during animations, remove after
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7_

- [x] 17. Testing
  - [x]* 17.1 Write unit tests for Wingman engine and form validation
    - Test matchQuery returns correct answers for known keywords across all 7 domains
    - Test fallback triggers when no match (score < threshold)
    - Test normalize() strips punctuation, lowercases, trims
    - Test form validation: catches empty fields, too-long name, invalid email domain, missing selections
    - Test form preserves data on error state
    - _Requirements: 9.1, 9.6, 10.9, 10.10, 10.11_

  - [x]* 17.2 Write component tests for interactive components
    - Test Navigation renders all links, transitions class on simulated scroll
    - Test CrewCard flips on click event
    - Test MissionCard renders correct status badge styling per status
    - Test EnlistForm shows inline errors for invalid submissions
    - Test WingmanFAB expands/collapses panel on click
    - Test /apply redirect preserves query params
    - _Requirements: 3.2, 6.4, 8.2, 10.10, 9.4, 17.1_

  - [x]* 17.3 Write property test for load sequence idempotency
    - **Property 1: Load Sequence Idempotency**
    - Load sequence plays exactly once per session; sessionStorage flag prevents replay
    - **Validates: Requirements 2.8, 2.9**

  - [x]* 17.4 Write property test for scroll animation one-shot
    - **Property 2: Scroll Animation One-Shot**
    - Once element entrance animation completes, re-scrolling does not replay it (once: true invariant)
    - **Validates: Requirements 14.6**

  - [x]* 17.5 Write property test for stats count-up finality
    - **Property 3: Stats Count-Up Finality**
    - After count-up completes, displayed values hold permanently — no re-trigger
    - **Validates: Requirements 4.4**

  - [x]* 17.6 Write property test for focus return guarantee
    - **Property 6: Focus Return Guarantee**
    - Opening modal components moves focus in; closing returns focus to the triggering element
    - **Validates: Requirements 19.6**

  - [x]* 17.7 Write property test for visibility pause/resume symmetry
    - **Property 8: Visibility Pause/Resume Symmetry**
    - Every animation paused on tab hidden is resumed on tab visible — no orphaned states
    - **Validates: Requirements 13.6, 13.7, 20.6**

  - [x]* 17.8 Write property test for mobile feature gates
    - **Property 9: Mobile Feature Gates**
    - Below 768px: custom cursor, mouse parallax, and multi-layer parallax produce zero side effects
    - **Validates: Requirements 12.5, 15.2, 15.6**

  - [x]* 17.9 Write property test for reduced motion completeness
    - **Property 10: Reduced Motion Completeness**
    - When prefers-reduced-motion active, all decorative animations disabled; essential transitions preserved
    - **Validates: Requirements 19.4**

- [x] 18. Final checkpoint - Full integration verification
  - Ensure all tests pass, all pages render correctly, animations perform at 55+ fps, accessibility features work (keyboard nav, screen reader, reduced motion), and the build completes without errors. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The tech stack is Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + GSAP + tsParticles
- All data is stored as TypeScript constants — no external CMS or database
- The AI Wingman is fully client-side with keyword matching — no API calls to an LLM
- Form submissions go to a serverless API route (Google Sheets webhook or Discord)
- All pages are statically generated (SSG) for maximum performance

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["1.4", "2.1", "2.2", "2.3"] },
    { "id": 3, "tasks": ["3.1", "3.2", "4.1", "4.2", "4.3", "4.4"] },
    { "id": 4, "tasks": ["6.1", "6.2"] },
    { "id": 5, "tasks": ["7.1", "7.2", "7.3"] },
    { "id": 6, "tasks": ["8.1", "8.2", "8.3", "8.4", "8.5"] },
    { "id": 7, "tasks": ["10.1"] },
    { "id": 8, "tasks": ["10.2", "10.3", "11.1"] },
    { "id": 9, "tasks": ["10.4", "11.2"] },
    { "id": 10, "tasks": ["11.3", "12.1", "12.2", "12.3", "12.4", "12.5"] },
    { "id": 11, "tasks": ["13.1"] },
    { "id": 12, "tasks": ["13.2", "15.1", "15.2"] },
    { "id": 13, "tasks": ["16.1"] },
    { "id": 14, "tasks": ["17.1", "17.2", "17.3", "17.4", "17.5", "17.6", "17.7", "17.8", "17.9"] }
  ]
}
```
