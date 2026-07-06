# Implementation Plan: Rory's World Redesign

## Overview

This plan transforms the AWS Cloud Club Global City website into a unified "Rory's World" cartoon storybook environment using a progressive enhancement approach. Foundation tokens and globals are established first, then core infrastructure components (WaveDivider, ZoneSection, FloatingClouds), followed by shared UI components, page compositions with zone flows, animations/polish, and property-based tests. All existing functionality (routes, forms, API, chatbot) is preserved throughout.

## Tasks

- [x] 1. Foundation: Design tokens and globals.css update
  - [x] 1.1 Update globals.css with cartoon design token system
    - Replace existing CSS custom properties in `:root` with the full token set: zone backgrounds (--zone-sky through --zone-night), brand accents (--accent-orange, --accent-blue, --accent-warm, --accent-green, --accent-coral), text colors (--primary-text, --secondary-text, --text-on-dark), structural vars (--border-color, --radius-card, --radius-button, --shadow-offset), font tokens (--font-heading, --font-body, --font-mono), and spacing tokens (--section-padding-desktop, --section-padding-mobile, --container-max)
    - Add `@media (prefers-reduced-motion: reduce)` rule that disables all non-essential animations site-wide
    - Add `.animations-paused` class that pauses all CSS animations (for Page Visibility API)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

  - [x] 1.2 Add cartoon component classes to globals.css
    - Add `.card-cartoon` class: 2px solid #1A1A2A border, 16px border-radius, white background, 3px offset shadow, hover translate(-3px,-3px) with 6px shadow, 250ms cubic-bezier transition
    - Add `.btn-primary` class: orange gradient background, white text, 2px dark border, pill shape (999px radius), 3px shadow, hover/active states
    - Add `.btn-ghost` class: transparent bg, dark text, 2px dark border, pill shape, 3px shadow
    - Add `.btn-ghost-dark` class: transparent bg, white text, 2px light border, pill shape, 3px shadow
    - Add button hover (translate -2px,-2px) and active (translate 1px,1px) states
    - Add zone background classes: `.zone-sky`, `.zone-cloud`, `.zone-ground`, `.zone-airfield`, `.zone-hangar`, `.zone-runway`, `.zone-night`
    - Add `.zone-section` class: position relative, overflow visible
    - Add `.headline-underline::after` pattern: 60px wide, 3px height, orange bar centered
    - Add `.cartoon-badge` class for tag pills
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 13.1, 13.2, 13.3, 13.4, 13.5, 19.5, 19.6, 19.7, 24.1, 24.2, 24.3_

  - [x] 1.3 Create CSS keyframe animations file
    - Create `src/styles/cartoon-keyframes.css` with keyframes: `float-rory` (3s ease-in-out translateY 0→-8px→0), `pulse-dot` (scale 1→1.4→1, opacity 1→0.6→1), `cloud-float` (translateX -10%→110% with staggered durations), `fab-pulse` (scale 1→1.06→1)
    - Add `.float-rory`, `.pulse-dot`, `.pulse-dot-orange`, `.cloud-element` animation classes
    - Add reduced-motion media query disabling all keyframes
    - Import this file in globals.css or layout.tsx
    - _Requirements: 7.2, 14.1, 14.2, 14.3, 15.1, 16.1, 16.2, 16.3, 16.4, 18.1_

  - [x] 1.4 Create zone constants and configuration file
    - Create `src/lib/zones.ts` with: `ZONE_COLORS` constant object mapping zone names to hex values, `ZoneName` type, `PAGE_ZONE_FLOWS` record mapping routes to zone sequences, `WAVE_PATHS` record with 4 SVG path d-attributes
    - Export all types and constants for use across components
    - _Requirements: 5.1, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 2. Core infrastructure components
  - [x] 2.1 Create WaveDivider component
    - Create `src/components/zones/WaveDivider.tsx` implementing the `WaveDividerProps` interface (type 1-4, fillColor, flip, className)
    - Render inline SVG with the correct wave path from `WAVE_PATHS`, fillColor applied to the path fill attribute
    - Position absolute bottom:-1px, z-index:10, width:100%, preserveAspectRatio="none"
    - Apply responsive height: 40px mobile, 60px tablet (768px), 80px desktop (1024px)
    - Apply scaleY(-1) transform when flip is true
    - Default to type 1 if invalid type provided
    - Add aria-hidden="true" to the SVG
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 18.2, 22.6, 24.4_

  - [ ]* 2.2 Write property test for WaveDivider fill and flip
    - **Property 1: WaveDivider renders correct fill for any valid color**
    - Generate random hex color strings and boolean flip values using fast-check
    - Verify SVG path fill attribute equals the provided color
    - Verify container transform includes scaleY(-1) if and only if flip is true
    - **Validates: Requirements 4.2**

  - [x] 2.3 Create ZoneSection wrapper component
    - Create `src/components/zones/ZoneSection.tsx` implementing the `ZoneSectionProps` interface (zone, children, className, id)
    - Apply correct zone background class (`.zone-sky`, `.zone-cloud`, etc.) based on zone prop
    - Apply `position: relative` and `overflow: visible` for WaveDivider children
    - Fall back to `.zone-cloud` and log console.warn for invalid zone names
    - _Requirements: 24.1, 24.2, 24.3_

  - [x] 2.4 Create FloatingClouds component
    - Create `src/components/zones/FloatingClouds.tsx` implementing the `FloatingCloudsProps` interface (count, className)
    - Render white ellipse elements with CSS-only cloud-float keyframe animations
    - Stagger animation durations between 15s and 30s per element
    - Use only transform and opacity for GPU acceleration
    - Respect prefers-reduced-motion: display clouds in static positions when reduced
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 18.4_

- [x] 3. Checkpoint - Ensure foundation builds correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Shared UI components
  - [-] 4.1 Create PageHero component
    - Create `src/components/hero/PageHero.tsx` implementing the `PageHeroProps` interface (title, subtitle, roryVariant, nextZoneColor)
    - Render sky zone background with centered title (Bebas Neue), subtitle (Nunito), and Rory mascot image
    - Use next/image with priority loading for Rory at 120px mobile / 160px desktop
    - Apply `.float-rory` animation class to Rory image
    - Render WaveDivider at bottom with nextZoneColor as fillColor
    - Respect prefers-reduced-motion for Rory animation
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 18.3_

  - [x] 4.2 Update MissionCard to cartoon style
    - Modify `src/components/cards/MissionCard.tsx` to use `.card-cartoon` class
    - Add 4px colored top accent bar: green for active, orange for upcoming, gray for completed
    - Add pulsing status dot using `.pulse-dot` class (green=active, orange=upcoming, static gray=completed)
    - Add tag pills row using `.cartoon-badge` class
    - Ensure all required fields rendered: title, date, description, status badge, tag pills
    - Disable pulse animation when prefers-reduced-motion is set
    - _Requirements: 9.3, 16.1, 16.2, 16.3, 16.4_

  - [ ]* 4.3 Write property test for MissionCard field rendering
    - **Property 3: MissionCard renders all required fields for any valid mission data**
    - Generate random mission data objects (title, date, description, status, tags array) using fast-check
    - Verify all five fields appear in the rendered DOM output
    - **Validates: Requirements 9.3**

  - [x] 4.4 Update CrewCard to initials avatar style
    - Modify `src/components/cards/CrewCard.tsx` to use `.card-cartoon` class
    - Remove any 3D flip behavior and gradient blob placeholder
    - Implement circular initials avatar: 64px diameter, solid accentColor background, white centered initials
    - Compute initials from name (first letter of first word + first letter of last word, uppercase)
    - Add colored top bar (4px, accentColor)
    - Display name in --font-heading, role in --font-body
    - _Requirements: 9.4, 19.1_

  - [ ]* 4.5 Write property test for CrewCard initials computation
    - **Property 2: CrewCard computes correct initials for any valid name**
    - Generate random name strings (1-3 words) using fast-check
    - Verify initials equal uppercase first char of first word + uppercase first char of last word (if present)
    - **Validates: Requirements 9.4**

  - [x] 4.6 Create AnnouncementRow component
    - Create `src/components/cards/AnnouncementRow.tsx` implementing the `AnnouncementRowProps` interface (text, timestamp, pinned)
    - Render flex-row with optional pulsing orange dot (pinned indicator using `.pulse-dot-orange`)
    - Display timestamp in --font-mono styled element
    - Display announcement text in --font-body
    - _Requirements: 9.5_

  - [ ]* 4.7 Write property test for AnnouncementRow rendering
    - **Property 4: AnnouncementRow renders all required fields for any valid announcement**
    - Generate random announcement data (text, timestamp, pinned boolean) using fast-check
    - Verify timestamp rendered in monospace element, text content present, pinned dot present if and only if pinned is true
    - **Validates: Requirements 9.5**

  - [-] 4.8 Update SectionLabel component
    - Modify `src/components/ui/SectionLabel.tsx` to render pill-shaped element with colored dot indicator and uppercase text in --font-mono
    - _Requirements: 9.1_

  - [-] 4.9 Create WingmanChatPreview component
    - Create `src/components/sections/WingmanChatPreview.tsx` rendering a speech-bubble styled chat mockup with user question bubble and Rory response bubble
    - _Requirements: 9.6_

  - [-] 4.10 Update EnlistBenefitCard
    - Modify `src/components/cards/BenefitCard.tsx` to use `.card-cartoon` class with Tabler outline icon, bold title, and descriptive paragraph
    - _Requirements: 9.7_

- [x] 5. Checkpoint - Ensure shared components build and render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Navigation and layout updates
  - [x] 6.1 Update Navigation component
    - Modify `src/components/layout/Navigation.tsx` for sky-transparent → frosted-white scroll transition
    - At top (sky zone): transparent background with rgba sky-blue tint + backdrop-blur
    - On scroll past hero: white frosted-glass background with backdrop-blur + subtle bottom border
    - Add skip-navigation link as first focusable element
    - Add hamburger button on mobile (<768px) opening full-screen overlay menu
    - Mobile menu: prevent body scroll, support Escape key to close, Tab cycling through links
    - Ensure 48px minimum touch targets on mobile
    - Add "JOIN NOW" .btn-primary button as last nav item
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 22.1, 22.7_

  - [x] 6.2 Update layout.tsx for font loading
    - Update `src/app/layout.tsx` to load Nunito via next/font (in addition to existing Bebas Neue, JetBrains Mono)
    - Set font display: swap for all fonts
    - Add Page Visibility API handler to toggle `.animations-paused` class on document.documentElement
    - _Requirements: 14.4, 18.7_

  - [x] 6.3 Update Footer with night zone styling
    - Apply `.zone-night` background class to footer component
    - Ensure text uses --text-on-dark color
    - _Requirements: 5.9_

- [x] 7. Home page zone flow composition
  - [x] 7.1 Refactor home page with full zone flow
    - Modify `src/app/page.tsx` to render sections in zone order: Sky → Cloud → Ground → Airfield → Hangar → Runway → Night
    - Wrap each section group in ZoneSection with correct zone prop
    - Insert WaveDivider between every adjacent zone change with correct fillColor (destination zone color) and varied types
    - Place HeroSection + FloatingClouds in sky zone
    - Place StatsStrip + AboutSnippet in cloud zone
    - Place MissionBoardPreview in ground zone
    - Place SignalBoardPreview in airfield zone
    - Place CrewPreview in hangar zone
    - Place WingmanCTA in runway zone
    - Place EnlistSection + PartnersMarquee + Footer in night zone
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9_

  - [x] 7.2 Update HeroSection for sky zone
    - Modify `src/components/hero/HeroSection.tsx` to use `.zone-sky` background
    - Simplify to mascot + headline + CTAs (remove parallax layers if present)
    - Add FloatingClouds as ambient background
    - Use Rory mascot with `.float-rory` animation
    - _Requirements: 5.3, 14.2_

  - [x] 7.3 Update StatsStrip for cloud zone
    - Modify `src/components/sections/StatsStrip.tsx` (or equivalent) to use `.zone-cloud` background
    - Render 4 stats in horizontal row (desktop) / 2x2 grid (mobile)
    - Use CountUp animation with IntersectionObserver at 50% threshold, easeOutExpo over 1800ms
    - Disconnect observer after triggering
    - Respect prefers-reduced-motion
    - _Requirements: 9.2, 12.1, 12.2, 12.3, 18.5_

  - [x] 7.4 Update AboutSnippet for cloud zone
    - Modify `src/components/sections/AboutSnippet.tsx` to use `.zone-cloud` background and cartoon card styling
    - _Requirements: 5.4_

  - [x] 7.5 Update MissionBoardPreview for ground zone
    - Modify `src/components/sections/MissionBoardPreview.tsx` (or equivalent) to use `.zone-ground` background
    - Use updated MissionCard components with cartoon styling
    - _Requirements: 5.5_

  - [x] 7.6 Update SignalBoardPreview for airfield zone
    - Modify `src/components/sections/SignalBoardPreview.tsx` to use `.zone-airfield` background
    - Update to use AnnouncementRow pattern
    - _Requirements: 5.6_

  - [x] 7.7 Update CrewPreview for hangar zone
    - Update crew preview section to use `.zone-hangar` background
    - Use updated CrewCard components with initials avatars
    - _Requirements: 5.7_

  - [x] 7.8 Update WingmanCTA for runway zone
    - Modify `src/components/sections/WingmanCTA.tsx` to use `.zone-runway` background (replacing baby blue/tarmac)
    - Add WingmanChatPreview chat bubble mockup
    - Use --text-on-dark for text color
    - _Requirements: 5.8, 19.3_

  - [x] 7.9 Update EnlistSection for night zone
    - Modify `src/components/sections/EnlistSection.tsx` to use `.zone-night` background
    - Use white text with subtle text-shadow, remove rainbow gradient text
    - _Requirements: 5.9, 19.2_

  - [x] 7.10 Update PartnersMarquee for night zone
    - Modify `src/components/sections/PartnersMarquee.tsx` to use `.zone-night` background
    - Add horizontal gradient fade masks on both edges
    - _Requirements: 5.9, 19.4_

- [x] 8. Checkpoint - Ensure home page renders full zone flow correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Inner page compositions
  - [x] 9.1 Update /about page with zone flow
    - Modify `src/app/about/page.tsx` to use PageHero (sky) → cloud zone (origin story) → ground zone (timeline, departments) → night zone (footer)
    - Insert WaveDividers between each zone change
    - Render origin story section, vertical timeline with dashed orange line and milestone cards, departments grid
    - _Requirements: 6.1, 6.7, 20.1_

  - [x] 9.2 Update /missions page with zone flow
    - Modify `src/app/missions/page.tsx` to use PageHero (sky) → ground zone (mission grid) → night zone (footer)
    - Insert WaveDividers between each zone change
    - Render filter buttons for status categories, responsive MissionCard grid, empty state with Rory
    - _Requirements: 6.2, 6.7, 20.2_

  - [x] 9.3 Update /crew page with zone flow
    - Modify `src/app/crew/page.tsx` to use PageHero (sky) → hangar zone (crew grid) → night zone (footer)
    - Insert WaveDividers between each zone change
    - Render responsive grid of CrewCard components grouped by office/department
    - _Requirements: 6.3, 6.7, 20.3_

  - [x] 9.4 Update /signals page with zone flow
    - Modify `src/app/signals/page.tsx` to use PageHero (sky) → cloud zone (signals feed) → night zone (footer)
    - Insert WaveDividers between each zone change
    - Render centered feed of AnnouncementRows with pinned/latest filter tabs and load-more button
    - _Requirements: 6.4, 6.7, 20.4_

  - [x] 9.5 Update /wingman page with zone flow
    - Modify `src/app/wingman/page.tsx` to use PageHero (sky) → hangar zone (chat interface) → night zone (footer)
    - Insert WaveDividers between each zone change
    - Render 2-column layout on desktop (sidebar + chat panel), full-width chat on mobile
    - _Requirements: 6.5, 6.7, 20.5_

  - [x] 9.6 Update /enlist page with zone flow
    - Modify `src/app/enlist/page.tsx` to use PageHero (sky) → ground zone (form) → night zone (footer)
    - Insert WaveDividers between each zone change
    - Render Card_Cartoon enrollment form with focused orange border styling and success state with Rory
    - _Requirements: 6.6, 6.7, 20.6_

- [x] 10. Animations and interactive polish
  - [x] 10.1 Update ScrollReveal component
    - Modify `src/components/animations/ScrollReveal.tsx` to animate from opacity:0, translateY:30px to opacity:1, translateY:0
    - Use Framer Motion viewport={{ once: true, amount: 0.15 }}
    - Stagger children at 0.06s delay
    - Respect prefers-reduced-motion (show immediately without animation)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 18.6_

  - [x] 10.2 Update WingmanFAB with pulse and expand
    - Modify wingman FAB component to add CSS `fab-pulse` idle animation
    - Implement clip-path animation for expand on click
    - Hide FAB on /wingman route
    - Disable pulse when prefers-reduced-motion is set
    - _Requirements: 15.1, 15.2, 15.3, 15.4_

  - [x] 10.3 Add focus indicators and accessibility polish
    - Add visible focus indicators: 3px solid orange outline with 3px offset on all interactive elements
    - Ensure all decorative images/SVGs have aria-hidden="true"
    - Ensure all meaningful images have descriptive alt text
    - Verify mobile touch targets are 48px minimum
    - Add full-width buttons on mobile (<768px)
    - _Requirements: 17.6, 17.7, 22.2, 22.3, 22.4, 22.5, 22.6_

- [x] 11. Cleanup and existing functionality verification
  - [x] 11.1 Remove replaced divider components
    - Delete `src/components/effects/CloudDivider.tsx`, `src/components/effects/GrassDivider.tsx`, `src/components/effects/RunwayDivider.tsx`
    - Update any imports referencing these deleted components to use WaveDivider instead
    - _Requirements: 21.7_

  - [x] 11.2 Verify existing functionality preservation
    - Ensure all routes resolve: /, /about, /missions, /crew, /signals, /wingman, /enlist, and /apply redirect to /enlist
    - Verify AI Wingman chatbot FAB trigger and full-page chat interface work
    - Verify enlist form submission to /api/enlist endpoint
    - Verify Signal Board content display
    - Verify Mission Board content and any tag filtering
    - Verify Crew Roster data display across all categories
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6_

- [x] 12. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at reasonable breaks
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The implementation preserves all existing routes and functionality — only visual styles and component structures are updated
- All animations respect `prefers-reduced-motion` media query throughout
- TypeScript is used for all new and modified files

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.4"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["2.1", "2.3", "2.4"] },
    { "id": 3, "tasks": ["2.2", "4.1", "4.8", "4.9", "4.10"] },
    { "id": 4, "tasks": ["4.2", "4.4", "4.6", "6.1", "6.2", "6.3"] },
    { "id": 5, "tasks": ["4.3", "4.5", "4.7"] },
    { "id": 6, "tasks": ["7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8", "7.9", "7.10"] },
    { "id": 7, "tasks": ["9.1", "9.2", "9.3", "9.4", "9.5", "9.6"] },
    { "id": 8, "tasks": ["10.1", "10.2", "10.3"] },
    { "id": 9, "tasks": ["11.1", "11.2"] }
  ]
}
```
