# 05 — Page Specifications

> **Status: TEMPLATE — no wireframes or page specifications exist.**
> Do not treat example rows or empty sections as approved scope.

## Status legend

- `[PROPOSED]` — agent suggestion; not verified or approved.
- `[VERIFIED]` — checked against the brief, assets, or design system.
- `[APPROVED]` — human approval, or a recorded autonomous decision.
- `[PENDING]` — awaiting information or a decision.
- `[BLOCKED]` — cannot proceed; reason and corrective action required.

## Global specification

| Field | Value | Status |
| --- | --- | --- |
| Frontend location | `site/` (default) | `[PROPOSED]` |
| Framework | _TBD — record in `docs/DECISIONS.md`_ | `[PENDING]` |
| Routes | _TBD_ | `[PENDING]` |
| Navigation model | _TBD_ | `[PENDING]` |
| Breakpoints | 390 / 768 / 1440 | `[VERIFIED]` |
| Accessibility target | WCAG 2.2 AA | `[PROPOSED]` |
| Content source | `docs/01-product-brief.md` | `[PENDING]` |
| Asset source | `docs/03-asset-manifest.md` | `[PENDING]` |
| Design source | `docs/04-design-system.md` | `[PENDING]` |

## Route map

| Route | Purpose | Primary action | Assets | Status |
| --- | --- | --- | --- | --- |
| `/` | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |

## Page specification template

Repeat this section for every route. Do not leave a route without a complete
specification.

### `/<route>` — _page name_

#### Purpose

- **Primary job:** _TBD_
- **Audience:** _TBD_
- **Success looks like:** _TBD_

#### Wireframe

> Use greyscale blocks. Label image slots with manifest IDs. Do not draw fake
> garments or product-like illustrations.

```text
[ASCII wireframe or image path]
```

- Wireframe file: `docs/references/wireframes/<name>.png` or `[PENDING]`
- Status: `[PENDING]`

#### Content inventory

| Item | Copy/content | Source | Status |
| --- | --- | --- | --- |
| _Heading_ | _TBD_ | _Brief / user / TBD_ | `[PENDING]` |

#### Asset slots

| Slot | Manifest ID | Aspect ratio | Treatment | Status |
| --- | --- | --- | --- | --- |
| Hero image | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |

#### Layout and responsive behavior

| Width | Layout | Navigation | Notes | Status |
| --- | --- | --- | --- | --- |
| 390 | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |
| 768 | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |
| 1440 | _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |

#### Components and tokens

| Component | Variant | Tokens | Status |
| --- | --- | --- | --- |
| _TBD_ | _TBD_ | _TBD_ | `[PENDING]` |

#### Interaction and state matrix

| Element | Default | Hover | Focus-visible | Active | Disabled | Loading | Error | Empty | Success |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| _TBD_ | `[PENDING]` | `[PENDING]` | `[PENDING]` | `[PENDING]` | `[PENDING]` | `[PENDING]` | `[PENDING]` | `[PENDING]` | `[PENDING]` |

#### Real functionality

| Action | Behavior | Data source | Verified? |
| --- | --- | --- | --- |
| _TBD_ | _TBD_ | _Real / local demo / TBD_ | `[PENDING]` |

Rules:

- Every button and link has a destination or action.
- No dead controls.
- If a backend is unavailable, use a clearly labeled local demonstration mode.
  Do not imply it is production.

#### Accessibility acceptance

- [ ] One `<h1>`; logical heading order.
- [ ] Landmark regions present.
- [ ] All images have appropriate alt text (decorative images use empty alt).
- [ ] All form controls have labels.
- [ ] Keyboard navigation works; focus is visible.
- [ ] Contrast meets AA.
- [ ] Touch targets are at least 44×44 CSS pixels where practical.
- [ ] Reduced motion is respected.
- [ ] Error messages are programmatically associated.

## Global states

| State | Trigger | Design | Copy | Status |
| --- | --- | --- | --- | --- |
| 404 | Unknown route | _TBD_ | _TBD_ | `[PENDING]` |
| Empty search | No results | _TBD_ | _TBD_ | `[PENDING]` |
| Loading | Slow data | _TBD_ | _TBD_ | `[PENDING]` |
| Form error | Invalid input | _TBD_ | _TBD_ | `[PENDING]` |
| Success | Completed action | _TBD_ | _TBD_ | `[PENDING]` |

## Functional verification plan

| Function | How it will be tested | Expected result | Status |
| --- | --- | --- | --- |
| _TBD_ | _Browser interaction / unit test_ | _TBD_ | `[PENDING]` |

## Approval record

| Scope | Approved by | Date | Notes |
| --- | --- | --- | --- |
| _None yet_ | — | — | — |

## Phase 5 checklist

- [ ] Every route has a purpose, wireframe, content, assets, and states.
- [ ] Every image slot maps to a verified manifest asset.
- [ ] 390/768/1440 behavior is specified.
- [ ] Every action has real behavior or an approved non-goal.
- [ ] Accessibility criteria are testable.
- [ ] Approval recorded if in approval mode.
- [ ] Status updated in `docs/PHASE_STATUS.md`.
