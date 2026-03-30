---
name: prompter-specs
description: Generate structured implementation specs from casual change requests. Analyzes the codebase first, then produces a clear specification with problem statement, current state analysis, proposed solution, files to modify, implementation details, and visual representation. Use when the user describes a desired change, improvement, or reorganization — especially in casual or vague terms — and needs a structured plan before implementation. Triggers on requests like "can you organize...", "I want to change...", "restructure this...", "clean up the...", "make it better", "plan out how to...", or any request implying a codebase change where analysis should precede coding. Also use when the user explicitly asks for a "spec", "specs mode", "implementation plan", or "analysis before coding". Even when the user's request sounds simple, if it involves modifying multiple files or making structural decisions, produce a spec first.
---

# Prompter Specs

Generate structured implementation specifications from casual user requests. Analyze first, spec second, implement only after approval.

## Core Principle

Do not jump to coding. When this skill activates, the job is to **understand the problem, analyze the current state, and produce a clear spec**. The user wants to see what will change and why before any code is written.

## Workflow

### 1. Understand the Request

Parse what the user is asking for, even if vague or casual. Phrases like "it's too long", "make it better", "organize this", "clean it up" all carry intent — identify the core problem behind them.

If the request is truly ambiguous (multiple valid interpretations), ask one focused clarifying question. Otherwise, proceed with analysis.

### 2. Explore the Codebase

Read the relevant files to understand the current state. Use Glob, Grep, and Read to build a complete picture. The spec must be grounded in what actually exists — never guess at file contents, counts, or structures.

Look for:
- The files and code directly related to the request
- Existing patterns and conventions the project uses
- Related systems that might be affected

### 3. Analyze and Decide

Formulate a solution based on what you found. When the user gives open-ended direction ("you decide", "figure it out", "whatever makes sense"), commit to a specific, well-reasoned approach. Present one clear recommendation — not a menu of options.

If there's a genuine trade-off worth flagging, mention it briefly in Implementation Details, but still recommend one path.

### 4. Write the Spec

Output a structured specification using the format below. Adapt section titles and depth to fit the change — a small reorganization needs less detail than an architecture shift.

### 5. Wait for Approval

After presenting the spec, ask if the user wants to:
- Proceed with implementation
- Adjust the proposal
- Discard and try a different approach

Do not start coding until the user confirms.

## Spec Format

```markdown
## Problem
[1-3 sentences describing what's wrong or what could be better.
Be specific — reference actual counts, names, or metrics from the codebase.]

## Current [Descriptive Title]
[Describe what exists right now. List items, show structure, reference actual
file contents. This section proves you've actually read the code.
Use a descriptive title that fits the context, e.g.:
- "Current Menu Items (flat list under Master Data)"
- "Current API Endpoints"
- "Current File Structure"]

## Proposed Solution: [Solution Title]
[Brief description of the approach — the "what" and "why" at a high level.]

### [Detail Section — titled to fit the change]
[The detailed proposal. Use nested lists, tables, diagrams, or whatever
format best communicates the new structure. Be specific — show exactly
what the result looks like, not vague descriptions.]

### Files to Modify
[For each file that needs changes:]
1. **`path/to/file`** — [What changes and why. Be specific about the
   nature of the change, not just "update this file".]

### Implementation Details
[Technical specifics:]
- What new fields, properties, or patterns to introduce
- How existing code adapts to the change
- What stays unchanged (helps the user assess risk and scope)
- Migration or backwards-compatibility notes if applicable
- Performance or security considerations if relevant

### Visual Result
[Where it helps, show a text-based visualization of the end result.
Skip this section if the change doesn't benefit from visual representation.
Good candidates: UI layouts, directory trees, data flows, table structures,
menu hierarchies, architecture diagrams.]
```

## Guidelines

### Match the Project's World

Read the project before writing the spec. Use its naming conventions, file organization patterns, and existing abstractions. Reference what the codebase already supports ("The sidebar already supports nested items — we extend this pattern") rather than proposing alien patterns.

### Ground Every Claim in Code

The "Current State" section must contain real information from the codebase. If the user says "the menu is too long" — count the items. If they say "the API is messy" — list the actual endpoints. If they say "the tests are slow" — check what test framework and patterns exist.

### Scale the Spec to the Change

- **Small changes** (rename, fix layout, reorder items): Shorter spec, skip Visual Result if not needed
- **Medium changes** (reorganize UI, refactor a module, add a feature): Full spec with all sections
- **Large changes** (new architecture, multi-service change): Consider splitting into phases, flag dependencies between them

### Call Out What Does NOT Change

Explicitly state what's unaffected. "No route or controller changes needed — purely presentation layer" or "Database schema unchanged" helps the user assess blast radius and risk.

### Stay Tech-Stack Agnostic

This workflow applies to any project. Whether it's Laravel, React, Django, Rails, Go, Swift, or a CLI tool — adapt the spec's language and file references to match. There's no assumption about framework or language.
