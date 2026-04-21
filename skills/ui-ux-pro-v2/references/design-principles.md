# Design Principles — Anti-AI Aesthetic & Authentic Design Craft

Reference for producing designs that feel human-crafted, intentional, and unique. Load this when implementing designs or reviewing design quality.

---

## Anti-AI-Look Patterns

AI-generated designs share recognizable traits. Avoid these to produce authentic work.

### Layout Anti-Patterns

| AI Trap | Why It Feels Generic | Do Instead |
|---|---|---|
| Perfect 3-column symmetry for everything | Real content isn't symmetric | Vary column widths, use 2-col or asymmetric grids |
| Every section is full-width hero + centered text | Repetitive rhythm, no visual variety | Mix layout types: sidebar, offset, editorial, split |
| Giant hero with headline + subtitle + CTA on every page | Cookie-cutter template feel | Match the hero to content importance — some pages don't need one |
| Everything centered on the page | Monotonous visual flow | Use left-aligned text with intentional center/right accents |
| Equal spacing everywhere | Flat, robotic rhythm | Vary spacing to create grouping and breathing room |
| Card grids with identical card sizes | Catalog/stock feel | Vary card sizes, feature one, use masonry or editorial layouts |

### Color Anti-Patterns

| AI Trap | Why It Feels Generic | Do Instead |
|---|---|---|
| Blue-to-purple gradient as primary | Overused AI default | Choose a palette rooted in the brand or project's personality |
| Neon accent on dark background | "Tech startup template" look | Use muted, sophisticated accents — or bold ones with restraint |
| Using 6+ colors with equal prominence | Visual noise, no hierarchy | 1-2 primary colors, 1 accent, rest neutrals |
| Gradient backgrounds on every section | Decorative without purpose | Use solid colors; reserve gradients for specific emphasis |
| Pure black (#000) text on pure white (#fff) | Harsh contrast, screen glare | Use near-black (#1a1a1a–#2d2d2d) on off-white (#f8f8f8–#fafafa) |
| Colored shadows (purple/blue box-shadows) | Trendy but rarely appropriate | Neutral shadows unless the brand specifically calls for it |

### Typography Anti-Patterns

| AI Trap | Why It Feels Generic | Do Instead |
|---|---|---|
| Using Inter/Poppins/Montserrat for everything | Ubiquitous AI defaults | Consider the project's personality — serif for editorial, geometric sans for tech, humanist for approachable |
| Only 2 sizes: heading and body | Flat hierarchy | Use a proper type scale (e.g., 12/14/16/20/24/32/48) |
| All text in the same weight | No emphasis, everything competes | Use 2-3 weights (regular, medium, bold) with clear purpose |
| ALL CAPS EVERYWHERE | Aggressive, hard to read | Reserve caps for small labels, buttons, or overlines |
| Giant display text with no supporting content | Empty visual calories | Size should match content importance |

### Component Anti-Patterns

| AI Trap | Why It Feels Generic | Do Instead |
|---|---|---|
| border-radius: 9999px on everything | Bubbly, toy-like | Choose 1-2 radius values that match the design's tone (4-8px for sharp, 12-16px for soft) |
| Glassmorphism / frosted glass everywhere | Trend over function | Use glass effects sparingly where depth communication is needed |
| Drop shadows on everything | Visual heaviness, everything "floats" | Shadow only elements that conceptually need elevation (modals, dropdowns, cards on hover) |
| Outlined icon + outlined button + outlined card | Everything is a border, nothing has weight | Mix filled and outlined treatments for hierarchy |
| Decorative blob SVGs or wave dividers | Instant AI template identifier | Use geometric shapes with purpose, or no decoration at all |
| Stock illustration people with purple skin | Unmistakable AI/startup template | Use photography, custom illustration, or no illustration |

### Interaction Anti-Patterns

| AI Trap | Why It Feels Generic | Do Instead |
|---|---|---|
| Everything has a hover scale(1.05) | Bouncy, distracting | Reserve scale for interactive cards; use color/shadow changes for most hover states |
| 0.3s ease on everything | Sluggish, indiscriminate | Use faster transitions (150-200ms) for small elements, slower (300-400ms) for layout changes |
| Fade-in-up on scroll for every element | Scroll-jacking, animation fatigue | Animate only key content on first appearance; let secondary content be static |
| Loading spinners as the only loading state | No context about what's loading | Use skeleton screens, progressive content reveal, or inline loading indicators |

---

## Authentic Design Principles

### 1. Content-First Hierarchy

Design serves content, not the other way around.

- Read the actual content before choosing layout
- Size elements proportional to their importance
- Use whitespace to group related content and separate sections
- Ask: "What should the user see first, second, third?"

### 2. Intentional Contrast

Every visual difference should communicate something.

- **Size contrast** — Headings vs. body, featured vs. standard items
- **Weight contrast** — Bold labels vs. regular values, strong CTAs vs. subtle links
- **Color contrast** — Primary actions vs. secondary, active states vs. default
- **Space contrast** — Tight groups of related items, generous gaps between sections
- **Density contrast** — Dense data areas vs. breathing hero/summary areas

### 3. Systematic but Not Robotic

Use systems (type scale, spacing scale, color tokens) but break them intentionally.

- Establish a base grid (4px or 8px) but don't snap everything mechanically
- Use your type scale but occasionally break it for display/hero moments
- Maintain consistent component patterns but allow contextual variations

### 4. Typography Does the Heavy Lifting

Most visual hierarchy comes from type, not decoration.

- Establish a clear scale: body → subhead → section head → page title → display
- Use weight and size together: a 14px bold label and a 16px regular body text create clear hierarchy without needing different colors
- Line-height matters: tighter for headings (1.1-1.3), looser for body (1.5-1.7)
- Letter-spacing: slightly positive for small caps/labels, zero or negative for large display text

### 5. Color as Communication

Color should mean something, not just decorate.

- **Brand color** — Primary actions, key elements, brand identity
- **Semantic color** — Success (green), warning (amber), error (red), info (blue)
- **Neutral palette** — Background, text, borders, dividers (this is 80% of your palette)
- **Accent** — Sparingly, to draw attention to one thing

### 6. Space Creates Meaning

Proximity and spacing communicate relationships.

- Items close together = related
- Items far apart = separate concepts
- Consistent internal padding = belonging to the same container
- Asymmetric margins = visual rhythm and movement

---

## Design Quality Checklist

Use this to evaluate designs before presenting to the user:

### Visual Hierarchy
- [ ] The most important element is visually dominant
- [ ] There is a clear reading order (F-pattern or Z-pattern where appropriate)
- [ ] Headings form a logical scale (not random sizes)
- [ ] CTAs are visually distinct from surrounding content

### Typography
- [ ] Body text is 16px+ for readability
- [ ] Line length is 45-75 characters for body text
- [ ] Heading/body font pairing is intentional
- [ ] No more than 3 font weights in active use

### Color
- [ ] Palette has 2 or fewer primary/accent colors
- [ ] Text:background contrast meets WCAG AA (4.5:1 for body, 3:1 for large text)
- [ ] Color is not the only indicator of state (icons, text, or shape also signal)
- [ ] Neutral palette has enough range (light bg, medium borders, dark text)

### Spacing & Layout
- [ ] Spacing follows a consistent scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- [ ] Related elements are grouped with tighter spacing
- [ ] Sections have comfortable breathing room
- [ ] Layout works at mobile, tablet, and desktop widths

### Components
- [ ] Interactive elements have visible hover/focus states
- [ ] Buttons have clear hierarchy (primary, secondary, tertiary/ghost)
- [ ] Form inputs have labels, placeholders are not used as labels
- [ ] Empty states, loading states, and error states are designed

### Interaction
- [ ] Transitions are fast (150-200ms) and purposeful
- [ ] Hover states indicate interactivity without being distracting
- [ ] Focus indicators are visible for keyboard navigation
- [ ] Animations don't block user interaction

### Authenticity
- [ ] Design doesn't match common template/AI patterns listed above
- [ ] Layout has visual variety (not repeating the same section format)
- [ ] Decoration (if any) serves a purpose
- [ ] The design reflects the project's unique personality
