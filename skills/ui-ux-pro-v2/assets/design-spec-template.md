# Design Specification — [Project / Feature Name]

> Generated on [date] | Direction: [chosen direction name]

---

## Overview

**Target:** [page / component / feature description]
**Framework:** [React / Vue / Svelte / etc.]
**CSS Approach:** [Tailwind / CSS Modules / styled-components / vanilla CSS]

---

## Design Tokens

### Colors

| Token | Value | Use |
|---|---|---|
| `--color-primary` | | Primary actions, brand accent |
| `--color-primary-hover` | | Primary hover state |
| `--color-secondary` | | Secondary actions, supporting |
| `--color-background` | | Page background |
| `--color-surface` | | Card/panel backgrounds |
| `--color-text` | | Body text |
| `--color-text-muted` | | Secondary text, captions |
| `--color-border` | | Borders, dividers |
| `--color-success` | | Success states |
| `--color-warning` | | Warning states |
| `--color-error` | | Error states |

### Typography

| Token | Value | Use |
|---|---|---|
| `--font-family-body` | | Body text, UI elements |
| `--font-family-heading` | | Headings (if different from body) |
| `--font-family-mono` | | Code, technical data |
| `--text-xs` | 12px / 1.5 | Captions, badges |
| `--text-sm` | 14px / 1.5 | Secondary text, labels |
| `--text-base` | 16px / 1.6 | Body text |
| `--text-lg` | 18px / 1.5 | Subheadings, emphasis |
| `--text-xl` | 20px / 1.4 | Section headings |
| `--text-2xl` | 24px / 1.3 | Page headings |
| `--text-3xl` | 32px / 1.2 | Display, hero |
| `--text-4xl` | 48px / 1.1 | Large display |

### Spacing

Base unit: `[4px / 8px]`

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Tight gaps, inline spacing |
| `--space-2` | 8px | Component internal padding |
| `--space-3` | 12px | Compact element gaps |
| `--space-4` | 16px | Standard element spacing |
| `--space-6` | 24px | Section internal padding |
| `--space-8` | 32px | Section gaps |
| `--space-12` | 48px | Major section separation |
| `--space-16` | 64px | Page-level spacing |

### Borders & Radii

| Token | Value | Use |
|---|---|---|
| `--border-width` | | Default border width |
| `--border-color` | | Default border color |
| `--radius-sm` | | Buttons, inputs, small elements |
| `--radius-md` | | Cards, panels |
| `--radius-lg` | | Modals, large containers |
| `--radius-full` | | Avatars, pills |

### Shadows

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | | Subtle depth (cards) |
| `--shadow-md` | | Moderate elevation (dropdowns) |
| `--shadow-lg` | | High elevation (modals, popovers) |

### Transitions

| Token | Value | Use |
|---|---|---|
| `--transition-fast` | 150ms ease | Hover states, small elements |
| `--transition-base` | 200ms ease | Standard transitions |
| `--transition-slow` | 300ms ease-in-out | Layout changes, modals |

---

## Layout

### Page Structure

```
[Describe or diagram the overall page layout]
[Include breakpoint behavior]
```

### Grid / Container

- Max width: [value]
- Columns: [count at each breakpoint]
- Gutter: [value]
- Margin: [value at each breakpoint]

### Breakpoints

| Name | Min Width | Layout Changes |
|---|---|---|
| Mobile | 0px | [describe] |
| Tablet | 768px | [describe] |
| Desktop | 1024px | [describe] |
| Wide | 1280px | [describe] |

---

## Components

### [Component Name]

**Purpose:** [what the component does]

**Variants:**
- [variant 1]: [description]
- [variant 2]: [description]

**States:**
| State | Visual Treatment |
|---|---|
| Default | |
| Hover | |
| Focus | |
| Active | |
| Disabled | |
| Loading | |
| Error | |

**Specs:**
- Height: [value by size]
- Padding: [values]
- Font: [size, weight]
- Border radius: [value]
- Colors: [token references]

---

## Interaction Patterns

### [Interaction Name]

**Trigger:** [click / hover / scroll / load]
**Behavior:** [describe the interaction]
**Duration:** [transition timing]
**Easing:** [easing function]

---

## Accessibility Notes

- [ ] All contrast ratios meet WCAG AA
- [ ] Focus indicators are visible and styled
- [ ] Interactive elements have accessible labels
- [ ] Heading hierarchy is logical
- [ ] Motion respects `prefers-reduced-motion`

---

## Implementation Notes

[Any technical notes, caveats, or implementation-specific guidance]
