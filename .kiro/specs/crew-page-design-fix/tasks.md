# Implementation Plan

## Overview

Fix five visual defects on the /crew page: duplicate hero section, wrong office backgrounds (cloud instead of hangar), wrong CTA zone color (warm instead of night), missing WaveDivider transition, and incorrect text colors on CTA. Uses the recommended architecture approach — extract CTA from CrewRoster into page.tsx as a separate ZoneSection zone="night".

## Tasks

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Crew Page Zone Visual Defects
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the zone visual defects exist in CrewRoster
  - **Scoped PBT Approach**: Scope the property to the concrete failing cases — CrewRoster renders duplicate hero, wrong backgrounds, wrong CTA zone, and missing WaveDivider
  - Create test file `src/__tests__/crew-page-bug-condition.test.ts`
  - Test 1: Render CrewRoster component and assert it does NOT contain an `h1` element (hero is handled externally by PageHero in page.tsx). On unfixed code this will FAIL because CrewRoster renders its own h1 "CREW ROSTER"
  - Test 2: Render CrewRoster and assert no office section contains class `bg-zone-cloud-soft` or `bg-zone-cloud`. On unfixed code this will FAIL because sections use alternating cloud backgrounds
  - Test 3: Render CrewRoster and assert the closing CTA section uses night zone styling (bg-[#1A1A2E] or zone-night class) with light text (text-white). On unfixed code this will FAIL because CTA uses `bg-zone-warm`
  - Test 4: Render the full crew page structure and assert a WaveDivider SVG with fillColor="#1A1A2E" exists between hangar content and night CTA. On unfixed code this will FAIL because no WaveDivider is present
  - Run test on UNFIXED code with `npm run test -- src/__tests__/crew-page-bug-condition.test.ts`
  - **EXPECTED OUTCOME**: Test FAILS (this is correct — it proves the bug exists)
  - Document counterexamples found (e.g., "CrewRoster renders h1 with 'CREW ROSTER'", "office sections have bg-zone-cloud-soft", "CTA uses bg-zone-warm", "no WaveDivider SVG found")
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Officer Display and Interaction Integrity
  - **IMPORTANT**: Follow observation-first methodology
  - Create test file `src/__tests__/crew-page-preservation.test.ts`
  - Observe: On unfixed code, officers are grouped by office in this order: Executive Office, Finance and Resource Office, Operations and Events Office, Relations and Communications Office, Creatives and Graphics Office
  - Observe: On unfixed code, each officer renders a CrewCard with correct name, role, office, and accentColor props
  - Observe: On unfixed code, the card grid uses classes `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
  - Observe: On unfixed code, each office section has a ScrollReveal wrapper and motion.div with whileInView="visible" and viewport once:true
  - Write property-based test: for all officers in the data source, every officer appears in the rendered output grouped under their correct office with the correct accent color mapping (Executive=#F59E0B, Finance=#10B981, Operations=#6366F1, Relations=#EC4899, Creatives=#8B5CF6)
  - Write property-based test: for any valid officers array, the responsive grid classes remain consistent (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3)
  - Write property-based test: for all office sections rendered, ScrollReveal and Framer Motion animation wrappers are present
  - Verify tests pass on UNFIXED code with `npm run test -- src/__tests__/crew-page-preservation.test.ts`
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 3. Fix crew page zone visual defects

  - [ ] 3.1 Remove duplicate hero section from CrewRoster
    - In `src/app/crew/CrewRoster.tsx`, delete the entire `<section className="relative overflow-hidden pt-28 pb-16 ...">` block (the internal hero with gradient backdrop, SectionLabel, h1, description paragraph, and stats strip)
    - Remove the `Stat` component definition at the bottom of the file (no longer needed)
    - Remove unused imports: `SectionLabel` from `@/components/ui/SectionLabel`
    - The `min-h-screen` wrapper div can remain as it still wraps office sections
    - _Bug_Condition: hasDuplicateHero(roster) — roster contains h1 "CREW ROSTER", stats-strip, and description-paragraph_
    - _Expected_Behavior: CrewRoster SHALL NOT render its own hero section; hero is handled by PageHero in page.tsx_
    - _Preservation: PageHero in page.tsx continues rendering sky zone hero with Rory mascot, title, subtitle, and WaveDivider to hangar_
    - _Requirements: 2.1, 3.1_

  - [ ] 3.2 Remove wrong office section backgrounds
    - In `src/app/crew/CrewRoster.tsx`, change office section className from `section-padding ${sectionIndex % 2 === 0 ? 'bg-zone-cloud-soft' : 'bg-zone-cloud'}` to just `section-padding`
    - This lets the parent ZoneSection zone="hangar" background (#D4E8D4) show through without override
    - _Bug_Condition: hasWrongOfficeBackground(sections) — sections contain bg-zone-cloud-soft or bg-zone-cloud classes_
    - _Expected_Behavior: Office sections SHALL use hangar zone background by inheriting from parent ZoneSection_
    - _Preservation: Officer groupings, card content, accent colors, scroll animations remain unchanged_
    - _Requirements: 2.2, 3.2, 3.5_

  - [ ] 3.3 Extract CTA from CrewRoster and create night zone section in page.tsx
    - In `src/app/crew/CrewRoster.tsx`, remove the entire closing CTA `<section className="section-padding bg-zone-warm">` block
    - In `src/app/crew/page.tsx`, add a WaveDivider import and ZONE_COLORS usage (already imported)
    - Add WaveDivider at the bottom of the hangar ZoneSection: `<WaveDivider fillColor={ZONE_COLORS.night} type={3} />`
    - Add a new `<ZoneSection zone="night">` after the hangar ZoneSection containing the CTA content
    - CTA content: "▸ Want to join the crew?" label, "YOUR SEAT IS WAITING" heading, description, and enlist link
    - Apply night zone text styling: `text-white` for heading, `text-gray-300` for body text, appropriate button style for dark background
    - Import ScrollReveal in page.tsx for the CTA animation wrapper
    - _Bug_Condition: hasWrongCTAZone(cta) — CTA has bg-zone-warm AND no night zone styling; isMissingWaveDivider — no WaveDivider with fillColor="#1A1A2E"_
    - _Expected_Behavior: CTA SHALL use night zone (#1A1A2E) with light text; WaveDivider SHALL separate hangar from night with fillColor="#1A1A2E"_
    - _Preservation: CTA copy ("YOUR SEAT IS WAITING", enlist link) remains the same; only zone/styling changes_
    - _Requirements: 2.3, 2.4, 3.1_

  - [ ] 3.4 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Crew Page Zone Visual Compliance
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior (no duplicate hero, no cloud backgrounds, night CTA, WaveDivider present)
    - Run bug condition exploration test: `npm run test -- src/__tests__/crew-page-bug-condition.test.ts`
    - **EXPECTED OUTCOME**: Test PASSES (confirms all four bug conditions are fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 3.5 Verify preservation tests still pass
    - **Property 2: Preservation** - Officer Display and Interaction Integrity
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests: `npm run test -- src/__tests__/crew-page-preservation.test.ts`
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions in officer grouping, card rendering, responsive grid, scroll animations)
    - Confirm all tests still pass after fix (no regressions)

- [ ] 4. Checkpoint - Ensure all tests pass
  - Run full test suite: `npm run test`
  - Verify bug condition test passes (all 4 assertions green)
  - Verify preservation tests pass (officer grouping, grid, animations intact)
  - Verify no other tests in the project are broken by the changes
  - Run `npm run build` to confirm no TypeScript or build errors
  - Ensure all tests pass, ask the user if questions arise


## Task Dependency Graph

```json
{
  "waves": [
    {
      "wave": 1,
      "tasks": ["1", "2"],
      "description": "Write exploration and preservation tests on unfixed code (can run in parallel)"
    },
    {
      "wave": 2,
      "tasks": ["3.1", "3.2", "3.3"],
      "description": "Implement the fix: remove hero, fix backgrounds, extract CTA to night zone"
    },
    {
      "wave": 3,
      "tasks": ["3.4", "3.5"],
      "description": "Verify bug condition test passes and preservation tests still pass"
    },
    {
      "wave": 4,
      "tasks": ["4"],
      "description": "Final checkpoint — all tests pass, build succeeds"
    }
  ]
}
```

## Notes

- Test environment uses Vitest with node environment (no jsdom by default — tests may need to configure jsdom for DOM assertions or use structural/data-level assertions)
- The project does not currently use fast-check; property-based tests will use Vitest's parametric patterns or install fast-check as needed
- CrewRoster is a client component ('use client') using Framer Motion — tests may need motion mocking
- The recommended approach (Option 5 from design.md) moves the CTA to page.tsx for clean zone separation
- Card border styling (requirement 2.5) is already correct — CrewCard uses `card-cartoon` class; the visual issue was caused by wrong section backgrounds making cards look off
