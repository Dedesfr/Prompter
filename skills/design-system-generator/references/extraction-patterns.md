# Extraction Patterns Reference

Mapping rules and regex patterns for extracting design tokens from CSS, HTML, React, and Tailwind sources.

---

## CSS Custom Properties

Extract all `--` prefixed declarations from `:root`, `html`, `body`, or theme selectors.

```regex
--[\w-]+\s*:\s*[^;]+
```

Group by prefix conventions:
- `--color-*`, `--c-*` → Colors
- `--font-*`, `--text-*`, `--fs-*` → Typography
- `--space-*`, `--spacing-*`, `--gap-*` → Spacing
- `--radius-*`, `--rounded-*`, `--br-*` → Border Radii
- `--shadow-*`, `--elevation-*` → Shadows
- `--z-*`, `--zindex-*` → Z-Index
- `--duration-*`, `--transition-*`, `--ease-*` → Transitions

---

## Color Extraction

### From CSS declarations

Target properties:
```
color, background-color, background, border-color, outline-color,
fill, stroke, text-decoration-color, accent-color, caret-color,
box-shadow (color component), --*-color
```

### Color format normalization

Convert all formats to hex with HSL annotation:
- `#RGB` → expand to `#RRGGBB`
- `rgb(R, G, B)` → convert to hex
- `rgba(R, G, B, A)` → note alpha separately
- `hsl(H, S%, L%)` → convert to hex, keep HSL as annotation
- `oklch(L C H)` → convert to hex equivalent
- Named colors (`red`, `blue`) → convert to hex

### Semantic color grouping heuristics

| CSS Pattern | Likely Category |
|-------------|----------------|
| `--primary*`, `--brand*`, `--accent*` | Primary/Accent |
| `--secondary*` | Secondary |
| `--gray*`, `--grey*`, `--neutral*`, `--slate*` | Neutral |
| `--success*`, `--green*`, `--positive*` | Success |
| `--warning*`, `--yellow*`, `--amber*`, `--caution*` | Warning |
| `--error*`, `--red*`, `--danger*`, `--destructive*` | Error |
| `--info*`, `--blue*` | Info |
| `--bg*`, `--background*`, `--surface*` | Surface |
| `--text*`, `--fg*`, `--foreground*` | Text |

### Color scale detection

If multiple shades of the same hue exist, sort by lightness and assign scale numbers:
- Lightest → 50
- Darkest → 950
- Map intermediate values to nearest: 100, 200, 300, 400, 500, 600, 700, 800, 900

---

## Typography Extraction

### Font family detection

Target properties: `font-family`, `--font-*`

Classify by usage:
- Serif/Sans-serif → heading or body
- Monospace → code/mono
- If only one family found → assign to both heading + body

### Font size scale building

Target properties: `font-size`, `--text-*`, `--fs-*`

1. Collect all unique `font-size` values
2. Sort ascending
3. Map to scale:

| Range (px) | Token |
|-----------|-------|
| 10–11 | `xs` |
| 12–13 | `sm` |
| 14–16 | `base` |
| 17–19 | `lg` |
| 20–23 | `xl` |
| 24–29 | `2xl` |
| 30–35 | `3xl` |
| 36+ | `4xl` |

### Font weight mapping

Collect all `font-weight` values. Map to named tokens:
- `100` → thin, `200` → extralight, `300` → light
- `400` → normal, `500` → medium, `600` → semibold
- `700` → bold, `800` → extrabold, `900` → black

---

## Spacing Extraction

### Collecting spacing values

Target properties:
```
margin, margin-top/right/bottom/left,
padding, padding-top/right/bottom/left,
gap, row-gap, column-gap, grid-gap,
top, right, bottom, left (when used for spacing)
```

### Base unit detection

1. Collect all spacing values
2. Find GCD (Greatest Common Divisor) of the most common values
3. Typical base units: `4px`, `8px`
4. If values follow `4, 8, 12, 16, 20, 24, 32` → base = 4px
5. If values follow `8, 16, 24, 32, 40, 48, 64` → base = 8px

### Scale normalization

Sort unique values and assign multipliers relative to base:
```
0px   → space-0  (0×)
4px   → space-1  (1×)
8px   → space-2  (2×)
12px  → space-3  (3×)
16px  → space-4  (4×)
...
```

---

## Border & Radius Extraction

### Border radius values

Target: `border-radius`, `border-*-radius`, `--radius-*`

Map to scale:
| Range (px) | Token |
|-----------|-------|
| 0 | `none` |
| 1–3 | `sm` |
| 4–7 | `md` |
| 8–11 | `lg` |
| 12–15 | `xl` |
| 16+ | `2xl` |
| 9999px, 50% | `full` |

---

## Shadow Extraction

Target: `box-shadow`, `text-shadow`, `--shadow-*`

Parse shadow values into components:
```
box-shadow: <offset-x> <offset-y> <blur> <spread> <color>
```

Map to elevation scale by blur radius:
| Blur (px) | Token |
|----------|-------|
| 1–4 | `sm` |
| 5–10 | `md` |
| 11–20 | `lg` |
| 21+ | `xl` |
| `inset` keyword | `inner` |

---

## Breakpoint Extraction

Target: `@media` queries with `min-width` or `max-width`

```regex
@media\s*\([^)]*(?:min|max)-width\s*:\s*([\d.]+(?:px|em|rem))[^)]*\)
```

Common breakpoint conventions:
| Value | Token |
|-------|-------|
| 640px / 40em | `sm` |
| 768px / 48em | `md` |
| 1024px / 64em | `lg` |
| 1280px / 80em | `xl` |
| 1536px / 96em | `2xl` |

---

## Transition Extraction

Target: `transition`, `transition-duration`, `transition-timing-function`, `animation-duration`

### Duration bucketing

| Range (ms) | Token |
|-----------|-------|
| 50–100 | `fast` |
| 150–300 | `normal` |
| 300–500 | `slow` |

### Easing classification

| Value | Token |
|-------|-------|
| `ease` | `default` |
| `ease-in`, `cubic-bezier(0.4, 0, 1, 1)` | `in` |
| `ease-out`, `cubic-bezier(0, 0, 0.2, 1)` | `out` |
| `ease-in-out`, `cubic-bezier(0.4, 0, 0.2, 1)` | `in-out` |

---

## Z-Index Extraction

Target: `z-index`, `--z-*`

### Semantic assignment heuristics

Assign names based on context (selector or class name):
| Selector Pattern | Token |
|-----------------|-------|
| `.dropdown*`, `.menu*`, `.select*` | `dropdown` |
| `.sticky*`, `.fixed-header*` | `sticky` |
| `.overlay*`, `.backdrop*` | `overlay` |
| `.modal*`, `.dialog*` | `modal` |
| `.popover*`, `.tooltip*` | `popover` |
| `.toast*`, `.notification*`, `.snackbar*` | `toast` |

---

## Tailwind Class Extraction

When input uses Tailwind utility classes, map classes to tokens:

### Color classes
```regex
(?:bg|text|border|ring|fill|stroke)-(?:[\w]+-)?(?:\d{2,3}|black|white)
```
Map to theme colors via `tailwind.config.js` or default palette.

### Spacing classes
```regex
(?:m|p|gap|space-[xy])-(?:\d+(?:\.\d+)?|px|auto)
```
Convert Tailwind spacing units: multiply by 4px (default).

### Typography classes
```regex
(?:text|font|leading|tracking)-(?:xs|sm|base|lg|xl|[\d]xl|thin|light|normal|medium|semibold|bold|extrabold|black|tight|snug|normal|relaxed|loose|tighter|wider)
```

### Border/Radius classes
```regex
rounded(?:-(?:sm|md|lg|xl|2xl|3xl|full|none))?
border(?:-(?:\d+))?
```

---

## React/JSX Pattern Extraction

### Styled-components / Emotion

Extract template literals from `styled.*` or `css` tagged templates:
```regex
styled\.(\w+)`([^`]*)`
css`([^`]*)`
```

### Style objects

Extract from `style={{ }}` JSX attributes:
```regex
style=\{\{([^}]*)\}\}
```

Convert camelCase properties to kebab-case for token extraction.

### Theme objects

Look for theme/token files:
- `theme.ts`, `theme.js`, `tokens.ts`, `tokens.js`
- `ThemeProvider` usage pointing to theme config
- `createTheme()`, `extendTheme()` calls

Extract nested token objects and flatten to design tokens.

---

## Dark Mode Detection

### CSS strategies
- `@media (prefers-color-scheme: dark)` blocks
- `.dark` class selector overrides
- `[data-theme="dark"]` attribute selectors

### Tailwind dark mode
- `dark:` prefix classes
- Check `darkMode` config in `tailwind.config.js`

When dark mode is detected, create a parallel token set documenting both light and dark values.

---

## Deduplication Rules

1. **Near-identical colors**: Merge colors within ΔE < 3 (perceptual difference). Keep the more frequently used value.
2. **Similar spacing**: If two values differ by ≤1px, keep the one that fits the base unit grid.
3. **Duplicate fonts**: Same family with different quoting → keep one.
4. **Shadow variants**: If two shadows only differ by color, document as one shadow with color token reference.
