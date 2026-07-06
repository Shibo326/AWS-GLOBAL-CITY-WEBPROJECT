# Implementation Plan

## Overview

Fix the Signal Board page (`/signals`) to include atmospheric decorations (CartoonClouds in sky/cloud zones, NightSky in night zone) and correct the event card class from `card-cloud` to `card-cartoon`. This follows the exploratory bugfix workflow: write tests first to confirm the bug, write preservation tests, then implement the fix and validate.

## Tasks

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Missing Decorations and Wrong Card Class on Signal Board Page
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: Scope the property to the concrete Signal Board page render — verify that CartoonClouds appear in sky/cloud zones, NightSky appears in night zone, and event cards use `card-cartoon` class
  - Test that rendering `/signals` page produces NO `.cartoon-clouds-container` element in the sky zone area (Bug Condition: sky zone lacks CartoonClouds)
  - Test that rendering `/signals` page produces NO `.cartoon-clouds-container` element in the cloud zone (Bug Condition: cloud zone lacks atmospheric decoration)
  - Test that rendering `/signals` page produces NO `.night-sky-decorations` element in the night zone (Bug Condition: night zone lacks NightSky)
  - Test that rendering `SignalBoardContent` produces event cards with class `card-cloud` instead of expected `card-cartoon` (Bug Condition: wrong card class)
  - Property assertion: For the signals page render, ALL of the following must hold: sky zone contains CartoonClouds with `opacity-40`, cloud zone contains CartoonClouds with `opacity-20`, night zone contains NightSky, and all event cards use `card-cartoon` class
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists: no decorations rendered, wrong card class applied)
  - Document counterexamples: e.g., "No `.cartoon-clouds-container` found in page output", "Event cards have `card-cloud` class instead of `card-cartoon`"
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Signal Feed Content, Zone Flow, and Event Card Data Unchanged
  - **IMPORTANT**: Follow observation-first methodology
  - **Observe on UNFIXED code:**
    - Zone flow: sky → cloud → night with WaveDividers between transitions renders correctly
    - Signal feed: pinned announcements appear before unpinned, with correct timestamps, category icons, and pin indicators
    - Event card content: status badges (UPCOMING/ACTIVE/COMPLETED), dates, tags, descriptions, locations all render correctly inside cards
    - PageHero: "SIGNAL BOARD" title and subtitle render in the sky zone
  - **Write property-based tests:**
    - For all announcement arrays (0–20 items with varied categories and pin states), signal feed renders each item with correct content, timestamp formatting, and category icon
    - For all event arrays (0–6 items with varied statuses), each event card renders status badge, date, title, description, and location regardless of wrapper class
    - Zone structure property: page always renders exactly 3 zone sections (sky, cloud, night) with WaveDividers between them
    - PageHero property: hero always contains "SIGNAL BOARD" title and subtitle text
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve — content rendering is independent of decoration/class changes)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 3. Fix for missing decorations and wrong card class on Signal Board page

  - [ ] 3.1 Add decoration imports and components to `src/app/signals/page.tsx`
    - Import `CartoonClouds` and `NightSky` from `@/components/decorations`
    - Add `<CartoonClouds count={4} className="opacity-40" />` inside the sky zone (within or adjacent to PageHero wrapper) for floating clouds behind hero content
    - Add `<CartoonClouds count={3} className="opacity-20" />` inside the cloud `ZoneSection` before `SignalBoardContent` as subtle atmospheric layer
    - Add `<NightSky />` inside the night `ZoneSection` as decoration layer
    - Ensure decorations layer correctly (ZoneSection already has `position: relative` via `.zone-section` class)
    - All decoration components use `position: absolute; inset: 0; pointer-events: none; z-index: 1` — no layout impact
    - _Bug_Condition: isBugCondition(input) where input.route == '/signals' AND zones lack decorations_
    - _Expected_Behavior: Sky zone has CartoonClouds (count=4, opacity-40), cloud zone has CartoonClouds (count=3, opacity-20), night zone has NightSky_
    - _Preservation: Zone flow sky → cloud → night with WaveDividers unchanged; PageHero content unchanged_
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 3.1, 3.6_

  - [ ] 3.2 Replace `card-cloud` with `card-cartoon` in `src/components/sections/SignalBoardContent.tsx`
    - Change `className="card-cloud overflow-hidden group relative"` to `className="card-cartoon overflow-hidden group relative"` on the `motion.article` element for event cards (~line 103)
    - `card-cartoon` provides: 2px dark border, 16px border-radius, 3px offset shadow, hover translate lift
    - `card-cartoon` does NOT include padding — existing `<div className="p-5">` inside the card handles spacing
    - `overflow-hidden` remains compatible with `card-cartoon`
    - No new CSS needed — `card-cartoon` class already exists in `globals.css`
    - _Bug_Condition: isBugCondition(input) where input.element == 'event-card' AND usesClass('card-cloud')_
    - _Expected_Behavior: All event cards use `card-cartoon` class, not `card-cloud`_
    - _Preservation: Event card content (status badges, dates, tags, descriptions, locations) renders identically_
    - _Requirements: 2.4, 3.3_

  - [ ] 3.3 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Decorations Present and Correct Card Class
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior (CartoonClouds in sky/cloud, NightSky in night, card-cartoon on event cards)
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed — decorations render, correct class applied)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 3.4 Verify preservation tests still pass
    - **Property 2: Preservation** - Signal Feed Content, Zone Flow, and Event Card Data Unchanged
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions — zone flow, signal feed, event card content, PageHero all unchanged)
    - Confirm all tests still pass after fix (no regressions)

- [ ] 4. Checkpoint - Ensure all tests pass
  - Run full test suite to confirm both exploration and preservation tests pass
  - Verify no TypeScript/lint errors in modified files
  - Verify build completes successfully
  - Ensure all tests pass, ask the user if questions arise


## Task Dependency Graph

```json
{
  "waves": [
    ["1"],
    ["2"],
    ["3.1", "3.2"],
    ["3.3", "3.4"],
    ["4"]
  ]
}
```

- Wave 1: Task 1 (exploration test) — written first to confirm the bug exists
- Wave 2: Task 2 (preservation tests) — must pass on unfixed code before changes
- Wave 3: Tasks 3.1 & 3.2 (implementation) — apply the fix based on understanding from tasks 1 and 2
- Wave 4: Tasks 3.3 & 3.4 (verification) — re-run tests from tasks 1 and 2 after the fix
- Wave 5: Task 4 (checkpoint) — final validation gate

## Notes

- CartoonClouds and NightSky use `position: absolute; inset: 0; pointer-events: none; z-index: 1` — they layer behind content without affecting layout
- ZoneSection already has `position: relative` via the `.zone-section` class, so decorations position correctly
- `card-cartoon` class already exists in `globals.css` — no new CSS needed
- `prefers-reduced-motion` is handled by the global blanket rule in `globals.css` that freezes all animations
- `card-cartoon` does not include padding; the existing `<div className="p-5">` inside event cards handles spacing
- Test files should be placed in `src/__tests__/` following existing project conventions
