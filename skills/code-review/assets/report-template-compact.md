```markdown
# Code Review — Compact

**{{TIMESTAMP}}** | **{{REVIEW_STYLE}}** mode | {{TECH_STACK}} | {{FILE_COUNT}} files | {{ISSUE_COUNT}} issues

## Review Configuration

| Style                                       | AGENTS.md             | Focus Areas Applied     |
| ------------------------------------------- | --------------------- | ----------------------- |
| {{REVIEW_STYLE_EMOJI}} **{{REVIEW_STYLE}}** | {{AGENTS_MD_STATUS}}  | {{FOCUS_AREAS_SUMMARY}} |

## Summary

🔴 {{CRITICAL_COUNT}} critical | 🟠 {{WARNING_COUNT}} warning | 🟡 {{OPTIMIZATION_COUNT}} optimize | 🔵 {{QUALITY_COUNT}} quality

**By Category:** {{SECURITY_COUNT}} sec | {{PERFORMANCE_COUNT}} perf | {{ARCHITECTURE_COUNT}} arch | {{LANG_FRAMEWORK_COUNT}} lang | {{ERROR_HANDLING_COUNT}} err

---

## Issues

| Sev | File | Line | Issue | Category |
| --- | ---- | ---: | ----- | -------- |
{{#each issues}}
| {{severity_emoji}} | `{{file_short}}` | {{line}} | {{title}} | {{category}} |
{{/each}}

---

## By Component

{{#each components_with_issues}}
### {{component}}

{{#each files}}
**`{{file_short}}`**
{{#each issues}}
- {{severity_emoji}} L{{line}}: {{title}} → {{recommendation_short}}
{{/each}}

{{/each}}
{{/each}}

---

## Action Items

**🔴 Critical ({{CRITICAL_COUNT}}):**
{{#each critical_issues}}
- [ ] {{file_short}}:{{line}} — {{title}}
{{/each}}

{{#if_not_lenient}}
**🟠 Warnings ({{WARNING_COUNT}}):**
{{#each warning_issues}}
- [ ] {{file_short}}:{{line}} — {{title}}
{{/each}}

**🟡 Optimization ({{OPTIMIZATION_COUNT}}):**
{{#each optimization_issues}}
- [ ] {{file_short}}:{{line}} — {{title}}
{{/each}}
{{/if_not_lenient}}

{{#if_strict}}
**🔵 Quality ({{QUALITY_COUNT}}):**
{{#each quality_issues}}
- [ ] {{file_short}}:{{line}} — {{title}}
{{/each}}
{{/if_strict}}

---

## Focus Areas Applied

{{#if FOCUS_SECURITY}}✅{{else}}❌{{/if}} Security | {{#if FOCUS_PERFORMANCE}}✅{{else}}❌{{/if}} Performance | {{#if FOCUS_BUGS}}✅{{else}}❌{{/if}} Bugs | {{#if FOCUS_STYLE}}✅{{else}}❌{{/if}} Style | {{#if FOCUS_TESTS}}✅{{else}}❌{{/if}} Tests | {{#if FOCUS_DOCS}}✅{{else}}❌{{/if}} Docs

---

*code-review • compact • {{REVIEW_STYLE}}*
```
