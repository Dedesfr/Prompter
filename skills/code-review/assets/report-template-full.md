````markdown
# Code Review Report

**Generated:** {{TIMESTAMP}}
**Review Style:** {{REVIEW_STYLE_EMOJI}} {{REVIEW_STYLE}}
**Tech Stack:** {{TECH_STACK}}
**Reviewed Files:** {{FILE_COUNT}}
**Total Issues:** {{ISSUE_COUNT}}

---

## Review Configuration

### Project Profile

| Setting          | Value                                       |
| ---------------- | ------------------------------------------- |
| **Review Style** | {{REVIEW_STYLE_EMOJI}} **{{REVIEW_STYLE}}** |
| **Tech Stack**   | {{TECH_STACK}}                               |
| **Framework**    | {{FRAMEWORK}}                                |
| **AGENTS.md**    | {{AGENTS_MD_STATUS}}                         |

### Focus Areas Matrix

| Focus Area        | Status                      | Coverage Level              | Description                                          |
| ----------------- | --------------------------- | --------------------------- | ---------------------------------------------------- |
| Security          | {{FOCUS_SECURITY_EMOJI}}    | {{FOCUS_SECURITY_LEVEL}}    | Injection, XSS, auth bypass, secrets, CSRF           |
| Performance       | {{FOCUS_PERFORMANCE_EMOJI}} | {{FOCUS_PERFORMANCE_LEVEL}} | N+1 queries, blocking I/O, missing indexes           |
| Bug detection     | {{FOCUS_BUGS_EMOJI}}        | {{FOCUS_BUGS_LEVEL}}        | Null refs, type errors, unhandled exceptions          |
| Code style        | {{FOCUS_STYLE_EMOJI}}       | {{FOCUS_STYLE_LEVEL}}       | Naming, conventions, project-specific rules           |
| Test coverage     | {{FOCUS_TESTS_EMOJI}}       | {{FOCUS_TESTS_LEVEL}}       | Missing or inadequate tests                           |
| Documentation     | {{FOCUS_DOCS_EMOJI}}        | {{FOCUS_DOCS_LEVEL}}        | Missing docs, outdated comments                       |

### Review Mode Description

{{#if_strict}}
> **🔒 Strict Mode Active**
> All potential issues are flagged across all focus areas. This is the most thorough review, prioritizing quality and security. Expect detailed feedback on critical, warning, optimization, and quality issues.
{{/if_strict}}

{{#if_balanced}}
> **⚖️ Balanced Mode Active**
> High-confidence issues are flagged. Security, performance, and bugs are fully covered. Code style only flags major violations. Documentation is skipped for practicality.
{{/if_balanced}}

{{#if_lenient}}
> **💚 Lenient Mode Active**
> Only critical bugs and security vulnerabilities are flagged. This mode is encouraging and focuses on must-fix issues only.
{{/if_lenient}}

---

## Summary

| Severity       | Count                  | Included                  |
| -------------- | ---------------------- | ------------------------- |
| 🔴 Critical     | {{CRITICAL_COUNT}}     | ✅ Always                  |
| 🟠 Warning      | {{WARNING_COUNT}}      | {{WARNING_INCLUDED}}      |
| 🟡 Optimization | {{OPTIMIZATION_COUNT}} | {{OPTIMIZATION_INCLUDED}} |
| 🔵 Code Quality | {{QUALITY_COUNT}}      | {{QUALITY_INCLUDED}}      |

### Issue Categories

| Category      | Count                    |
| ------------- | ------------------------ |
| Security      | {{SECURITY_COUNT}}       |
| Performance   | {{PERFORMANCE_COUNT}}    |
| Architecture  | {{ARCHITECTURE_COUNT}}   |
| Language/FW   | {{LANG_FRAMEWORK_COUNT}} |
| Error Handling| {{ERROR_HANDLING_COUNT}} |

---

## Files Reviewed

### By Component

{{#each file_groups}}
**{{group_name}}:**
{{#each files}}
- `{{this}}`
{{/each}}

{{/each}}

---

## Issues by Component

{{#each issues}}

### `{{component}}`

#### `{{file}}`

##### Issue {{index}}: {{title}}

| Attribute      | Value                           |
| -------------- | ------------------------------- |
| **Severity**   | {{severity_emoji}} {{severity}} |
| **Line**       | {{line}}                        |
| **Type**       | {{type}}                        |
| **Category**   | {{category}}                    |
| **Focus Area** | {{focus_area}}                  |

**Description:**
{{description}}

**Code:**
```{{language}}
// Line {{line}}
{{code_snippet}}
```

**Recommendation:**
{{recommendation}}

{{#if suggested_fix}}
**Suggested Fix:**
```{{language}}
{{suggested_fix}}
```
{{/if}}

{{#if docs_link}}
**Reference:** [{{docs_title}}]({{docs_link}})
{{/if}}

{{#if agents_md_rule}}
**AGENTS.md Rule:** {{agents_md_rule}}
{{/if}}

---

<!-- MACHINE_READABLE_START
{
  "file": "{{file}}",
  "line": {{line}},
  "severity": "{{severity_lower}}",
  "type": "{{type}}",
  "category": "{{category}}",
  "component": "{{component}}",
  "focus_area": "{{focus_area}}",
  "review_style": "{{REVIEW_STYLE}}",
  "language": "{{language}}",
  "tech_stack": "{{TECH_STACK}}",
  "description": "{{description_escaped}}",
  "recommendation": "{{recommendation_escaped}}",
  "agents_md_rule": "{{agents_md_rule}}",
  "solved": false
}
MACHINE_READABLE_END -->

{{/each}}

---

## Quick Fixes by Priority

### 🔴 Critical (Must Fix)

{{#each critical_issues}}
- [ ] **{{file}}:{{line}}** — {{title}}
{{/each}}
{{#if_no_critical}}
✅ No critical issues!
{{/if_no_critical}}

{{#if_not_lenient}}
### 🟠 Warnings (Should Fix)

{{#each warning_issues}}
- [ ] **{{file}}:{{line}}** — {{title}}
{{/each}}
{{#if_no_warnings}}
✅ No warnings!
{{/if_no_warnings}}

### 🟡 Optimization (Nice to Have)

{{#each optimization_issues}}
- [ ] **{{file}}:{{line}}** — {{title}}
{{/each}}
{{#if_no_optimization}}
✅ No optimization issues!
{{/if_no_optimization}}
{{/if_not_lenient}}

{{#if_strict}}
### 🔵 Quality (Polish)

{{#each quality_issues}}
- [ ] **{{file}}:{{line}}** — {{title}}
{{/each}}
{{#if_no_quality}}
✅ No quality issues!
{{/if_no_quality}}
{{/if_strict}}

---

## Project Convention Compliance

{{#if agents_md_found}}
### Rules from AGENTS.md

| Convention              | Status                 | Notes                  |
| ----------------------- | ---------------------- | ---------------------- |
{{#each convention_checks}}
| {{convention_name}}     | {{status_emoji}}       | {{notes}}              |
{{/each}}
{{/if}}

{{#if_no_agents_md}}
> ⚠️ No `AGENTS.md` found at project root. Project-specific convention checks were skipped.
> Consider creating an `AGENTS.md` to get tailored recommendations.
{{/if_no_agents_md}}

---

## Report Metadata

```json
{
  "version": "1.0",
  "generated_at": "{{TIMESTAMP}}",
  "review_style": "{{REVIEW_STYLE}}",
  "review_config": {
    "severity_threshold": "{{SEVERITY_THRESHOLD}}",
    "tone": "{{REVIEW_TONE}}",
    "focus_areas": {
      "security": "{{FOCUS_SECURITY_LEVEL}}",
      "performance": "{{FOCUS_PERFORMANCE_LEVEL}}",
      "bugs": "{{FOCUS_BUGS_LEVEL}}",
      "code_style": "{{FOCUS_STYLE_LEVEL}}",
      "test_coverage": "{{FOCUS_TESTS_LEVEL}}",
      "documentation": "{{FOCUS_DOCS_LEVEL}}"
    }
  },
  "tech_stack": "{{TECH_STACK}}",
  "framework": "{{FRAMEWORK}}",
  "agents_md": {{AGENTS_MD_FOUND}},
  "total_files": {{FILE_COUNT}},
  "total_issues": {{ISSUE_COUNT}},
  "severity_breakdown": {
    "critical": {{CRITICAL_COUNT}},
    "warning": {{WARNING_COUNT}},
    "optimization": {{OPTIMIZATION_COUNT}},
    "quality": {{QUALITY_COUNT}}
  },
  "category_breakdown": {
    "security": {{SECURITY_COUNT}},
    "performance": {{PERFORMANCE_COUNT}},
    "architecture": {{ARCHITECTURE_COUNT}},
    "language_framework": {{LANG_FRAMEWORK_COUNT}},
    "error_handling": {{ERROR_HANDLING_COUNT}}
  }
}
```

---

*Generated by code-review skill • Full format • {{REVIEW_STYLE}} mode*
````
