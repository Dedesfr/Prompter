# Claude Code Instructions

@AGENTS.md

## Claude Code-specific

<!-- Include only the subsections below that actually apply. Delete the rest. -->

### Slash commands

<list `.claude/commands/*.md` — name + one-line purpose>

- `/<command>` — <purpose>

### Skills

<list project skills under `skills/` or `.claude/skills/` with trigger phrases>

- **<skill-name>** (`<path>`) — <what it does>. Trigger: <phrase>

### Hooks

<from `.claude/settings.json` — what runs on what event>

- `PostToolUse` on `Edit|Write` → `<command>` (<purpose>)

### Memory imports

<other files Claude should auto-load via `@path`>

- `@docs/architecture.md` — <why>

### Workflow

<Claude-specific behavior the user wants here. Examples:>

- Always run `<typecheck cmd>` before declaring a task done.
- Prefer the project's <skill-name> skill over ad-hoc <task>.
- When editing <area>, also update <related file>.
