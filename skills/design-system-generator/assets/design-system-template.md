# {{PROJECT_NAME}} Design System

> **Generated:** {{TIMESTAMP}}
> **Source:** {{INPUT_DESCRIPTION}}
> **Format Version:** 1.0

---

## Table of Contents

- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Layout & Breakpoints](#layout--breakpoints)
- [Borders & Radii](#borders--radii)
- [Shadows & Elevation](#shadows--elevation)
- [Transitions & Animation](#transitions--animation)
- [Z-Index Scale](#z-index-scale)
- [Components](#components)

---

## Colors

### Primary

| Token | Value | Swatch | HSL |
|-------|-------|--------|-----|
| `--ds-primary-50` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | `{{HSL}}` |
| `--ds-primary-100` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | `{{HSL}}` |
| `--ds-primary-200` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | `{{HSL}}` |
| `--ds-primary-300` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | `{{HSL}}` |
| `--ds-primary-400` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | `{{HSL}}` |
| `--ds-primary-500` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | `{{HSL}}` |
| `--ds-primary-600` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | `{{HSL}}` |
| `--ds-primary-700` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | `{{HSL}}` |
| `--ds-primary-800` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | `{{HSL}}` |
| `--ds-primary-900` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | `{{HSL}}` |
| `--ds-primary-950` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | `{{HSL}}` |

<!-- Repeat for: Secondary, Accent, Neutral, Success, Warning, Error, Info -->
<!-- Remove any color group that has no extracted tokens -->

### Secondary

| Token | Value | Swatch | HSL |
|-------|-------|--------|-----|
| `--ds-secondary-*` | ... | ... | ... |

### Accent

| Token | Value | Swatch | HSL |
|-------|-------|--------|-----|
| `--ds-accent-*` | ... | ... | ... |

### Neutral

| Token | Value | Swatch | HSL |
|-------|-------|--------|-----|
| `--ds-neutral-*` | ... | ... | ... |

### Semantic

| Token | Value | Swatch | Usage |
|-------|-------|--------|-------|
| `--ds-success` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | Positive actions, confirmations |
| `--ds-warning` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | Caution states, alerts |
| `--ds-error` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | Error states, destructive actions |
| `--ds-info` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | Informational states |

### Surface & Background

| Token | Value | Swatch | Usage |
|-------|-------|--------|-------|
| `--ds-bg-base` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle;border:1px solid #ddd"></span> | Page background |
| `--ds-bg-surface` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle;border:1px solid #ddd"></span> | Card/panel background |
| `--ds-bg-muted` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle;border:1px solid #ddd"></span> | Subtle background fills |
| `--ds-bg-overlay` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | Modal/dialog overlays |

### Text Colors

| Token | Value | Swatch | Usage |
|-------|-------|--------|-------|
| `--ds-text-primary` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | Primary body text |
| `--ds-text-secondary` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | Secondary/muted text |
| `--ds-text-disabled` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> | Disabled state text |
| `--ds-text-inverse` | `{{VALUE}}` | <span style="background:{{VALUE}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle;border:1px solid #ddd"></span> | Text on dark backgrounds |

---

## Typography

### Font Families

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-font-heading` | `{{VALUE}}` | Headings, display text |
| `--ds-font-body` | `{{VALUE}}` | Body text, paragraphs |
| `--ds-font-mono` | `{{VALUE}}` | Code, technical content |

### Font Sizes

| Token | Value (px) | Value (rem) | Usage |
|-------|-----------|-------------|-------|
| `--ds-text-xs` | `{{PX}}` | `{{REM}}` | Fine print, captions |
| `--ds-text-sm` | `{{PX}}` | `{{REM}}` | Secondary text, labels |
| `--ds-text-base` | `{{PX}}` | `{{REM}}` | Body text (default) |
| `--ds-text-lg` | `{{PX}}` | `{{REM}}` | Emphasized body text |
| `--ds-text-xl` | `{{PX}}` | `{{REM}}` | Section headers |
| `--ds-text-2xl` | `{{PX}}` | `{{REM}}` | Page headers |
| `--ds-text-3xl` | `{{PX}}` | `{{REM}}` | Large display text |
| `--ds-text-4xl` | `{{PX}}` | `{{REM}}` | Hero text |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-font-light` | `300` | Light emphasis |
| `--ds-font-normal` | `400` | Body text |
| `--ds-font-medium` | `500` | Subtle emphasis |
| `--ds-font-semibold` | `600` | Strong emphasis |
| `--ds-font-bold` | `700` | Headings, CTAs |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-leading-tight` | `{{VALUE}}` | Headings, compact text |
| `--ds-leading-normal` | `{{VALUE}}` | Body text |
| `--ds-leading-relaxed` | `{{VALUE}}` | Long-form reading |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-tracking-tight` | `{{VALUE}}` | Large headings |
| `--ds-tracking-normal` | `{{VALUE}}` | Body text |
| `--ds-tracking-wide` | `{{VALUE}}` | Uppercase labels, buttons |

---

## Spacing

**Base unit:** `{{BASE_UNIT}}px`

| Token | Value (px) | Value (rem) | Multiplier |
|-------|-----------|-------------|------------|
| `--ds-space-0` | `0` | `0` | 0× |
| `--ds-space-1` | `{{VALUE}}` | `{{REM}}` | 1× |
| `--ds-space-2` | `{{VALUE}}` | `{{REM}}` | 2× |
| `--ds-space-3` | `{{VALUE}}` | `{{REM}}` | 3× |
| `--ds-space-4` | `{{VALUE}}` | `{{REM}}` | 4× |
| `--ds-space-5` | `{{VALUE}}` | `{{REM}}` | 5× |
| `--ds-space-6` | `{{VALUE}}` | `{{REM}}` | 6× |
| `--ds-space-8` | `{{VALUE}}` | `{{REM}}` | 8× |
| `--ds-space-10` | `{{VALUE}}` | `{{REM}}` | 10× |
| `--ds-space-12` | `{{VALUE}}` | `{{REM}}` | 12× |
| `--ds-space-16` | `{{VALUE}}` | `{{REM}}` | 16× |
| `--ds-space-20` | `{{VALUE}}` | `{{REM}}` | 20× |
| `--ds-space-24` | `{{VALUE}}` | `{{REM}}` | 24× |

---

## Layout & Breakpoints

### Breakpoints

| Token | Value | Description |
|-------|-------|-------------|
| `--ds-screen-sm` | `{{VALUE}}` | Small devices (phones landscape) |
| `--ds-screen-md` | `{{VALUE}}` | Medium devices (tablets) |
| `--ds-screen-lg` | `{{VALUE}}` | Large devices (desktops) |
| `--ds-screen-xl` | `{{VALUE}}` | Extra large devices (wide desktops) |
| `--ds-screen-2xl` | `{{VALUE}}` | Ultra wide displays |

### Container

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-container-sm` | `{{VALUE}}` | Narrow content (articles) |
| `--ds-container-md` | `{{VALUE}}` | Standard content |
| `--ds-container-lg` | `{{VALUE}}` | Wide content |
| `--ds-container-xl` | `{{VALUE}}` | Full-width content |

---

## Borders & Radii

### Border Widths

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-border-0` | `0px` | No border |
| `--ds-border-1` | `1px` | Default borders |
| `--ds-border-2` | `2px` | Emphasized borders |
| `--ds-border-4` | `4px` | Heavy borders |

### Border Radii

| Token | Value | Preview | Usage |
|-------|-------|---------|-------|
| `--ds-radius-none` | `0px` | <span style="width:24px;height:24px;display:inline-block;background:#6366f1;border-radius:0px"></span> | Sharp corners |
| `--ds-radius-sm` | `{{VALUE}}` | <span style="width:24px;height:24px;display:inline-block;background:#6366f1;border-radius:{{VALUE}}"></span> | Subtle rounding |
| `--ds-radius-md` | `{{VALUE}}` | <span style="width:24px;height:24px;display:inline-block;background:#6366f1;border-radius:{{VALUE}}"></span> | Default rounding |
| `--ds-radius-lg` | `{{VALUE}}` | <span style="width:24px;height:24px;display:inline-block;background:#6366f1;border-radius:{{VALUE}}"></span> | Prominent rounding |
| `--ds-radius-xl` | `{{VALUE}}` | <span style="width:24px;height:24px;display:inline-block;background:#6366f1;border-radius:{{VALUE}}"></span> | Heavy rounding |
| `--ds-radius-full` | `9999px` | <span style="width:24px;height:24px;display:inline-block;background:#6366f1;border-radius:9999px"></span> | Circular/pill shapes |

---

## Shadows & Elevation

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-shadow-sm` | `{{VALUE}}` | Subtle depth (cards at rest) |
| `--ds-shadow-md` | `{{VALUE}}` | Medium depth (dropdowns) |
| `--ds-shadow-lg` | `{{VALUE}}` | Strong depth (modals, popovers) |
| `--ds-shadow-xl` | `{{VALUE}}` | Maximum depth (floating elements) |
| `--ds-shadow-inner` | `{{VALUE}}` | Inset shadow (pressed states) |

---

## Transitions & Animation

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-duration-fast` | `{{VALUE}}` | Micro-interactions (hover, focus) |
| `--ds-duration-normal` | `{{VALUE}}` | Standard transitions |
| `--ds-duration-slow` | `{{VALUE}}` | Complex animations, page transitions |

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-ease-default` | `{{VALUE}}` | General purpose |
| `--ds-ease-in` | `{{VALUE}}` | Elements exiting view |
| `--ds-ease-out` | `{{VALUE}}` | Elements entering view |
| `--ds-ease-in-out` | `{{VALUE}}` | Elements moving in view |

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-z-base` | `0` | Default stacking |
| `--ds-z-dropdown` | `{{VALUE}}` | Dropdown menus |
| `--ds-z-sticky` | `{{VALUE}}` | Sticky headers |
| `--ds-z-overlay` | `{{VALUE}}` | Backdrop overlays |
| `--ds-z-modal` | `{{VALUE}}` | Modal dialogs |
| `--ds-z-popover` | `{{VALUE}}` | Popovers, tooltips |
| `--ds-z-toast` | `{{VALUE}}` | Toast notifications |

---

## Components

<!-- Repeat this block for each identified component -->

### {{ComponentName}}

**Description:** {{Brief description of the component}}

#### Variants

| Variant | Preview | Usage |
|---------|---------|-------|
| `primary` | {{visual or code example}} | Main CTA |
| `secondary` | {{visual or code example}} | Secondary actions |
| `outline` | {{visual or code example}} | Tertiary actions |
| `ghost` | {{visual or code example}} | Subtle actions |

#### Sizes

| Size | Font Size | Padding | Height |
|------|-----------|---------|--------|
| `sm` | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` |
| `md` | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` |
| `lg` | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` |

#### States

| State | Background | Border | Text | Shadow |
|-------|-----------|--------|------|--------|
| Default | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` |
| Hover | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` |
| Focus | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` |
| Active | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` |
| Disabled | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` | `{{VALUE}}` |

#### Tokens Used

```
--ds-primary-500, --ds-primary-600 (hover)
--ds-radius-md
--ds-shadow-sm
--ds-font-medium
--ds-text-sm (sm), --ds-text-base (md), --ds-text-lg (lg)
```

<!-- End component block -->

---

## Dark Mode

<!-- Include only if dark mode tokens were detected -->

| Light Token | Light Value | Dark Value | Swatch (Dark) |
|-------------|------------|------------|----------------|
| `--ds-bg-base` | `{{LIGHT}}` | `{{DARK}}` | <span style="background:{{DARK}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> |
| `--ds-bg-surface` | `{{LIGHT}}` | `{{DARK}}` | <span style="background:{{DARK}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> |
| `--ds-text-primary` | `{{LIGHT}}` | `{{DARK}}` | <span style="background:{{DARK}};width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span> |

---

## Quick Reference — CSS Variables

```css
:root {
  /* Colors */
  {{COLOR_VARIABLES}}

  /* Typography */
  {{TYPOGRAPHY_VARIABLES}}

  /* Spacing */
  {{SPACING_VARIABLES}}

  /* Borders & Radii */
  {{BORDER_VARIABLES}}

  /* Shadows */
  {{SHADOW_VARIABLES}}

  /* Transitions */
  {{TRANSITION_VARIABLES}}

  /* Z-Index */
  {{ZINDEX_VARIABLES}}
}
```

---

*Generated by Design System Generator skill*
