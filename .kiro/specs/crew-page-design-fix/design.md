# Crew Page Design Fix — Bugfix Design

## Overview

The /crew page has five visual defects that break the intended zone flow (sky → hangar → night) defined by the Rory's World design system. The CrewRoster component renders a duplicate hero section that PageHero already provides, applies incorrect cloud-zone backgrounds to office sections instead of hangar-zone green, uses the wrong zone color for the closing CTA, lacks a WaveDivider transition to night zone, and office section backgrounds override the parent ZoneSection. The fix removes the internal hero, corrects all zone backgrounds, adds the missing WaveDivider, and restructures the CTA into a night zone section.

## Glossary

- **Bug_Condition (C)**: The set of rendering states where CrewRoster outputs elements that conflict with the page-level zone structure (duplicate hero, wrong backgrounds, missing divider)
- **Property (P)**: Correct visual output — single hero, hangar backgrounds on crew content, night zone CTA with WaveDivider transition
- **Preservation**: Existing behaviors that must remain unchanged — officer groupings, card hover animations, responsive grid, scroll animations, accent colors
- **CrewRoster**: The client component in `src/app/crew/CrewRoster.tsx` that renders office sections and the closing CTA
- **ZoneSection**: Wrapper component that applies zone-specific background CSS classes (`zone-hangar`, `zone-night`, etc.)
- **WaveDivider**: SVG wave shape component placed at zone boundaries, filled with the destination zone color
- **PageHero**: Reusable hero banner rendering title, subtitle, Rory mascot, and WaveDivider to next zone
- **Zone Flow**: The defined sequence of background zones for the /crew route: sky → hangar → night

## Bug Details

### Bug Condition

The bug manifests when the /crew page renders. The CrewRoster component contains its own hero section (title, stats, description) duplicating PageHero, uses `bg-zone-cloud-soft` and `bg-zone-cloud` classes on office sections instead of inheriting the parent hangar zone background, applies `bg-zone-warm` to the closing CTA instead of night zone styling, and renders no WaveDivider before the CTA.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type RenderedCrewPage
  OUTPUT: boolean
  
  RETURN hasDuplicateHero(input.crewRoster)
         OR hasWrongOfficeBackground(input.officeSections)
         OR hasWrongCTAZone(input.ctaSection)
         OR isMissingWaveDivider(input.hangarToNightTransition)
END FUNCTION

FUNCTION hasDuplicateHero(roster)
  RETURN roster.containsElement("h1", "CREW ROSTER")
         AND roster.containsElement("stats-strip")
         AND roster.containsElement("description-paragraph")
END FUNCTION

FUNCTION hasWrongOfficeBackground(sections)
  FOR EACH section IN sections DO
    IF section.className CONTAINS "bg-zone-cloud-soft"
       OR section.className CONTAINS "bg-zone-cloud"
    THEN RETURN true
  END FOR
  RETURN false
END FUNCTION

FUNCTION hasWrongCTAZone(cta)
  RETURN cta.className CONTAINS "bg-zone-warm"
         AND NOT cta.hasNightZoneStyling()
END FUNCTION

FUNCTION isMissingWaveDivider(transition)
  RETURN NOT transition.hasWaveDivider(fillColor = "#1A1A2E")
END FUNCTION
```

### Examples

- **Duplicate Hero**: User visits /crew → sees "CREW ROSTER" title rendered twice (once in PageHero with Rory mascot, once inside CrewRoster with stats strip). Expected: title appears only once via PageHero.
- **Wrong Office Background**: Executive Office section renders with white `bg-zone-cloud-soft` background. Expected: inherits hangar zone green (#D4E8D4) from parent ZoneSection.
- **Wrong CTA Zone**: "YOUR SEAT IS WAITING" section renders on warm cream (`bg-zone-warm`). Expected: renders on dark night zone (#1A1A2E) with light text.
- **Missing WaveDivider**: Scrolling from last office section to CTA shows a hard color cut. Expected: smooth SVG wave transition filled with night color.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- PageHero continues to render the sky zone hero with Rory mascot, "CREW ROSTER" title, subtitle, and WaveDivider to hangar zone
- Officers remain grouped by office with correct accent colors and office metadata (callsign, icon, description)
- CrewCard hover animation (translate + shadow increase via `card-cartoon`) continues to work
- Below 768px viewport, crew card grid renders in single-column layout
- All officer data from the `officers` data source renders without loss or reordering within each office
- ScrollReveal and Framer Motion viewport-triggered animations continue to fire on office sections and cards
- The Stat component display (officer count, office count, founded year) is removed along with the hero — this is intentional, not a regression

**Scope:**
All inputs that do NOT involve the five bug conditions should be completely unaffected by this fix. This includes:
- Mouse interactions with CrewCards (hover, click)
- Responsive layout behavior at all breakpoints
- Navigation to/from the /crew page
- Footer rendering (handled by layout.tsx)
- Officer data fetching and sorting logic

## Hypothesized Root Cause

Based on the bug description and code analysis, the root causes are:

1. **Duplicate Hero — Leftover Pre-Redesign Markup**: The CrewRoster component was written before PageHero was integrated into `page.tsx`. The internal hero section (lines with `pt-28 pb-16`, the h1, stats strip, and description) was never removed after PageHero was added to the page wrapper.

2. **Wrong Office Backgrounds — Explicit Class Override**: Each office `<section>` element applies `bg-zone-cloud-soft` or `bg-zone-cloud` via a ternary based on `sectionIndex % 2`. These explicit background classes override the parent `ZoneSection zone="hangar"` because the child's background-color takes precedence over the parent's. The alternating pattern was a pre-redesign design choice that was never updated to hangar zone.

3. **Wrong CTA Zone — Hardcoded `bg-zone-warm`**: The closing CTA section has `className="section-padding bg-zone-warm"` hardcoded. The zone flow specification requires night (#1A1A2E) but the component was written with the old warm-section pattern.

4. **Missing WaveDivider — Never Added**: The zone transition from hangar to night was never implemented. The CTA sits directly after the last office section with no WaveDivider component between them.

5. **Card Borders — Already Fixed**: CrewCard already uses `card-cartoon` class. The visual deviation was caused by the wrong section backgrounds making the cards look out of place, not by missing card styling. No card changes needed.

## Correctness Properties

Property 1: Bug Condition - Zone Visual Compliance

_For any_ rendering of the /crew page where CrewRoster is mounted inside a `ZoneSection zone="hangar"`, the component SHALL NOT render its own hero section (no internal h1, stats strip, or description paragraph), office sections SHALL NOT apply cloud-zone background classes, the CTA SHALL use night zone styling (#1A1A2E background with light text), and a WaveDivider SHALL separate hangar content from the night CTA.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

Property 2: Preservation - Officer Display and Interactions

_For any_ rendering of the /crew page after the fix, the component SHALL produce the same officer groupings, card content, hover animations, responsive grid behavior, scroll animations, and accent color mappings as the original component, preserving all existing functionality for officer display and user interactions.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `src/app/crew/CrewRoster.tsx`

**Changes**:

1. **Remove Internal Hero Section**: Delete the entire `<section className="relative overflow-hidden pt-28 pb-16 ...">` block (approximately lines 76–113), including the gradient backdrop, SectionLabel, h1, description paragraph, and stats strip. Also remove the `Stat` component definition at the bottom of the file since it's no longer used.

2. **Remove Wrong Office Backgrounds**: In the office sections map, change the className from:
   ```
   `section-padding ${sectionIndex % 2 === 0 ? 'bg-zone-cloud-soft' : 'bg-zone-cloud'}`
   ```
   to:
   ```
   `section-padding`
   ```
   This lets the parent ZoneSection's hangar background show through (transparent/no override).

3. **Restructure CTA to Night Zone**: Replace the closing CTA `<section className="section-padding bg-zone-warm">` with night zone styling:
   - Apply `bg-[#1A1A2E]` or use the `zone-night` CSS class
   - Change text colors to light variants (`text-white`, `text-gray-300`)
   - Ensure the CTA button uses appropriate dark-background styling

4. **Add WaveDivider Before CTA**: Insert a `<WaveDivider fillColor={ZONE_COLORS.night} type={3} />` inside a relatively-positioned wrapper between the last office section and the night CTA. This requires:
   - Importing `WaveDivider` from `@/components/zones/WaveDivider`
   - Importing `ZONE_COLORS` from `@/lib/zones`
   - Wrapping the last hangar content in a relative container so WaveDivider positions correctly

5. **Alternative: Move CTA to page.tsx**: Instead of styling the CTA inside CrewRoster, move it to `page.tsx` as a separate `<ZoneSection zone="night">` after the hangar ZoneSection. Add a WaveDivider at the bottom of the hangar ZoneSection. This is cleaner architecturally but requires extracting CTA content.

**Recommended Approach**: Option 5 (move CTA to page.tsx) is the cleanest separation of concerns — page.tsx owns the zone flow, CrewRoster owns crew content only. However, Option 3+4 (restyle in-place) is simpler if we want minimal file changes.

**File**: `src/app/crew/page.tsx` (if using recommended approach)

**Changes**:
- Add a new `<ZoneSection zone="night">` after the hangar section
- Include WaveDivider at bottom of hangar ZoneSection with `fillColor={ZONE_COLORS.night}`
- Move CTA content into the night ZoneSection

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write component render tests using React Testing Library that inspect the DOM output of CrewRoster for the specific defects. Run these tests on the UNFIXED code to observe failures and confirm bug presence.

**Test Cases**:
1. **Duplicate Hero Test**: Render CrewRoster, query for `h1` elements containing "CREW ROSTER" — expect to find one inside the component (will confirm duplicate when page.tsx also renders PageHero)
2. **Wrong Background Test**: Render CrewRoster, query office sections for `bg-zone-cloud-soft` or `bg-zone-cloud` classes — expect to find them (confirms wrong backgrounds on unfixed code)
3. **Wrong CTA Zone Test**: Render CrewRoster, query CTA section for `bg-zone-warm` class — expect to find it (confirms wrong CTA zone on unfixed code)
4. **Missing WaveDivider Test**: Render full /crew page, query for WaveDivider SVG between crew content and CTA — expect NOT to find one (confirms missing divider on unfixed code)

**Expected Counterexamples**:
- DOM contains duplicate h1 elements with "CREW ROSTER" text
- Office sections have explicit cloud-zone background classes overriding parent
- CTA section uses warm zone instead of night zone
- No SVG wave path exists between hangar and CTA content

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := renderCrewPage_fixed(input)
  ASSERT NOT hasDuplicateHero(result)
  ASSERT NOT hasWrongOfficeBackground(result.officeSections)
  ASSERT hasNightZoneStyling(result.ctaSection)
  ASSERT hasWaveDivider(result.hangarToNightTransition, "#1A1A2E")
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT renderCrewPage_original(input).officerGroupings = renderCrewPage_fixed(input).officerGroupings
  ASSERT renderCrewPage_original(input).cardContent = renderCrewPage_fixed(input).cardContent
  ASSERT renderCrewPage_original(input).responsiveGrid = renderCrewPage_fixed(input).responsiveGrid
  ASSERT renderCrewPage_original(input).scrollAnimations = renderCrewPage_fixed(input).scrollAnimations
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many officer data configurations automatically
- It catches edge cases like empty offices, single-officer offices, or missing metadata
- It provides strong guarantees that grouping logic and rendering are unchanged

**Test Plan**: Observe behavior on UNFIXED code first for officer grouping, card rendering, and responsive behavior, then write property-based tests capturing that behavior persists after the fix.

**Test Cases**:
1. **Officer Grouping Preservation**: Verify officers are still grouped by office with same ordering logic after fix
2. **Card Content Preservation**: Verify each CrewCard receives same props (name, role, office, accentColor) after fix
3. **Responsive Grid Preservation**: Verify grid column classes (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3) remain unchanged
4. **Scroll Animation Preservation**: Verify ScrollReveal and motion.div wrappers remain on office sections

### Unit Tests

- Test that CrewRoster does not render any h1 element (hero is handled externally)
- Test that no office section contains `bg-zone-cloud-soft` or `bg-zone-cloud` classes
- Test that CTA section uses night zone background color
- Test that WaveDivider renders with correct fillColor before CTA
- Test that all officers from data source appear in the rendered output

### Property-Based Tests

- Generate random officer arrays with varying office assignments and verify grouping produces correct structure
- Generate random viewport widths and verify responsive grid classes are applied correctly
- Generate random officer counts per office and verify all cards render with correct accent colors

### Integration Tests

- Test full /crew page renders with single PageHero → hangar content → WaveDivider → night CTA flow
- Test page zone flow matches `PAGE_ZONE_FLOWS['/crew']` definition (sky → hangar → night)
- Test that navigating to /crew and scrolling triggers scroll reveal animations on office sections
