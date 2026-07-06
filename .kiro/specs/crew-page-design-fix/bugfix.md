# Bugfix Requirements Document

## Introduction

The /crew page has multiple visual and structural deviations from the Rory's World redesign specification (Requirement 6.3). The CrewRoster component renders a duplicate hero section, uses incorrect zone backgrounds (cloud-soft/cloud instead of hangar), applies wrong zone colors to the closing CTA, lacks a WaveDivider before the night zone transition, and uses non-compliant card border styles. These issues break the intended zone flow (sky → hangar → night) and cartoon aesthetic defined in the design system.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the /crew page renders THEN the system displays "CREW ROSTER" twice — once in the PageHero component and again inside the CrewRoster component's internal hero section (h1 with "CREW ROSTER", stats strip, description paragraph)

1.2 WHEN the CrewRoster office sections render THEN the system applies alternating `bg-zone-cloud-soft` and `bg-zone-cloud` backgrounds (white/pale blue) instead of the hangar zone background (#D4E8D4)

1.3 WHEN the closing CTA section ("YOUR SEAT IS WAITING") renders THEN the system applies `bg-zone-warm` (warm cream) instead of the night zone background (#1A1A2E) with appropriate dark-zone text styling

1.4 WHEN the page transitions from the crew content sections to the closing CTA THEN the system renders no WaveDivider between the hangar zone and the night zone

1.5 WHEN CrewCard components render THEN the system does not apply the `.card-cartoon` class border styling (2px solid #1A1A2A border, 16px radius, 3px offset shadow), resulting in cards that visually deviate from the cartoon card specification

### Expected Behavior (Correct)

2.1 WHEN the /crew page renders THEN the system SHALL display the page title only once via the PageHero component, and the CrewRoster component SHALL NOT contain its own hero section, title, stats strip, or description paragraph

2.2 WHEN the CrewRoster office sections render THEN the system SHALL use the hangar zone background (#D4E8D4) for all crew content sections, consistent with Requirement 6.3 zone flow (sky → hangar → night)

2.3 WHEN the closing CTA section renders THEN the system SHALL use the night zone background (#1A1A2E) with light text (--text-on-dark, #E0E0E0) and the `.btn-ghost-dark` or `.btn-primary` button style appropriate for dark backgrounds

2.4 WHEN the page transitions from crew content (hangar zone) to the closing CTA (night zone) THEN the system SHALL render a WaveDivider with fillColor set to the night zone color (#1A1A2E)

2.5 WHEN CrewCard components render THEN the system SHALL apply the `.card-cartoon` class which provides a 2px solid dark border (#1A1A2A), 16px border-radius, solid white background, and 3px offset solid shadow (#1A1A2A)

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the PageHero component renders on the /crew page THEN the system SHALL CONTINUE TO display the sky zone background with Rory mascot, title "CREW ROSTER", subtitle, and a WaveDivider transitioning to the hangar zone

3.2 WHEN officers are grouped by office/department THEN the system SHALL CONTINUE TO display all officers in their correct office groupings with the correct accent colors and office metadata (callsign, description, icon)

3.3 WHEN a user hovers over a CrewCard THEN the system SHALL CONTINUE TO apply the card-cartoon hover animation (translate(-3px, -3px) with increased shadow offset)

3.4 WHEN the viewport is below 768px THEN the system SHALL CONTINUE TO render the crew card grid in a single-column layout

3.5 WHEN the /crew page is accessed THEN the system SHALL CONTINUE TO render all officer data from the officers data source without data loss or reordering within each office group

3.6 WHEN scroll reveal animations trigger THEN the system SHALL CONTINUE TO animate office sections and crew cards into view using the existing ScrollReveal and Framer Motion viewport-triggered animations
