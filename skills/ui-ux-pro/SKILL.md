---
name: ui-ux-pro
description: Assist users in creating or revising UI/UX designs with emphasis on creativity, interactivity, and professional quality. Produces unique designs that avoid generic AI-generated aesthetics. Adapts to all skill levels from beginners to seasoned professionals. Proactively discovers user preferences via guided conversation. Aligns with existing project themes or performs full overhauls on request. Use when designing new interfaces, revising existing UI/UX, improving user interactions, or reviewing design quality.
---

# UI UX Pro

Design and revise user interfaces with authentic creativity. Engage users through iterative discovery, adapt to their project context, and deliver designs that feel handcrafted — never generic or AI-generated.

## Quick Start

1. **DISCOVER** — Understand the user's project, goals, and aesthetic preferences
2. **ASSESS** — Analyze existing design (if any) to identify the current state
3. **PROPOSE** — Present tailored design directions with rationale
4. **DESIGN** — Deliver concrete UI/UX specifications, code, or mockup guidance
5. **REFINE** — Iterate based on feedback until the user is satisfied

---

## Step 0: Read Project Context

Before designing, gather project context:

1. Read `AGENTS.md` at the project root (if present) for tech stack, conventions, and constraints
2. Scan for existing design artifacts:
   - Tailwind config, CSS variables, theme files
   - Component libraries in use (e.g., shadcn, Radix, Material, Ant, Chakra)
   - Existing color schemes, typography, layout patterns
3. Identify the frontend framework: React, Vue, Svelte, Angular, vanilla HTML/CSS, etc.

**Store this as the Design Context for the session.**

---

## Step 1: Discovery Conversation (REQUIRED)

Never jump to designing. First, understand what the user needs through guided questions.

### 1a: Determine Scope

Ask the user:

```
What would you like to work on?

1. **New design** — Build a new page, component, or feature from scratch
2. **Redesign / Improve** — Revise an existing interface
3. **Design audit** — Review current design for issues and opportunities
4. **Component design** — Design a specific UI component or pattern
5. **Full overhaul** — Rethink the entire visual identity and UX

Please select or describe what you need:
```

### 1b: Understand the Target

Based on the scope, ask targeted follow-ups. Always batch 2-3 questions to keep conversation efficient.

**For new designs:**
- What is the purpose of this page/feature? Who is the primary user?
- Do you have reference sites or screenshots you admire? What specifically about them?
- Any brand guidelines, color preferences, or design constraints?

**For redesigns:**
- What specifically feels wrong or could be better about the current design?
- Which parts should stay and which can change?
- Show me the file(s) or screenshot of the current state

**For audits:**
- Which pages or components should I review?
- What are your main concerns? (usability, aesthetics, accessibility, performance)

**For component design:**
- What is the component's function and where does it appear?
- What states does it need? (default, hover, active, disabled, loading, error, empty)
- Any existing design system it should conform to?

### 1c: Uncover Aesthetic Preferences

Present curated design direction options rather than open-ended questions. Tailor these to the project type:

```
Which design direction resonates with your project?

1. **Clean & Minimal** — Generous whitespace, restrained palette, typography-driven
2. **Bold & Expressive** — Strong colors, large type, dynamic layouts, personality-forward
3. **Warm & Organic** — Soft edges, earthy tones, natural textures, approachable feel
4. **Sharp & Technical** — High contrast, monospace accents, data-dense, precision feel
5. **Playful & Vibrant** — Bright palette, rounded shapes, micro-animations, energetic
6. **Refined & Editorial** — Serif typography, spacious, editorial grid, luxury feel

Select one, or describe your own direction:
```

If the user has an existing design, **default to aligning with their current theme** unless they explicitly request a departure.

### 1d: Confirm Design Parameters

Before proceeding, summarize back to the user:

```
Here's what I understand:

- **Scope**: [new design / redesign / audit / component / overhaul]
- **Target**: [page/feature/component description]
- **Direction**: [aesthetic direction]
- **Tech stack**: [detected framework + CSS approach]
- **Constraints**: [brand colors, accessibility requirements, component library, etc.]

Does this look right? Anything to adjust?
```

Wait for confirmation before proceeding.

---

## Step 2: Design Analysis (For Existing Projects)

When working with existing code or designs:

### 2a: Extract Current Design Language

1. Identify the color palette in use (CSS variables, Tailwind config, or inline values)
2. Catalog typography: font families, scale, weights
3. Map spacing patterns: padding, margins, gaps
4. Note component patterns: cards, buttons, forms, navigation
5. Identify interaction patterns: transitions, hover states, animations

### 2b: Identify Design Issues

Evaluate against these criteria (report only what's relevant):

**Visual Hierarchy**
- Is the most important content visually dominant?
- Do headings, body, and captions form a clear typographic scale?
- Is there a clear visual flow guiding the user's eye?

**Consistency**
- Are spacing values consistent or arbitrary?
- Do similar components look and behave similarly?
- Is the color usage systematic or ad-hoc?

**Usability**
- Are interactive elements obviously clickable/tappable?
- Is there adequate contrast for readability (WCAG AA minimum)?
- Are touch targets at least 44×44px on mobile?
- Are form labels clear and error states helpful?

**Layout & Responsiveness**
- Does the layout work across breakpoints?
- Is the content readable at all viewport sizes?
- Are there awkward wrapping or overflow issues?

**Interaction Quality**
- Do state transitions feel smooth and intentional?
- Is loading/empty/error state UX considered?
- Are animations purposeful (not decorative for the sake of it)?

### 2c: Present Findings

Organize findings by impact, not by category. Lead with the highest-impact improvements:

```
## Design Analysis

### High Impact
1. [Issue] — [Why it matters] — [Suggested improvement]

### Medium Impact
2. [Issue] — [Why it matters] — [Suggested improvement]

### Quick Wins
3. [Issue] — [Simple fix]
```

---

## Step 3: Design Proposal

### 3a: Present Design Directions

Always present 2-3 options with clear trade-offs. Never present a single "take it or leave it" solution.

For each direction, include:
- **Name** — A memorable label (not "Option A")
- **Concept** — 1-2 sentence description of the approach
- **Key changes** — Concrete list of what changes
- **Trade-offs** — What you gain and what you give up
- **Effort** — Rough implementation complexity (light / moderate / significant)

Example:

```
### Direction 1: "Breathe"
Open up the layout with generous spacing, reduce visual noise, let content speak.

**Key changes:**
- Increase base spacing from 16px to 24px grid
- Reduce color palette to 2 primaries + neutrals
- Remove decorative borders, use whitespace for separation
- Enlarge body text to 16px / 1.6 line-height

**Trade-offs:** Cleaner feel, but requires more vertical scroll. Some information density is lost.
**Effort:** Light — mostly spacing and typography adjustments.

### Direction 2: "Structure"
...
```

### 3b: Get User Selection

Ask the user to pick a direction or mix elements from multiple. Proceed only after confirmation.

---

## Step 4: Design Implementation

### 4a: Output Format

Determine appropriate output based on the project:

- **Code** (default for projects with existing code) — Produce actual CSS/Tailwind/component code
- **Design spec** — Use template from `assets/design-spec-template.md` for handoff
- **Annotated guidance** — Describe changes with specific property values for the user to implement

### 4b: Implementation Principles

Follow these rules when producing design output:

**Avoid AI-Generated Aesthetic Traps:**
- See [design-principles.md](references/design-principles.md) for the full anti-pattern catalog
- Never use perfectly symmetric layouts for organic content
- Avoid gratuitous gradients, glassmorphism, or trend-of-the-month effects unless they serve a purpose
- Don't default to rounded-everything (border-radius: 9999px) — choose radii intentionally
- Avoid stock-illustration-style decorative SVGs
- Skip "hero section with giant headline + subtitle + CTA" unless the content warrants it
- Use whitespace asymmetrically — not everything needs to be centered

**Design with Intent:**
- Every visual choice should have a reason (hierarchy, grouping, emphasis, or rhythm)
- Typography does 80% of the work — get the type scale, weights, and spacing right first
- Color should be used sparingly and purposefully — most great designs use very few colors
- Spacing creates rhythm — use a consistent scale but vary it to create visual interest
- Contrast (size, weight, color, space) creates hierarchy — not decoration

**Adapt to Existing Design:**
- When the user has an existing design, evolve it rather than replacing it
- Preserve brand colors, fonts, and recognizable patterns unless asked to change
- Introduce changes gradually — don't shock the user with something unrecognizable
- Reference existing CSS variables and design tokens when available

### 4c: Deliver Incrementally

For large designs, break delivery into logical chunks:
1. Layout structure and spacing
2. Typography and color
3. Component-level details
4. Interaction states and transitions
5. Responsive adaptations

After each chunk, check in with the user before proceeding.

---

## Step 5: Iteration & Refinement

### 5a: Gather Feedback

After presenting the design, ask specific questions:

```
How does this feel? A few specific things to consider:

1. Does the overall layout match what you had in mind?
2. How do the colors feel — too muted, too bold, or about right?
3. Is the typography comfortable to read?
4. Anything that jumps out as "off" or needs adjustment?
```

### 5b: Respond to Feedback

- **"I like it but..."** — Make targeted adjustments, preserve what works
- **"It's not what I imagined"** — Ask clarifying questions, propose a new direction
- **"Can you try..."** — Implement the request and show the result
- **"Perfect!"** — Summarize the final design decisions and provide complete implementation

### 5c: Document Final Decisions

When the user is satisfied, produce a summary:

```
## Design Summary

**Direction:** [chosen direction]
**Key Design Decisions:**
- [Decision 1]: [value/approach] — [rationale]
- [Decision 2]: [value/approach] — [rationale]

**Files Changed:**
- [file path] — [what changed]

**Design Tokens (if applicable):**
- Colors: [list]
- Typography: [scale]
- Spacing: [base unit]
```

---

## Interaction Guidelines

### Tone & Communication

- Be a collaborative design partner, not a prescriptive authority
- Explain the *why* behind design choices — educate while designing
- Use concrete visual language ("increase the heading to 32px bold") not abstract ("make it pop")
- When the user's request conflicts with good design, explain the trade-off and offer alternatives — don't just comply silently
- Celebrate good design instincts the user already has

### Handling Ambiguity

- When unsure, present 2 options with trade-offs rather than guessing
- Default to the conservative choice that aligns with the existing design
- For subjective decisions (color warmth, spacing tightness), always ask

### Skill Level Adaptation

- **Beginner signals** (vague requests, unfamiliar with terminology): Explain concepts inline, give complete code, suggest defaults
- **Intermediate signals** (knows what they want, some terminology): Focus on trade-offs and best practices, provide code with brief explanations
- **Expert signals** (uses precise terminology, references specific patterns): Be concise, skip basics, engage at a peer level, discuss nuances

---

## Edge Cases

- **No existing design**: Start from the design direction conversation, build everything from scratch using the project's tech stack
- **Screenshot-only input**: Analyze visually, note that extracted values are approximate, ask for source files if available
- **Design system conflict**: When the user wants something that conflicts with their existing design system, flag it and ask whether to extend the system or make a one-off exception
- **Accessibility requirements**: Always meet WCAG AA as a baseline. Flag choices that would fail contrast ratios or touch target sizes. If the user insists on an inaccessible choice, explain the impact clearly
- **Performance considerations**: Flag design choices that may impact performance (heavy animations, large images, complex CSS) and suggest alternatives

---

## Resources

- **Design principles**: [design-principles.md](references/design-principles.md) — Anti-AI-look patterns, authentic design craft, and visual quality checklist
- **Component patterns**: [component-patterns.md](references/component-patterns.md) — Common UI component best practices, states, and interaction patterns
- **Design spec template**: [design-spec-template.md](assets/design-spec-template.md) — Structured template for design specification output
