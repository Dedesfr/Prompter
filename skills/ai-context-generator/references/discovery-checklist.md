# Discovery checklist

Run all of these reads in **one parallel batch**. Skip files that don't exist (errors are fine).

## Manifests
`package.json`, `pnpm-workspace.yaml`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `composer.json`, `Gemfile`, `pom.xml`, `build.gradle`, `requirements.txt`, `uv.lock`

## Config
`tsconfig.json`, `.eslintrc*`, `biome.json`, `.prettierrc*`, `tailwind.config.*`, `vite.config.*`, `next.config.*`, `nuxt.config.*`, `astro.config.*`, `webpack.config.*`, `Makefile`, `justfile`, `turbo.json`, `nx.json`

## Infra
`Dockerfile`, `docker-compose.yml`, `.gitlab-ci.yml`
List dirs: `.github/workflows/`

## Existing docs
`README.md`, `CONTRIBUTING.md`, `ARCHITECTURE.md`
List dirs: `docs/`

## Existing AI config (read to preserve hard-won knowledge)
`AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`, `.aider.conf.yml`
List dirs: `.cursor/rules/`

## Claude Code specifics
`.claude/settings.json`, `.claude/settings.local.json`
List dirs: `.claude/commands/`, `.claude/skills/`, `.claude/hooks/`, `skills/`

## Layout signal
List root dir, then list `src/`, `app/`, `lib/`, `packages/`, `apps/` (one level deep) if present.

## Git signal
- `git log --oneline -20`
- `git ls-files | head -50`

## Extract from these
- Tech stack + versions (Node 20 vs 22, React 18 vs 19 changes advice)
- Build / test / lint / typecheck commands with exact flags
- Project structure (mark generated/vendored/deprecated dirs)
- Coding conventions (only non-obvious ones)
- Architecture decisions (only if not derivable from layout)
- Past gotchas (from existing AI config files — preserve them)
