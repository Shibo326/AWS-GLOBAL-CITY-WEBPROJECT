# Requirements Document

## Introduction

This document specifies the requirements for the "Rory's World" cartoon theme redesign of the AWS Cloud Club Global City website. The redesign transforms the site into a unified cartoon storybook world where every page feels like one continuous illustrated environment — flowing from sky (hero) through cloud, ground, airfield, hangar, runway, to night (footer) — with no jarring background color cuts between sections. The target audience is STI Global City students discovering the AWS Cloud Club, potential members wanting to enlist, and current members checking events and announcements. The tech stack is Next.js 14 (App Router), Tailwind CSS, Framer Motion, TypeScript, Tabler Icons, and Google Fonts (Bebas Neue, Nunito, JetBrains Mono).

## Glossary

- **Design_System**: The foundational CSS variable token system, component classes, and typography definitions that establish the cartoon world visual language
- **WaveDivider**: An SVG-based React component that creates smooth organic wave transitions between zone background colors, eliminating hard visual cuts
- **Zone**: A distinct background color region representing a layer of the cartoon storybook world (sky, cloud, ground, airfield, hangar, runway, night)
- **Home_Page**: The root route (/) that displays all major sections in a single scrollable storybook flow
- **Inner_Page**: Any route other than the home page (/about, /missions, /crew, /signals, /wingman, /enlist)
- **FloatingClouds**: A set of CSS-animated white ellipse elements that drift across sky zone sections without JavaScript
- **PageHero**: A reusable inner page banner component featuring Rory, title, subtitle, and a WaveDivider at the bottom
- **SectionLabel**: A pill-shaped label component with a decorative dot and text used above section headings
- **StatsStrip**: A horizontal strip displaying four animated statistics with count-up animation
- **MissionCard**: A cartoon-styled card component displaying event information with status-colored top accent and tags
- **CrewCard**: A cartoon-styled card displaying officer information with an initials-based circular avatar and colored top bar (STATE A)
- **AnnouncementRow**: A flex-row component displaying a signal entry with pinned indicator, timestamp, and text
- **WingmanChatPreview**: A chat bubble mockup component demonstrating the AI Wingman feature
- **EnlistBenefitCard**: A card component displaying a Tabler icon, title, and body text for enlistment benefits
- **Navbar**: The global navigation bar that transitions from transparent on sky to frosted white on scroll
- **ScrollReveal**: A Framer Motion wrapper component that animates children into view on scroll
- **CountUp**: An animation component that counts numbers from zero to a target value using IntersectionObserver
- **WingmanFAB**: A floating action button for the AI Wingman chatbot with pulse idle and clip-path expand animation
- **Renderer**: The Next.js 14 App Router rendering system with Tailwind CSS, Framer Motion, and TypeScript
- **Cloud_Pilot**: The brand term for AWS Cloud Club members
- **Mission**: The brand term for club events
- **Signal**: The brand term for club announcements
- **Crew**: The brand term for club officers
- **Headline_Underline**: A single solid orange decorative line (60px wide, 3px height) used under section headings
- **Card_Cartoon**: The base cartoon card class using 2px dark border, 16px radius, and 3px offset shadow

## Requirements

### Requirement 1: Design Token System

**User Story:** As a developer, I want a complete CSS variable token system for the cartoon world theme, so that all components use consistent colors, typography, and spacing throughout the storybook environment.

#### Acceptance Criteria

1. THE Design_System SHALL define zone background color CSS variables: --zone-sky (#87CEEB), --zone-cloud (#F0F8FF), --zone-ground (#F5EDD0), --zone-airfield (#E8F0D8), --zone-hangar (#D4E8D4), --zone-runway (#2C3E50), --zone-night (#1A1A2E)
2. THE Design_System SHALL define brand accent color tokens: --accent-orange (#FF8C00), --accent-blue (#00B8D4), --accent-warm (#FFB300), --accent-green (#00C853), --accent-coral (#FF6E6E)
3. THE Design_System SHALL define text color tokens: --primary-text (#1A1A2A) for headings and body, --secondary-text (#4A4A6A) for captions, and --text-on-dark (#E0E0E0) for use on runway and night zones
4. THE Design_System SHALL define cartoon structural variables: --border-color (#1A1A2A), --radius-card (16px), --radius-button (999px), --shadow-offset (3px)
5. THE Design_System SHALL define font-family tokens: --font-heading (Bebas Neue) for headlines, --font-body (Nunito) for body text and CTAs, --font-mono (JetBrains Mono) for labels, timestamps, and meta text
6. THE Design_System SHALL define spacing tokens: --section-padding-desktop (80px), --section-padding-mobile (40px), --container-max (1280px)
7. THE Design_System SHALL support a prefers-reduced-motion media query that disables all non-essential animations site-wide

### Requirement 2: Cartoon Card System

**User Story:** As a developer, I want a reusable cartoon card class system, so that all cards across the site share the same illustrated comic-panel aesthetic.

#### Acceptance Criteria

1. THE Design_System SHALL provide a .card-cartoon class with a 2px solid dark border (#1A1A2A), 16px border-radius, solid white background, and 3px offset solid shadow (#1A1A2A)
2. WHEN a user hovers over a Card_Cartoon element, THE Design_System SHALL apply a translate(-3px, -3px) transform and increase the shadow offset to 6px with a smooth 250ms cubic-bezier transition
3. WHEN a user stops hovering over a Card_Cartoon element, THE Design_System SHALL return the card to its original position and shadow with a smooth 250ms transition
4. THE Design_System SHALL ensure Card_Cartoon backgrounds use a solid white fill (#FFFFFF) for readability against all zone backgrounds

### Requirement 3: Cartoon Button System

**User Story:** As a developer, I want a cartoon button system with primary, ghost, and dark variants, so that CTAs are visually consistent and accessible across all zone backgrounds.

#### Acceptance Criteria

1. THE Design_System SHALL provide a .btn-primary class with orange gradient background, white text, 2px dark border (#1A1A2A), pill shape (border-radius: 999px), and 3px offset shadow
2. THE Design_System SHALL provide a .btn-ghost class with transparent background, dark text, 2px dark border, pill shape, and 3px offset shadow for light zone backgrounds
3. THE Design_System SHALL provide a .btn-ghost-dark class with transparent background, white text, 2px light border, pill shape, and 3px offset shadow for runway and night zone backgrounds
4. WHEN a user hovers over any cartoon button, THE Design_System SHALL apply a translate(-2px, -2px) transform and increase the shadow offset with a smooth transition
5. WHEN a user presses any cartoon button, THE Design_System SHALL apply a translate(1px, 1px) transform and decrease the shadow offset to simulate a pressed state
6. THE Design_System SHALL ensure all button text meets WCAG AA contrast ratio (4.5:1) against the button background

### Requirement 4: WaveDivider Component

**User Story:** As a developer, I want a reusable SVG wave divider component with multiple path variations, so that zone color transitions are smooth organic shapes instead of hard background cuts.

#### Acceptance Criteria

1. THE WaveDivider SHALL render an inline SVG element with four selectable wave path types (type 1, type 2, type 3, type 4) for visual variety
2. THE WaveDivider SHALL accept a fillColor prop matching the destination zone color and a flip boolean prop for inverted placement
3. THE WaveDivider SHALL be positioned absolute at the bottom of its parent section with bottom: -1px and z-index: 10
4. THE WaveDivider SHALL require its parent section wrapper to have position: relative and overflow: visible
5. THE WaveDivider SHALL render at 80px height on desktop viewports (1024px and above), 60px on tablet viewports (768px to 1023px), and 40px on mobile viewports (below 768px)
6. THE WaveDivider SHALL use inline SVG JSX rendering without external file network requests
7. THE WaveDivider SHALL span 100% width of its parent container with preserveAspectRatio set to none

### Requirement 5: Home Page Zone Flow

**User Story:** As a user, I want to scroll through the home page and experience a continuous storybook world flowing from sky to night, so that the site feels like one immersive illustrated environment.

#### Acceptance Criteria

1. THE Home_Page SHALL render sections in this zone order: Sky → Cloud → Ground → Airfield → Hangar → Runway → Night
2. THE Home_Page SHALL render a WaveDivider between every adjacent zone where the background color changes
3. THE Home_Page SHALL place the Hero section in the sky zone (#87CEEB)
4. THE Home_Page SHALL place the Stats and About sections in the cloud zone (#F0F8FF)
5. THE Home_Page SHALL place the Missions preview section in the ground zone (#F5EDD0)
6. THE Home_Page SHALL place the Signals preview section in the airfield zone (#E8F0D8)
7. THE Home_Page SHALL place the Crew preview section in the hangar zone (#D4E8D4)
8. THE Home_Page SHALL place the Wingman CTA section in the runway zone (#2C3E50)
9. THE Home_Page SHALL place the Enlist, Partners, and Footer sections in the night zone (#1A1A2E)

### Requirement 6: Inner Page Zone Transitions

**User Story:** As a user navigating inner pages, I want the same seamless storybook zone flow, so that the cartoon world remains consistent across all routes.

#### Acceptance Criteria

1. THE Inner_Page for /about SHALL transition through zones: sky → cloud → ground → night with WaveDividers between each zone change
2. THE Inner_Page for /missions SHALL transition through zones: sky → ground → night with WaveDividers between each zone change
3. THE Inner_Page for /crew SHALL transition through zones: sky → hangar → night with WaveDividers between each zone change
4. THE Inner_Page for /signals SHALL transition through zones: sky → cloud → night with WaveDividers between each zone change
5. THE Inner_Page for /wingman SHALL transition through zones: sky → hangar → night with WaveDividers between each zone change
6. THE Inner_Page for /enlist SHALL transition through zones: sky → ground → night with WaveDividers between each zone change
7. WHEN any Inner_Page renders, THE PageHero SHALL display at the top with sky zone background, page title, subtitle, Rory mascot, and a WaveDivider at the bottom transitioning to the next zone

### Requirement 7: FloatingClouds Component

**User Story:** As a user, I want to see gentle floating cloud shapes drifting across sky zone sections, so that the cartoon sky feels alive and animated.

#### Acceptance Criteria

1. THE FloatingClouds SHALL render white ellipse elements positioned within sky zone sections using CSS-only implementation (no JavaScript animation runtime)
2. THE FloatingClouds SHALL animate each ellipse using CSS keyframe animations with translateX movement and durations staggered between 15 seconds and 30 seconds
3. THE FloatingClouds SHALL use only transform and opacity CSS properties for animation to maintain GPU acceleration
4. WHILE the prefers-reduced-motion media query is set to reduce, THE FloatingClouds SHALL disable all keyframe animations and display clouds in static positions

### Requirement 8: PageHero Component

**User Story:** As a developer, I want a reusable page hero banner for inner pages, so that every inner page has a consistent branded header with Rory.

#### Acceptance Criteria

1. THE PageHero SHALL accept title, subtitle, and optional Rory image variant as props
2. THE PageHero SHALL render with sky zone background (#87CEEB), centered content, and a WaveDivider at the bottom edge transitioning to the next zone
3. THE PageHero SHALL display the Rory mascot image at 120px height on mobile and 160px on desktop using next/image with priority loading
4. THE PageHero SHALL apply the float-rory CSS keyframe animation (3s ease-in-out infinite vertical bob) to the Rory image
5. WHILE the prefers-reduced-motion media query is set to reduce, THE PageHero SHALL display the Rory image without animation

### Requirement 9: Shared UI Components

**User Story:** As a developer, I want a library of shared cartoon-styled UI components, so that sections across all pages maintain visual consistency.

#### Acceptance Criteria

1. THE SectionLabel SHALL render a pill-shaped element with a colored dot indicator and uppercase text styled with the --font-mono token
2. THE StatsStrip SHALL render four statistics in a horizontal row on desktop and a 2x2 grid on mobile, each with a CountUp animation triggered by IntersectionObserver at 50% viewport entry
3. THE MissionCard SHALL render as a Card_Cartoon with a status-colored top accent bar (4px height), mission title, date, description, status badge, and a row of tag pills
4. THE CrewCard SHALL render as a Card_Cartoon with a colored top bar, circular initials-based avatar (solid background color, centered initials text), officer name, and role title without any photograph or 3D flip behavior
5. THE AnnouncementRow SHALL render as a flex row with optional pinned dot indicator (orange pulsing dot for pinned items), formatted timestamp in mono font, and announcement text
6. THE WingmanChatPreview SHALL render a speech-bubble styled chat mockup with a user question bubble and a Rory response bubble
7. THE EnlistBenefitCard SHALL render as a Card_Cartoon with a Tabler outline icon, bold title heading, and descriptive body paragraph

### Requirement 10: Navbar Behavior

**User Story:** As a user, I want a navigation bar that adapts to the current scroll position and works well on mobile, so that I can navigate the site without the nav clashing with the cartoon world.

#### Acceptance Criteria

1. WHILE the page scroll position is at the top (within the sky zone), THE Navbar SHALL display with a transparent background with rgba sky-blue tint and backdrop-blur
2. WHEN the user scrolls past the hero section, THE Navbar SHALL transition to a white frosted-glass background with backdrop-blur and a subtle bottom border
3. THE Navbar SHALL render a hamburger button on viewports below 768px that opens a full-screen overlay mobile menu
4. WHEN the mobile menu is open, THE Navbar SHALL prevent body scroll and support Escape key to close
5. THE Navbar SHALL ensure all interactive elements have a minimum touch target of 48px on mobile
6. THE Navbar SHALL include a skip-navigation link as the first focusable element
7. THE Navbar SHALL include a "JOIN NOW" button using the .btn-primary class as the last navigation item

### Requirement 11: Scroll Reveal Animations

**User Story:** As a user, I want content to animate smoothly into view as I scroll, so that the storybook world feels dynamic and engaging.

#### Acceptance Criteria

1. THE ScrollReveal SHALL animate children from opacity 0 to 1 and translateY 30px to 0px when the element enters the viewport
2. THE ScrollReveal SHALL stagger multiple sibling elements with a 0.06 second delay between each child
3. THE ScrollReveal SHALL trigger animations only once per element using Framer Motion viewport={{ once: true }}
4. WHILE the prefers-reduced-motion media query is set to reduce, THE ScrollReveal SHALL display content immediately without animation

### Requirement 12: Stats Count-Up Animation

**User Story:** As a user, I want to see statistics count up from zero when they scroll into view, so that the numbers feel impactful and draw attention.

#### Acceptance Criteria

1. WHEN the StatsStrip enters 50% of the viewport, THE CountUp SHALL animate each number from 0 to its target value using easeOutExpo easing over 1800 milliseconds
2. THE CountUp SHALL use IntersectionObserver to detect viewport entry and disconnect the observer after triggering to prevent re-observation
3. WHILE the prefers-reduced-motion media query is set to reduce, THE CountUp SHALL display the final target values immediately without animation

### Requirement 13: Card and Button Hover Animations

**User Story:** As a user, I want interactive feedback when hovering and clicking cards and buttons, so that the cartoon world feels responsive and tactile.

#### Acceptance Criteria

1. WHEN a user hovers over a Card_Cartoon element, THE Design_System SHALL apply CSS-only translate(-3px, -3px) and increase the shadow offset
2. WHEN a user hovers over a cartoon button, THE Design_System SHALL apply CSS-only translate(-2px, -2px) and increase the shadow offset
3. WHEN a user activates (mousedown) a cartoon button, THE Design_System SHALL apply CSS-only translate(1px, 1px) and decrease the shadow offset
4. THE Design_System SHALL use only transform and box-shadow CSS properties for all hover animations to maintain GPU acceleration
5. WHILE the prefers-reduced-motion media query is set to reduce, THE Design_System SHALL disable transform animations on hover and show only static shadow changes

### Requirement 14: Rory Idle Float Animation

**User Story:** As a user, I want to see Rory gently floating in the hero and page banners, so that the mascot feels alive and friendly.

#### Acceptance Criteria

1. THE Renderer SHALL define a float-rory CSS keyframe that produces gentle vertical bobbing (translateY oscillation of approximately 8px) over a 3 second ease-in-out infinite cycle
2. THE Renderer SHALL apply the float-rory animation to all Rory mascot images in hero sections and page banners
3. WHILE the prefers-reduced-motion media query is set to reduce, THE Renderer SHALL display Rory in a static position without the float animation
4. WHEN the browser tab becomes hidden (Page Visibility API visibilitychange event), THE Renderer SHALL pause all CSS animations including float-rory to conserve resources

### Requirement 15: Wingman FAB Animations

**User Story:** As a user, I want the AI Wingman floating button to pulse gently when idle and expand smoothly when clicked, so that it feels inviting without being intrusive.

#### Acceptance Criteria

1. WHILE the WingmanFAB is in idle state, THE WingmanFAB SHALL display a gentle pulse animation using a CSS keyframe scale oscillation
2. WHEN a user activates the WingmanFAB, THE WingmanFAB SHALL expand using a clip-path animation to reveal the chat interface
3. WHILE the current route is /wingman, THE WingmanFAB SHALL be hidden since the full wingman page is displayed
4. WHILE the prefers-reduced-motion media query is set to reduce, THE WingmanFAB SHALL display without the idle pulse animation

### Requirement 16: Active Mission Pulse Dot

**User Story:** As a user, I want active mission status badges to pulse, so that I can quickly identify which missions are currently active.

#### Acceptance Criteria

1. WHEN a MissionCard has an active status, THE MissionCard SHALL display a pulsing green dot indicator using a CSS keyframe animation
2. WHEN a MissionCard has an upcoming status, THE MissionCard SHALL display a pulsing orange dot indicator
3. WHEN a MissionCard has a completed status, THE MissionCard SHALL display a static gray dot without animation
4. WHILE the prefers-reduced-motion media query is set to reduce, THE MissionCard SHALL display all status dots as static colored circles without pulse animation

### Requirement 17: Mobile-First Responsive Design

**User Story:** As a mobile user on a 375px viewport, I want the entire cartoon world to adapt gracefully, so that the storybook experience is equally engaging on small screens.

#### Acceptance Criteria

1. THE Renderer SHALL use a mobile-first approach where the 375px base layout is the default, with breakpoints at 768px (md) and 1024px (lg) adding complexity
2. WHEN the viewport is below 768px, THE Renderer SHALL collapse all multi-column grids to single-column layouts with stacked content
3. WHEN the viewport is below 768px, THE WaveDivider SHALL render at 40px height
4. WHEN the viewport is between 768px and 1023px, THE Renderer SHALL render 2-column grids and the WaveDivider at 60px height
5. WHEN the viewport is 1024px or above, THE Renderer SHALL render 3-column grids where applicable and the WaveDivider at 80px height
6. THE Renderer SHALL ensure all interactive elements (buttons, links, nav items) have a minimum touch target size of 48px on mobile
7. WHEN the viewport is below 768px, THE Renderer SHALL render buttons as full-width (100%) block elements
8. THE Renderer SHALL apply section padding of 40px vertical on mobile and 80px vertical on desktop

### Requirement 18: Performance Optimization

**User Story:** As a user on any device, I want the site to load quickly and animate smoothly at 60fps, so that the cartoon world experience is not degraded by performance issues.

#### Acceptance Criteria

1. THE Renderer SHALL use only transform and opacity CSS properties for all animations to prevent layout thrashing and repaints
2. THE Renderer SHALL render all WaveDivider SVGs as inline JSX without external file network requests
3. THE Renderer SHALL load the Rory hero image using next/image with the priority attribute for above-fold content only
4. THE FloatingClouds SHALL use CSS-only keyframe animations without JavaScript animation runtime overhead
5. THE CountUp SHALL disconnect its IntersectionObserver instance after the count-up animation completes
6. THE ScrollReveal SHALL use Framer Motion viewport={{ once: true }} to prevent re-triggering animations on repeated scroll
7. WHEN the browser tab becomes hidden (Page Visibility API), THE Renderer SHALL pause all running CSS and JavaScript animations to conserve CPU and battery

### Requirement 19: Visual Polish and Broken Section Fixes

**User Story:** As a user, I want previously broken visual elements corrected and rainbow/multicolor gradients removed, so that the cartoon world is polished, cohesive, and consistent.

#### Acceptance Criteria

1. THE CrewCard SHALL use a circular initials-based avatar with a solid background color and centered white initials text, replacing any colored blob or gradient blob placeholder
2. THE Home_Page enlist section headline SHALL use white text with a subtle text-shadow on a dark background, replacing the previous rainbow gradient text effect
3. THE Home_Page wingman CTA section SHALL use the runway zone background variable (--zone-runway, #2C3E50), replacing the previous baby blue or tarmac background
4. THE Home_Page partners marquee section SHALL use a dark background (--zone-night) with horizontal gradient fade masks on both edges
5. THE Design_System SHALL prohibit rainbow gradients on any text or decorative element across the entire site
6. THE Design_System SHALL prohibit multicolor underlines on any heading across the entire site
7. THE Design_System SHALL define a Headline_Underline pattern as a single solid orange bar (var(--accent-orange), 60px wide, 3px height, centered below the heading)

### Requirement 20: Inner Page Content Structures

**User Story:** As a developer building inner pages, I want defined content structures for each route, so that every inner page has appropriate layout patterns for its content type.

#### Acceptance Criteria

1. THE Inner_Page for /about SHALL render an origin story section, a vertical timeline with dashed orange line and milestone cards, and a departments grid
2. THE Inner_Page for /missions SHALL render filter buttons for status categories, a responsive card grid of MissionCards, and an empty state with Rory illustration when no missions match the filter
3. THE Inner_Page for /crew SHALL render a responsive grid of CrewCard components grouped by office/department
4. THE Inner_Page for /signals SHALL render a centered feed of AnnouncementRows with pinned/latest filter tabs and a load-more button
5. THE Inner_Page for /wingman SHALL render a 2-column layout on desktop (sidebar navigation + chat panel) and a full-width chat interface on mobile
6. THE Inner_Page for /enlist SHALL render a Card_Cartoon containing the enrollment form with focused input styling (orange border on focus) and a success state displaying Rory with a congratulations message

### Requirement 21: Existing Functionality Preservation

**User Story:** As a returning user, I want all existing site functionality to remain intact after the redesign, so that the visual refresh does not break any features.

#### Acceptance Criteria

1. THE Renderer SHALL preserve all existing routes: / (home), /about, /missions, /crew, /signals, /wingman, /enlist, and the /apply redirect to /enlist
2. THE Renderer SHALL preserve the AI Wingman chatbot functionality including the FAB trigger and full-page chat interface
3. THE Renderer SHALL preserve the membership enlistment form submission to the /api/enlist API endpoint
4. THE Renderer SHALL preserve the Signal Board content display and announcement formatting
5. THE Renderer SHALL preserve the Mission Board content display and any tag-based filtering functionality
6. THE Renderer SHALL preserve the Crew Roster data display across all officer categories and offices
7. IF a component must be patched for the redesign, THEN THE Renderer SHALL modify only the broken or non-compliant portions without rewriting the entire component

### Requirement 22: Accessibility Compliance

**User Story:** As a user with accessibility needs, I want the cartoon world to be fully navigable and perceivable, so that the redesign does not exclude anyone.

#### Acceptance Criteria

1. THE Renderer SHALL provide a skip-navigation link as the first focusable element on every page
2. THE Design_System SHALL ensure all text on light zone backgrounds (sky, cloud, ground, airfield, hangar) meets WCAG AA contrast ratio of 4.5:1 for normal text and 3:1 for large text
3. THE Design_System SHALL ensure all text on dark zone backgrounds (runway, night) meets WCAG AA contrast ratio of 4.5:1 for normal text and 3:1 for large text
4. THE Renderer SHALL provide visible focus indicators (3px solid orange outline with 3px offset) on all interactive elements
5. WHILE the prefers-reduced-motion media query is set to reduce, THE Renderer SHALL disable all non-essential animations including floats, pulses, scroll reveals, and count-ups
6. THE Renderer SHALL ensure all decorative images and SVGs have aria-hidden="true" and all meaningful images have descriptive alt text
7. THE Navbar mobile menu SHALL support full keyboard navigation including Tab cycling through links and Escape key to close the overlay

### Requirement 23: Brand Voice and Terminology

**User Story:** As an STI Global City student, I want the site copy to use the aviation-themed Cloud Pilot brand voice consistently, so that the experience matches the cartoon world theme.

#### Acceptance Criteria

1. THE Renderer SHALL use the term "Cloud Pilots" when referring to club members in all user-facing copy
2. THE Renderer SHALL use the term "Missions" when referring to club events in all section headings and navigation
3. THE Renderer SHALL use the term "Signals" when referring to announcements in all section headings and navigation
4. THE Renderer SHALL use the term "Crew" when referring to club officers in all section headings and navigation
5. THE Renderer SHALL use the term "Enlist" when referring to the membership joining process
6. THE Renderer SHALL maintain an inclusive, warm, and adventurous tone using aviation metaphors appropriate for Filipino college students at STI Global City

### Requirement 24: Section Wrapper Standards

**User Story:** As a developer, I want consistent section wrapper styles, so that WaveDividers and floating elements render correctly without layout bugs.

#### Acceptance Criteria

1. THE Renderer SHALL apply position: relative to every section wrapper element that contains a WaveDivider child
2. THE Renderer SHALL apply overflow: visible to every section wrapper element that contains a WaveDivider child
3. THE Renderer SHALL ensure each section wrapper uses the correct zone background color CSS variable for its position in the page flow
4. IF a WaveDivider renders a hairline gap at the zone boundary, THEN THE WaveDivider SHALL use bottom: -1px positioning to eliminate the gap
