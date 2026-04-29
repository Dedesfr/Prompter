---
name: ai-context-generator
description: Generate AGENTS.md and CLAUDE.md for a project in one pass. Produces a single canonical AGENTS.md (tool-agnostic, dense, command-heavy) plus a CLAUDE.md that imports it via `@AGENTS.md` and adds Claude Code-specific context (slash commands, skills, hooks, settings). Use whenever the user wants to set up AI agent context, generate AGENTS.md, generate CLAUDE.md, refresh outdated agent docs, or onboard AI tools to a codebase. Also trigger on phrases like "agent rules", "agent instructions", "claude rules", "ai context file", "set up cursor/copilot/claude for this repo".
---

# AI Context Generator

Generate AGENTS.md and CLAUDE.md in one pass. AGENTS.md is canonical; CLAUDE.md is a thin Claude Code-specific layer that imports it via `@AGENTS.md` so they never drift.

## Quality bar (read first, re-check at the end)

Output must be **dense, concrete, surprising, bounded, skimmable**. If a line restates what `package.json` or the file tree already shows, cut it. Hard caps:

- AGENTS.md total: **≤ 200 lines** (≤ 300 only for genuinely large monorepos)
- Conventions section: **≤ 8 bullets, ≤ 15 words each**
- Never section: **≤ 6 bullets**
- Every command: exact, with flags, copy-pasteable. No placeholders.
- No emoji unless existing project docs use them. No marketing tone.

Before declaring done, re-read the output and answer: would an experienced contributor skip any section as "obvious"? If yes, cut it.

## Workflow

### Step 1 — Confirm scope

Ask once, briefly: *"Generating AGENTS.md and CLAUDE.md for `<repo>`. Anything specific to emphasize (gotchas, 'never do X' rules), or just analyze?"* Capture user input as priority signal for Step 3.

### Step 2 — Parallel discovery

Read `references/discovery-checklist.md` and execute all reads in **one parallel batch**. Do not serialize.

### Step 3 — Extract high-signal facts

Read `references/extraction-checklist.md` and pull only facts that match the checklist. If a fact isn't on the list and wasn't in the user's Step 1 input, leave it out.

### Step 4 — Write AGENTS.md

Use `references/AGENTS.template.md`. Before writing, scan `references/examples/AGENTS.good.md` to calibrate density and tone — pattern-match on it.

**Always** append the contents of `references/behavioral-guidelines.md` verbatim as the final section of AGENTS.md. Do not paraphrase, shorten, or reorder. The line caps in the quality bar do **not** apply to this appended block — it is fixed content.

**Stack overlays.** After the behavioral guidelines, check `references/overlays/` for any overlay matching the detected stack and append it verbatim too. Detection rules:

- **Laravel** → append `references/overlays/laravel.md` if `composer.json` contains `laravel/framework` OR an `artisan` file exists at repo root.

Add more overlays here as the directory grows. Line caps do not apply to overlay content.

### Step 5 — Write CLAUDE.md

Use `references/CLAUDE.template.md`. Default body is `@AGENTS.md` + Claude Code-specific sections only (slash commands, skills, hooks, permissions, memory imports, workflow). Skip any section that has no content. **Do not duplicate** anything from AGENTS.md — if you're tempted to, move it into AGENTS.md instead.

### Step 6 — Diff and confirm

If AGENTS.md or CLAUDE.md already exists, show the user the diff before overwriting. For new files, write them and report paths + line counts. End with one sentence on what to verify (e.g. "verify the test command actually runs in your env").
