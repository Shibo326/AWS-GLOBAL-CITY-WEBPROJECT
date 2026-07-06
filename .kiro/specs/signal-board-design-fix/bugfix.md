# Bugfix Requirements Document

## Introduction

The Signal Board page (`/signals`) is missing atmospheric decorations and cartoon world styling that are present on the home page and required by the Rory's World design plan. The page currently renders bare zones without CartoonClouds in the sky zone, without NightSky decorations in the night zone, and uses `card-cloud` instead of `card-cartoon` for Mission Radar event cards. This makes the page feel flat and disconnected from the rest of the cartoon storybook world. The fix ensures the signals page matches the same level of visual richness as other pages in the site.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the Signal Board page renders the sky zone (PageHero area) THEN the system displays a plain sky background without any CartoonClouds decoration

1.2 WHEN the Signal Board page renders the cloud zone (main content area) THEN the system displays content without any subtle atmospheric decorations or floating elements

1.3 WHEN the Signal Board page renders the night zone (bottom section) THEN the system displays a bare dark section without NightSky stars and moon decoration

1.4 WHEN the Mission Radar section renders event cards THEN the system applies the `card-cloud` class instead of the `card-cartoon` class, resulting in cards that lack the illustrated comic-panel aesthetic (2px dark border, 16px radius, 3px offset shadow, hover lift)

1.5 WHEN a user with prefers-reduced-motion enabled visits the Signal Board page THEN the system does not account for reduced motion on any decorative elements because no decorative elements exist to respect the preference

### Expected Behavior (Correct)

2.1 WHEN the Signal Board page renders the sky zone (PageHero area) THEN the system SHALL display CartoonClouds with reduced opacity floating behind the hero content, matching the home page pattern

2.2 WHEN the Signal Board page renders the cloud zone (main content area) THEN the system SHALL display subtle atmospheric decorations (CartoonClouds at low opacity or similar gentle floating elements) to add visual depth

2.3 WHEN the Signal Board page renders the night zone (bottom section) THEN the system SHALL display the NightSky decoration component with twinkling stars and crescent moon

2.4 WHEN the Mission Radar section renders event cards THEN the system SHALL apply the `card-cartoon` class providing the illustrated comic-panel aesthetic with 2px dark border, 16px border-radius, 3px offset shadow, and hover translate/shadow lift animation

2.5 WHEN a user with prefers-reduced-motion enabled visits the Signal Board page THEN the system SHALL display all decorative elements (CartoonClouds, NightSky) in static positions without animations

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the Signal Board page renders THEN the system SHALL CONTINUE TO follow the zone flow sky → cloud → night with WaveDividers between zone transitions

3.2 WHEN the Signal Board page renders signal entries (pinned and unpinned announcements) THEN the system SHALL CONTINUE TO display them with correct formatting, timestamps, category icons, and pin indicators

3.3 WHEN the Signal Board page renders the Mission Radar event cards THEN the system SHALL CONTINUE TO display event status badges, dates, tags, descriptions, and locations correctly

3.4 WHEN the home page renders CartoonClouds and GrassOverlay decorations THEN the system SHALL CONTINUE TO display them identically without any changes

3.5 WHEN other inner pages (/about, /missions, /crew, /wingman, /enlist) render THEN the system SHALL CONTINUE TO display their current decorations and zone transitions without modification

3.6 WHEN the PageHero component renders on the signals page THEN the system SHALL CONTINUE TO display Rory mascot with float animation, title "SIGNAL BOARD", subtitle, and WaveDivider to cloud zone
