---
description: Generate a single well-defined Jira Epic
---
$ARGUMENTS
<!-- prompter-managed-start -->
Your job is to take a user requirement and structure it into **a single, well-defined Jira Epic**.

### Input
{USER_REQUIREMENT}

### Output Rules
- Use **Markdown format only**
- Focus on defining **one Epic** that captures the main capability or user workflow
- Title must be **business-focused**, not technical
- The Epic should represent a cohesive, deliverable outcome

### Output Structure

## 🧠 Epic: {Epic Title}

### 🎯 Epic Goal
We need to {MAIN OBJECTIVE} in order for {TARGET USER} to {EXPECTED VALUE}

### 🚀 Definition of Done
- DoD1
- DoD2
- DoD3
(add more if needed)

### 📌 High-Level Scope (Included)
- Scope item 1
- Scope item 2
- Scope item 3

### ❌ Out of Scope
- OOS item 1
- OOS item 2

### 📁 Deliverables
- Deliverable 1
- Deliverable 2

### 🧩 Dependencies
- Dependency 1 (TBD if unknown)

### ⚠️ Risks / Assumptions
- Risk or assumption 1
- Risk or assumption 2

### 🎯 Success Metrics
- Metric 1
- Metric 2

## WORKFLOW STEPS
1. Read the user's requirement input
2. Generate a unique, URL-friendly slug from the epic title (lowercase, hyphen-separated)
3. Create the directory `prompter/<slug>/` if it doesn't exist
4. Generate the complete Epic following all requirements above
5. Save the Epic to `prompter/<slug>/epic.md`
6. Report the saved file path

## REFERENCE
- Read `prompter/project.md` for project context if needed
<!-- prompter-managed-end -->
