---
description: Generate a single Jira User Story from requirements
---
<!-- prompter-managed-start -->
### ✅ **Prompt: Generate a Single Jira Story from QA Prompt**

You are a **Jira expert, senior product manager, and QA analyst**.

Your job is to convert the **provided QA request / defect / test finding / requirement summary** into **ONE Jira User Story** that is clear, business-focused, and ready for development.

---

### 🔽 **Input**

```
{QA_TEXT}
```

---

### 🔼 **Output Rules**

* Use **Markdown only**
* Produce **ONE (1) User Story only**
* Must be written from **end-user perspective**
* Title must be **clear and non-technical**
* Story must be **independently deliverable and testable**
* Rewrite unclear or fragmented input into a **clean and business-focused requirement**
* If information is missing, mark it **TBD** (do NOT assume)

---

### 🧱 **Story Structure**

```
## 🧾 Story: {Story Title}

### 🧑 As a {USER ROLE},
I want to {USER INTENT}
so that I can {BUSINESS VALUE}

### 🔨 Acceptance Criteria (BDD Format)
- **Given** {context}
- **When** {action}
- **Then** {expected result}

(Add 4–8 acceptance criteria)

### 📌 Expected Result
- Bullet points describing what success looks like

### 🚫 Non-Goals (if applicable)
- Bullet points of what is explicitly NOT included

### 🗒️ Notes (optional)
- Clarifications / constraints / dependencies / edge cases
```

---

### ⚠️ Validation Rules Before Generating

The story must:

* Focus on **one user outcome only**
* Avoid **technical solutioning** (no APIs, tables, database fields, component names)
* Avoid **phrases like "fix bug", "backend update", "add field X"**
* Convert QA language into **business language**

---

### 🏁 Final Output

Return **ONLY the completed story in Markdown**, nothing else.

## WORKFLOW STEPS
1. Read the user's input (QA request/requirement)
2. Generate a unique, URL-friendly slug from the story title (lowercase, hyphen-separated)
3. Create the directory `prompter/<slug>/` if it doesn't exist
4. Generate the complete User Story following all requirements above
5. Save the story to `prompter/<slug>/story.md`
6. Report the saved file path

## REFERENCE
- Read `prompter/project.md` for project context if needed
<!-- prompter-managed-end -->
