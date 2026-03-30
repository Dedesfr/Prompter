---
name: code-review
description: Perform static code review on git staged files for any programming language, framework, or project type. Dynamically adapts to the project by reading AGENTS.md for tech stack, conventions, and architecture context. Identifies security vulnerabilities, performance issues, bugs, anti-patterns, and code style violations. Outputs structured Markdown report to test-hunter/ folder. Use when reviewing code before commit, or with /code-review command.
---

# Universal Code Review

Perform static code review on staged git files. Adapts to any language, framework, or project type by reading the project's `AGENTS.md` for context.

## Quick Start

1. **READ PROJECT CONTEXT** from `AGENTS.md` at the project root (required)
2. **ASK USER** which review style to use (Strict/Balanced/Lenient) — default: Balanced
3. **ASK USER** which report format to use (Full/Human/Compact/Agent)
4. Get staged files: `git diff --cached --name-only`
5. Detect project tech stack from file extensions, config files, and `AGENTS.md`
6. Analyze each file based on review style, tech stack, and project conventions
7. Generate report to `test-hunter/review-<timestamp>.md`

---

## Step 0: Read Project Context (REQUIRED)

Before any analysis, read the project's `AGENTS.md` file from the repository root:

```bash
cat AGENTS.md
```

Extract the following from `AGENTS.md` (if present):
- **Tech stack** — languages, frameworks, versions
- **Architecture patterns** — MVC, microservices, monorepo, etc.
- **Code conventions** — naming, formatting, structure rules
- **Testing strategy** — unit, integration, e2e expectations
- **Domain context** — business logic constraints
- **Important constraints** — regulatory, performance, security requirements

If `AGENTS.md` is missing or incomplete, infer context from:
1. Config files: `package.json`, `composer.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`, `Gemfile`, etc.
2. File extensions in staged files
3. Directory structure patterns

Store the detected context as your **Project Profile** for the review session.

---

## Step 1: Ask User for Review Style (REQUIRED)

Present the following options:

```
Which review style would you like? (Default: Balanced)

1. **Strict** 🔒
   Flag all potential issues, prioritize quality and security

   Focus Areas:
   ✅ Security vulnerabilities
   ✅ Performance issues
   ✅ Bug detection
   ✅ Code style & conventions
   ✅ Test coverage
   ✅ Documentation

2. **Balanced** ⚖️ (Default)
   Focus on high-confidence issues, balance thoroughness with practicality

   Focus Areas:
   ✅ Security vulnerabilities
   ✅ Performance issues
   ✅ Bug detection
   ⚪ Code style (major violations only)
   ⚪ Test coverage (critical paths only)
   ❌ Documentation

3. **Lenient** 💚
   Only critical bugs and security issues, be encouraging

   Focus Areas:
   ✅ Security vulnerabilities (critical only)
   ⚪ Performance issues (severe bottlenecks only)
   ✅ Bug detection (critical bugs only)
   ❌ Code style
   ❌ Test coverage
   ❌ Documentation

Please select (1-3) or type the style name, or press Enter for Balanced:
```

Wait for user response. Default to Balanced if no response.

### Review Style Configuration

| Focus Area        | Strict         | Balanced         | Lenient            |
| ----------------- | -------------- | ---------------- | ------------------ |
| Security          | All issues     | All issues       | Critical only      |
| Performance       | All issues     | All issues       | Severe bottlenecks |
| Bug detection     | All issues     | High confidence  | Critical only      |
| Code style        | All issues     | Major violations | ❌ Skip             |
| Test coverage     | All issues     | Critical paths   | ❌ Skip             |
| Documentation     | All issues     | ❌ Skip           | ❌ Skip             |

### Severity Threshold by Style

| Style    | Report Threshold       | Tone                    |
| -------- | ---------------------- | ----------------------- |
| Strict   | All severities (🔴🟠🟡🔵) | Direct, thorough        |
| Balanced | Warning+ (🔴🟠🟡)         | Constructive, practical |
| Lenient  | Critical only (🔴)      | Encouraging, supportive |

---

## Step 2: Ask User for Report Format (REQUIRED)

```
Which report format would you like?

1. **Full** - Complete detailed analysis (~200-300 lines per file)
2. **Human** - Optimized for readability (~50-80 lines per file)
3. **Compact** - Condensed summary (~15-25 lines per file)
4. **Agent** - Machine-readable for AI tools (~30-50 lines per file)

Please select (1-4) or type the format name:
```

Wait for user response.

---

## Workflow

### Step 3: Retrieve Staged Files

```bash
git diff --cached --name-only
```

### Step 4: Detect Tech Stack & Categorize Files

Identify the project's tech stack from staged files and project context. Group files by logical component based on the detected stack.

**Auto-detection signals:**

| Signal | Tech Stack |
| --- | --- |
| `*.py`, `pyproject.toml`, `requirements.txt` | Python |
| `*.ts`, `*.tsx`, `package.json` | TypeScript/JavaScript |
| `*.php`, `composer.json` | PHP |
| `*.go`, `go.mod` | Go |
| `*.rs`, `Cargo.toml` | Rust |
| `*.java`, `pom.xml`, `build.gradle` | Java |
| `*.rb`, `Gemfile` | Ruby |
| `*.cs`, `*.csproj` | C# / .NET |
| `*.swift`, `Package.swift` | Swift |
| `*.kt`, `build.gradle.kts` | Kotlin |
| `*.dart`, `pubspec.yaml` | Dart/Flutter |
| `*.vue`, `*.svelte` | Vue/Svelte SFC |
| `*.blade.php` | Laravel Blade |
| `*.erb`, `*.haml` | Ruby templates |
| `Dockerfile`, `docker-compose.yml` | Docker/Infrastructure |
| `*.yaml`, `*.yml`, `*.toml`, `*.json` | Configuration |
| `*.sql` | Database |
| `*.sh`, `*.bash`, `*.zsh` | Shell scripts |

**Framework detection (from config files and AGENTS.md):**

| Signal | Framework |
| --- | --- |
| `next.config.*`, `app/layout.tsx` | Next.js |
| `nuxt.config.*` | Nuxt |
| `svelte.config.*` | SvelteKit |
| `angular.json` | Angular |
| `artisan`, `app/Http/Controllers/` | Laravel |
| `manage.py`, `settings.py` | Django |
| `Gemfile` + `config/routes.rb` | Rails |
| `main.go` + `go.mod` | Go (stdlib/framework) |
| `Cargo.toml` + `src/main.rs` | Rust |
| `pom.xml` + `src/main/java` | Spring Boot / Java |
| `pubspec.yaml` + `lib/main.dart` | Flutter |

Categorize staged files into logical groups:
- **Source code** — application logic
- **Tests** — test files (review only, no execution)
- **Configuration** — config files, env, CI/CD
- **Infrastructure** — Docker, deployment, IaC
- **Documentation** — README, docs, comments
- **Database** — migrations, schemas, seeds
- **Templates/Views** — UI templates, components

### Step 5: Analyze Each File

**Apply Review Style Filter** based on the user's selection from Step 1.

Review for these universal issue categories (filtered by review style):

#### 🔴 Critical Issues

**Security Vulnerabilities (all languages):**
- Injection flaws (SQL, command, template, LDAP, XPath)
- Cross-site scripting (XSS) — unescaped user input in output
- Authentication/authorization bypasses
- Hardcoded secrets, API keys, credentials
- Insecure deserialization
- Path traversal / directory traversal
- Insecure cryptography (weak algorithms, hardcoded keys)
- Missing input validation/sanitization
- CSRF vulnerabilities in web frameworks
- Mass assignment / over-posting
- Exposed sensitive data in responses or logs

**Runtime Errors:**
- Null/undefined reference errors
- Unhandled exceptions in critical paths
- Type mismatches in dynamically typed languages
- Missing error handling for I/O operations
- Race conditions in concurrent code
- Resource leaks (unclosed connections, file handles, streams)
- Buffer overflows (C/C++/Rust unsafe blocks)

#### 🟠 Warning Issues

**Performance Anti-patterns:**
- N+1 query problems (ORM/database)
- Missing pagination for large datasets
- Synchronous operations that should be async
- Inefficient algorithms (O(n²) where O(n) is possible)
- Missing caching for repeated expensive operations
- Unnecessary memory allocations in hot paths
- Loading full objects when only subset is needed
- Missing database indexes for frequently queried columns
- Blocking the main/event thread

**Architecture & Design:**
- God objects / classes with too many responsibilities
- Tight coupling between unrelated modules
- Business logic in wrong layer (e.g., in controllers, views, templates)
- Missing abstraction for repeated patterns
- Circular dependencies
- Violation of project's stated architecture patterns (from `AGENTS.md`)

**Error Handling:**
- Swallowed exceptions (empty catch blocks)
- Overly broad exception catching
- Missing error propagation
- Inconsistent error handling patterns

#### 🟡 Optimization Issues

**Resource Efficiency:**
- Redundant computations
- Missing lazy loading / eager loading (context-dependent)
- Suboptimal data structures
- Unnecessary network calls
- Missing connection pooling
- Redundant database queries

**Code Duplication:**
- Copy-pasted logic that should be extracted
- Repeated patterns across files
- Magic numbers/strings that should be constants

#### 🔵 Code Quality Issues

**Language Best Practices:**
- Not using modern language features (based on detected version)
- Missing type annotations (TypeScript, Python, PHP 8+)
- Deprecated API usage
- Inconsistent naming conventions
- Dead code / unreachable branches
- Overly complex expressions (cyclomatic complexity)
- Missing return types

**Project Convention Violations (from AGENTS.md):**
- Naming convention violations
- File organization violations
- Architecture pattern deviations
- Testing strategy violations

**Documentation:**
- Missing function/method documentation for public APIs
- Outdated or misleading comments
- TODO/FIXME/HACK markers that need attention

### Step 6: Apply Project-Specific Rules

Based on the **Project Profile** from `AGENTS.md`, apply additional checks:

1. **If AGENTS.md specifies coding standards** — validate against them
2. **If AGENTS.md specifies architecture** — check layer violations
3. **If AGENTS.md specifies testing requirements** — check test coverage
4. **If AGENTS.md specifies naming conventions** — validate names
5. **If AGENTS.md specifies security constraints** — apply stricter security checks

For deeper language/framework-specific patterns, load the appropriate reference:
- See `references/universal-patterns.md` for cross-language detection patterns

### Step 7: Generate Report

```bash
mkdir -p test-hunter
```

Filename: `review-YYYY-MM-DD-HHMMSS.md`

### Step 8: Write Report

Use the selected report format template from `assets/`:

| Format  | Template File                       | Use Case                   |
| ------- | ----------------------------------- | -------------------------- |
| Full    | `assets/report-template-full.md`    | Comprehensive review       |
| Human   | `assets/report-template-human.md`   | Developer-friendly reading |
| Compact | `assets/report-template-compact.md` | Quick summary              |
| Agent   | `assets/report-template-agent.md`   | CI/CD & AI integration     |

---

## Issue Categories Reference

### Security
- `injection` — SQL, command, template injection
- `xss` — Cross-site scripting
- `auth-bypass` — Authentication/authorization issues
- `secrets` — Hardcoded credentials, exposed keys
- `csrf` — Cross-site request forgery
- `mass-assignment` — Over-posting / mass assignment
- `insecure-crypto` — Weak cryptography
- `path-traversal` — Directory traversal

### Performance
- `n-plus-one` — N+1 query problem
- `blocking-io` — Synchronous blocking in async context
- `missing-index` — Missing database index
- `inefficient-algorithm` — Suboptimal algorithm complexity
- `missing-cache` — Missing caching opportunity
- `memory-leak` — Resource/memory leak
- `unnecessary-load` — Loading more data than needed

### Architecture
- `god-object` — Class with too many responsibilities
- `wrong-layer` — Logic in the wrong architectural layer
- `tight-coupling` — Unnecessary coupling between modules
- `circular-dependency` — Circular import/dependency
- `code-duplication` — Duplicated logic

### Language & Framework
- `deprecated-api` — Using deprecated features
- `missing-types` — Missing type annotations
- `modern-syntax` — Not using modern language features
- `convention-violation` — Project convention violations
- `dead-code` — Unreachable or unused code

### Error Handling
- `swallowed-exception` — Empty catch block
- `missing-error-handling` — Unhandled error case
- `broad-catch` — Catching too broad an exception type

## Severity Classification

| Severity     | Emoji | Criteria                                              |
| ------------ | ----- | ----------------------------------------------------- |
| Critical     | 🔴     | Security vulnerabilities, data loss risks, crashes    |
| Warning      | 🟠     | Performance issues, design flaws, error handling gaps  |
| Optimization | 🟡     | Efficiency improvements, code duplication              |
| Quality      | 🔵     | Best practices, conventions, modern syntax, docs       |

## Output Location

Save to: `<project-root>/test-hunter/review-<timestamp>.md`

## Resources

- See `references/universal-patterns.md` for cross-language detection patterns
