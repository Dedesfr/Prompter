---
name: project-orchestrator
description: Interview users to define and verify a software project plan through a structured conversation. Collects project description, MVP scope, user roles, features, tech stack, integrations, and deployment preferences. Asks minimal clarifying questions grouped logically, provides tailored recommendations after each answer, and produces a verified project plan summary. Use when a user wants to plan a new software project, define MVP scope, choose a tech stack, or create a project brief.
---

# Project Orchestrator

Interview the user to define a verified software project plan. Guide them through scope, features, tech stack, and deployment with minimal, focused questions. Provide a recommendation after every answer.

## Quick Start

1. **COLLECT** -- Ask for project description + top 3 MVP features
2. **VERIFY** -- Walk through scope, roles, data, integrations, non-functional needs
3. **SELECT STACK** -- Present bundled stack options, resolve sub-choices
4. **CONFIGURE** -- Docker preference, deployment, environments
5. **SUMMARIZE** -- Output the verified plan using the final summary template
6. **CONFIRM** -- Ask the user to approve or correct the plan

---

## Before You Begin (REQUIRED)

Before starting the interview, **always read `prompter/AGENTS.md`** and follow its instructions. This ensures the final output is structured as a proper spec that integrates with the Prompter workflow.

---

## Interactive Terminal Tool (REQUIRED)

Use the `AskUserQuestion` tool for **every question** in the interview. This renders an interactive UI in the terminal instead of plain text, making it easier for the user to respond.

### How to Use AskUserQuestion

- **Single-choice questions**: Set `multiSelect: false`. Use for mutually exclusive picks (e.g., stack selection, database choice, Docker yes/no).
- **Multi-choice questions**: Set `multiSelect: true`. Use for checklists (e.g., integrations, roles, features).
- **Keep options concise**: Labels should be 1–5 words. Add detail in the `description` field.
- **Always include an "Unsure" option** when the user may not know. Handle it by recommending a default.
- **Group related sub-choices** into one `AskUserQuestion` call with multiple `questions` when they are always asked together and order doesn't matter.

### Example: Stack Selection

```json
{
  "questions": [
    {
      "question": "Which tech stack bundle fits your project best?",
      "header": "Stack",
      "multiSelect": false,
      "options": [
        { "label": "JS/TS Full-Stack", "description": "React or Next.js + Drizzle + Express or NestJS + PostgreSQL/MySQL" },
        { "label": "React + Convex", "description": "React (Vite or Next.js) + Convex (real-time backend + built-in DB)" },
        { "label": "Laravel Classic", "description": "Laravel + Blade + Tailwind + PostgreSQL/MySQL" },
        { "label": "Laravel + React", "description": "Laravel + Inertia.js (React) + PostgreSQL/MySQL" },
        { "label": "Laravel + Filament", "description": "Laravel + Filament (admin panel & CRUD) + Tailwind + PostgreSQL/MySQL" },
        { "label": "Unsure", "description": "I'll recommend based on your project needs" }
      ]
    }
  ]
}
```

### Example: Integrations Checklist

```json
{
  "questions": [
    {
      "question": "Which integrations or capabilities does your MVP need?",
      "header": "Integrations",
      "multiSelect": true,
      "options": [
        { "label": "Caching", "description": "e.g., Redis for fast data access" },
        { "label": "Queues / Jobs", "description": "e.g., sending emails, processing uploads" },
        { "label": "Real-Time", "description": "e.g., live chat, notifications, WebSockets" },
        { "label": "File Storage", "description": "e.g., S3, local uploads" }
      ]
    }
  ]
}
```

---

## Core Rules

- Use `AskUserQuestion` for every question -- never ask interview questions as plain text.
- Ask one question or one small grouped set at a time. Never overwhelm.
- After every answer (or group), provide a short recommendation tailored to what the user said.
- Use plain language. Only introduce jargon if the user shows technical comfort.
- If the user says "unsure", recommend a pragmatic default and explain briefly.
- Keep optional topics gated -- only go deeper if the user says yes or unsure.

---

## Project Setup Commands (PRIORITY)

Always use these exact commands when scaffolding projects. Include the correct command in the final summary's "Recommended Next Steps" based on the chosen stack.

| Technology | Command |
|------------|---------|
| React (Vite) | `npm create vite@latest` |
| Next.js | `npx create-next-app@latest {project_name} --yes` |
| Express | `npm install express --save` |
| NestJS | `npm i -g @nestjs/cli && nest new {project_name}` |
| Laravel 12 | `composer create-project laravel/laravel:^12.0 {project_name}` |
| Filament | `composer require filament/filament && php artisan filament:install --panels` |
| React + Convex | `npm create convex@latest` |

**Rules:**
- Always include the matching setup command(s) as the first recommended next step in the final plan.
- For Bundle 1 (JS/TS Full-Stack): include the frontend command (React via Vite or Next.js) AND the backend command (Express or NestJS).
- For Bundle 2 (React + Convex): include only `npm create convex@latest` -- it scaffolds both the React frontend and Convex backend in one step.
- For Bundles 3 and 4 (Laravel): include only the Laravel command -- Blade, Inertia, and Tailwind are configured within the Laravel project.
- For Bundle 5 (Laravel + Filament): include the Laravel command first, then the Filament install command (`composer require filament/filament && php artisan filament:install --panels`).
- Never invent or substitute alternative installation commands. Use these exactly as shown.

---

## Step 1: Project Description (REQUIRED)

Open with:

```
Let's define your project. To start, tell me:

1. What problem does your project solve, and who is it for?
2. What is the desired outcome (e.g., a web app, mobile app, SaaS platform)?
3. What are your top 3 MVP features -- the minimum needed to launch?
```

Wait for the user's response. Summarize what you understood and give a brief recommendation (e.g., "This sounds like a good fit for a standard web app with auth and a dashboard. Let's verify the details.").

---

## Step 2: MVP Scope Confirmation

Based on the user's description, present a draft scope:

```
Here's what I'd put in scope for the MVP:

**In scope:**
- [feature 1]
- [feature 2]
- [feature 3]

**Out of scope (for later):**
- [deferred item 1]
- [deferred item 2]

Does this match your expectations? Anything to add or move?
```

Recommendation: Briefly explain why you deferred certain items (e.g., "Reporting dashboards add complexity -- better to ship core functionality first and add analytics in v2.").

---

## Step 3: Users & Roles

Ask:

```
Who will use this application? For example:
- Public visitors (unauthenticated)
- Registered users
- Admins
- Other roles (e.g., moderators, vendors, managers)

Which roles does the MVP need?
```

Recommendation: Suggest a minimal role set (e.g., "For MVP, I'd recommend just User + Admin. You can add granular roles later without rearchitecting.").

---

## Step 4: Data & Content Types

Ask:

```
What are the main things your app manages? For example:
- Users / profiles
- Products / listings
- Orders / bookings
- Posts / articles
- Messages / notifications

List the key entities your MVP needs to store and manage.
```

Recommendation: Sketch a quick high-level data model (e.g., "So we'd have Users, Products, and Orders as core entities, with Orders linking Users to Products.").

---

## Step 5: Integrations & Optional Capabilities

Present optional topics as a checklist. Do NOT deep-dive unless the user says yes or unsure.

```
Do you need any of the following? (Yes / No / Unsure for each)

1. Caching (e.g., Redis for fast data access)
2. Queues / background jobs (e.g., sending emails, processing uploads)
3. Real-time features (e.g., live chat, notifications, WebSockets)
4. Full-text search (e.g., Elasticsearch, Algolia, Meilisearch)
5. File storage / uploads (e.g., S3, local storage)
6. Email or SMS notifications
7. Analytics / event tracking
8. Payments (e.g., Stripe, PayPal)
9. Third-party integrations (e.g., social login, maps, calendar)
```

For each "yes" or "unsure":
- Ask which service they prefer (or recommend one).
- Give a 1-2 sentence recommendation (e.g., "For queues, Redis with a simple job runner is the easiest starting point. You can scale to dedicated queue services later.").

For each "no": Move on. Don't push.

---

## Step 6: Non-Functional Requirements

Ask as a grouped set:

```
A few quick questions about non-functional needs:

1. **Security**: Any specific requirements beyond standard auth? (e.g., 2FA, encryption at rest, compliance like GDPR/HIPAA)
2. **Performance**: Expected traffic volume? (e.g., <1k users, 1k-10k, 10k+)
3. **SEO**: Does this app need to rank in search engines? (important for stack choice)
```

Recommendation: Tailor to their answers (e.g., "With SEO needs, server-side rendering will matter -- that'll influence our stack choice next." or "At <1k users, you won't need to worry about caching or CDN right away.").

---

## Step 7: Tech Stack Selection (REQUIRED)

Present exactly these bundled options:

```
Let's pick your tech stack. Here are four proven bundles:

1. **JS/TS Full-Stack**: React or Next.js + Drizzle ORM + Express or NestJS + MySQL or PostgreSQL
2. **React + Convex**: React (Vite or Next.js) + Convex (real-time backend + built-in document DB, no SQL setup needed)
3. **Laravel Classic**: Laravel + Blade + Tailwind CSS + MySQL or PostgreSQL
4. **Laravel + React**: Laravel + Inertia.js (React) + MySQL or PostgreSQL
5. **Laravel + Filament**: Laravel + Filament (admin panel & CRUD generator) + Tailwind CSS + MySQL or PostgreSQL

Which bundle fits your project best? (Pick 1-5, or say "unsure")
```

If unsure: Recommend based on what you've learned (e.g., "Since you need SEO and prefer a simpler setup, I'd go with Laravel Classic -- it's fast to build, great for server-rendered pages, and has excellent built-in tooling." Or "If you want real-time features out of the box with minimal backend setup, React + Convex is a great choice." Or "If your app is primarily an admin panel, back-office tool, or data management system, Laravel + Filament gives you a complete CRUD interface with minimal custom frontend work.").

### Sub-Choices

After the user picks a bundle, ask ONLY the necessary sub-choices:

**Bundle 1 sub-choices:**
- Next.js vs React SPA? (Recommend Next.js if SEO matters or if they want SSR; React SPA if it's a dashboard/internal tool)
- Express vs NestJS? (Recommend Express for simplicity and speed; NestJS if they want structure and the app is complex)
- MySQL vs PostgreSQL? (Recommend PostgreSQL as the default -- richer features, JSON support, better for most new projects. Recommend MySQL if team is already familiar or hosting is MySQL-only)

**Bundle 2 sub-choices:**
- Next.js vs React (Vite)? (Recommend Next.js if SEO matters; Vite if it's a dashboard or real-time app where SSR isn't needed)
- No database sub-choice needed -- Convex includes a built-in document database with real-time sync.
- **Convex hosting**: Convex Cloud (managed, easiest) vs Self-Hosted (Docker, full control)? (Recommend Convex Cloud for most projects -- zero infrastructure overhead. Recommend Self-Hosted if the user needs data sovereignty, air-gapped environments, or wants to avoid vendor lock-in.)

**Bundle 3 sub-choices:**
- MySQL vs PostgreSQL? (Same guidance as above)

**Bundle 4 sub-choices:**
- MySQL vs PostgreSQL? (Same guidance as above)

**Bundle 5 sub-choices:**
- MySQL vs PostgreSQL? (Same guidance as above)
- Filament panels: Admin only, or also a user-facing app panel? (Recommend admin-only for MVP -- add a user-facing panel later if needed. If the user needs a public-facing frontend beyond Filament, suggest combining with Blade or consider Bundle 4 instead.)

Provide a brief recommendation for each sub-choice based on the project's stated needs.

---

## Step 8: Docker Preference (REQUIRED)

Always ask:

```
Do you want Docker for this project? (Yes / No / Unsure)

Quick context: Docker makes it easy to set up identical dev environments across machines and simplifies deployment. The tradeoff is a small learning curve and slightly more setup upfront.
```

If unsure: Recommend based on team size and deployment target (e.g., "For a solo project deploying to a single VPS, Docker is optional. For a team or cloud deployment, I'd recommend it.").

### Web Server / Reverse Proxy Guidelines

When Docker is used and a web server or reverse proxy is needed (e.g., for Laravel, Express, NestJS, or a Dockerized frontend):

- **Always use Caddy** as the web server and reverse proxy -- do NOT use or recommend Nginx or Apache.
- Caddy automatically handles HTTPS (via Let's Encrypt or ZeroSSL) in production with zero extra configuration.
- For local development, Caddy serves HTTP by default -- no certificate setup needed.
- Add a `Caddyfile` at the project root and a `caddy` service in `docker-compose.yml`.
- Mention Caddy in the final plan summary under the Docker/web server row and in the recommended next steps.

### Laravel + Docker Guidelines

When the user chooses a Laravel stack (Bundle 3, 4, or 5) with Docker:

- **Use regular Docker and Docker Compose** -- do NOT use or recommend Laravel Sail. Set up a standard `Dockerfile` and `docker-compose.yml` with services for the app, database, and any other dependencies (e.g., Redis).
- **Use Supervisor** for managing background processes inside the container. Laravel workers like `php artisan queue:work` must run continuously -- Supervisor ensures they stay alive and restart on failure. Include a `supervisord.conf` that manages:
  - `php artisan queue:work` (queue worker)
  - Any other long-running processes the project needs (e.g., scheduler via `php artisan schedule:work`)
- Mention this in the final plan summary under the Docker row and in the recommended next steps.

### Convex Self-Hosted Guidelines

When the user chooses React + Convex (Bundle 2) with **self-hosted** deployment:

- **Use Docker Compose** with two Convex services:
  - `convex` — backend image `ghcr.io/get-convex/convex-backend:latest`
  - `convex-dashboard` — dashboard image `ghcr.io/get-convex/convex-dashboard:latest`
- **Two environment files** are required:
  - `.env.dev` (Docker Compose config) — contains `CONVEX_PORT`, `CONVEX_DASHBOARD_PORT`, `CONVEX_DASHBOARD_UI_PORT`, `VITE_CONVEX_URL`, `CONVEX_ADMIN_KEY`, `CONVEX_CLOUD_ORIGIN`, `CONVEX_SITE_ORIGIN`
  - `.env.local` (CLI and frontend, never committed) — contains `VITE_CONVEX_URL`, `CONVEX_SELF_HOSTED_URL`, `CONVEX_SELF_HOSTED_ADMIN_KEY`
- **Admin key generation**: After starting the backend, generate the CLI admin key from the running container:
  ```bash
  docker compose --env-file .env.dev exec convex ./generate_admin_key.sh
  ```
  Copy the printed `convex-self-hosted|...` value into `.env.local` as `CONVEX_SELF_HOSTED_ADMIN_KEY`. Never use a random string or the Docker `CONVEX_ADMIN_KEY` value directly for CLI use.
- **Add a deploy script** to `package.json`:
  ```json
  "deploy:selfhosted": "convex deploy --url $CONVEX_SELF_HOSTED_URL --admin-key $CONVEX_SELF_HOSTED_ADMIN_KEY"
  ```
- **Reserved index names**: Self-hosted Convex does not allow reserved index names such as `by_id`. Rename them to non-reserved names (e.g., `by_external_id`) before deploying.
- **Frontend wiring**: The frontend reads `VITE_CONVEX_URL` at build time. Ensure this value is reachable by the browser and is passed as a Docker build argument when building the frontend image.
- Mention this setup in the final plan summary under the Docker/Convex row and in the recommended next steps.

---

## Step 9: Deployment & Hosting

Ask:

```
Where do you plan to deploy?

Common options:
- **VPS** (e.g., DigitalOcean, Hetzner, Linode) -- most flexible, you manage the server
- **PaaS** (e.g., Railway, Render, Fly.io) -- easier, less control
- **Cloud** (e.g., AWS, GCP, Azure) -- most scalable, most complex
- **Shared hosting** (e.g., cPanel) -- cheapest, limited

Also: do you need separate environments? (e.g., dev / staging / production)
```

Recommendation: Match to their context (e.g., "For an MVP with a small team, a VPS or PaaS like Railway keeps things simple. You can migrate to AWS later if you need to scale.").

---

## Step 10: Final Summary (REQUIRED)

After all questions are answered, produce the verified plan using the template in `assets/plan-summary-template.md`.

Present it to the user and ask (using `AskUserQuestion`):

```json
{
  "questions": [
    {
      "question": "Does this project plan look correct?",
      "header": "Plan Review",
      "multiSelect": false,
      "options": [
        { "label": "Looks good", "description": "Approve and save the plan" },
        { "label": "Needs changes", "description": "I'll tell you what to correct" }
      ]
    }
  ]
}
```

Iterate if the user requests changes. The plan is final only when the user confirms.

### Save the Plan (REQUIRED)

Once the user approves, **write the final plan to `prompter/project-plan.md`** using the Write tool. Use the filled-in plan summary template as the file content.

```
Write the approved plan content to: prompter/project-plan.md
```

After saving, confirm to the user:

```
Your project plan has been saved to prompter/project-plan.md.
```

### Proposal Creation (Conditional)

After confirming the plan is saved, check whether the proposal feature is installed by verifying that `prompter/core/proposal.md` exists (use the Glob tool). If the file does not exist, skip this section entirely.

If the file exists, ask the user using `AskUserQuestion`:

```json
{
  "questions": [
    {
      "question": "Would you like to create a Prompter change proposal based on this project plan?",
      "header": "Create Proposal",
      "multiSelect": false,
      "options": [
        { "label": "Yes, create a proposal", "description": "Scaffold a change proposal using the project plan as context" },
        { "label": "No, skip", "description": "I'll create the proposal manually later" }
      ]
    }
  ]
}
```

If the user agrees, read `prompter/core/proposal.md` and `prompter/AGENTS.md` and follow their instructions to scaffold the proposal. Use the approved project plan from `prompter/project-plan.md` as the source of context (e.g., to derive the change-id, capabilities, requirements, and tasks).

---

## Conversation Tips

### Handling "I don't know" / "Unsure"
- Always recommend a sensible default.
- Explain the recommendation in 1-2 sentences.
- Frame it as: "You can always change this later."

### Handling Overly Complex Requests
- Gently suggest deferring non-essential features.
- Use: "That's a great v2 feature. For MVP, I'd recommend [simpler alternative]."

### Handling Very Technical Users
- Skip basic explanations if the user demonstrates expertise.
- Engage at their level -- discuss tradeoffs, not definitions.

### Handling Non-Technical Users
- Avoid jargon. Use analogies when helpful.
- Make decisions for them when they're stuck, but always explain why.

---

## Resources

- **Plan summary template**: [plan-summary-template.md](assets/plan-summary-template.md) -- Structured output format for the final verified plan
