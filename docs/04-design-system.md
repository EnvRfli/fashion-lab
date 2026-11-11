# 04 — Design System

> **Status: TEMPLATE — no design direction has been approved.**
> This file becomes the single source of truth only after Phase 4 passes and the
> status is updated. Empty/null values are not design decisions.

## Status legend

- `[PROPOSED]` — agent suggestion; not verified or approved.
- `[VERIFIED]` — checked against a source or measurement.
- `[APPROVED]` — human approval, or a recorded autonomous decision.
- `[PENDING]` — awaiting information or a decision.
- `[BLOCKED]` — cannot proceed; reason and corrective action required.

## Art direction

| Field | Value | Status |
| --- | --- | --- |
| Direction name | _TBD_ | `[PENDING]` |
| One-sentence principle | _TBD_ | `[PENDING]` |
| Why it fits this subject | _TBD_ | `[PENDING]` |
| Why it is not generic | _Specific evidence_ | `[PENDING]` |
| Relationship to references | _TBD_ | `[PENDING]` |
| Relationship to real assets | _TBD_ | `[PENDING]` |
| Approval | _Human or autonomous decision reference_ | `[PENDING]` |

## Canonical design tokens

> The block between the markers is the machine source of truth.
> `npm run tokens:build` generates CSS custom properties from it.
> Do not hand-edit the generated CSS.

<!-- BEGIN DESIGN TOKENS JSON -->
{
  "version": 1,
  "meta": {
    "name": "",
    "status": "template"
  },
  "color": {
    "base": {},
    "text": {},
    "semantic": {}
  },
  "typography": {
    "family": {},
    "size": {},
    "weight": {},
    "lineHeight": {},
    "measure": {}
  },
  "space": {},
  "radius": {},
  "border": {},
  "shadow": {},
  "motion": {
    "duration": {},
    "easing": {}
  },
  "breakpoint": {},
  "layout": {}
}
<!-- END DESIGN TOKENS JSON -->

## Color

| Token | Value | Use | Contrast pair | Ratio | WCAG AA | Status |
| --- | --- | --- | --- | --- | --- | --- |
| _none_ | — | — | — | — | — | `[PENDING]` |

Rules:

- Text must meet WCAG 2.2 AA: 4.5:1 for normal text, 3:1 for large text and UI
  boundaries.
- Record measured ratios, not guessed ones.
- Do not use color alone to convey state.
- Any exception must be documented and approved; it is not a waiver for body text.

## Typography

| Role | Family | Size token | Weight | Line height | Measure | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Display | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |
| Heading | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |
| Body | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |
| Caption/label | _TBD_ | _TBD_ | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |

Rules:

- Document font source, license, and loading strategy.
- Specify fallback stacks.
- Keep body measure under ~80 characters where practical.
- Do not use all-caps labels or decorative eyebrows unless they encode real
  structure.

## Layout and spacing

| Token | Value | Use | Status |
| --- | --- | --- | --- |
| _none_ | — | — | `[PENDING]` |

Rules:

- Define the content max width, gutters, grid, and section rhythm.
- Define behavior at 390, 768, and 1440.
- Use the spacing scale; no arbitrary margins.

## Shape, border, and elevation

| Token | Value | Use | Status |
| --- | --- | --- | --- |
| _none_ | — | — | `[PENDING]` |

## Motion

| Token | Value | Use | Status |
| --- | --- | --- | --- |
| _none_ | — | — | `[PENDING]` |

Rules:

- Respect `prefers-reduced-motion`.
- Motion must explain a change or answer an action.
- Do not add scattered entrance animations by default.

## Components

| Component | Variants | States | Tokens used | Accessibility notes | Status |
| --- | --- | --- | --- | --- | --- |
| _none_ | — | — | — | — | `[PENDING]` |

Required state coverage where relevant: default, hover, focus-visible, active,
disabled, loading, empty, error, success.

## Imagery direction

| Field | Value | Status |
| --- | --- | --- |
| Product photo treatment | _Crop, background, aspect ratio_ | `[PENDING]` |
| Editorial treatment | _TBD_ | `[PENDING]` |
| Icon/logo treatment | _TBD_ | `[PENDING]` |
| Demonstration label | _How sourced photos are identified_ | `[PENDING]` |

## Generated token output

```powershell
npm run tokens:build
```

- Source: `docs/04-design-system.md` marker block.
- Default output: `site/src/styles/tokens.css`.
- The generated file must not be edited by hand.

## Decisions

| Decision | Alternatives considered | Rationale | Date | Status |
| --- | --- | --- | --- | --- |
| _none_ | — | — | — | `[PENDING]` |

## Phase 4 checklist

- [ ] Direction is specific to the brief and real assets.
- [ ] Color, type, layout, shape, and motion tokens are complete.
- [ ] Contrast pairs measured and pass AA, or exceptions documented.
- [ ] Component states specified.
- [ ] `npm run tokens:build -- --require` succeeds.
- [ ] Approval recorded if in approval mode.
- [ ] Status updated in `docs/PHASE_STATUS.md`.
