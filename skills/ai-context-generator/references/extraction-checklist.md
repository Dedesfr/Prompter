# Extraction checklist

From discovery output, pull only facts that match the categories below. If a fact doesn't fit here and wasn't in the user's Step 1 input, **leave it out**.

1. **What this project is** — one sentence, plain English.
2. **Tech stack** — language + version, framework, key libs, package manager.
3. **Setup** — install + bootstrap commands in order.
4. **Daily commands** — dev, build, test (full + single file), lint, format, typecheck. Exact flags.
5. **Project layout** — 1–2 levels, one-line purpose per dir. Mark generated / vendored / deprecated.
6. **Code conventions** — only non-obvious ones (skip what the linter already enforces).
7. **Testing rules** — framework, location, unit vs integration boundary, mocking policy, fixtures.
8. **Architecture notes** — only if non-obvious (data flow, module boundaries, where state lives).
9. **Things to never do** — destructive ops, files not to touch, patterns rejected in past PRs.
10. **External services / env vars** — names only, never values; where credentials live.
## Priority rules

- User's Step 1 input takes precedence. If they named a gotcha, it goes in §9 with their wording preserved.
- Existing AGENTS.md / CLAUDE.md / .cursorrules content is **gold** — these contain hard-won knowledge. Preserve, don't paraphrase.
- When in doubt: omit. A short, dense file beats a long, hedged one.

## Density test

For each extracted fact, ask: *"Could a fresh contributor figure this out in 30 seconds by reading the repo?"* If yes, drop it. Keep only facts that save real time or prevent real mistakes.
