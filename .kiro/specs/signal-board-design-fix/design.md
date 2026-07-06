# Signal Board Design Fix — Bugfix Design

## Overview

The Signal Board page (`/signals`) is missing atmospheric decorations that all other pages in the Rory's World cartoon storybook system include. Specifically, the sky zone lacks CartoonClouds, the night zone lacks NightSky, the cloud zone has no subtle atmospheric elements, and event cards use the wrong card class (`card-cloud` instead of `card-cartoon`). The fix adds these missing decorations and corrects the card styling to bring the page into visual consistency with the rest of the site. All decorations use pure CSS animations that already respect `prefers-reduced-motion` via the global media query in `globals.css`.

## Glossary

- **Bug_Condition (C)**: The Signal Board page renders without atmospheric decorations (CartoonClouds, NightSky) and uses incorrect card styling (`card-cloud` instead of `card-cartoon`)
- **Property (P)**: The Signal Board page should render with CartoonClouds in sky/cloud zones, NightSky in the night zone, and `card-cartoon` class on event cards
- **Preservation**: Existing signal feed content, zone flow (sky → cloud → night), WaveDividers, event card data display, and all other pages' decorations must remain unchanged
- **CartoonClouds**: Component at `src/components/decorations/CartoonClouds.tsx` that renders SVG clouds with CSS bob animation; accepts `count` and `className` props
- **NightSky**: Component at `src/components/decorations/NightSky.tsx` that renders twinkling SVG stars and a crescent moon with CSS twinkle animation
- **ZoneSection**: Wrapper component that applies zone background colors and provides relative positioning for decoration layering
- **card-cartoon**: CSS class providing 2px dark border, 16px border-radius, 3px offset shadow, and hover translate lift animation

## Bug Details

### Bug Condition

The bug manifests when the Signal Board page (`/signals`) renders in any of its three zone sections. The page currently has no decoration components imported or rendered, and the event cards in `SignalBoardContent.tsx` use `card-cloud` class instead of `card-cartoon`.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type PageRenderContext (route, zone, element)
  OUTPUT: boolean
  
  RETURN input.route == '/signals'
         AND (
           (input.zone == 'sky' AND NOT hasCartoonClouds(input.zone))
           OR (input.zone == 'cloud' AND NOT hasAtmosphericDecoration(input.zone))
           OR (input.zone == 'night' AND NOT hasNightSky(input.zone))
           OR (input.element == 'event-card' AND usesClass(input.element, 'card-cloud'))
         )
END FUNCTION
```

### Examples

- **Sky zone**: User loads `/signals` → PageHero renders with plain sky background, no floating clouds visible. Expected: CartoonClouds with reduced opacity (e.g., `opacity-40`) behind hero content.
- **Cloud zone**: User scrolls to Mission Radar / Signal Feed → bare content area with no depth. Expected: Subtle CartoonClouds at very low opacity (e.g., `opacity-20`) providing atmospheric depth.
- **Night zone**: User scrolls to "End of transmission" section → plain dark background. Expected: NightSky with twinkling stars and crescent moon.
- **Event cards**: Mission Radar cards render with `card-cloud` class (thick 3px border, orange gradient top accent, rotation on hover). Expected: `card-cartoon` class (2px border, 16px radius, 3px offset shadow, straight translate lift on hover).

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Zone flow (sky → cloud → night) with WaveDividers between transitions must remain identical
- Signal feed content (pinned/unpinned announcements) must display with correct formatting, timestamps, category icons, and pin indicators
- Event card data (status badges, dates, tags, descriptions, locations) must render correctly
- Home page CartoonClouds and all other page decorations must remain untouched
- PageHero component must continue showing Rory mascot, "SIGNAL BOARD" title, subtitle, and WaveDivider
- All other inner pages (`/about`, `/missions`, `/crew`, `/wingman`, `/enlist`) must remain unchanged

**Scope:**
All inputs that do NOT involve the `/signals` page rendering context should be completely unaffected by this fix. This includes:
- Home page decoration rendering
- Other inner page zone configurations
- Navigation and layout components
- Signal data fetching and sorting logic
- Event data display logic (only the wrapper class changes, not the content)

## Hypothesized Root Cause

Based on the bug description, the most likely issues are:

1. **Missing Decoration Imports in `page.tsx`**: The signals page at `src/app/signals/page.tsx` does not import or render `CartoonClouds` or `NightSky` components. Other pages (like the home page) explicitly include these decorations within their zone sections.

2. **No Decoration Slot in Zone Sections**: The `ZoneSection` components on the signals page contain only content — no decoration layers are placed inside them with `absolute` positioning and `pointer-events-none`.

3. **Wrong Card Class in `SignalBoardContent.tsx`**: The event card `motion.article` elements use `className="card-cloud ..."` (line ~103 of SignalBoardContent). This should be `card-cartoon` per the design system for this page context.

4. **No Explicit Reduced Motion Handling Needed**: Since `CartoonClouds` uses CSS custom property-driven `@keyframes` bob animation and `NightSky` uses CSS twinkle animation, and `globals.css` already has a blanket `prefers-reduced-motion: reduce` rule that sets `animation-duration: 0.01ms !important`, adding the components is sufficient — no additional motion handling code is required.

## Correctness Properties

Property 1: Bug Condition - Missing Decorations and Wrong Card Class

_For any_ render of the `/signals` page where the bug condition holds (sky zone lacks CartoonClouds, cloud zone lacks atmospheric decoration, night zone lacks NightSky, or event cards use `card-cloud`), the fixed page SHALL render CartoonClouds in the sky zone at reduced opacity, subtle CartoonClouds in the cloud zone at very low opacity, NightSky in the night zone, and apply `card-cartoon` class to all event cards.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

Property 2: Preservation - Existing Content and Other Pages Unchanged

_For any_ page render that is NOT the `/signals` route, or for any content within the `/signals` page that is not a decoration or event card class, the fixed code SHALL produce exactly the same output as the original code, preserving zone flow, signal feed data display, event card content, PageHero rendering, and all other pages' decorations.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `src/app/signals/page.tsx`

**Specific Changes**:
1. **Import CartoonClouds and NightSky**: Add imports for both decoration components from `@/components/decorations`
2. **Add CartoonClouds to sky zone**: Place `<CartoonClouds count={4} className="opacity-40" />` inside or adjacent to the PageHero section (the PageHero renders in the sky zone). Since PageHero is a self-contained component, the clouds should be wrapped around it or placed in a wrapper div with `relative` positioning.
3. **Add CartoonClouds to cloud zone**: Place `<CartoonClouds count={3} className="opacity-20" />` inside the cloud `ZoneSection` as an atmospheric background layer before `SignalBoardContent`.
4. **Add NightSky to night zone**: Place `<NightSky />` inside the night `ZoneSection` as a decoration layer.
5. **Ensure relative positioning**: The ZoneSection components likely already have `position: relative` (from the `.zone-section` class), which is required for absolute-positioned decorations to layer correctly.

**File**: `src/components/sections/SignalBoardContent.tsx`

**Function**: Event card rendering in `SignalBoardContent`

**Specific Changes**:
1. **Replace `card-cloud` with `card-cartoon`**: Change the `className` on the `motion.article` element for event cards from `"card-cloud overflow-hidden group relative"` to `"card-cartoon overflow-hidden group relative"`.

### Implementation Notes

- CartoonClouds already uses `position: absolute; inset: 0; pointer-events: none; z-index: 1` — it layers behind content naturally.
- NightSky also uses `position: absolute; inset: 0; pointer-events: none; z-index: 1` — same pattern.
- The `card-cartoon` class in `globals.css` provides: `border: 2px solid var(--border-color)`, `border-radius: var(--radius-card)` (16px), `box-shadow: 3px 3px 0 var(--border-color)`, and `hover: translate(-3px, -3px)` with enlarged shadow.
- Since `card-cartoon` does not include padding (unlike `card-cloud` which has `padding: 1.75rem`), the existing inline `<div className="p-5">` inside the card handles padding — no layout breakage.
- The `overflow-hidden` class on the card container prevents decoration bleed and is compatible with `card-cartoon`.
- `prefers-reduced-motion` is handled automatically by the global CSS rule that freezes all animations.

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write component render tests that mount the SignalsPage and SignalBoardContent components and assert the presence of decoration elements and correct card classes. Run these tests on the UNFIXED code to observe failures and confirm the root cause.

**Test Cases**:
1. **Sky Zone Decoration Test**: Render SignalsPage → assert `.cartoon-clouds-container` exists within the sky zone area (will fail on unfixed code)
2. **Cloud Zone Decoration Test**: Render SignalsPage → assert atmospheric decoration element exists in the cloud zone section (will fail on unfixed code)
3. **Night Zone Decoration Test**: Render SignalsPage → assert `.night-sky-decorations` element exists in the night zone (will fail on unfixed code)
4. **Event Card Class Test**: Render SignalBoardContent → assert event card articles use `.card-cartoon` class, not `.card-cloud` (will fail on unfixed code)

**Expected Counterexamples**:
- No `.cartoon-clouds-container` found in rendered page output
- No `.night-sky-decorations` found in rendered page output
- Event cards have `card-cloud` class instead of `card-cartoon`
- Possible causes: missing component imports, no decoration rendering, wrong class string

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := renderSignalsPage_fixed(input)
  ASSERT hasCartoonClouds(result, zone='sky', opacity='opacity-40')
  ASSERT hasCartoonClouds(result, zone='cloud', opacity='opacity-20')
  ASSERT hasNightSky(result, zone='night')
  ASSERT allEventCards(result).every(card => card.hasClass('card-cartoon'))
  ASSERT NOT anyEventCards(result).some(card => card.hasClass('card-cloud'))
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT renderPage_original(input) = renderPage_fixed(input)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain (varied signal data, event lists)
- It catches edge cases that manual unit tests might miss (empty events, many events, long text)
- It provides strong guarantees that behavior is unchanged for all non-decoration elements

**Test Plan**: Observe behavior on UNFIXED code first for signal feed rendering and event card content, then write property-based tests capturing that behavior continues after the fix.

**Test Cases**:
1. **Zone Flow Preservation**: Verify the page still renders sky → cloud → night zones with WaveDividers between them
2. **Signal Feed Preservation**: Verify pinned/unpinned announcements render with correct data, timestamps, and icons
3. **Event Card Content Preservation**: Verify event status badges, dates, tags, descriptions, locations render identically (only wrapper class changes)
4. **PageHero Preservation**: Verify "SIGNAL BOARD" title, subtitle, and Rory mascot still render correctly
5. **Other Pages Preservation**: Verify home page and other inner pages are completely unaffected

### Unit Tests

- Test that CartoonClouds renders in sky zone with `count={4}` and `opacity-40` class
- Test that CartoonClouds renders in cloud zone with `count={3}` and `opacity-20` class
- Test that NightSky renders in night zone with stars and moon
- Test that event cards use `card-cartoon` class and not `card-cloud`
- Test that `aria-hidden="true"` is set on all decoration containers

### Property-Based Tests

- Generate random event arrays (0–20 events with random statuses) and verify all render with `card-cartoon` class
- Generate random announcement arrays and verify signal feed content renders identically before and after fix
- Generate varied viewport widths and verify decorations have `pointer-events: none` (non-interactive)

### Integration Tests

- Test full page render with decorations visible in each zone
- Test that decorations do not interfere with click events on signals or event cards
- Test visual rendering with `prefers-reduced-motion: reduce` media query active (animations frozen)
- Test dark mode rendering (CartoonClouds container gets `opacity: 0.3` via existing CSS rule)
