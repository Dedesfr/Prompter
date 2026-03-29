# Laravel Code Review Report

**Generated:** {{TIMESTAMP}}  
**Review Style:** {{REVIEW_STYLE_EMOJI}} {{REVIEW_STYLE}}  
**Laravel Version:** 12.x  
**PHP Version:** 8.4  
**Reviewed Files:** {{FILE_COUNT}}  
**Total Issues:** {{ISSUE_COUNT}}

---

## Review Configuration

### Style Settings

| Setting                | Value                                       |
| ---------------------- | ------------------------------------------- |
| **Review Style**       | {{REVIEW_STYLE_EMOJI}} **{{REVIEW_STYLE}}** |
| **Severity Threshold** | {{SEVERITY_THRESHOLD}}                      |
| **Tone**               | {{REVIEW_TONE}}                             |

### Focus Areas Matrix

| Focus Area                   | Status                      | Coverage Level              | Description                                          |
| ---------------------------- | --------------------------- | --------------------------- | ---------------------------------------------------- |
| **Security vulnerabilities** | {{FOCUS_SECURITY_EMOJI}}    | {{FOCUS_SECURITY_LEVEL}}    | SQL injection, XSS, mass assignment, exposed secrets |
| **Performance issues**       | {{FOCUS_PERFORMANCE_EMOJI}} | {{FOCUS_PERFORMANCE_LEVEL}} | N+1 queries, missing indexes, inefficient loops      |
| **Bug detection**            | {{FOCUS_BUGS_EMOJI}}        | {{FOCUS_BUGS_LEVEL}}        | Logic errors, edge cases, runtime errors             |
| **Code style**               | {{FOCUS_STYLE_EMOJI}}       | {{FOCUS_STYLE_LEVEL}}       | PSR-12, naming conventions, Laravel conventions      |
| **Test coverage**            | {{FOCUS_TESTS_EMOJI}}       | {{FOCUS_TESTS_LEVEL}}       | Missing or inadequate tests                          |
| **Documentation**            | {{FOCUS_DOCS_EMOJI}}        | {{FOCUS_DOCS_LEVEL}}        | Missing PHPDoc, unclear APIs                         |

### What This Means

{{#if_strict}}
> **🔒 Strict Mode Active**  
> All potential issues are flagged across all focus areas. This is the most thorough review level, prioritizing quality and security. Expect detailed feedback on critical, warning, optimization, and quality issues.
{{/if_strict}}

{{#if_balanced}}
> **⚖️ Balanced Mode Active**  
> High-confidence issues are flagged. Security, performance, and bugs are fully covered. Code style only flags major violations. Documentation issues are skipped for practicality.
{{/if_balanced}}

{{#if_lenient}}
> **💚 Lenient Mode Active**  
> Only critical bugs and security vulnerabilities are flagged. This mode is encouraging and focuses on must-fix issues only. Great for quick reviews or junior developer feedback.
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

| Category            | Count                 |
| ------------------- | --------------------- |
| Security            | {{SECURITY_COUNT}}    |
| Eloquent            | {{ELOQUENT_COUNT}}    |
| PHP 8.4             | {{PHP84_COUNT}}       |
| Laravel Conventions | {{CONVENTIONS_COUNT}} |

---

## Files Reviewed

### By Component

**Controllers:**
{{#each controllers}}
- `{{this}}`
{{/each}}

**Models:**
{{#each models}}
- `{{this}}`
{{/each}}

**Services:**
{{#each services}}
- `{{this}}`
{{/each}}

**Views:**
{{#each views}}
- `{{this}}`
{{/each}}

**Other:**
{{#each others}}
- `{{this}}`
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
```php
// Line {{line}}
{{code_snippet}}
```

**Recommendation:**  
{{recommendation}}

{{#if suggested_fix}}
**Suggested Fix:**
```php
{{suggested_fix}}
```
{{/if}}

{{#if laravel_docs}}
**Laravel Docs:** [{{laravel_docs_title}}](https://laravel.com/docs/12.x/{{laravel_docs}})
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
  "description": "{{description_escaped}}",
  "recommendation": "{{recommendation_escaped}}",
  "laravel_version": "12.x",
  "php_version": "8.4",
  "solved": false
}
MACHINE_READABLE_END -->

{{/each}}

---

## Quick Fixes by Priority

### 🔴 Critical (Must Fix)

{{#each critical_issues}}
- [ ] **{{file}}:{{line}}** - {{title}}
{{/each}}
{{#if_no_critical}}
✅ No critical issues!
{{/if_no_critical}}

{{#if_not_lenient}}
### 🟠 Warnings (Should Fix)

{{#each warning_issues}}
- [ ] **{{file}}:{{line}}** - {{title}}
{{/each}}
{{#if_no_warnings}}
✅ No warnings!
{{/if_no_warnings}}

### 🟡 Optimization (Nice to Have)

{{#each optimization_issues}}
- [ ] **{{file}}:{{line}}** - {{title}}
{{/each}}
{{#if_no_optimization}}
✅ No optimization issues!
{{/if_no_optimization}}
{{/if_not_lenient}}

{{#if_strict}}
### 🔵 Quality (Polish)

{{#each quality_issues}}
- [ ] **{{file}}:{{line}}** - {{title}}
{{/each}}
{{#if_no_quality}}
✅ No quality issues!
{{/if_no_quality}}
{{/if_strict}}

---

## Report Metadata

```json
{
  "version": "2.0",
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
  "framework": "laravel",
  "framework_version": "12.x",
  "php_version": "8.4",
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
    "eloquent": {{ELOQUENT_COUNT}},
    "php84": {{PHP84_COUNT}},
    "conventions": {{CONVENTIONS_COUNT}}
  }
}
```

---

*Generated by laravel-code-review skill • Full format • {{REVIEW_STYLE}} mode*
