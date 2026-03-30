````markdown
# Code Review — Agent Task List

> Executable task list for AI agents. Process each task sequentially, marking as complete when done.

## Review Summary

| Attribute          | Value                                |
| ------------------ | ------------------------------------ |
| **Generated**      | {{TIMESTAMP}}                        |
| **Review Style**   | {{REVIEW_STYLE}}                     |
| **Tech Stack**     | {{TECH_STACK}}                       |
| **Framework**      | {{FRAMEWORK}}                        |
| **AGENTS.md**      | {{AGENTS_MD_STATUS}}                 |
| **Files Reviewed** | {{FILE_COUNT}}                       |
| **Total Tasks**    | {{TASK_COUNT}}                       |
| **Completed**      | {{COMPLETED_COUNT}} / {{TASK_COUNT}} |

### Task Statistics

| Priority       | Total                  | Remaining                  | Completed                  |
| -------------- | ---------------------- | -------------------------- | -------------------------- |
| 🔴 Critical     | {{CRITICAL_COUNT}}     | {{CRITICAL_REMAINING}}     | {{CRITICAL_COMPLETED}}     |
| 🟠 Warning      | {{WARNING_COUNT}}      | {{WARNING_REMAINING}}      | {{WARNING_COMPLETED}}      |
| 🟡 Optimization | {{OPTIMIZATION_COUNT}} | {{OPTIMIZATION_REMAINING}} | {{OPTIMIZATION_COMPLETED}} |
| 🔵 Quality      | {{QUALITY_COUNT}}      | {{QUALITY_REMAINING}}      | {{QUALITY_COMPLETED}}      |

### Categories

| Category       | Count                    |
| -------------- | ------------------------ |
| Security       | {{SECURITY_COUNT}}       |
| Performance    | {{PERFORMANCE_COUNT}}    |
| Architecture   | {{ARCHITECTURE_COUNT}}   |
| Language/FW    | {{LANG_FRAMEWORK_COUNT}} |
| Error Handling | {{ERROR_HANDLING_COUNT}} |

---

## Pending Tasks

> Execute these tasks in order. Check the box `[x]` when completed.

### 🔴 Critical Tasks (Execute First)

{{#each critical_tasks}}
- [ ] **TASK-{{task_id}}** | `{{file}}:{{line}}` | {{component}}
  - **Issue:** {{title}}
  - **Category:** {{category}}
  - **Language:** {{language}}
  - **Action:** {{action_verb}}
  - **Target Code:**
    ```{{language}}
    {{target_code}}
    ```
  - **Replace With:**
    ```{{language}}
    {{replacement_code}}
    ```
  {{#if docs_link}}
  - **Docs:** [{{docs_title}}]({{docs_link}})
  {{/if}}
  {{#if agents_md_rule}}
  - **AGENTS.md Rule:** {{agents_md_rule}}
  {{/if}}

{{/each}}

### 🟠 Warning Tasks

{{#each warning_tasks}}
- [ ] **TASK-{{task_id}}** | `{{file}}:{{line}}` | {{component}}
  - **Issue:** {{title}}
  - **Category:** {{category}}
  - **Action:** {{action_verb}}
  - **Details:** {{description}}
  - **Fix:** {{recommendation}}

{{/each}}

### 🟡 Optimization Tasks

{{#each optimization_tasks}}
- [ ] **TASK-{{task_id}}** | `{{file}}:{{line}}` | {{component}}
  - **Issue:** {{title}}
  - **Improvement:** {{recommendation}}

{{/each}}

### 🔵 Quality Tasks

{{#each quality_tasks}}
- [ ] **TASK-{{task_id}}** | `{{file}}:{{line}}` | {{component}}
  - **Issue:** {{title}}
  - **Suggestion:** {{recommendation}}

{{/each}}

---

## Completed Tasks

> Move completed tasks here with `[x]` checked.

{{#each completed_tasks}}
- [x] **TASK-{{task_id}}** | `{{file}}:{{line}}` — {{title}} ✅
{{/each}}

---

## Agent Execution Commands

> Ready-to-execute commands for automated processing.

### File Edit Operations

```json
{
  "operations": [
{{#each edit_operations}}
    {
      "task_id": "TASK-{{task_id}}",
      "operation": "replace",
      "file": "{{file}}",
      "language": "{{language}}",
      "component": "{{component}}",
      "start_line": {{start_line}},
      "end_line": {{end_line}},
      "target": "{{target_code_escaped}}",
      "replacement": "{{replacement_code_escaped}}",
      "status": "{{status}}"
    }{{#unless @last}},{{/unless}}
{{/each}}
  ]
}
```

### Validation Commands

After completing tasks, run project-appropriate validation:

```bash
# Detect and run project linter/formatter
# (adapt to actual project tooling from AGENTS.md or config)

# JavaScript/TypeScript
npm run lint && npm test

# Python
ruff check . && pytest

# PHP
./vendor/bin/phpstan analyse && ./vendor/bin/pint --test && php artisan test

# Go
go vet ./... && go test ./...

# Rust
cargo clippy && cargo test
```

---

## Task Execution Protocol

For each pending task:

1. **READ** the task details and target code
2. **LOCATE** the file and line number
3. **APPLY** the replacement code or fix
4. **VERIFY** the change doesn't break other code
5. **MARK** the task as complete `[x]`
6. **MOVE** to Completed Tasks section

### Status Flags

```json
{
  "review_style": "{{REVIEW_STYLE}}",
  "tech_stack": "{{TECH_STACK}}",
  "agents_md_loaded": {{AGENTS_MD_FOUND}},
  "all_critical_resolved": {{all_critical_resolved}},
  "all_warnings_resolved": {{all_warnings_resolved}},
  "ready_for_commit": {{ready_for_commit}},
  "requires_human_review": {{requires_human_review}},
  "blocking_issues": {{blocking_count}},
  "has_security_issues": {{has_security}}
}
```

---

## Quick Reference

| Task ID Format | Meaning               |
| -------------- | --------------------- |
| `TASK-C###`    | Critical priority     |
| `TASK-W###`    | Warning priority      |
| `TASK-O###`    | Optimization priority |
| `TASK-Q###`    | Quality priority      |

| Status      | Symbol |
| ----------- | ------ |
| Pending     | `[ ]`  |
| In Progress | `[-]`  |
| Completed   | `[x]`  |
| Skipped     | `[~]`  |

---

*Format: agent-tasks | Schema: code-review/v1 | {{REVIEW_STYLE}} mode*
````
