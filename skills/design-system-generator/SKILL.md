---
name: design-system-generator
description: Generate a structured design system document from HTML pages, React components, or screenshots. Extracts colors, typography, spacing, shadows, borders, breakpoints, and component patterns into a reusable design system specification. Use when creating a design system from existing UI, auditing design consistency, or bootstrapping a new project's design tokens from reference material.
---

# Design System Generator

Analyze UI input (HTML, React, screenshots, or live URLs) and produce a comprehensive design system document with extracted design tokens and component patterns.

## Quick Start

1. **DETERMINE INPUT TYPE** — Ask user for source material (files, URLs, or screenshots)
2. **COLLECT INPUT** — Read files, scrape URLs, or analyze screenshots
3. **EXTRACT TOKENS** — Pull colors, typography, spacing, shadows, borders, radii, breakpoints
4. **IDENTIFY COMPONENTS** — Catalog reusable UI components and their variants
5. **GENERATE DOCUMENT** — Output design system using the template in `assets/design-system-template.md`
6. **SAVE OUTPUT** — Write to user-specified path or default `prompter/design-system.md`

---

## Step 0: Determine Input Type (REQUIRED)

Present the following options:

```
What source material should I analyze?

1. **HTML file(s)** — Static HTML pages with inline/linked CSS
2. **React component(s)** — JSX/TSX files with CSS/Tailwind/styled-components
3. **Live URL** — Scrape a live webpage for design tokens
4. **Screenshot(s)** — Analyze visual design from images
5. **CSS/SCSS file(s)** — Extract tokens directly from stylesheets
6. **Tailwind config** — Parse tailwind.config.js/ts for design tokens
7. **Mixed** — Combination of the above

Please select (1-7) or describe your input:
```

Wait for user response before proceeding.

---

## Step 1: Collect & Parse Input

### For HTML Files
1. Read the HTML file(s) with `read_file`
2. Extract all `<style>` blocks and inline `style` attributes
3. Identify linked stylesheets via `<link rel="stylesheet">` and read those files
4. Note all CSS custom properties (`--var-name`) declarations

### For React Components
1. Read JSX/TSX file(s)
2. Detect styling approach:
   - **CSS Modules** → read associated `.module.css` files
   - **Tailwind CSS** → read `tailwind.config.js/ts`, catalog utility classes used
   - **Styled-components/Emotion** → extract template literals
   - **Inline styles** → extract style objects
   - **CSS-in-JS (other)** → extract theme objects
3. Identify component props that affect visual appearance (variant, size, color)

### For Live URLs
1. Use the scrape tool with `formats: ["html"]` to fetch the page
2. Also request `formats: ["branding"]` if available for automated brand extraction
3. Parse the returned HTML as if it were an HTML file input

### For Screenshots
1. Analyze the image for visual design elements
2. Extract approximate color values using visual analysis
3. Identify typography patterns (relative sizes, weights)
4. Note spacing patterns and layout structure
5. Catalog visible UI components

### For CSS/SCSS Files
1. Read the stylesheet(s) directly
2. Parse CSS custom properties, SCSS variables, mixins
3. Extract all token-relevant declarations

### For Tailwind Config
1. Read `tailwind.config.js` or `tailwind.config.ts`
2. Extract `theme.extend` and base `theme` values
3. Map Tailwind tokens to design system categories

---

## Step 2: Extract Design Tokens

For detailed extraction patterns per CSS property, see [extraction-patterns.md](references/extraction-patterns.md).

Extract tokens in this order of priority:

### 2.1 Colors
- Background colors, text colors, border colors
- Group into semantic categories: `primary`, `secondary`, `accent`, `neutral`, `success`, `warning`, `error`, `info`
- Identify color scales (50–950 shades) when present
- Extract opacity/alpha variants
- Note dark mode / alternate theme colors if detected

### 2.2 Typography
- Font families (heading, body, mono)
- Font sizes (map to scale: xs, sm, base, lg, xl, 2xl, etc.)
- Font weights used
- Line heights
- Letter spacing
- Text transform patterns

### 2.3 Spacing
- Padding and margin values used
- Gap values in flex/grid layouts
- Map to a consistent scale (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24...)
- Identify base unit (commonly 4px or 8px)

### 2.4 Layout & Breakpoints
- Container max-widths
- Media query breakpoints (sm, md, lg, xl, 2xl)
- Grid column counts and gutter widths

### 2.5 Borders & Radii
- Border widths
- Border styles
- Border radius values (none, sm, md, lg, full)

### 2.6 Shadows
- Box shadow definitions
- Map to elevation scale (sm, md, lg, xl)
- Note any colored or inset shadows

### 2.7 Transitions & Animation
- Transition durations
- Easing functions
- Named animations/keyframes

### 2.8 Z-Index Scale
- All z-index values used
- Assign semantic names (dropdown, modal, tooltip, etc.)

---

## Step 3: Identify Components

Catalog reusable UI patterns found in the input:

For each component, document:
- **Name** — PascalCase identifier
- **Variants** — visual or behavioral variations (e.g., `primary`, `outline`, `ghost`)
- **Sizes** — available size options (sm, md, lg)
- **States** — hover, focus, active, disabled appearances
- **Tokens used** — which design tokens the component references

Common components to look for:
- Button, Input, Select, Checkbox, Radio, Toggle
- Card, Badge, Tag, Avatar, Alert
- Modal, Dropdown, Tooltip, Popover
- Table, List, Tabs, Accordion
- Navigation (Navbar, Sidebar, Breadcrumb)
- Form layouts, Grid systems

---

## Step 4: Generate Design System Document

1. Read the template: `assets/design-system-template.md`
2. Fill in all extracted tokens and component documentation
3. Apply these rules:
   - **Deduplicate** — Merge identical or near-identical values
   - **Normalize** — Convert all color values to hex (with HSL in comments)
   - **Scale** — Organize values into logical scales where possible
   - **Name** — Apply semantic names to raw values
   - **Omit empty sections** — Remove sections with no extracted tokens

### Output Formats

Offer the user a choice of output format:

```
Which output format would you like?

1. **Markdown** (default) — Structured document for documentation
2. **CSS Variables** — Ready-to-use :root custom properties
3. **Tailwind Config** — tailwind.config.js theme object
4. **JSON Tokens** — Design token JSON (W3C format compatible)
5. **All** — Generate all formats

Please select (1-5) or press Enter for Markdown:
```

### Markdown Output
- Use the template from `assets/design-system-template.md`
- Include color swatches using inline HTML: `<span style="background:COLOR;width:24px;height:24px;display:inline-block;border-radius:4px;vertical-align:middle"></span>`
- Save to user-specified path or `prompter/design-system.md`

### CSS Variables Output
- Generate a `:root` block with all tokens as custom properties
- Use `--ds-` prefix for namespacing
- Group by category with comments
- Save to `design-tokens.css`

### Tailwind Config Output
- Generate a `theme.extend` object with all tokens mapped
- Save to `design-tokens.tailwind.js`

### JSON Tokens Output
- Follow W3C Design Tokens format where applicable
- Nest by category → token name → `{ value, type, description }`
- Save to `design-tokens.json`

---

## Step 5: Save & Report

After generating the document:

1. Save to the specified output path (default: `prompter/design-system.md`)
2. Update `AGENTS.md` files (see Step 6 below)
3. Print a summary:

```
✅ Design System Generated

📄 Output: <file-path>
🎨 Colors: <count> tokens extracted
🔤 Typography: <count> tokens extracted
📐 Spacing: <count> tokens extracted
🧩 Components: <count> identified
📊 Source: <input-type description>

Next steps:
- Review and adjust token names for your conventions
- Add component usage examples as needed
- Import tokens into your project's theme configuration
```

---

## Step 6: Update AGENTS.md Files (REQUIRED)

After saving the design system document, update both AGENTS.md files in the project so AI assistants know the design system exists and where to find it.

### 6.1 Update root `AGENTS.md`

Check if `AGENTS.md` exists in the project root. If it does:

1. Look for an existing "Design System" section — if found, update it; if not, add it.
2. Also update the `prompter/` directory tree if one is shown (add `design-system.md` to it).

Add or update this block (place it near the Prompter Workflow or Output Location section):

```markdown
## Design System

A project-level design system is generated and maintained at `prompter/design-system.md`.

- Generated by the `design-system-generator` skill (`prompter/skills/design-system-generator/`)
- Contains design tokens: colors, typography, spacing, borders, shadows, breakpoints, and components
- Consult this file when building UI components or making styling decisions to ensure consistency
- Regenerate it by invoking the `design-system-generator` skill with updated source material
```

If the root `AGENTS.md` has a directory tree like:

```
prompter/
├── project.md
└── ...
```

Add `design-system.md` to it:

```
prompter/
├── project.md              # Project context (edit this!)
├── design-system.md        # Generated design system (see Design System section)
└── ...
```

### 6.2 Update `prompter/AGENTS.md`

Check if `prompter/AGENTS.md` exists. If it does:

1. In the **Directory Structure** section, add `design-system.md` to the `prompter/` tree if not already present:

```
prompter/
├── project.md              # Project conventions
├── design-system.md        # Generated design system (colors, typography, spacing, components)
├── specs/
...
```

2. In the **Before Any Task** > **Context Checklist**, add this entry if not already present:

```markdown
- [ ] Read `prompter/design-system.md` for UI/styling decisions (if task involves frontend)
```

3. After the checklist, add or update a **Design System** block if not already present:

```markdown
**Design System:**

The project design system lives at `prompter/design-system.md`. It is generated by the `design-system-generator` skill and contains design tokens (colors, typography, spacing, borders, shadows, breakpoints) and component patterns.

- Consult it before building or modifying UI components to stay consistent with established tokens
- Regenerate it with the `design-system-generator` skill when the visual design changes significantly
```

### 6.3 Skip gracefully if files don't exist

If either AGENTS.md file does not exist in the target project, skip that file silently — do not create it.

---

## Edge Cases

- **Insufficient input**: If very little design information is extractable, note gaps and suggest what the user should provide additionally
- **Conflicting values**: When similar but not identical values exist (e.g., `#333` and `#2d2d2d`), consolidate and note the original values
- **No components found**: If input is pure CSS variables or a config file, skip the Components section
- **Screenshot-only input**: Mark all extracted values as "approximate" and recommend verification

---

## Resources

- **Template**: [design-system-template.md](assets/design-system-template.md) — Output document template
- **Extraction patterns**: [extraction-patterns.md](references/extraction-patterns.md) — CSS property-to-token mapping rules and regex patterns
