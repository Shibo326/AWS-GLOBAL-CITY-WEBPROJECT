# Requirements Document

## Introduction

A dark cinematic website for AWS Cloud Club — Global City (STI College Global City, Taguig, Philippines, founded 2024). The site embodies a "Top Gun meets AWS" aesthetic with aviation-coded UI, a tiger mascot as the "Cloud Pilot," and a classified mission briefing system feel. The website serves as the club's digital presence for recruitment, event promotion, announcements, and community engagement.

## Glossary

- **Website:** The AWS Cloud Club — Global City Next.js 14 web application
- **Hero_Section:** The full-viewport landing area with parallax layers, star field, clouds, and tiger mascot
- **Navigation:** The top navigation bar that transitions from transparent to frosted glass on scroll
- **Stats_Strip:** The horizontal statistics section displaying animated count-up metrics
- **Mission_Board:** The events listing system styled as flight missions with status badges
- **Signal_Board:** The announcements feed with terminal aesthetic and typewriter reveal
- **Crew_Roster:** The officers display section with 3D card flip interaction
- **AI_Wingman:** The AI chatbot system that answers club FAQs, officer info, events, and application questions
- **Enlist_Section:** The recruitment area with military briefing aesthetic and membership CTA
- **Partners_Marquee:** The infinite-scroll partner logo strip with grayscale-to-color hover effect
- **Footer:** The minimal bottom section with tiger watermark and social links
- **Custom_Cursor:** The custom dot-and-ring cursor with targeting reticle mode
- **Load_Sequence:** The cinematic page load animation from 0ms to 2400ms
- **Page_Visibility_API:** Browser API used to detect tab visibility for pausing background effects
- **Visitor:** Any user browsing the website
- **Applicant:** A student submitting the membership form
- **CTA:** Call-to-action button or interactive element prompting user action

## Requirements

### Requirement 1: Home Page Hero Section

**User Story:** As a visitor, I want to experience a cinematic full-viewport hero section, so that I immediately understand the club's bold aviation-coded identity.

#### Acceptance Criteria

1. WHEN the home page loads, THE Hero_Section SHALL render at 100vh with four parallax layers: star field, clouds, tiger mascot, and headline text.
2. WHEN the visitor scrolls, THE Hero_Section SHALL translate the star field layer at 0.1x scroll rate, the clouds layer at 0.2x scroll rate, the tiger mascot layer at 0.5x scroll rate, and the headline text layer at 1.0x scroll rate.
3. WHEN the visitor moves the mouse over the tiger mascot, THE Hero_Section SHALL rotate the tiger image within ±8 degrees following the cursor position using a lerp factor of 0.08 updated via requestAnimationFrame.
4. THE Hero_Section SHALL display the headline "CLEARED FOR TAKEOFF" in Bebas Neue font, ALL CAPS, with letter-spacing of 0.08em and a font size responsive-clamped between a minimum of 64px and a maximum of 120px.
5. THE Hero_Section SHALL render a tsParticles star field in the background layer using GPU-accelerated transforms.
6. THE Hero_Section SHALL display a subheadline "AWS Cloud Club — Global City" in JetBrains Mono font with letter-spacing of 0.12em, positioned below the headline.
7. THE Hero_Section SHALL display two call-to-action buttons below the subheadline: a "View Missions" button with an outline style and an "Enlist Now" button with a filled AWS orange (#FF9900) background.
8. THE Hero_Section SHALL display a scroll indicator at the bottom of the viewport as an animated chevron-down icon that bounces continuously to signal scrollable content.

### Requirement 2: Cinematic Page Load Sequence

**User Story:** As a visitor, I want to see a cinematic boot-up sequence when the page loads, so that the experience feels like activating a classified system.

#### Acceptance Criteria

1. WHEN the home page is first loaded, THE Load_Sequence SHALL execute a GSAP timeline animation sequence completing within 2400ms, starting with a solid black (#0A0C10) background.
2. AT 0ms, THE Load_Sequence SHALL fade in the club logo from opacity 0 to 1 over 600ms with ease-out easing; AT 400ms, THE Load_Sequence SHALL spring-scale the logo from 0.95 to 1.0.
3. AT 800ms, THE Load_Sequence SHALL type in "AWS CLOUD CLUB" character by character at 50ms per character using a typewriter effect.
4. AT 1200ms, THE Load_Sequence SHALL slide "GLOBAL CITY" upward from translateY(20px) to translateY(0) over 300ms.
5. AT 1600ms, THE Load_Sequence SHALL animate cloud fog rolling in from both left and right edges simultaneously.
6. AT 2000ms, THE Load_Sequence SHALL fade in the tiger mascot at center from opacity 0 to 1 over 400ms.
7. AT 2400ms, THE Load_Sequence SHALL fade in the navigation bar and CTA buttons, completing the hero reveal.
8. WHILE the Load_Sequence is running, THE Website SHALL prevent user scroll interaction by disabling scroll until the sequence completes.
9. IF sessionStorage contains a key indicating the visitor has previously loaded the page in the current session, THEN THE Website SHALL skip the Load_Sequence and display the page immediately.

### Requirement 3: Navigation Bar

**User Story:** As a visitor, I want a navigation bar that adapts as I scroll, so that I can access all pages while maintaining the cinematic atmosphere.

#### Acceptance Criteria

1. WHEN the page scroll position is at the top (0px offset), THE Navigation SHALL render with a fully transparent background (background-color alpha of 0).
2. WHEN the visitor scrolls past 80px, THE Navigation SHALL transition to a frosted glass appearance using backdrop-filter blur within 300ms.
3. THE Navigation SHALL include the club logo on the left and links to Home, About, Missions, Crew, Signals, Wingman, and Enlist pages displayed in that order from left to right.
4. WHEN the visitor hovers over a navigation link, THE Navigation SHALL highlight that link using the electric sky blue color (#4DA3FF) with an underline that animates from 0% to 100% width within 250ms.
5. THE Navigation SHALL remain fixed at the top of the viewport during scrolling and render above all other content layers.
6. WHEN viewed on a viewport width below 768px, THE Navigation SHALL collapse into a hamburger menu icon that, when tapped, opens a slide-out panel from the right containing all navigation links.
7. IF the mobile slide-out panel is open, THEN THE Navigation SHALL close the panel when the visitor taps the hamburger icon (morphed to an X), taps outside the panel, or selects a navigation link.
8. WHEN the visitor hovers over the club logo, THE Navigation SHALL rotate the logo 360 degrees over 600ms using an ease-in-out transition.

### Requirement 4: Stats Strip Section

**User Story:** As a visitor, I want to see the club's key metrics in an animated display, so that I can quickly gauge the club's impact and activity.

#### Acceptance Criteria

1. WHEN at least 50% of the Stats_Strip enters the viewport, THE Stats_Strip SHALL animate each metric from zero to its target value over 1.8 seconds using an easeOutExpo curve.
2. THE Stats_Strip SHALL display four metrics: member count, events held, certifications earned, and years active, each rendered as an integer with thousands separators (e.g., "1,200") followed by its corresponding label.
3. THE Stats_Strip SHALL render metric labels in JetBrains Mono with small caps and letter-spacing of 0.12em.
4. WHEN the Stats_Strip has completed its count-up animation, THE Stats_Strip SHALL hold the final values without re-triggering on subsequent scrolls.
5. IF the Stats_Strip is already visible within the viewport on initial page load, THEN THE Stats_Strip SHALL trigger the count-up animation immediately without requiring a scroll event.

### Requirement 5: About Snippet Section

**User Story:** As a visitor, I want a brief overview of the club on the home page, so that I can understand its purpose without navigating away.

#### Acceptance Criteria

1. WHILE the viewport width is 768px or greater, THE Website SHALL render the About Snippet as a two-column layout with body text in the left column and the tiger mascot card in the right column.
2. WHILE the viewport width is below 768px, THE Website SHALL stack the About Snippet into a single column with body text above the tiger mascot card.
3. WHEN the About Snippet crosses 20% into the viewport (Intersection Observer threshold 0.2), THE Website SHALL animate its elements from 24px below (translateY) and opacity 0 to their final position over 600ms, staggered at 80ms intervals, playing once per page load.
4. WHEN the About Snippet scrolls into view, THE Website SHALL animate the tiger mascot card border by drawing it clockwise using the glow token rgba(77,163,255,0.12) over 1200ms.
5. THE Website SHALL display the heading "A Different Kind of Cloud Club" and 3–4 lines of body text describing the AI-focused niche, STI Global City, and 2024 founding in the text column.

### Requirement 6: Mission Board

**User Story:** As a visitor, I want to browse club events styled as flight missions, so that I can find upcoming activities in an engaging format.

#### Acceptance Criteria

1. THE Mission_Board SHALL display each event as a card with event name, date, a description truncated to a maximum of 120 characters with an ellipsis, and a status badge labeled one of "UPCOMING," "ACTIVE," or "COMPLETED."
2. WHEN a Mission_Board card scrolls into view (at least 20% visible in the viewport), THE Mission_Board SHALL play a scan-line sweep animation (a 1px bright line moving from top to bottom of the card in 600ms).
3. WHEN the visitor hovers over a Mission_Board card, THE Mission_Board SHALL lift the card with a translateY(-8px) offset and apply a glow border effect.
4. WHILE an event status is "UPCOMING," THE Mission_Board SHALL pulse the status badge in blue on a 2-second animation loop; WHILE an event status is "ACTIVE," THE Mission_Board SHALL pulse the status badge in orange on a 1.2-second animation loop; WHILE an event status is "COMPLETED," THE Mission_Board SHALL display the status badge in gray with no animation.
5. THE Mission_Board home page preview SHALL display a maximum of three event cards, ordered by event date ascending with "UPCOMING" events shown first.
6. WHEN the visitor clicks "View All Missions," THE Website SHALL navigate to the /missions route showing all events ordered by date ascending, grouped by status with "UPCOMING" events listed first, then "ACTIVE," then "COMPLETED."
7. IF no events exist, THEN THE Mission_Board SHALL display an empty-state message indicating that no missions are currently scheduled.

### Requirement 7: Signal Board

**User Story:** As a visitor, I want to read club announcements in a terminal-styled feed, so that I stay informed about the latest updates in an immersive format.

#### Acceptance Criteria

1. THE Signal_Board SHALL display announcements left-aligned in monospace font (JetBrains Mono) with each entry prefixed by a timestamp in the format "[MM.DD.YYYY]", ordered from most recent to oldest.
2. WHEN a Signal_Board entry scrolls into view, THE Signal_Board SHALL slide the entry in from the right with a spring overshoot, reveal the text using a typewriter animation, and fade in the timestamp 200ms after the text animation completes.
3. THE Signal_Board home page preview SHALL display the five most recent announcements with an "Open Signal Board" button positioned below the list.
4. WHEN the visitor clicks "Open Signal Board," THE Website SHALL navigate to the /signals route showing all announcements in the same terminal-styled feed format.
5. WHILE a signal is pinned, THE Signal_Board SHALL display a pulsing amber dot to the left of that entry, cycling opacity from 1 to 0.3 to 1 over a 1.5-second loop.

### Requirement 8: Crew Roster

**User Story:** As a visitor, I want to see club officers presented in an interactive card display, so that I can learn about the team behind the club.

#### Acceptance Criteria

1. THE Crew_Roster SHALL display each officer as a card with a front face (grayscale photo, name, role tag) and a back face (full-color photo, role description of no more than 150 characters, and up to 4 social links).
2. WHEN the visitor clicks or taps an officer card, THE Crew_Roster SHALL perform a 3D flip animation (rotateY 180 degrees, duration 500ms ease-in-out) to reveal the opposite face, toggling between front and back on each interaction.
3. WHEN the visitor hovers over an officer card on a pointer-enabled device, THE Crew_Roster SHALL display a border glow using the electric sky blue color (#4DA3FF) with the glow token (rgba(77,163,255,0.12)).
4. THE Crew_Roster home page preview SHALL display between four and six officer cards arranged in a grid with a stagger delay of 60ms between each card's entrance animation.
5. THE Crew_Roster SHALL use CSS perspective of 1000px on the parent container and transform-style preserve-3d on each card for the 3D flip effect.
6. THE Crew_Roster home page preview SHALL display a "Meet the Full Crew" call-to-action button that navigates the visitor to the /crew page.

### Requirement 9: AI Wingman Chatbot

**User Story:** As a visitor, I want to ask an AI chatbot about the club, so that I can get instant answers about FAQs, officers, events, and how to apply.

#### Acceptance Criteria

1. WHEN the visitor submits a message, THE AI_Wingman SHALL respond with an answer about club FAQs, officer information, event details, or the application process within 5 seconds.
2. THE Website SHALL display an AI_Wingman floating action button (FAB) on all pages except the /wingman route.
3. WHILE the AI_Wingman FAB has not been clicked or hovered for at least 4 seconds, THE AI_Wingman SHALL display a pulse animation cycling scale from 1 to 1.05 and back.
4. WHEN the visitor clicks the AI_Wingman FAB, THE AI_Wingman SHALL expand into a chat panel using a clip-path circle animation from the bottom-right corner.
5. WHEN the visitor navigates to /wingman, THE Website SHALL render a full-page chat interface occupying the entire viewport.
6. IF the AI_Wingman cannot match the visitor's question to any topic in its knowledge base (FAQs, officers, events, or application process), THEN THE AI_Wingman SHALL respond with a fallback message directing the visitor to the club's Facebook page at https://www.facebook.com/awslcstiglobal.
7. WHEN the visitor submits an empty message or a message exceeding 500 characters, THE AI_Wingman SHALL not send the message and SHALL display an inline validation indicator.
8. WHEN the visitor clicks a close control within the FAB chat panel, THE AI_Wingman SHALL collapse the chat panel back to the FAB state using a reverse clip-path animation.
9. THE AI_Wingman chat panel and full-page interface SHALL display a text input field with a submit control, and SHALL render each message as a distinct bubble distinguishing visitor messages from AI_Wingman responses.

### Requirement 10: Enlist Section and Membership Form

**User Story:** As a student at STI Global City, I want to apply for club membership through an engaging recruitment section, so that I can join the AWS Cloud Club.

#### Acceptance Criteria

1. THE Enlist_Section SHALL display a top label "▸ RECRUITMENT HANGAR — OPEN" with a blinking green dot indicator that cycles opacity from 1 to 0 to 1 over a 1-second infinite interval.
2. THE Enlist_Section SHALL display the headline "READY TO FLY?" in Bebas Neue font, ALL CAPS, with letter-spacing of 0.08em.
3. WHEN the Enlist_Section headline scrolls into the viewport (triggered by Intersection Observer), THE Enlist_Section SHALL animate the headline with a stamp-in effect transitioning from scale 1.08 and rotate -1deg to scale 1.0 and rotate 0deg over 400ms with ease-out timing.
4. WHEN the benefit cards area scrolls into the viewport, THE Enlist_Section SHALL reveal three benefit cards in staggered sequence with 100ms delay between each, animating from translateY 30px and opacity 0 to translateY 0 and opacity 1: (1) "Cloud Training" — Access to AWS resources and learning paths, (2) "Real Projects" — Build and ship actual AI-powered cloud projects, (3) "Community" — Network with builders, attend events, win competitions. Each card SHALL display a Tabler outline icon, a subtle border, and a hover lift of translateY -6px.
5. THE Enlist_Section SHALL display a primary CTA button labeled "Enlist as Cloud Pilot" styled as an AWS orange (#FF9900) pill button with a subtle orange glow pulse on box-shadow every 3 seconds.
6. THE Enlist_Section SHALL display a secondary CTA labeled "Learn More About the Club" styled as a ghost button with border only and no background fill.
7. WHEN the visitor clicks "Enlist as Cloud Pilot," THE Website SHALL navigate to the /enlist route displaying a membership form containing the following required fields: full name (maximum 100 characters), STI student email address, year level, and program/course.
8. THE Enlist_Section SHALL display the text "Open to all STI Global City students. Applications reviewed within 48 hours."
9. WHEN the Applicant submits the membership form with all required fields populated and valid (name is 1–100 characters, email matches STI domain format, year level and program selected from provided options), THE Website SHALL display a confirmation message indicating the application was received and will be reviewed within 48 hours, and SHALL store the submission persistently.
10. IF the Applicant submits the form with any required field empty or invalid, THEN THE Website SHALL display an inline validation error adjacent to each incomplete or invalid field indicating what is required, and SHALL NOT submit the form.
11. IF the form submission fails due to a system or network error, THEN THE Website SHALL display an error message indicating the submission could not be completed and SHALL preserve all entered form data so the Applicant can retry without re-entering information.

### Requirement 11: Partners Marquee

**User Story:** As a visitor, I want to see the club's partners displayed in a scrolling logo strip, so that I can understand the club's professional connections.

#### Acceptance Criteria

1. THE Partners_Marquee SHALL display partner logos in an infinite horizontal scroll animation with a 40-second loop duration, duplicating logos as needed to ensure no visible gap or jump occurs during the loop reset, and applying a gradient fade overlay on the left and right edges to mask entry and exit of logos.
2. WHILE the visitor hovers over the Partners_Marquee, THE Partners_Marquee SHALL pause the scroll animation.
3. THE Partners_Marquee SHALL render partner logos in grayscale by default.
4. WHEN the visitor hovers over a partner logo, THE Partners_Marquee SHALL transition that logo from grayscale to full color within 300 milliseconds.
5. IF fewer than 2 partner logos are available, THEN THE Partners_Marquee SHALL not render the scrolling animation and SHALL hide the section.

### Requirement 12: Custom Cursor

**User Story:** As a visitor on desktop, I want a custom cursor that reinforces the aviation theme, so that the interaction feels immersive and cohesive.

#### Acceptance Criteria

1. WHEN the visitor uses a pointer device, THE Custom_Cursor SHALL replace the default cursor with a filled dot of 8px diameter that follows the pointer position exactly, and a ring of 32px diameter that follows the pointer with a lerp factor of 0.12 per animation frame using requestAnimationFrame.
2. WHEN the visitor hovers over a button or CTA element, THE Custom_Cursor SHALL expand the ring to 48px diameter and fill it with AWS orange at 20% opacity.
3. WHEN the visitor hovers over the tiger mascot, THE Custom_Cursor SHALL transform the ring into a targeting reticle by displaying crosshair lines extending from the ring center.
4. WHEN the visitor hovers over any interactive element (buttons, CTAs, links, or the tiger mascot), THE Custom_Cursor SHALL hide the 8px dot.
5. WHEN the viewport width is below 768px, THE Custom_Cursor SHALL be disabled and the default system cursor SHALL be used.
6. THE Custom_Cursor SHALL be implemented in vanilla JavaScript with no external library dependencies and SHALL update cursor position exclusively via GPU-accelerated properties (transform and opacity).

### Requirement 13: Background Visual Effects

**User Story:** As a visitor, I want subtle atmospheric background effects, so that the site feels alive and cinematic without being distracting.

#### Acceptance Criteria

1. THE Website SHALL render 8 to 12 blurred white ellipses (border-radius 50%, filter blur between 40px and 80px, opacity between 0.02 and 0.04) that drift slowly across the viewport, completing one full traversal in approximately 60 to 120 seconds.
2. THE Website SHALL render a subtle grid overlay using 1px lines at 40px intervals with color rgba(255,255,255,0.03).
3. THE Website SHALL render faint scanlines using a repeating linear gradient of 2px height at opacity 0.015.
4. THE Website SHALL render a star field of 60 to 80 absolutely positioned dots (1-2px diameter) with random twinkle animations using opacity keyframes.
5. THE Website SHALL animate all background effects using only transform and opacity properties for GPU acceleration, applying will-change where appropriate.
6. WHEN the browser tab becomes hidden (via Page_Visibility_API), THE Website SHALL pause all background effect animations.
7. WHEN the browser tab becomes visible again, THE Website SHALL resume all background effect animations.

### Requirement 14: Scroll Animations

**User Story:** As a visitor, I want content to animate in as I scroll, so that the page feels dynamic and reveals information cinematically.

#### Acceptance Criteria

1. WHEN a content section crosses the Intersection Observer threshold of 0.15, THE Website SHALL animate its elements from an initial state of opacity 0 and translateY(40px) to opacity 1 and translateY(0) using Framer Motion.
2. WHEN a card element enters the viewport, THE Website SHALL animate it from rotateX(4deg) to rotateX(0) in addition to the opacity and translateY transition.
3. WHEN a section label enters the viewport, THE Website SHALL slide it in from the left with a short line-drawing animation on its accompanying horizontal rule.
4. THE Website SHALL apply a 600ms duration with ease-out easing to each scroll-triggered animation.
5. THE Website SHALL stagger child elements within a section at 80ms intervals, starting from the first visible child to the last in DOM order.
6. WHEN a scroll animation has completed its full sequence including all staggered children, THE Website SHALL not re-trigger the animation on subsequent scrolls past that section.
7. THE Website SHALL use only GPU-accelerated properties (transform and opacity) for all scroll-triggered animations.

### Requirement 15: Responsive Design

**User Story:** As a visitor on any device, I want the website to adapt to my screen size, so that I have a usable experience on mobile, tablet, and desktop.

#### Acceptance Criteria

1. WHEN the viewport width is below 768px, THE Website SHALL stack all multi-column layouts into single-column layouts, displaying Crew Roster cards at 1 per row and Mission Board cards in a single vertical stack.
2. WHEN the viewport width is below 768px, THE Website SHALL reduce parallax layers to two, disable mouse-based parallax, and set the Partners marquee loop duration to 20 seconds.
3. WHILE the viewport width is below 768px, THE Website SHALL maintain minimum touch target sizes of 44x44px for all interactive elements.
4. THE Website SHALL render all text with a minimum size of 14px for secondary text and 16px for body text across all breakpoints, and SHALL clamp the hero headline font size between 64px and 120px.
5. WHEN the viewport width is between 768px and 1024px, THE Website SHALL display Mission Board cards in a 2+1 layout and Crew Roster cards at 2 per row.
6. WHEN the viewport width is below 768px, THE Website SHALL hide the custom cursor and disable all cursor-tracking effects.
7. WHEN the viewport width is above 1024px, THE Website SHALL display all multi-column sections in their full desktop layout with mouse-based parallax and custom cursor active.

### Requirement 16: About Page

**User Story:** As a visitor, I want to learn the full story of the club, so that I understand its history, mission, and organizational structure.

#### Acceptance Criteria

1. WHEN the visitor navigates to /about, THE Website SHALL display the club's origin story including the founding context, mission statement, and AI-focused niche, a visual timeline containing at least 3 milestones since 2024, and a list of all club departments.
2. WHEN a timeline milestone enters the viewport during scrolling, THE Website SHALL reveal that milestone with an opacity and translateY animation of 600ms duration, staggered at 80ms between consecutive milestones, revealing them in chronological order.
3. THE Website SHALL display each department as a card containing a Tabler outline-style icon, the department name, and a description of no more than 120 characters.
4. IF the visitor has not yet scrolled to the timeline section, THEN THE Website SHALL keep timeline milestones visually hidden until their scroll-triggered reveal is activated.

### Requirement 17: Route Handling and Apply Redirect

**User Story:** As a visitor, I want the /apply URL to redirect to /enlist, so that both URLs lead to the membership form.

#### Acceptance Criteria

1. WHEN the visitor navigates to /apply, THE Website SHALL perform a permanent redirect (HTTP 308) to /enlist, preserving any query parameters and URL fragments from the original request.
2. THE Website SHALL render all routes using Next.js 14 App Router file-based routing, resolving each defined route (/, /about, /missions, /crew, /signals, /wingman, /enlist) to its corresponding page within 3 seconds on a standard connection.
3. WHEN a route is rendered, THE Website SHALL display the shared layout containing the Navigation component and the Footer component on every page.
4. IF a visitor navigates to a route not defined in the application route set, THEN THE Website SHALL return an HTTP 404 status and display a not-found page that includes the shared layout with Navigation and Footer.

### Requirement 18: Footer

**User Story:** As a visitor, I want a minimal footer with essential links and branding, so that I can find social links and secondary navigation.

#### Acceptance Criteria

1. THE Footer SHALL display social media icon links for GitHub, LinkedIn, Facebook (https://www.facebook.com/awslcstiglobal), and Instagram, where each icon opens its corresponding URL in a new browser tab.
2. THE Footer SHALL render the tiger mascot watermark as a background element at 5–8% opacity.
3. THE Footer SHALL use Tabler Icons in outline style for social media icons.
4. THE Footer SHALL display on all pages of the Website.
5. THE Footer SHALL display the tagline "Built by Cloud Pilots. Powered by AWS." in JetBrains Mono font.
6. THE Footer SHALL display quick navigation links and a copyright notice including the current year and club name.

### Requirement 19: Accessibility

**User Story:** As a visitor using assistive technology, I want the website to be keyboard-navigable and screen-reader compatible, so that I can access all content regardless of ability.

#### Acceptance Criteria

1. THE Website SHALL provide keyboard navigation for all interactive elements including the navigation menu, cards, chatbot, and form fields, supporting Tab for sequential focus movement, Enter or Space for activation, Escape for dismissing overlays, and Arrow keys for navigating within grouped components.
2. THE Website SHALL include ARIA labels that describe the purpose or current state for all interactive components, status badges (conveying their status text), and animated content (conveying meaningful content changes), and SHALL use ARIA live regions to announce AI Wingman chat messages and dynamic content updates to screen readers.
3. THE Website SHALL maintain a minimum contrast ratio of 4.5:1 for body text (below 18pt regular or 14pt bold) and 3:1 for large text (18pt regular or 14pt bold and above) against all background colors.
4. WHEN the user has enabled prefers-reduced-motion at the OS level, THE Website SHALL disable all decorative and ambient animations (parallax effects, scan-line sweeps, typewriter reveals, particle effects, custom cursor motion, glow pulses, and marquee scrolling) while preserving essential state-change transitions (focus indicators, content visibility toggling, and navigation open/close).
5. THE Website SHALL provide visible focus indicators for all focusable elements with a minimum outline thickness of 2px using the electric sky blue (#4DA3FF) color, ensuring the focus indicator has at least a 3:1 contrast ratio against adjacent colors.
6. WHEN the AI Wingman chatbot is opened, THE Website SHALL move keyboard focus to the chat input field, trap focus within the chatbot panel while it is open, and return focus to the triggering element when the chatbot is closed.
7. THE Website SHALL provide a skip-navigation link as the first focusable element on each page that becomes visible on focus and allows keyboard users to bypass the navigation menu and move focus directly to the main content area.

### Requirement 20: Performance

**User Story:** As a visitor, I want the website to load quickly and run smoothly, so that animations and interactions feel responsive.

#### Acceptance Criteria

1. THE Website SHALL achieve a Lighthouse Performance score of 90 or above on desktop.
2. THE Website SHALL achieve a Largest Contentful Paint (LCP) of 2.5 seconds or less and a First Input Delay (FID) of 100 milliseconds or less on desktop, as measured by Lighthouse or Web Vitals.
3. THE Website SHALL load custom fonts (Bebas Neue, Space Grotesk, JetBrains Mono, Inter) using font-display: swap to prevent invisible text during loading.
4. THE Website SHALL lazy-load below-the-fold images and dynamically import tsParticles and animation-heavy components (GSAP hero sequence, Framer Motion scroll reveals) so they are not included in the initial page bundle.
5. THE Website SHALL limit layout shifts during page load to a Cumulative Layout Shift (CLS) score below 0.1.
6. WHEN the browser tab becomes hidden, THE Website SHALL pause all background effects (particle animations, gradient ellipses, star field twinkle, scanline textures) and resume them when the tab becomes visible again.
7. THE Website SHALL maintain a frame rate of 55 fps or above during scroll-triggered animations and page transitions, using only GPU-accelerated properties (transform, opacity).
