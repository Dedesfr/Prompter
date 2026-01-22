---
description: Generate a PRD with autonomous assumptions (non-interactive mode)
---
$ARGUMENTS
<!-- prompter-managed-start -->
# PRD Generator (Non-Interactive Mode)

Create detailed Product Requirements Documents that are clear, actionable, and suitable for implementation based solely on the user's initial input.

---

## The Job

1. Receive a feature description from the user
2. Analyze the input and make reasonable assumptions where details are missing
3. Generate a structured PRD based on the input

---

## Handling Ambiguity

When the user's input lacks specific details:

- **Make reasonable assumptions** based on common patterns and best practices
- **Document assumptions** in the PRD under "Assumptions Made"
- **Flag critical unknowns** in the "Open Questions" section
- **Err on the side of MVP scope** when scope is unclear
- **Default to standard patterns** (e.g., CRUD operations, standard UI components)

---

## PRD Structure

Generate the PRD with these sections:

### 1. Introduction/Overview
Brief description of the feature and the problem it solves.

### 2. Assumptions Made
List key assumptions made due to missing details in the original request:
- "Assumed target users are [X] based on feature context"
- "Assumed MVP scope since no specific scope mentioned"
- "Assumed standard authentication is already in place"

### 3. Goals
Specific, measurable objectives (bullet list).

### 4. User Stories
Each story needs:
- **Title:** Short descriptive name
- **Description:** "As a [user], I want [feature] so that [benefit]"
- **Acceptance Criteria:** Verifiable checklist of what "done" means

Each story should be small enough to implement in one focused session.

**Format:**
```markdown
### US-001: [Title]
**Description:** As a [user], I want [feature] so that [benefit].

**Acceptance Criteria:**
- [ ] Specific verifiable criterion
- [ ] Another criterion
- [ ] Typecheck/lint passes
- [ ] **[UI stories only]** Verify in browser using dev-browser skill
```

**Important:** 
- Acceptance criteria must be verifiable, not vague. "Works correctly" is bad. "Button shows confirmation dialog before deleting" is good.
- **For any story with UI changes:** Always include "Verify in browser using dev-browser skill" as acceptance criteria. This ensures visual verification of frontend work.

### 5. Functional Requirements
Numbered list of specific functionalities:
- "FR-1: The system must allow users to..."
- "FR-2: When a user clicks X, the system must..."

Be explicit and unambiguous.

### 6. Non-Goals (Out of Scope)
What this feature will NOT include. Critical for managing scope.

### 7. Design Considerations (Optional)
- UI/UX requirements
- Link to mockups if available
- Relevant existing components to reuse

### 8. Technical Considerations (Optional)
- Known constraints or dependencies
- Integration points with existing systems
- Performance requirements

### 9. Success Metrics
How will success be measured?
- "Reduce time to complete X by 50%"
- "Increase conversion rate by 10%"

### 10. Open Questions
Remaining questions or areas needing clarification. This is where you document:
- Critical unknowns that affect implementation
- Areas where the original request was ambiguous
- Decisions that may need stakeholder input

---

## Writing for Junior Developers

The PRD reader may be a junior developer or AI agent. Therefore:

- Be explicit and unambiguous
- Avoid jargon or explain it
- Provide enough detail to understand purpose and core logic
- Number requirements for easy reference
- Use concrete examples where helpful

---

## Output

- **Format:** Markdown (`.md`)

---

## WORKFLOW STEPS
1. Read the user's input about the feature
2. Generate a unique, URL-friendly slug from the feature name (lowercase, hyphen-separated)
3. Create the directory `prompter/<slug>/` if it doesn't exist
4. Generate the complete PRD following all requirements above
5. Save the PRD to `prompter/<slug>/prd-agent.md`
6. Report the saved file path

## REFERENCE
- Read `prompter/project.md` for project context if needed
<!-- prompter-managed-end -->
