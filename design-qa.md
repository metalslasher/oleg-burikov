# Design QA: Mobile cases carousel controls

- Source visual truth: `docs/qa/cases-controls-reference.png`
- Implementation screenshot: `docs/qa/cases-controls-implementation.png`
- Side-by-side comparison: `docs/qa/cases-controls-comparison.png`
- Viewport: 390 x 844 CSS pixels
- State: mobile, first case selected, reduced motion enabled for stable capture

## Full-view comparison evidence

The implementation was checked in the homepage context at 390 px. The controls remain inside the content width, sit directly below the case carousel, and introduce no page-level horizontal overflow.

## Focused comparison evidence

The source and implementation controls were placed in one side-by-side image. Alignment, 44 px button dimensions, spacing, border radius, dark surface, orange active index, muted total, and chevron proportions match the selected reference and the existing niches controls. The total is intentionally `07` instead of the reference's illustrative `10` because the site currently contains seven cases.

## Required fidelity surfaces

- Fonts and typography: matching compact weight, tabular numerals, size, and line height.
- Spacing and layout rhythm: counter aligned left; two equal controls aligned right with an 8 px gap.
- Colors and visual tokens: existing site orange, muted gray, dark surface, and subtle border reused.
- Image and asset fidelity: no raster assets are required; existing site chevrons are reused consistently.
- Copy and content: real current and total case counts are shown.

## Findings

No actionable P0, P1, or P2 differences remain.

## Interaction verification

- Next button: `01 -> 02`.
- Previous button: `02 -> 01`.
- Existing loop and autoplay behavior preserved.
- Runtime exceptions: none.
- Page horizontal overflow: none.
- Desktop controls remain hidden.

## Comparison history

- Initial implementation passed the focused comparison; no corrective iteration was required.

## Follow-up polish

No P3 changes are necessary for this reference.

final result: passed
