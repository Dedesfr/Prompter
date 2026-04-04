---
name: prompter-workflow
description: Guide spec-driven development through Prompter's three-stage workflow — creating change proposals with spec deltas, implementing approved changes, and archiving completed work. Use this skill whenever the user mentions proposals, specs, changes, plans, or asks to create/apply/archive a Prompter change. Also trigger when the user wants to add features, make breaking changes, update architecture, or plan implementation work that should go through a formal proposal process.
---

# Prompter Workflow

Drive spec-driven development through three stages: **Propose**, **Apply**, and **Archive**. Each stage has guardrails to keep changes minimal, scoped, and traceable.

## Before You Begin

1. Search existing specs under `prompter/specs/` and active changes under `prompter/changes/` to understand current state and avoid conflicts.
2. Search existing requirements with `rg -n "Requirement:|Scenario:" prompter/specs` before writing new ones.

## Detecting Which Stage

Determine which stage the user needs based on their request:

| Signal | Stage |
|--------|-------|
| "create a proposal", "plan a change", "add a feature", "I want to spec..." | **Propose** |
| "implement", "apply", "build this", references an existing change ID + wants code | **Apply** |
| "archive", "mark as done", "move to archive", references a completed change | **Archive** |

If unclear, default to **Propose** — it's always safer to plan first.

---

## Stage 1: Propose

Create a change proposal with spec deltas. No code gets written here — only design documents.

### Guardrails

- Favor straightforward, minimal implementations first.
- Keep changes tightly scoped to the requested outcome.
- Identify vague or ambiguous details and ask follow-up questions before editing files.
- Do not write any code during this stage.

### Steps

1. **Ground the proposal in current state.**
   - List `prompter/changes/` to see active changes (check for conflicts).
   - List `prompter/specs/` to see existing capabilities.
   - Inspect related code or docs to understand current behavior.
   - Note any gaps that require clarification from the user.

2. **Choose a change ID and scaffold.**
   - Pick a unique, verb-led, kebab-case ID (e.g., `add-two-factor-auth`, `update-payment-flow`, `remove-legacy-api`).
   - Create the directory structure:
     ```
     prompter/changes/<change-id>/
     ├── proposal.md
     ├── tasks.md
     ├── design.md  (only if needed — see criteria below)
     └── specs/
         └── <capability>/
             └── spec.md
     ```

3. **Map the change into capabilities.**
   - Break multi-scope efforts into distinct spec deltas with clear relationships.
   - Prefer modifying existing specs over creating duplicates.
   - One folder per affected capability under `specs/`.

4. **Write design.md (only when needed).**
   Create `design.md` if the solution spans multiple systems, introduces new patterns, or demands trade-off discussion. Include: Context, Goals/Non-Goals, Decisions, Risks/Trade-offs, Migration Plan, Open Questions.

5. **Draft spec deltas.**
   - Use `## ADDED|MODIFIED|REMOVED|RENAMED Requirements` headers.
   - Include at least one `#### Scenario:` per requirement.
   - Use SHALL/MUST for normative requirements.
   - Cross-reference related capabilities when relevant.
   - For MODIFIED requirements: copy the full existing requirement, then edit. Partial deltas lose detail at archive time.

6. **Draft tasks.md.**
   - Ordered list of small, verifiable work items.
   - Each task should deliver user-visible progress.
   - Include validation steps (tests, tooling).
   - Highlight dependencies or parallelizable work.

### Spec Format Reference

```markdown
## ADDED Requirements
### Requirement: Feature Name
The system SHALL provide [capability].

#### Scenario: Success case
- **WHEN** user performs action
- **THEN** expected result occurs

## MODIFIED Requirements
### Requirement: Existing Feature (full copy, then edit)
...

## REMOVED Requirements
### Requirement: Old Feature
**Reason**: [Why removing]
**Migration**: [How to handle]
```

---

## Stage 2: Apply

Implement an approved change proposal. Work through tasks sequentially, keeping edits minimal.

### Guardrails

- Do not start implementation until the proposal is reviewed and approved.
- Keep changes tightly scoped to what the proposal specifies.
- Favor straightforward, minimal implementations.

### Steps

1. **Read the proposal.**
   - Read `changes/<id>/proposal.md` to understand scope and motivation.
   - Read `changes/<id>/design.md` (if present) for technical decisions.
   - Read `changes/<id>/tasks.md` for the implementation checklist.

2. **Implement tasks sequentially.**
   - Work through each task in order.
   - Keep edits minimal and focused on the requested change.

3. **Confirm completion.**
   - Verify every item in `tasks.md` is actually finished before updating statuses.
   - Run tests and validation as specified in the tasks.

4. **Update the checklist.**
   - Mark each task `- [x]` only after all work is done.
   - Ensure the checklist reflects reality.

---

## Stage 3: Archive

Move a completed change to the archive and update specs.

### Steps

1. **Determine the change ID.**
   - If the user specified a change ID, use it (trim whitespace).
   - If referenced loosely (by title or summary), list `prompter/changes/` to find candidates and confirm with the user.

2. **Verify the change exists and is ready.**
   - Check `prompter/changes/<id>/` exists and is not already under `prompter/changes/archive/`.

3. **Move the change to archive.**
   - Move `prompter/changes/<id>/` to `prompter/changes/archive/YYYY-MM-DD-<id>/` (use today's date).
   - Apply the spec deltas: for each `changes/<id>/specs/<capability>/spec.md`, merge the ADDED/MODIFIED/REMOVED requirements into the corresponding `prompter/specs/<capability>/spec.md`.
   - Skip spec merging only for tooling-only changes that don't affect specifications.

4. **Confirm archive landed.**
   - Verify the directory moved to `prompter/changes/archive/`.
   - Verify target specs were updated correctly.

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| "Change must have at least one delta" | Check `changes/<id>/specs/` has `.md` files with `## ADDED\|MODIFIED\|REMOVED Requirements` headers |
| "Requirement must have at least one scenario" | Use `#### Scenario:` format (4 hashtags, not bullets or bold) |
| Silent scenario parsing failures | Exact format required: `#### Scenario: Name` |
