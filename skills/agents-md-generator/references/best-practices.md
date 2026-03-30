# AGENTS.md Best Practices Reference

Compiled from analysis of 2,500+ repositories and official documentation from GitHub, GitLab, Windsurf, and the agents.md specification.

## Table of Contents

1. [Six Essential Areas](#six-essential-areas)
2. [Writing Principles](#writing-principles)
3. [Common Anti-Patterns](#common-anti-patterns)
4. [Monorepo Patterns](#monorepo-patterns)
5. [Cross-Tool Compatibility](#cross-tool-compatibility)
6. [Section-Specific Guidance](#section-specific-guidance)

---

## Six Essential Areas

The highest-impact sections, based on empirical analysis of what actually improves AI agent output:

| Area | Why It Matters | Example |
|------|---------------|---------|
| **Commands** | Agents need exact executable commands, not descriptions | `npm test -- --watch` not "run the tests" |
| **Testing** | Framework-specific practices prevent wrong test patterns | `vitest` vs `jest` syntax differences |
| **Project Structure** | Agents need exact file locations, not guesses | `src/api/routes/` not "the API folder" |
| **Code Style** | Real examples prevent style drift | Show actual component code |
| **Git Workflow** | Prevents wrong branching, commit, and PR patterns | `feat/`, `fix/` branch prefixes |
| **Boundaries** | Clear "never do" rules prevent the worst mistakes | Never commit `.env`, never modify `vendor/` |

## Writing Principles

### Specificity Over Generality

The #1 predictor of AGENTS.md effectiveness is specificity. Vague instructions get vague results.

**Versions matter:**
```markdown
# Vague
- Uses React and TypeScript

# Specific
- React 18.3 with TypeScript 5.4
- Node.js >= 20 (uses native fetch)
- Tailwind CSS 3.4 with custom design tokens in tailwind.config.ts
```

**Commands must be copy-pasteable:**
```markdown
# Vague
- Run the tests before committing

# Specific
- npm test                              # Full test suite
- npx vitest run src/utils/parse.test.ts  # Single test file
- npx vitest --reporter=verbose           # Detailed output
```

### Show, Don't Tell

Real code examples are 3-5x more effective than verbal descriptions for coding conventions.

```markdown
# Verbal (less effective)
- Use functional components with TypeScript props

# Example (more effective)
## Component Pattern
export function UserCard({ user, onSelect }: UserCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  // Named exports, PascalCase, destructured props
  // State hooks at top, handlers below
}
```

### Three-Tier Boundaries

The most impactful part of any AGENTS.md. Structure as:

1. **Always do** — Required behaviors (run typecheck, use existing utils)
2. **Ask first** — Needs human approval (new deps, schema changes, CI changes)
3. **Never do** — Absolute prohibitions (commit secrets, modify generated files, invent APIs)

"Never commit secrets" was identified as the single most helpful boundary rule across all analyzed repositories.

### Progressive Disclosure

Don't dump everything upfront. Structure information so agents encounter what they need when they need it:

- Put the most frequently needed info (commands, structure) at the top
- Put specialized info (troubleshooting, edge cases) at the bottom
- For complex topics, link to separate docs rather than inlining everything

## Common Anti-Patterns

### 1. Placeholder Sections
```markdown
# Bad — worse than omitting the section entirely
## Roadmap
- TBD

## Ownership
- Not specified
```
Empty sections signal that the document is incomplete and may be untrustworthy. Omit sections you can't fill meaningfully.

### 2. Vague Boundaries
```markdown
# Bad
- Be careful with the database
- Follow best practices

# Good
- Never run DROP, TRUNCATE, or DELETE without WHERE clause
- Always use parameterized queries, never string interpolation for SQL
```

### 3. Describing Style Without Examples
```markdown
# Bad
- Use consistent naming conventions
- Follow the project's component pattern

# Good
- Variables: camelCase (userId, isActive)
- Components: PascalCase (UserCard, NavBar)
- Files: kebab-case (user-card.tsx, nav-bar.tsx)
- Constants: UPPER_SNAKE (MAX_RETRIES, API_BASE_URL)
```

### 4. Duplicating README Content
AGENTS.md should contain agent-specific guidance that would clutter a human README. Don't copy your README — reference it and add the agent-specific context.

### 5. One-Time Setup, Never Updated
AGENTS.md should evolve with the project. After each time an AI agent makes a mistake that better instructions would have prevented, update the AGENTS.md.

## Monorepo Patterns

Place AGENTS.md files at multiple levels:

```
project/
├── AGENTS.md                    # Shared: monorepo conventions, CI, tooling
├── packages/
│   ├── api/
│   │   └── AGENTS.md            # API-specific: routes, middleware, DB patterns
│   ├── web/
│   │   └── AGENTS.md            # Frontend-specific: components, state, styling
│   └── shared/
│       └── AGENTS.md            # Shared lib: export patterns, versioning
```

**Rules:**
- The closest AGENTS.md to the working file takes precedence
- Root AGENTS.md should contain cross-cutting concerns only
- Subdirectory files should not repeat root-level content

## Cross-Tool Compatibility

AGENTS.md is recognized by multiple AI coding tools:

| Tool | File | Precedence |
|------|------|-----------|
| GitHub Copilot | `AGENTS.md` | Standard |
| OpenAI Codex | `AGENTS.md`, `AGENTS.override.md` | Override > Standard |
| Claude Code | `CLAUDE.md`, `AGENTS.md` | Both read |
| Windsurf | `AGENTS.md`, `.windsurfrules` | Both read |
| Cursor | `.cursorrules`, `AGENTS.md` | Tool-specific first |
| GitLab Duo | `AGENTS.md` | Standard |
| Android Studio (Gemini) | `AGENTS.md` | Standard |

When a project has both AGENTS.md and tool-specific files (CLAUDE.md, .cursorrules), the tool-specific file typically takes precedence for that tool. AGENTS.md serves as the cross-tool baseline.

## Section-Specific Guidance

### Commands Section
- Include every command a developer might need
- Show exact flags, not just the base command
- Group by purpose (build, test, lint, deploy)
- Include file-scoped variants where applicable
- Note any required environment variables

### Project Structure Section
- Focus on directories agents will actually work in
- Explain naming conventions for files within each directory
- Call out generated or auto-maintained files (don't edit these)
- Note any files with special significance (entry points, config)

### Coding Conventions Section
- Show 2-3 real examples from the codebase for each convention
- Include import ordering rules
- Document error handling patterns
- Show preferred patterns for common operations (API calls, state management, etc.)

### Testing Section
- Include the exact test command with all needed flags
- Show the test file naming convention
- Provide a minimal test example in the project's style
- Document any test utilities or helpers available
- Note coverage thresholds if enforced

### Security Section
- List all files/directories that must never be committed
- Document authentication/authorization patterns
- Note any data handling requirements (PII, encryption)
- Call out environment-specific configurations

---

## Sources

- [agents.md — Official Specification](https://agents.md/)
- [GitHub Blog — Lessons from 2,500+ Repositories](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [Builder.io — Best Tips for AGENTS.md](https://www.builder.io/blog/agents-md)
- [Factory Documentation](https://docs.factory.ai/cli/configuration/agents-md)
- [Windsurf Documentation](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [GitLab Documentation](https://docs.gitlab.com/user/duo_agent_platform/customize/agents_md/)
