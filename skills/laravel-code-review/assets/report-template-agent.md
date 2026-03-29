# Laravel Code Review — Agent Task List

> Executable task list for AI agents. Process each task sequentially, marking as complete when done.

## Review Summary

| Attribute          | Value                                |
| ------------------ | ------------------------------------ |
| **Generated**      | {{TIMESTAMP}}                        |
| **Review Style**   | {{REVIEW_STYLE}}                     |
| **Framework**      | Laravel 12.x                         |
| **PHP Version**    | 8.4                                  |
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

| Category    | Count                 |
| ----------- | --------------------- |
| Security    | {{SECURITY_COUNT}}    |
| Eloquent    | {{ELOQUENT_COUNT}}    |
| PHP 8.4     | {{PHP84_COUNT}}       |
| Conventions | {{CONVENTIONS_COUNT}} |

---

## Pending Tasks

> Execute these tasks in order. Check the box `[x]` when completed.

### 🔴 Critical Tasks (Execute First)

{{#each critical_tasks}}
- [ ] **TASK-{{task_id}}** | `{{file}}:{{line}}` | {{component}}
  - **Issue:** {{title}}
  - **Category:** {{category}}
  - **Action:** {{action_verb}}
  - **Target Code:**
    ```php
    {{target_code}}
    ```
  - **Replace With:**
    ```php
    {{replacement_code}}
    ```
  - **Docs:** [{{laravel_docs_label}}]({{laravel_docs_url}})

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

After completing tasks, run these commands to verify:

```bash
# Static analysis
./vendor/bin/phpstan analyse

# Code style check
./vendor/bin/pint --test

# Run tests
php artisan test

# Clear caches
php artisan optimize:clear
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
  "all_critical_resolved": {{all_critical_resolved}},
  "all_warnings_resolved": {{all_warnings_resolved}},
  "ready_for_commit": {{ready_for_commit}},
  "requires_human_review": {{requires_human_review}},
  "blocking_issues": {{blocking_count}},
  "has_security_issues": {{has_security}},
  "has_n_plus_one": {{has_n_plus_one}},
  "has_mass_assignment": {{has_mass_assignment}}
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

*Format: agent-tasks | Schema: laravel-code-review/v2 | {{REVIEW_STYLE}} mode*
