---
name: doc-builder
description: Generate interactive system flowchart documentation pages with Mermaid.js diagrams. Use this skill whenever the user asks to create documentation, document architecture, generate flowcharts, visualize system flows, or create technical diagrams for any scope — a single page, feature, module, or entire project/repo. Also use when the user says things like "create documentation for ...", "document this module", "generate system diagrams", or "visualize the architecture".
---

# System Flowcharts Generator

Generate interactive, self-contained HTML documentation pages with Mermaid.js flowchart diagrams. The pages follow a Mintlify-inspired design system with a sidebar, top navbar, module cards, and lazy-rendered diagrams.

## When to use

- User asks to document a system, module, feature, or entire repo
- User wants flowcharts, architecture diagrams, or system visualizations
- User says "create documentation", "document the flows", "generate diagrams", etc.

## Workflow

### 1. Determine Scope and Output Strategy

Ask the user (or infer from context) what they want documented. Then, after exploring the codebase, **recommend** whether to use a single file or multiple files — but let the user decide.

When making your recommendation, consider:
- **Number of flows/sections**: A feature with 3 flows fits comfortably in one file. A module with 12+ flows gets unwieldy.
- **Content density**: If each flow has detailed diagrams and step timelines, even a few flows can make a single page very long.
- **Navigability**: A single file with sidebar sections is simpler to share and browse. Multiple files are easier to maintain and load faster individually.

Present your recommendation like: "This module has 8 major flows — I'd suggest splitting into separate pages per domain area with an index page, but I can also put it all in one file if you prefer. What do you think?"

For multi-file output, create an `index.html` that links to each module's page. Each module page is fully self-contained (all CSS/JS inline).

### 2. Explore the Codebase

Investigate the target scope to understand:
- System architecture and module boundaries
- Data flows and request lifecycles
- Key processes, workflows, and decision points
- External integrations and dependencies
- Error handling paths

### 3. Identify Flowchart Content

For each section/module, identify:
- **Overview**: What the module does, its key components (rendered as module cards)
- **Flows**: The major workflows worth diagramming (each becomes a sidebar section with a Mermaid flowchart)
- **Steps**: Key process steps (rendered as timeline flow steps)

### 4. Generate the HTML

Read the full design system spec from `references/ui-patterns.md` in this skill's directory. Follow it exactly — all design tokens, components, typography, responsive breakpoints, and JavaScript behavior.

Key requirements:
- Single self-contained HTML file per page (all CSS and JS inline)
- Google Fonts loaded via `<link>` tag (Inter + Geist Mono)
- Mermaid.js loaded via CDN
- Left sidebar navigation with sections for Overview + each flow
- Lazy Mermaid rendering (diagrams render only when their tab is activated)
- Tab switching updates breadcrumbs and scrolls to top
- Scroll animations via IntersectionObserver
- Mobile responsive (sidebar collapses below 1024px)

### 5. Output Location

Save output to `docs/` directory by default:
- Single scope: `docs/flowcharts.html` or `docs/<name>-flowcharts.html`
- Multi-file: `docs/flowcharts/index.html` + `docs/flowcharts/<module>.html`

Ask the user if they want a different location.

---

## Mermaid Diagram Conventions

Use consistent node styling to communicate meaning:

| Color | Meaning | Mermaid Style |
|-------|---------|---------------|
| Cyan (`#06B6D4`) | Start/Entry point | `style A fill:#06B6D4,color:#fff` |
| Green (`#18E299`) | System process | `style B fill:#18E299,color:#0F172A` |
| Amber (`#F59E0B`) | Approval/Decision requiring human input | `style C fill:#F59E0B,color:#0F172A` |
| Red (`#EF4444`) | Error/Rejection | `style D fill:#EF4444,color:#fff` |
| White (`#ffffff`) | Standard process step | (default, no override needed) |

Always include a legend after each diagram explaining the color conventions used.

## Mermaid Tips

- Use `flowchart TD` (top-down) for most flows
- Use descriptive node labels in quotes: `A["User Submits Form"]`
- Use edge labels for conditions: `C -->|"Valid"| D`
- Keep diagrams focused — if a flow has more than ~15 nodes, split into sub-flows
- Use subgraphs to group related steps: `subgraph "Authentication" ... end`

---

## Index Page (Multi-file Output)

When generating multiple module pages, create an `index.html` that:
- Uses the same design system (topbar, styling)
- Shows a grid of module cards (one per module page)
- Each card links to the module's HTML file
- Includes a brief project overview at the top

---

## Design System Reference

The complete UI pattern specification is bundled at `references/ui-patterns.md`. Read it before generating any HTML. It contains:
- All design tokens (colors, spacing, dimensions)
- Typography specs (Inter + Geist Mono)
- Component HTML/CSS patterns (topbar, sidebar, flowchart containers, module cards, flow steps, badges, legends)
- Mermaid.js configuration block
- JavaScript for tab switching, lazy rendering, scroll animations
- Responsive breakpoints

Follow the spec precisely — do not improvise styles or deviate from the documented patterns.
