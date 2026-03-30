# Project Plan: [Project Name]

## Project Overview
[1-2 sentence summary of the project, its purpose, and target audience]

---

## MVP Scope

### In Scope
- [ ] [Feature 1]
- [ ] [Feature 2]
- [ ] [Feature 3]

### Out of Scope (Deferred)
- [Deferred item 1] -- [reason]
- [Deferred item 2] -- [reason]

---

## User Roles
| Role | Description | MVP? |
|------|-------------|------|
| [Role] | [What they do] | Yes/No |

---

## Core Features (Prioritized)
| # | Feature | Priority | Complexity | Notes |
|---|---------|----------|------------|-------|
| 1 | [Feature] | Must-have | [Low/Med/High] | [Notes] |
| 2 | [Feature] | Must-have | [Low/Med/High] | [Notes] |
| 3 | [Feature] | Nice-to-have | [Low/Med/High] | [Notes] |

---

## Data Model Sketch

### Core Entities
- **[Entity 1]**: [key fields]
- **[Entity 2]**: [key fields]
- **[Entity 3]**: [key fields]

### Key Relationships
- [Entity A] has many [Entity B]
- [Entity B] belongs to [Entity A]

---

## Integrations & Services

| Capability | Needed? | Service/Tool | Notes |
|------------|---------|--------------|-------|
| Caching | Yes/No | [e.g., Redis] | [Notes] |
| Queues / Background Jobs | Yes/No | [e.g., Redis Queue] | [Notes] |
| Real-Time | Yes/No | [e.g., Pusher, WebSockets] | [Notes] |
| Full-Text Search | Yes/No | [e.g., Meilisearch] | [Notes] |
| File Storage | Yes/No | [e.g., S3] | [Notes] |
| Email / SMS | Yes/No | [e.g., Resend, Twilio] | [Notes] |
| Analytics | Yes/No | [e.g., PostHog, Plausible] | [Notes] |
| Payments | Yes/No | [e.g., Stripe] | [Notes] |
| Third-Party | Yes/No | [e.g., social login, maps] | [Notes] |

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | [e.g., Next.js] | [Why] |
| Backend | [e.g., NestJS] | [Why] |
| ORM / DB Layer | [e.g., Drizzle] | [Why] |
| Database | [e.g., PostgreSQL] | [Why] |
| Styling | [e.g., Tailwind CSS] | [Why] |
| Docker | Yes/No | [Why] |

---

## Deployment & Environments

| Environment | Platform | URL (if known) | Notes |
|-------------|----------|----------------|-------|
| Development | [e.g., Local + Docker] | localhost | |
| Staging | [e.g., Railway] | [TBD] | |
| Production | [e.g., VPS / DigitalOcean] | [TBD] | |

---

## Non-Functional Requirements

| Requirement | Detail |
|-------------|--------|
| Security | [e.g., standard auth, 2FA, GDPR] |
| Performance | [e.g., <1k users expected] |
| SEO | [e.g., required / not required] |

---

## Open Questions / Risks
- [Open question or risk 1]
- [Open question or risk 2]

---

## Recommended Next Steps

### 1. Scaffold the project
```bash
# [Insert the exact setup command(s) for the chosen stack]
# React (Vite):   npm create vite@latest
# Next.js:        npx create-next-app@latest {project_name} --yes
# Express:        npm install express --save
# NestJS:         npm i -g @nestjs/cli && nest new {project_name}
# Laravel 12:     composer create-project laravel/laravel:^12.0 {project_name}
```
> Replace the above with only the command(s) matching the selected stack.

### 2. Further steps
- [e.g., Define database schema based on data model above]
- [e.g., Implement authentication and user management]
- [e.g., Build core feature X]
- [e.g., Set up CI/CD pipeline]
- [e.g., Deploy staging environment]
