---
name: feature-planner
description: Plan feature development on existing projects. Interview users about what they want to build, analyze the codebase to understand tech stack, patterns, and affected areas, then produce a structured implementation plan with phased tasks. Optionally scaffolds a Prompter change proposal. Use when a user wants to add a feature, make a change, or plan development work on a project that already exists.
---

# Feature Developer

Interview the user about what they want to build, analyze the existing codebase, then produce a phased implementation plan with concrete tasks and file references.

## Quick Start

1. **DESCRIBE** -- Ask what the user wants to build and why
2. **ANALYZE** -- Scan the codebase: structure, tech stack, patterns, existing specs
3. **SCOPE** -- Present what's in/out of scope, identify affected files
4. **PLAN** -- Break down into phased implementation tasks
5. **REVIEW** -- Present the plan and iterate until approved
6. **PROPOSAL** -- Optionally create a Prompter change proposal

---

## Before You Begin (REQUIRED)

Before starting the interview:

1. **Read `AGENTS.md`** at the project root (if it exists) to understand the tech stack, conventions, and architecture.
2. **Read `prompter/project.md`** (if it exists) to understand project conventions.
3. **Scan the project structure** using Glob to understand the directory layout and key files.

Store what you learn -- you'll reference it when identifying affected files and patterns.

---

## Interactive Terminal Tool (REQUIRED)

Use the `AskUserQuestion` tool for **every question** in the interview. This renders an interactive UI in the terminal.

### How to Use AskUserQuestion

- **Single-choice questions**: Set `multiSelect: false`. Use for yes/no, pick-one decisions.
- **Multi-choice questions**: Set `multiSelect: true`. Use for checklists.
- **Free-text input**: When you need the user to describe something open-ended (like the feature itself), ask as a plain message and wait for their response. Only use `AskUserQuestion` for structured choices.
- **Keep options concise**: Labels should be 1-5 words. Add detail in the `description` field.

---

## Core Rules

- Use `AskUserQuestion` for every structured question -- never ask choice questions as plain text.
- Ask one question or one small grouped set at a time. Never overwhelm.
- After every answer, acknowledge what you understood before moving on.
- Ground every suggestion in what you observed in the codebase -- don't guess patterns.
- If unsure about something, look at the code before asking the user.
- Keep the interview short -- 3 to 5 questions max before producing the plan.

---

## Step 1: Feature Description (REQUIRED)

Open with:

```
What feature or change do you want to build? Tell me:

1. What it does (the user-visible behavior or system change)
2. Why you need it (the problem it solves or value it adds)
3. Any constraints or preferences (e.g., "must use existing auth system", "keep it simple")
```

Wait for the user's response. Summarize what you understood in 2-3 sentences.

---

## Step 2: Codebase Analysis (REQUIRED)

After understanding the feature, **silently analyze the codebase**. Do NOT ask the user about the tech stack -- discover it yourself.

### What to Analyze

1. **Project structure** -- Use Glob to map the directory layout (e.g., `src/**`, `app/**`, `resources/**`)
2. **Tech stack** -- Identify framework, language, database, styling from config files:
   - `package.json`, `composer.json`, `Cargo.toml`, `go.mod`, `requirements.txt`
   - Framework configs: `next.config.*`, `vite.config.*`, `artisan`, `convex/`
   - Database: migrations folder, schema files, ORM config
3. **Existing patterns** -- Read 2-3 files similar to what you'll need to create/modify:
   - If adding an API endpoint, read an existing endpoint
   - If adding a UI component, read an existing component
   - If adding a model, read an existing model
4. **Related code** -- Use Grep to find code related to the feature (e.g., if adding notifications, search for existing notification code)
5. **Existing specs** -- Check `prompter/specs/` for relevant capability specs

### Present Findings

After analysis, present a brief summary:

```
Here's what I found in your codebase:

**Stack**: [e.g., Laravel 12 + Filament + PostgreSQL + Docker]
**Structure**: [e.g., Standard Laravel with domain-driven modules under app/Domains/]
**Relevant patterns**:
- [e.g., Controllers follow single-action pattern (app/Http/Controllers/)]
- [e.g., All models use UUIDs as primary keys]
- [e.g., Tests use Pest with factories]

**Related existing code**:
- [e.g., Similar notification system exists at app/Notifications/]
- [e.g., No existing code for webhooks -- this is net new]
```

Then ask using `AskUserQuestion`:

```json
{
  "questions": [
    {
      "question": "Does this look right? Anything I missed about how your project works?",
      "header": "Codebase Analysis",
      "multiSelect": false,
      "options": [
        { "label": "Looks correct", "description": "Move on to scoping" },
        { "label": "Need to correct something", "description": "I'll clarify what's different" }
      ]
    }
  ]
}
```

If the user corrects something, update your understanding and move on.

---

## Step 3: Scope & Affected Areas

Based on the feature description and codebase analysis, present the scope:

```
Here's what I'd include for this feature:

**In scope:**
- [change 1]
- [change 2]
- [change 3]

**Out of scope (can do later):**
- [deferred item 1] -- [reason]

**Files that will be affected:**
- `path/to/file.ext` -- [what changes: new / modify / delete]
- `path/to/file.ext` -- [what changes]
```

Then ask:

```json
{
  "questions": [
    {
      "question": "Does this scope match what you had in mind?",
      "header": "Feature Scope",
      "multiSelect": false,
      "options": [
        { "label": "Looks good", "description": "Proceed to implementation plan" },
        { "label": "Too much", "description": "I want to trim the scope" },
        { "label": "Missing something", "description": "I'll tell you what to add" }
      ]
    }
  ]
}
```

Iterate until the user confirms the scope.

---

## Step 4: Implementation Plan (REQUIRED)

Produce the implementation plan using the template in `assets/implementation-plan-template.md`.

### Planning Rules

- **Phase tasks logically**: database/schema first, then backend logic, then frontend, then tests.
- **Reference specific files**: Every task should mention the file path where the work happens. Use existing file paths for modifications; propose paths that follow existing conventions for new files.
- **Follow existing patterns**: If the project uses a specific pattern (e.g., repository pattern, single-action controllers), your plan must follow it.
- **Be concrete**: "Create UserNotification model with `user_id`, `type`, `message`, `read_at` columns" is better than "Create notification model".
- **Include test tasks**: Always include at least one testing phase.
- **Keep it achievable**: Aim for a plan that can be completed in a single session. If the feature is large, suggest splitting it and plan only the first part.

### Present the Plan

Output the filled-in implementation plan template, then ask:

```json
{
  "questions": [
    {
      "question": "Does this implementation plan look correct?",
      "header": "Plan Review",
      "multiSelect": false,
      "options": [
        { "label": "Approved", "description": "Save the plan and optionally create a proposal" },
        { "label": "Needs changes", "description": "I'll tell you what to adjust" }
      ]
    }
  ]
}
```

Iterate if the user requests changes.

---

## Step 5: Save & Next Steps (REQUIRED)

Once approved, save the plan based on what's available in the project.

### If Prompter is installed

Check whether `prompter/core/proposal.md` exists using Glob.

If it exists, ask:

```json
{
  "questions": [
    {
      "question": "How would you like to proceed?",
      "header": "Next Steps",
      "multiSelect": false,
      "options": [
        { "label": "Create proposal", "description": "Scaffold a Prompter change proposal from this plan" },
        { "label": "Start building", "description": "Jump straight into implementation using this plan" },
        { "label": "Save plan only", "description": "Save the plan to a file for later" }
      ]
    }
  ]
}
```

**If "Create proposal"**: Read `prompter/core/proposal.md` and `prompter/AGENTS.md`, then follow their instructions to scaffold a full change proposal. Use the implementation plan as context to derive:
- `change-id` (verb-led, kebab-case)
- `proposal.md` (why, what changes, impact)
- `tasks.md` (from the implementation phases)
- `design.md` (only if needed per Prompter criteria)
- Spec deltas under `specs/[capability]/spec.md`

After scaffolding, run `prompter validate <change-id> --strict --no-interactive` and fix any issues.

**If "Start building"**: Begin implementing the tasks from the plan sequentially. Read the plan as your checklist and complete each task in order.

**If "Save plan only"**: Write the plan to `implementation-plan.md` in the project root.

### If Prompter is NOT installed

Ask:

```json
{
  "questions": [
    {
      "question": "What would you like to do next?",
      "header": "Next Steps",
      "multiSelect": false,
      "options": [
        { "label": "Start building", "description": "Begin implementing the tasks now" },
        { "label": "Save plan only", "description": "Save the plan to a file for later" }
      ]
    }
  ]
}
```

**If "Start building"**: Begin implementing tasks sequentially.

**If "Save plan only"**: Write the plan to `implementation-plan.md` in the project root.

---

## Conversation Tips

### Handling Large Features
- Suggest splitting into multiple increments.
- Plan only the first increment in detail.
- Note follow-up work in the "Out of scope" section.
- Use: "This is a big feature. I'd suggest we tackle [core part] first and add [extras] after."

### Handling Vague Requests
- Look at the codebase first to infer what the user might mean.
- If still unclear after codebase analysis, ask ONE focused clarifying question.
- Never ask more than 2 clarifying questions before producing a draft plan -- it's easier to iterate on a concrete plan than to keep asking questions.

### Handling Technical Users
- Skip obvious explanations.
- Focus on file paths, patterns, and concrete decisions.
- Be direct about tradeoffs.

### Handling Unfamiliar Codebases
- Spend more time in Step 2 (analysis).
- Read more example files to understand patterns.
- Be explicit about assumptions: "I'm assuming X based on what I see in Y -- correct me if wrong."

---

## Resources

- **Implementation plan template**: [implementation-plan-template.md](assets/implementation-plan-template.md) -- Structured output format for the plan
