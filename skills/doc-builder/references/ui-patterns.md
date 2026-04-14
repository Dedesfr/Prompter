# System Flowcharts - UI Pattern Documentation

> Reusable pattern for generating interactive system flowchart documentation pages.
> Mintlify-inspired Classic Light theme, featuring a left sidebar, top navbar, and Mermaid.js diagrams.

---

## Table of Contents

- [Design Tokens](#design-tokens)
- [Typography](#typography)
- [Page Structure](#page-structure)
- [Components](#components)
  - [Top Navigation Bar](#top-navigation-bar)
  - [Left Sidebar](#left-sidebar)
  - [Main Content Area](#main-content-area)
  - [Flowchart Container](#flowchart-container)
  - [Mermaid Diagram](#mermaid-diagram)
  - [Module Cards Grid](#module-cards-grid)
  - [Flow Steps (Timeline)](#flow-steps-timeline)
  - [Badges](#badges)
  - [Legend](#legend)
- [Mermaid Configuration](#mermaid-configuration)
- [JavaScript Behavior](#javascript-behavior)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Usage Template](#usage-template)

---

## Design Tokens

### Color Palette

| Token                | Value                          | Usage                    |
| -------------------- | ------------------------------ | ------------------------ |
| `--color-primary`    | `#0F172A`                      | Slate 900 - Dark text    |
| `--color-brand`      | `#18E299`                      | Primary brand green      |
| `--color-brand-light`| `#d4fae8`                      | Light brand background   |
| `--color-brand-deep` | `#0fa76e`                      | Deep brand accent text   |
| `--color-white`      | `#ffffff`                      | Main content background  |
| `--color-warning`    | `#F59E0B`                      | Amber - Warnings         |
| `--color-error`      | `#EF4444`                      | Red - Errors/Rejections  |
| `--color-info`       | `#3B82F6`                      | Blue - Standard Process  |
| `--color-gray-50`    | `#F9FAFB`                      | Standard light background|
| `--color-gray-100`   | `#F3F4F6`                      | Subtle hover background  |
| `--color-gray-500`   | `#6B7280`                      | Secondary text (slate)   |
| `--color-gray-700`   | `#374151`                      | Primary body text        |
| `--color-gray-900`   | `#111827`                      | Headings and strong text |
| `--color-border`     | `#E5E7EB`                      | Standard borders         |
| `--color-border-medium`| `#D1D5DB`                    | Hover borders            |

### Core Layout Dimensions

| Token                    | Value    | Usage                      |
| ------------------------ | -------- | -------------------------- |
| `--sidebar-width`        | `260px`  | Width of left sidebar      |
| `--header-height`        | `60px`   | Height of top sticky nav   |
| `--content-max-width`    | `880px`  | Max width of reading pane  |

---

## Typography

### Fonts

| Font             | Weight             | Usage                              |
| ---------------- | ------------------ | ---------------------------------- |
| **Inter**        | 400, 500, 600, 700 | Body, headings, main UI elements   |
| **Geist Mono**   | 400, 500, 600      | Code, tags, badges, step numbers   |

### Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Page Structure

The layout follows a two-column documentation structure:

```html
<body>
  <div class="layout">
    <header class="topbar">
      <!-- Logo and Breadcrumbs -->
    </header>

    <div class="layout-body">
      <aside class="sidebar">
        <!-- Sidebar Navigation Links -->
      </aside>

      <main class="main-content">
        <div class="content-container">
          <!-- Page Header (Title, Subtitle, Summary Pills) -->
          <!-- Flowchart Containers per section -->
        </div>
      </main>
    </div>
  </div>
</body>
```

---

## Components

### Top Navigation Bar

Sticky header with branding and dynamic breadcrumbs.

```html
<header class="topbar">
  <div class="topbar-logo">
    <svg>...</svg> Docs Logo
  </div>
  <div class="topbar-breadcrumbs">
    <!-- Breadcrumb items -->
    <span class="active" id="breadcrumb-current">Current Section</span>
  </div>
</header>
```

**Key styles:**
- `position: fixed`, `height: 60px`
- Background: `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(12px)`
- Border bottom: `1px solid var(--color-border)`

---

### Left Sidebar

Fixed navigation menu replacing traditional horizontal tabs.

```html
<aside class="sidebar">
  <div class="sidebar-group">
    <div class="sidebar-group-title">Category Name</div>
    <nav class="sidebar-nav">
      <button class="sidebar-link active" data-tab="overview">
        <span>Overview</span>
      </button>
      <button class="sidebar-link" data-tab="section-1">
        <span>Section 1</span>
      </button>
    </nav>
  </div>
</aside>
```

**Key styles:**
- Fixed below topbar, width `260px`
- Background: `var(--color-gray-50)`
- Links (`.sidebar-link`): Clean layout with `font-size: 0.875rem`
- Active State: Background `var(--color-brand-light)`, text `var(--color-brand-deep)`

---

### Main Content Area

Responsive container for readability.

```html
<main class="main-content">
  <div class="content-container">
    <div class="page-header">
      <div class="eyebrow">Category</div>
      <h1>Main Document Title</h1>
      <p class="subtitle">Document description</p>
    </div>
  </div>
</main>
```

**Key styles:**
- Margin-left matches sidebar width (`260px`)
- Content max-width constrained to `880px`
- `padding: 3rem 2rem 5rem` for generous vertical whitespace

---

### Flowchart Container

Wrapper that shows/hides content based on active sidebar link.

```html
<section class="flowchart-container" id="tab-id">
  <!-- Content for this section -->
</section>
```

**Key styles:**
- `display: none` by default, `display: block` when `.active`
- Fast entry animation: `fadeIn 0.4s ease` (opacity + translate)

---

### Mermaid Diagram

Container for Mermaid.js rendered flowcharts.

```html
<div class="mermaid-container">
  <h3>Diagram Title</h3>
  <p class="mermaid-caption">Diagram explanation text.</p>
  <pre class="mermaid">
flowchart TD
    A["Start"] --> B["Process"]
    B --> C{"Decision"}
    C -->|Yes| D["Success"]
    C -->|No| E["Handle Error"]
  </pre>
</div>
```

**Container styles:**
- Border: `1px solid var(--color-border)`
- Border radius: `12px`
- `overflow-x: auto` allows wide diagrams to scroll horizontally inside the container.

---

### Module Cards Grid

Overview cards for system modules/features.

```html
<div class="modules-grid">
  <article class="module-card">
    <h3>Module Name</h3>
    <p>Short description of the module.</p>
    <div class="badge-row">
      <span class="badge badge-module">Label</span>
    </div>
  </article>
</div>
```

**Key styles:**
- Grid: `repeat(auto-fill, minmax(320px, 1fr))`
- Pure white background, subtle `1px solid var(--color-border)` borders
- Hover effect: elevates shadow and darkens border to `--color-border-medium`

---

### Flow Steps (Timeline)

Vertical timeline with connected step cards.

```html
<div class="flow-section">
  <h3>Timeline Title</h3>
  <div class="flow-grid">
    <article class="flow-step">
      <span class="dot"></span>
      <h4>Step Title</h4>
      <p>Description</p>
    </article>
  </div>
</div>
```

**Key styles:**
- Timeline line: `::before` on `.flow-grid` (2px wide, gray-200)
- Connection dot: rendered via `.dot` element (16px circle, white center, brand green border)
- Steps inherit hover-elevation styles from `.module-card`

---

### Badges

Inline status indicators.

```html
<span class="badge badge-module">MODULE</span>
<span class="badge badge-status">DEFAULT</span>
<span class="badge badge-warning">WARNING</span>
<span class="badge badge-error">ERROR</span>
```

| Class            | Background             | Text Color          |
| ---------------- | ---------------------- | ------------------- |
| `.badge-module`  | `var(--brand-light)`   | `var(--brand-deep)` |
| `.badge-status`  | `var(--gray-100)`      | `var(--gray-700)`   |
| `.badge-warning` | `#FEF3C7` (Amber 100)  | `#D97706` (Amber 600)|
| `.badge-error`   | `#FEE2E2` (Red 100)    | `#DC2626` (Red 600) |

---

### Legend

Contextual legend placed after diagrams.

```html
<div class="legend">
  <h3>Legend</h3>
  <div class="legend-items">
    <div class="legend-item"><div class="legend-icon is-user"></div><span>User Action</span></div>
    <div class="legend-item"><div class="legend-icon is-system"></div><span>System Process</span></div>
  </div>
</div>
```

**Icon borders:** 
- User: Brand Green
- System: Slate 900
- Warning: Amber
- Process: Blue

---

## Mermaid Configuration

The design applies custom light-mode variables directly via the `mermaid.initialize` block to harmonize with the UI:

```javascript
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    darkMode: false,
    background: '#F9FAFB',
    mainBkg: '#ffffff',
    primaryColor: '#111827',
    primaryTextColor: '#374151',
    primaryBorderColor: '#18E299',
    lineColor: '#1f2937',
    secondaryColor: '#F3F4F6',
    tertiaryColor: '#E5E7EB',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '13px',
    edgeLabelBackground: '#ffffff',
    clusterBkg: '#F9FAFB',
    clusterBorder: '#E5E7EB'
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis',
    padding: 24,
    wrappingWidth: 200
  }
});
```

---

## JavaScript Behavior

### Navigation & Breadcrumbs

Clicking a `.sidebar-link` sets active classes on the link and matching `.flowchart-container`. It also extracts the link text and updates `#breadcrumb-current`, scrolling the user back to the top of the content area.

### Mermaid Lazy Rendering

Diagrams render only when their corresponding section is activated:

```javascript
const renderTab = async (tabId) => {
  if (renderedTabs.has(tabId)) return;
  const container = document.getElementById(tabId);
  if (!container) return;
  
  const diagrams = container.querySelectorAll('.mermaid');
  if (!diagrams.length) {
    renderedTabs.add(tabId);
    return;
  }
  
  if (document.fonts?.ready) await document.fonts.ready;
  await mermaid.run({ querySelector: `#${tabId} .mermaid` });
  renderedTabs.add(tabId);
};
```

### Scroll Animations

`.animate-on-scroll` elements fade and slide up automatically via `IntersectionObserver`.

---

## Responsive Breakpoints

### Tablets & Mobile (`max-width: 1024px`)

The dual-pane UI gracefully collapses:

| Component        | Change                                        |
| ---------------- | --------------------------------------------- |
| Sidebar          | Hidden (`display: none`)                      |
| Main Content     | `margin-left: 0`, full width, reduced padding |
| Topbar Logo      | Returns to intrinsic width                    |
