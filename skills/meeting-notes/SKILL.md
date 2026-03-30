---
name: meeting-notes
description: Transform raw meeting notes, transcripts, or informal notes into a structured, actionable to-do list ready for AI agent execution. Automatically extracts tasks, categorizes by priority and context, and formats output for direct copy-paste into Claude or other AI agents. Use this skill whenever a user pastes meeting notes, a transcript, a brain dump, or unstructured notes and wants tasks extracted — even if they just say "here are my meeting notes" or "can you turn this into tasks". Also triggers when users want to organize action items from a meeting, sync-up, standup, retrospective, or planning session.
---

# Meeting Notes → Structured To-Do List

Convert raw, informal meeting notes into a clean, actionable task list formatted for direct execution by an AI agent. Each output task is self-contained — the agent executing it should never need to reference the original notes.

## Step 1: Accept Input

Accept notes in any format:
- Pasted plain text or markdown
- A file path (read the file)
- A transcript with speaker labels
- Bullet-pointed jottings or a brain dump

If the user hasn't provided notes yet, ask: "Please paste your meeting notes or provide a file path."

---

## Step 2: Check for Project Context (If in a Repo)

Before extracting tasks, check whether you're inside a project repository. This context helps align output with the project's conventions.

1. Look for `CLAUDE.md` or `prompter/CLAUDE.md` — project guidelines, naming conventions, tech stack
2. Look for `AGENTS.md` — workflow context and existing structure
3. Check for existing task files: `TODO.md`, `tasks.md`, `.taskmaster/`, or similar
4. Run `git log --oneline -10` to understand current work in flight

Use this context to:
- Align task titles with project conventions (e.g., `feat(auth):` prefixes, snake_case names)
- Flag tasks that likely duplicate existing in-progress work
- Reference specific files or modules from the repo when the notes mention them

If no repo context is found, proceed with general formatting.

---

## Step 3: Extract Tasks

Scan the notes for everything that implies work to be done.

**Extract these:**
- Explicit action items: "we need to…", "John will…", "TODO:", "action item:"
- Decisions requiring implementation: "we decided to X — someone needs to build it"
- Open questions needing resolution: "TBD", "to figure out", "need to check"
- Implicit commitments: "before the release", "I'll handle it", "by next week"

**Skip these:**
- Background context with no next step
- Already-completed work: "we shipped X last week"
- Opinions with no concrete follow-through

For each task, capture:
- **Title** — short imperative verb phrase: "Set up CI pipeline for mobile builds"
- **Description** — what needs to happen, with enough context for execution without the notes
- **Owner** — who's responsible (leave blank if not mentioned)
- **Priority** — see Priority Guide below
- **Category** — see Categories below
- **Due date** — only if explicitly mentioned

### Priority Guide

| Priority | Signals |
|----------|---------|
| **High** | "blocker", "urgent", "ASAP", "before launch", "critical", deadline within ~1 week |
| **Medium** | "should", "this sprint", "next week", general items with no urgency signal |
| **Low** | "nice to have", "eventually", "backlog", "when we get to it", open questions with no deadline |

### Categories

Choose the best fit:
- **Development** — coding, implementation, bug fixes
- **Design** — UI/UX, wireframes, visual assets
- **Research** — investigation, spikes, discovery
- **DevOps/Infra** — CI/CD, deployments, infrastructure
- **Product** — requirements, roadmap, stakeholder decisions
- **Testing/QA** — test writing, QA passes, review
- **Documentation** — docs, READMEs, guides
- **Communication** — follow-up emails, meetings to schedule
- **Admin/Other** — anything else

---

## Step 4: Format Output

Produce two blocks.

### Block 1: Summary Table

A markdown table for quick scanning:

```
| # | Task | Owner | Priority | Category | Due |
|---|------|-------|----------|----------|-----|
| 1 | Set up CI pipeline for mobile builds | @alice | High | DevOps/Infra | Mar 22 |
| 2 | ... |
```

### Block 2: AI-Agent-Ready Task List

Each task as a standalone, copy-pasteable prompt block. The goal is that someone can paste any single block directly into an AI agent and it will know exactly what to do — no additional context needed.

Use this template for each task:

---

**TASK [N] · [Priority] · [Category]**
**[Title]**

> **Context:** [1–2 sentences explaining why this task exists and what decision or discussion led to it]

**What to do:**
- [Concrete imperative step 1]
- [Concrete imperative step 2]
- [Add more as needed]

**Assignee:** [owner or "Unassigned"]
**Due:** [date or "Not specified"]

---

**Writing good task blocks — the key principles:**
- The title is an imperative verb phrase, not a noun phrase ("Fix the auth bug" not "Auth bug fix")
- The Context block carries the *why*, so the agent understands the goal, not just the mechanics
- "What to do" steps are concrete and specific — name files, tools, systems, and outputs by name when the notes mention them
- Self-contained means: no pronouns without antecedents, no references to "the meeting", no unexplained abbreviations

---

## Step 5: Validate Against Project Context (If Applicable)

If you gathered project context in Step 2, do a final pass before printing output:

1. **Naming alignment** — rewrite task titles to match project conventions
2. **Duplicate detection** — if a task matches something in git history or existing task files, flag it: `⚠️ Possible duplicate: [reference]`
3. **File/module references** — replace vague references ("the auth module") with actual repo paths when you can identify them
4. **Missing context** — if a task needs project knowledge not present in the notes, flag it: `ℹ️ Context needed: [what's unclear]`

---

## Step 6: Present and Offer to Save

1. Print the Summary Table
2. Print the AI-Agent-Ready Task List
3. Offer to save to a file (default: `meeting-tasks-YYYY-MM-DD.md`)

If the user wants changes — reordering, reprioritization, a missing task, merging two tasks — iterate quickly.

---

## Edge Cases

- **No clear tasks found** — Tell the user and ask whether to extract implicit decisions or discussion points that might need follow-up
- **Very long meeting (many items)** — Ask if they want to filter by owner, topic, or priority tier
- **Ambiguous owner** — Write "Unassigned"; never guess
- **Conflicting priority signals** — Use the most urgent signal
- **Non-English notes** — Process and output in the same language
