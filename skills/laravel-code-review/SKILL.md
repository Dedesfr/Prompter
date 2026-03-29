---
name: laravel-code-review
description: Perform static code review on git staged files for Laravel 12 + PHP 8.4 projects. Identifies Laravel-specific issues like N+1 queries, missing validation, security vulnerabilities, Eloquent anti-patterns, and PHP 8.4 best practices. Outputs structured Markdown report to test-hunter/ folder. Use when reviewing Laravel code before commit, or with /laravel-code-review command.
---

# Laravel 12 + PHP 8.4 Code Review

Perform specialized static analysis on staged git files for Laravel 12 projects running PHP 8.4.

## Quick Start

1. **ASK USER** which review style to use (Strict/Balanced/Lenient) - Balanced is default
2. **ASK USER** which report format to use (Full/Human/Compact/Agent)
3. Get staged files: `git diff --cached --name-only`
4. Analyze each file based on selected review style and focus areas
5. Generate report using selected format to `test-hunter/laravel-issues-<timestamp>.md`

---

## Step 0a: Ask User for Review Style (REQUIRED)

**IMPORTANT:** Before proceeding with any analysis, you MUST ask the user which review style they prefer.

Present the following options to the user:

```
Which review style would you like? (Default: Balanced)

1. **Strict** 🔒
   Flag all potential issues, prioritize quality and security
   
   Focus Areas:
   ✅ Security vulnerabilities (SQL injection, XSS, mass assignment, etc.)
   ✅ Performance issues (N+1 queries, missing indexes, inefficient loops)
   ✅ Bug detection (Logic errors, edge cases, runtime errors)
   ✅ Code style (PSR-12, naming conventions, Laravel conventions)
   ✅ Test coverage (Missing or inadequate tests)
   ✅ Documentation (Missing PHPDoc, unclear APIs)

2. **Balanced** ⚖️ (Default)
   Focus on high-confidence issues, balance thoroughness with practicality
   
   Focus Areas:
   ✅ Security vulnerabilities (SQL injection, XSS, mass assignment, etc.)
   ✅ Performance issues (N+1 queries, missing indexes, inefficient loops)
   ✅ Bug detection (Logic errors, edge cases, runtime errors)
   ⚪ Code style (Only major violations)
   ⚪ Test coverage (Critical paths only)
   ❌ Documentation

3. **Lenient** 💚
   Only critical bugs and security issues, be encouraging
   
   Focus Areas:
   ✅ Security vulnerabilities (Critical only)
   ⚪ Performance issues (Severe bottlenecks only)
   ✅ Bug detection (Critical bugs only)
   ❌ Code style
   ❌ Test coverage
   ❌ Documentation

Please select (1-3) or type the style name, or press Enter for Balanced:
```

**Wait for user response before continuing. If no response or Enter, use Balanced.**

### Review Style to Focus Areas Mapping

| Focus Area                   | Strict     | Balanced         | Lenient            |
| ---------------------------- | ---------- | ---------------- | ------------------ |
| **Security vulnerabilities** | All issues | All issues       | Critical only      |
| **Performance issues**       | All issues | All issues       | Severe bottlenecks |
| **Bug detection**            | All issues | High confidence  | Critical only      |
| **Code style**               | All issues | Major violations | ❌ Skip             |
| **Test coverage**            | All issues | Critical paths   | ❌ Skip             |
| **Documentation**            | All issues | ❌ Skip           | ❌ Skip             |

### Severity Threshold by Style

| Style    | Report Threshold      | Tone                    |
| -------- | --------------------- | ----------------------- |
| Strict   | All severities (🔴🟠🟡🔵) | Direct, thorough        |
| Balanced | Warning+ (🔴🟠🟡)        | Constructive, practical |
| Lenient  | Critical only (🔴)     | Encouraging, supportive |

---

## Step 0b: Ask User for Report Format (REQUIRED)

Present the following options to the user:

```
Which report format would you like for the code review?

1. **Full** - Complete detailed analysis (~200-300 lines per file)
   - All issue details with code snippets
   - Suggested fixes with full code examples
   - Machine-readable JSON blocks
   - Component-based organization

2. **Human** - Optimized for readability (~50-80 lines per file)
   - Clean, scannable format
   - Grouped by severity with clear headers
   - Brief descriptions with line references
   - Quick action items

3. **Compact** - Condensed summary (~15-25 lines per file)
   - One-line per issue format
   - Essential info only: file, line, severity, issue
   - Summary statistics
   - Ideal for quick reviews

4. **Agent** - Machine-readable for AI tools (~30-50 lines per file)
   - Task-based checklist format
   - Structured for automated processing
   - Executable tasks with status tracking
   - Ideal for CI/CD integration

Please select (1-4) or type the format name:
```

**Wait for user response before continuing.**

---

## Workflow

### Step 1: Retrieve Staged Files

```bash
git diff --cached --name-only
```

Filter for relevant file types:
- `*.php` - PHP source files
- `*.blade.php` - Blade templates
- `routes/*.php` - Route definitions
- `config/*.php` - Configuration files
- `database/migrations/*.php` - Migrations
- `database/factories/*.php` - Factories
- `database/seeders/*.php` - Seeders

### Step 2: Categorize Files

Group files by Laravel component:
- **Controllers** - `app/Http/Controllers/`
- **Models** - `app/Models/`
- **Services** - `app/Services/`
- **Repositories** - `app/Repositories/`
- **Requests** - `app/Http/Requests/`
- **Resources** - `app/Http/Resources/`
- **Middleware** - `app/Http/Middleware/`
- **Commands** - `app/Console/Commands/`
- **Jobs** - `app/Jobs/`
- **Events/Listeners** - `app/Events/`, `app/Listeners/`
- **Policies** - `app/Policies/`
- **Rules** - `app/Rules/`
- **Views** - `resources/views/`
- **Routes** - `routes/`
- **Migrations** - `database/migrations/`
- **Config** - `config/`
- **Tests** - `tests/` (review only, no execution)

### Step 3: Analyze Each File

**Apply Review Style Filter:** Based on the user's selected review style, filter issues according to the mapping table in Step 0a.

| Review Style | Include These Severities | Focus On                                      |
| ------------ | ------------------------ | --------------------------------------------- |
| **Strict**   | 🔴🟠🟡🔵 All                 | All focus areas, flag everything              |
| **Balanced** | 🔴🟠🟡 Warning+             | Security, Performance, Bugs, Major code style |
| **Lenient**  | 🔴 Critical only          | Security vulnerabilities, Critical bugs       |

Review for these Laravel/PHP 8.4 specific issues (filtered by review style):

#### 🔴 Critical Issues

**Security Vulnerabilities:**
- Mass assignment without `$fillable` or `$guarded`
- Raw SQL queries without parameter binding
- Missing CSRF protection
- Unvalidated user input
- Exposed sensitive data in responses
- Hardcoded credentials/secrets
- Missing authorization checks
- XSS in Blade (unescaped `{!! !!}` with user data)

**Runtime Errors:**
- Missing model relationships
- Undefined route names
- Missing middleware
- Invalid dependency injection
- Missing return types (PHP 8.4 strict)

#### 🟠 Warning Issues

**Eloquent Anti-patterns:**
- N+1 query problems (missing `with()`, `load()`)
- Using `get()` when `first()` or `find()` is appropriate
- Missing `select()` for large queries
- Chunking not used for large datasets
- Missing indexes on frequently queried columns

**Laravel Convention Violations:**
- Fat controllers (logic should be in services)
- Missing Form Request validation
- Direct `$request->all()` usage
- Missing API Resources for responses
- Improper exception handling

**PHP 8.4 Deprecations:**
- Implicit nullable parameters
- Dynamic properties on classes
- `${var}` string interpolation (use `{$var}`)

#### 🟡 Optimization Issues

**Performance:**
- Eager loading missing
- Caching not utilized
- Queue not used for heavy operations
- Missing database indexes
- Inefficient collection operations

**Query Optimization:**
- `whereIn()` with large arrays
- Missing `limit()` on queries
- `pluck()` after `get()` (use direct `pluck()`)
- `count()` after `get()` (use `count()` query)

#### 🔵 Code Quality Issues

**PHP 8.4 Best Practices:**
- Missing constructor property promotion
- Not using named arguments where beneficial
- Missing `readonly` properties
- Not using `match` expression
- Missing union/intersection types
- Not using `#[Override]` attribute

**Laravel 12 Standards:**
- Missing method return types
- Incorrect PHPDoc annotations
- Not using Invokable controllers for single-action
- Missing enum for status constants
- Not using Laravel Pint formatting

### Step 4: Generate Report

```bash
mkdir -p test-hunter
```

Filename: `laravel-issues-YYYY-MM-DD-HHMMSS.md`

### Step 5: Write Report

Use structured format with Laravel-specific context:

```markdown
# Laravel Code Review Report

**Generated:** <timestamp>
**Review Style:** <Strict|Balanced|Lenient>
**Laravel Version:** 12.x
**PHP Version:** 8.4
**Reviewed Files:** <count>
**Total Issues:** <count>

---

## Summary

| Severity       | Count |
| -------------- | ----- |
| 🔴 Critical     | X     |
| 🟠 Warning      | X     |
| 🟡 Optimization | X     |
| 🔵 Code Quality | X     |

---

## Issues by Component

### Controllers

#### `App\Http\Controllers\UserController`

##### Issue 1: N+1 Query Problem

| Attribute    | Value                                     |
| ------------ | ----------------------------------------- |
| **Severity** | 🟠 Warning                                 |
| **Line**     | 25                                        |
| **Type**     | Eloquent Anti-pattern                     |
| **File**     | `app/Http/Controllers/UserController.php` |

**Description:**
Loading users without eager loading their posts causes N+1 queries.

**Code:**
```php
// Line 25
$users = User::all();
foreach ($users as $user) {
    echo $user->posts->count(); // N+1!
}
```

**Recommendation:**
Use eager loading to prevent N+1 queries.

**Suggested Fix:**
```php
$users = User::with('posts')->get();
foreach ($users as $user) {
    echo $user->posts->count();
}
```

**Laravel Docs:** [Eager Loading](https://laravel.com/docs/12.x/eloquent-relationships#eager-loading)

---

<!-- MACHINE_READABLE_START
{
  "file": "app/Http/Controllers/UserController.php",
  "line": 25,
  "severity": "warning",
  "type": "eloquent-antipattern",
  "category": "n-plus-one",
  "description": "N+1 query problem",
  "recommendation": "Use eager loading with with()",
  "laravel_docs": "eloquent-relationships#eager-loading"
}
MACHINE_READABLE_END -->
```

## Issue Categories Reference

### Security
- `mass-assignment` - Missing $fillable/$guarded
- `sql-injection` - Raw queries without binding
- `xss` - Unescaped output
- `csrf` - Missing CSRF protection
- `authorization` - Missing policy/gate checks

### Eloquent
- `n-plus-one` - Missing eager loading
- `inefficient-query` - Suboptimal query patterns
- `missing-relationship` - Undefined relationships
- `mass-assignment` - Unsafe mass assignment

### PHP 8.4
- `deprecation` - Using deprecated features
- `type-safety` - Missing type declarations
- `modern-syntax` - Not using modern PHP features

### Laravel Conventions
- `fat-controller` - Too much logic in controller
- `validation` - Missing or improper validation
- `resource` - Missing API Resource
- `naming` - Convention violations

## Output Location

Save to: `<project-root>/test-hunter/laravel-issues-<timestamp>.md`

## Report Format Templates

Based on user selection, use the appropriate template:

| Format  | Template File                       | Use Case                   |
| ------- | ----------------------------------- | -------------------------- |
| Full    | `assets/report-template-full.md`    | Comprehensive review       |
| Human   | `assets/report-template-human.md`   | Developer-friendly reading |
| Compact | `assets/report-template-compact.md` | Quick summary              |
| Agent   | `assets/report-template-agent.md`   | CI/CD & AI integration     |

## Resources

- See `references/laravel-patterns.md` for detailed patterns
- See `references/php84-features.md` for PHP 8.4 features
