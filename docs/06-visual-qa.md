# 06 — Visual QA

> **Status: TEMPLATE — no browser QA has been performed.**
> A screenshot file is not evidence of visual review. Record who inspected it
> and what they saw. Never mark this document `PASSED` from DOM or console
> evidence alone.

## Status legend

- `[PROPOSED]` — planned check; not run.
- `[VERIFIED]` — run with evidence.
- `[APPROVED]` — accepted by a human, or an autonomous decision recorded.
- `[PENDING]` — awaiting a run or inspection.
- `[BLOCKED]` — cannot evaluate; reason and corrective action required.

## Run metadata

| Field | Value | Status |
| --- | --- | --- |
| Date/time | _TBD_ | `[PENDING]` |
| Site URL | _TBD_ | `[PENDING]` |
| Server command | _TBD_ | `[PENDING]` |
| Build/commit | _TBD_ | `[PENDING]` |
| Runner | `scripts/visual-qa.mjs` | `[VERIFIED]` |
| Browser | agent-browser / Chrome for Testing | `[VERIFIED]` |
| Model | _Active OpenCode model_ | `[PENDING]` |
| Image inspection | _Model/human; actual observation_ | `[PENDING]` |
| Report JSON | `artifacts/visual-qa/report-<timestamp>.json` | `[PENDING]` |

## Viewports and screenshots

| Viewport | CSS size | Screenshot | Non-empty | Inspected by | Observations | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Mobile | 390×844 | `artifacts/visual-qa/390-...png` | `[PENDING]` | _TBD_ | _TBD_ | `[PENDING]` |
| Tablet | 768×1024 | `artifacts/visual-qa/768-...png` | `[PENDING]` | _TBD_ | _TBD_ | `[PENDING]` |
| Desktop | 1440×900 | `artifacts/visual-qa/1440-...png` | `[PENDING]` | _TBD_ | _TBD_ | `[PENDING]` |

Additional interaction screenshots:

| State | Screenshot | Inspected by | Observations | Status |
| --- | --- | --- | --- | --- |
| Mobile menu open | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |
| Form focus/error | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |
| Hover/focus state | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |

## Checklist

| Area | Check | Result | Evidence / notes |
| --- | --- | --- | --- |
| Layout | Alignment, spacing, hierarchy | `[PENDING]` | _TBD_ |
| Layout | No horizontal overflow | `[PENDING]` | _TBD_ |
| Layout | Responsive reflow at 390/768/1440 | `[PENDING]` | _TBD_ |
| Typography | Scale, line length, wrapping, truncation | `[PENDING]` | _TBD_ |
| Color | Contrast and focus visibility | `[PENDING]` | _TBD_ |
| Imagery | Correct product image in each slot | `[PENDING]` | _TBD_ |
| Imagery | No broken images; dimensions stable | `[PENDING]` | _TBD_ |
| Imagery | Stock photos labeled demonstration | `[PENDING]` | _TBD_ |
| Navigation | Responsive nav opens, closes, and navigates | `[PENDING]` | _TBD_ |
| Interaction | Buttons, links, filters, forms work | `[PENDING]` | _TBD_ |
| Console | No implementation-caused errors | `[PENDING]` | _TBD_ |
| Accessibility | Headings, landmarks, alt, labels | `[PENDING]` | _TBD_ |
| Accessibility | Keyboard reachable; focus visible | `[PENDING]` | _TBD_ |
| Accessibility | axe/Lighthouse results reviewed | `[PENDING]` | _TBD_ |

## Findings

| ID | Severity | Area | Page | Description | Evidence | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| _none_ | — | — | — | — | — | — | — |

Severity:

- **Critical** — blocks use, loses data, or violates a legal/accessibility
  requirement.
- **Major** — visibly broken layout, wrong product image, dead primary action, or
  major responsive failure.
- **Minor** — polish issue that does not block the task.
- **Observation** — not a defect; record for future consideration.

## Visual inspection statement

> Complete this only after actually looking at the screenshots as image content.

- Inspector: _TBD_
- Date: _TBD_
- Method: `read` tool image inspection / human review
- What was seen: _TBD — describe the rendered layout, imagery, and defects_
- What was **not** inspected: _TBD_
- Limitations: _TBD_

## Refinement loop

| Iteration | Changes | Re-captured? | Re-inspected? | Result |
| --- | --- | --- | --- | --- |
| _none_ | — | — | — | `[PENDING]` |

## Sign-off

| Field | Value | Status |
| --- | --- | --- |
| Gate G7 | `PASSED` / `FAILED` / `BLOCKED` | `[PENDING]` |
| Approved by | _Human name, or autonomous decision reference_ | `[PENDING]` |
| Date | _TBD_ | `[PENDING]` |
| Residual risks | _TBD_ | `[PENDING]` |
