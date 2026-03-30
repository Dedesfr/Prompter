# Component Patterns — UI Interaction Best Practices

Reference for designing common UI components with proper states, accessibility, and interaction patterns. Load when designing or reviewing specific components.

---

## Buttons

### Hierarchy

Every interface needs a clear button hierarchy:

| Level | Name | Use Case | Visual Treatment |
|---|---|---|---|
| 1 | Primary | Main action per section/page | Filled, brand color, high contrast |
| 2 | Secondary | Supporting actions | Outlined or muted fill |
| 3 | Tertiary / Ghost | Low-priority actions, cancel | Text-only or very subtle background |
| 4 | Destructive | Delete, remove, irreversible | Red/danger color, confirm pattern |
| 5 | Icon-only | Compact actions (close, menu, edit) | Icon with tooltip, adequate touch target |

### Required States

Every button must handle:
- **Default** — Resting state
- **Hover** — Subtle background/shadow change (desktop)
- **Focus** — Visible ring/outline for keyboard users (2px offset, contrasting color)
- **Active/Pressed** — Slightly darker, subtle depression
- **Disabled** — Reduced opacity (0.5-0.6), no pointer events, `aria-disabled`
- **Loading** — Spinner or dots replacing text, button disabled during action

### Sizing

| Size | Height | Padding (x) | Font Size | Use Case |
|---|---|---|---|---|
| sm | 32px | 12px | 13-14px | Dense UI, table actions, tag actions |
| md | 40px | 16px | 14-15px | Standard forms, toolbars |
| lg | 48px | 24px | 16px | Hero CTAs, mobile-first interfaces |

### Accessibility
- Minimum touch target: 44×44px (even if visual size is smaller, pad the clickable area)
- Always include accessible label (text content or `aria-label` for icon buttons)
- Don't rely on color alone — icons or text should reinforce meaning

---

## Forms

### Input Fields

**Required states:**
- Default — Clear border, label above
- Focus — Highlighted border (brand color), optional subtle shadow
- Filled — Same as default but with content
- Error — Red/danger border, error message below, `aria-invalid="true"`
- Disabled — Muted background, reduced opacity
- Read-only — No border/minimal border, text appears as content

**Layout rules:**
- Label above input (not beside, not as placeholder)
- Placeholder text is supplementary, never the only label
- Error messages appear below the input, in context
- Help text appears below label or below input, not as tooltip
- Group related fields (name + email, street + city + state)

**Sizing:**

| Size | Height | Font Size | Use Case |
|---|---|---|---|
| sm | 32px | 13-14px | Dense forms, admin panels |
| md | 40px | 14-15px | Standard forms |
| lg | 48px | 16px | Landing pages, mobile |

### Select / Dropdown

- Show current selection in the trigger
- Keyboard navigation: arrow keys, type-ahead, Enter to select, Escape to close
- Long lists: include search/filter
- Multi-select: use checkboxes inside dropdown, show count or tags in trigger

### Checkbox & Radio

- Minimum 44×44px touch target (including label)
- Label always to the right of the indicator
- Checkbox: independent selections (multi-select)
- Radio: mutually exclusive within a group
- Indeterminate checkbox state for "select all" with partial selection

### Form Validation

- **Inline validation**: Validate on blur (not on every keystroke)
- **Submit validation**: Validate all fields, focus the first error, scroll if needed
- **Error messaging**: Specific ("Email must include @") not generic ("Invalid input")
- **Success feedback**: Brief confirmation, then move on — don't celebrate trivial actions

---

## Cards

### When to Use
- Displaying a collection of items with mixed content (image + text + actions)
- Content that can be browsed and compared
- NOT for single content blocks or sequential content (use sections instead)

### Anatomy
1. **Media area** (optional) — Image, video, or illustration at top or left
2. **Header** — Title, subtitle, metadata
3. **Body** — Description or summary content
4. **Footer** (optional) — Actions, tags, or secondary metadata

### Interaction Patterns
- **Clickable card**: Entire card is a link, hover shows elevation change
- **Card with actions**: Card is not clickable, specific buttons/links inside are
- **Never both**: Don't make the whole card clickable AND have buttons inside it

### States
- Default, Hover (if clickable), Selected (in a selection context), Loading (skeleton)

---

## Navigation

### Top Navigation (Navbar)

- Logo/brand on the left
- Primary nav items horizontally centered or right-aligned
- Active page indicator: bold text, underline, or background highlight
- Mobile: hamburger menu (3 lines) → slide-out or full-screen overlay
- Sticky/fixed: include subtle shadow or border when scrolled
- Max 5-7 primary items; overflow into "More" dropdown

### Sidebar Navigation

- Collapsible for more content space
- Active item: filled background with brand color, or left border accent
- Group items with section headers
- Icons + labels in expanded state, icons-only in collapsed state with tooltips
- Scroll independently from main content

### Breadcrumbs

- Show current location in hierarchy
- Each segment is a link except the current page
- Separator: `/` or `>` or chevron icon
- Truncate long paths: show first, `...`, last 2 segments

### Tabs

- Horizontal for 2-5 options, vertical for 5+ or when labels are long
- Active tab: bold/colored text + bottom border (horizontal) or left border (vertical)
- Tab content switches without page reload
- Keyboard: arrow keys to switch, Tab to enter content area
- Don't nest tabs within tabs

---

## Modals & Dialogs

### When to Use
- Confirming destructive actions
- Short forms that don't warrant a new page (login, quick edit)
- Displaying focused content that blocks the main flow

### When NOT to Use
- Displaying information that could be inline
- Long forms or multi-step flows (use a page instead)
- Welcome messages or tutorials (use onboarding flows)

### Anatomy
- **Overlay/backdrop**: Semi-transparent dark (rgba(0,0,0,0.4-0.6))
- **Container**: Centered, max-width 480-640px, adequate padding (24-32px)
- **Header**: Title + close button (X) in top-right
- **Body**: Content area, scrollable if content overflows
- **Footer**: Action buttons (primary right, cancel left)

### Interaction
- Escape key closes the modal
- Clicking backdrop closes (for non-critical modals) or doesn't (for confirmations)
- Focus trapped inside modal (Tab cycles through modal elements only)
- Return focus to trigger element on close
- Prevent body scroll while modal is open

---

## Tables

### Best Practices
- Align text left, numbers right
- Header row: bold, subtle background, sticky on scroll
- Zebra striping OR subtle horizontal borders (not both)
- Minimum row height: 48px for touch, 36px for dense desktop
- Sortable columns: show sort indicator (arrow up/down)
- Pagination or virtual scroll for large datasets

### Responsive
- Priority columns stay visible, secondary columns hide on mobile
- Alternative: card-based layout on mobile instead of table
- Horizontal scroll as a last resort (wrap in a scroll container with shadow indicators)

---

## Feedback & Status

### Toast / Snackbar
- Brief messages (1-2 lines), auto-dismiss after 4-6 seconds
- Position: bottom-center or top-right
- Types: success (green), error (red), warning (amber), info (blue/neutral)
- Include dismiss action and optional undo for destructive actions
- Stack new toasts, don't replace existing ones

### Empty States
- Illustration or icon (purposeful, not decorative)
- Clear headline: what this area is for
- Description: why it's empty
- CTA: how to populate it
- Don't just show a blank white space

### Loading States
- **Skeleton screens** (preferred): Gray placeholder shapes matching content layout
- **Spinner**: Only for short, indeterminate waits (< 3 seconds expected)
- **Progress bar**: For determinate operations with known duration
- **Inline loading**: Button spinner, input loading indicator

### Error States
- Page-level: Friendly message + illustration, retry button, link to support
- Inline: Red border, error text below the field, `aria-invalid`
- Network: "Something went wrong" with retry, not a technical error dump
- 404: Helpful redirect suggestions, search, home link

---

## Accessibility Essentials

### Color & Contrast
- Body text: 4.5:1 contrast ratio minimum (WCAG AA)
- Large text (18px+ or 14px+ bold): 3:1 minimum
- Interactive elements: 3:1 against adjacent colors
- Don't use color as the only indicator — pair with icons, text, or patterns

### Keyboard Navigation
- All interactive elements focusable via Tab
- Visible focus indicator (not just browser default — design a custom one)
- Logical tab order matching visual layout
- Escape closes overlays, Enter activates buttons/links

### Screen Readers
- Meaningful alt text for informational images
- Empty alt (`alt=""`) for decorative images
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- ARIA labels for icon-only buttons and complex widgets
- Live regions for dynamic content updates (toast notifications, form errors)

### Motion
- Respect `prefers-reduced-motion` — disable or simplify animations
- No auto-playing video or audio without user control
- Avoid rapid flashing (3 flashes per second max)
