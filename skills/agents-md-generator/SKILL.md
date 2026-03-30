---
name: agents-md-generator
description: Generate or update an AGENTS.md file in any project's root directory. Creates a comprehensive, well-structured AGENTS.md following industry best practices from analysis of 2,500+ repositories. Works from existing project docs (README, package.json, config files), codebase analysis, or direct user input. Use this skill whenever the user wants to create an AGENTS.md, update an existing one, improve AI agent instructions for a project, or mentions setting up agent context for any codebase. Also trigger when users mention wanting better AI coding assistant results, agent configuration, or project onboarding for AI tools.
---

# AGENTS.md Generator

Generate or update a project's AGENTS.md file — the standard open-format file that gives AI coding agents the context they need to work effectively in a codebase.

## Why AGENTS.md matters

AGENTS.md is the "README for AI agents." Unlike README files written for humans, AGENTS.md provides the specific, structured context that AI coding agents need: exact commands with flags, concrete code examples, clear boundaries on what to never touch, and project-specific conventions that aren't obvious from the code alone. A well-written AGENTS.md dramatically improves the quality of AI-generated code by reducing hallucinated endpoints, mismatched coding styles, and violations of project constraints.

## Step 0: Determine Mode

Present these options to the user:

**What would you like to do?**

1. **Generate new AGENTS.md** — Create from scratch by analyzing the project
2. **Update existing AGENTS.md** — Improve or add sections to an existing file
3. **Generate from docs** — Build AGENTS.md from existing documentation (README, wiki, docs/)

Wait for the user's selection before proceeding.

## Step 1: Gather Project Context

The quality of the AGENTS.md depends entirely on understanding the project. Collect context from these sources, in priority order:

### 1.1 Automatic Discovery (always do this)

Scan the project root for context signals:

- **Package manifest**: `package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`, `composer.json`, `Gemfile`, `pom.xml`, `build.gradle`
- **Config files**: `tsconfig.json`, `.eslintrc*`, `.prettierrc*`, `tailwind.config.*`, `vite.config.*`, `webpack.config.*`, `docker-compose.yml`
- **CI/CD**: `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`
- **Existing docs**: `README.md`, `CONTRIBUTING.md`, `docs/`, `wiki/`
- **Existing AI config**: `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`
- **Test setup**: test directories, test config files, test scripts in package manifest
- **Git history**: recent commit patterns, active contributors

Read these files to extract:
- Tech stack and versions
- Build/test/lint commands
- Project structure patterns
- Coding conventions
- Architecture decisions

### 1.2 User-Provided Docs (if mode is "Generate from docs")

Ask the user to point to their documentation:
- "Which docs should I use as source material? (paths, URLs, or paste content directly)"

Read and synthesize the provided documentation into AGENTS.md sections.

### 1.3 Interactive Interview (fill gaps)

After automatic discovery, identify what's still missing and ask the user targeted questions. Don't ask about things you already know from the codebase. Focus on:

- **Project purpose**: What does this project do? (if not clear from README)
- **Architecture decisions**: Any non-obvious patterns or constraints?
- **Boundaries**: What should AI agents never touch? (secrets, vendor dirs, generated files, production configs)
- **Domain vocabulary**: Any project-specific terms agents need to know?
- **Common pitfalls**: What mistakes do new contributors (or AI agents) commonly make?
- **Testing requirements**: Any specific testing patterns or requirements?

Keep the interview short — 3-5 questions max, focused on what you genuinely couldn't determine from the code.

## Step 2: Structure the AGENTS.md

Use the template at `assets/agents-md-template.md` as a starting point. The template has 18 sections — not all are required for every project. Include a section only if you have substantive content for it. An empty or placeholder section ("Not specified") is worse than omitting it entirely.

### Section Priority

**Always include** (these are the highest-value sections based on empirical analysis):
1. **Project Summary** — What this project does, in 2-3 sentences
2. **Tech Stack** — Languages, frameworks, runtime versions
3. **Commands** — Build, test, lint, deploy commands with exact flags
4. **Folder Structure** — Key directories and their purposes
5. **Coding Conventions** — Real code examples, not verbal descriptions
6. **Development Rules for AI Agents** — Boundaries and constraints

**Include when relevant:**
7. **Architecture Overview** — Module structure, data flow
8. **Core Business Logic** — Domain rules that aren't obvious from code
9. **Data Models** — Key entities and relationships
10. **Domain Vocabulary** — Project-specific terms
11. **Security/Privacy Rules** — Auth flows, sensitive data handling
12. **Testing Strategy** — Frameworks, patterns, coverage expectations
13. **Integration Map** — External services, APIs, third-party tools

**Include only if substantive:**
14. **Target Users** — Who uses this and how
15. **UI/UX Principles** — Design patterns and constraints
16. **Roadmap** — Active initiatives
17. **Known Issues** — Current limitations
18. **Troubleshooting** — Common problems and fixes
19. **Ownership Map** — Who owns what

### Writing Guidelines

Follow these principles — they come from analysis of what actually makes AGENTS.md effective:

**Be specific, not vague.**
```markdown
# Bad
- Use TypeScript
- Follow best practices

# Good
- TypeScript 5.4 with strict mode enabled
- ESM imports with explicit `.js` extensions in compiled output
- Prefer `interface` over `type` for object shapes
```

**Lead with executable commands.**
```markdown
# Commands
npm run build          # Compile TypeScript to dist/
npm test               # Run vitest test suite
npm run lint           # ESLint with --fix
npm run typecheck      # tsc --noEmit
```

**Show code examples for conventions.**
```markdown
# Component pattern
export function UserCard({ user }: { user: User }) {
  // Components use named exports, PascalCase
  // Props defined inline for simple cases
}
```

**Use three-tier boundaries.**
```markdown
## Development Rules for AI Agents
### Always do:
- Run `npm run typecheck` before committing
- Use existing utility functions from `src/utils/`

### Ask first:
- Adding new dependencies
- Modifying database schemas
- Changes to CI/CD pipelines

### Never do:
- Commit `.env` files or secrets
- Modify `vendor/` or generated files
- Run destructive database commands
- Invent API endpoints that don't exist
```

**Include file-scoped commands** for common per-file operations:
```markdown
# File-scoped commands
npx vitest run src/utils/parse.test.ts    # Run single test file
npx eslint --fix src/components/Card.tsx   # Lint single file
npx tsc --noEmit src/types.ts              # Type-check single file
```

## Step 3: Generate or Update

### For new AGENTS.md (Mode 1 or 3)

1. Read the template from `assets/agents-md-template.md`
2. Fill in each section with discovered and user-provided content
3. Remove sections that have no substantive content
4. Write to `AGENTS.md` in the project root

### For updating existing AGENTS.md (Mode 2)

1. Read the existing `AGENTS.md`
2. Identify which sections exist and their quality
3. Ask the user what they want to improve:
   - "Add missing sections"
   - "Update outdated information"
   - "Improve specific sections" (let them pick)
   - "Full refresh" (regenerate while preserving custom content)
4. Make targeted updates, preserving any custom content the user has added
5. If the file has managed markers (like `<!-- PROMPTER:START -->`), preserve those sections untouched

### Monorepo Support

For monorepos or multi-package projects, offer to create nested AGENTS.md files:

```
project-root/
├── AGENTS.md              # Project-wide context
├── packages/
│   ├── frontend/
│   │   └── AGENTS.md      # Frontend-specific context
│   └── backend/
│       └── AGENTS.md      # Backend-specific context
```

The root AGENTS.md should reference subdirectory files and provide shared context. Subdirectory files should focus on package-specific details.

## Step 4: Validate and Review

Before finalizing, check:

- [ ] No placeholder text remains ("Not specified", "TODO", "TBD")
- [ ] Commands are accurate and runnable
- [ ] File paths referenced actually exist in the project
- [ ] Tech stack versions match what's in config files
- [ ] No sensitive information included (API keys, internal URLs, credentials)
- [ ] Sections are ordered by value (most useful first)
- [ ] Code examples match the project's actual coding style

Present a summary to the user:
- Which sections were generated
- Any sections skipped (and why)
- Suggestions for sections they could add later

## Step 5: Save

Save the AGENTS.md to the project root path (or the path the user specifies).

Print a summary:
```
AGENTS.md generated at <path>
Sections: <count> of 18
Sources used: <list of files analyzed>
Suggested improvements: <any sections that could be enhanced with more info>
```

## Edge Cases

- **No package manifest found**: Ask the user about the tech stack directly
- **Multiple languages**: Create sections for each, clearly labeled
- **Existing CLAUDE.md / .cursorrules**: Offer to consolidate into AGENTS.md (which is the cross-tool standard) or keep both
- **Very large project**: Focus on the most important directories and patterns rather than trying to document everything
- **No README**: The interview step becomes more important — ask more questions

## Resources

- Template: `assets/agents-md-template.md`
- Best practices reference: `references/best-practices.md`
