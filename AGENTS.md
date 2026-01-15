# AGENTS — Project Knowledge Base
## 1. 📍 Project Summary
Prompter CLI is a local-first developer tool that scaffolds and maintains AI workflow prompt templates. It initializes a `prompter/` workspace, generates slash-command templates for multiple AI coding tools, and lists enhanced prompts created by those workflows.

## 2. 🧱 Tech Stack
- Language: TypeScript (ESM)
- Runtime: Node.js >= 20
- CLI Framework: `commander`
- Interactive Prompts: `@inquirer/prompts`
- Terminal Output: `chalk`
- Build: `tsc` via `build.js`
- Tests: `vitest` (configured, no tests present)

## 3. 🏗️ Architecture Overview
- CLI entrypoint: `bin/prompter.js` → `dist/cli/index.js`.
- Commands: `init`, `update`, `list` implemented in `src/commands/`.
- Config and constants in `src/core/config.ts`.
- Template system in `src/core/templates/`, including slash-command bodies and project templates.
- Tool-specific workflow generation via configurators in `src/core/configurators/slash/`.
- Filesystem-only operations; no network or backend components.

## 4. 📁 Folder Structure & Important Files
- `src/cli/index.ts`: CLI command definitions.
- `src/commands/init.ts`: initialization workflow and tool selection.
- `src/commands/update.ts`: update workflow files.
- `src/commands/list.ts`: list enhanced prompts.
- `src/core/config.ts`: constants, supported tools, prompter directory helpers.
- `src/core/templates/`: template bodies and markers for workflow files.
- `src/core/configurators/slash/`: tool-specific file paths and frontmatter.
- `bin/prompter.js`: production CLI entry.
- `docs/product-spec.md`: product specification reference.

## 5. 🔑 Core Business Logic & Domain Rules
- Initialization is idempotent: if `prompter/` exists, `prompter init` exits with a warning.
- Workflow files include managed markers: `<!-- prompter-managed-start -->` and `<!-- prompter-managed-end -->`.
- Updates only replace content between markers; missing markers are treated as errors.
- Enhanced prompts live at `prompter/<slug>/enhanced-prompt.md`.

## 6. 🗂️ Data Models / Entities
- `ToolChoice`: tool selection metadata (name, id, availability, label).
- `EnhancedPrompt`: `{ id, path, createdAt }` derived from filesystem stats.

## 7. 🧠 Domain Vocabulary / Glossary
- **Prompter**: the CLI tool.
- **Enhanced Prompt**: AI-generated specification saved to `prompter/<slug>/enhanced-prompt.md`.
- **Workflow File**: tool-specific slash-command template file.
- **Markers**: managed section boundaries for safe updates.

## 8. 👥 Target Users & Personas
- Developers using AI coding assistants who want standardized prompt workflows.
- Team leads who need consistent prompt enhancement across repositories.

## 9. ✨ UI/UX Principles
- Clear CLI output with status icons and colorized feedback.
- Minimal prompts; optional non-interactive operation via flags.

## 10. 🔒 Security / Privacy Rules
- No authentication or authorization.
- Local filesystem only; no network calls.
- Avoid storing sensitive data in prompts unless repository policies allow it.

## 11. 🤖 Coding Conventions & Standards
- ESM imports with explicit `.js` extensions in compiled paths.
- Strict TypeScript (`tsconfig.json` uses `strict: true`).
- Prefer small, focused modules and clear command boundaries.

## 12. 🧩 Development Rules for AI Agents (must include rules: never invent endpoints/fields/models, match existing coding style and architecture, modify only necessary parts — never full rewrite, ask before executing risky changes, return diffs/patch format when editing)
- Never invent endpoints, fields, or models that do not exist in the repository.
- Match the existing coding style, module boundaries, and architecture.
- Modify only necessary parts; never do a full rewrite.
- Ask before executing risky or destructive changes.
- Return diffs/patch format when editing.

## 13. 🗺️ Integration Map
- Supported AI tools and their workflow file paths:
  - Antigravity: `.agent/workflows/prompter-enhance.md`
  - Claude Code: `.claude/commands/prompter/enhance.md`
  - Codex: `.codex/prompts/prompter-enhance.md`
  - GitHub Copilot: `.github/prompts/prompter-enhance.md`
  - OpenCode: `.opencode/prompts/prompter-enhance.md`
  - Kilo Code: `.kilocode/workflows/prompter-enhance.md`

## 14. 🗺️ Roadmap & Future Plans
- None documented in the repository.

## 15. ⚠️ Known Issues / Limitations
- No tests present despite vitest configuration.
- `prompter update` runs across all known tools, not just configured ones.
- Update requires markers; files missing markers cannot be updated.

## 16. 🧪 Testing Strategy
- Intended test runner: `vitest` (no test files currently present).

## 17. 🧯 Troubleshooting Guide
- If `prompter update` fails, verify the workflow file contains the managed markers.
- If `prompter list` is empty, ensure enhanced prompts exist at `prompter/<slug>/enhanced-prompt.md`.
- If `prompter init` says already initialized, remove or rename the existing `prompter/` directory only if safe.

## 18. 📞 Ownership / Responsibility Map
- Not specified; treat as repository owner-maintained.

## ⏳ Missing Information Needed
- Business roadmap, release plans, or milestones.
- Ownership contacts and support process.
- Any data retention or compliance requirements.
