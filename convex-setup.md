# Convex Self-Hosted Setup Guide

This document explains how to set up a self-hosted Convex deployment for this project using the official Convex self-hosted flow.

It covers:

- the Convex backend container
- the Convex dashboard container
- the frontend app connected through `VITE_CONVEX_URL`
- the Convex CLI workflow for deploying schema and functions to a self-hosted instance

## Official self-hosted flow

The official Convex self-hosted documentation uses this sequence:

1. start the backend and dashboard
2. generate the admin key from the running backend container
3. save `CONVEX_SELF_HOSTED_URL` and `CONVEX_SELF_HOSTED_ADMIN_KEY` in `.env.local`
4. use the Convex CLI to deploy schema and functions
5. run queries, mutations, imports, or seeds against the self-hosted backend

Important:

- The CLI admin key is generated from the running backend.
- Do not assume the Docker env value `CONVEX_ADMIN_KEY` is the same value the CLI expects.
- Do not use a random `openssl rand -hex 32` string as `CONVEX_SELF_HOSTED_ADMIN_KEY` unless Convex explicitly tells you to do so for your setup.

## How this project is wired

### Frontend

The frontend creates the Convex React client from `VITE_CONVEX_URL`:

```ts
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
```

That means:

- `VITE_CONVEX_URL` must be reachable by the browser
- the frontend needs this value during local development
- when building the Docker image, the same value must be passed as a build argument

### Deploy script

This project exposes a self-hosted deploy script in `package.json`:

```json
{
  "scripts": {
    "deploy:selfhosted": "convex deploy --url $CONVEX_SELF_HOSTED_URL --admin-key $CONVEX_SELF_HOSTED_ADMIN_KEY"
  }
}
```

## Prerequisites

Install these first:

- Node.js 22+
- npm
- Docker Desktop or Docker Engine with Compose
- project dependencies installed with `npm install`

If `node` or `npm` are missing from your `PATH`, use the Node 22 install configured for this project:

```bash
export PATH="$HOME/.nvm/versions/node/v22.17.1/bin:$PATH"
```

## Environment variables used by this project

This project uses two different configuration contexts.

### 1. Docker Compose environment

The compose stack reads values such as:

```env
APP_ENV=dev
WEB_PORT=8080
CONVEX_PORT=3220
CONVEX_DASHBOARD_PORT=3221
CONVEX_DASHBOARD_UI_PORT=6792
VITE_CONVEX_URL=http://localhost:3220
CONVEX_ADMIN_KEY=replace-with-placeholder-if-needed
CONVEX_CLOUD_ORIGIN=http://localhost:3220
CONVEX_SITE_ORIGIN=http://localhost:6792
```

Notes:

- `CONVEX_ADMIN_KEY` is passed into the backend container.
- In practice, the Convex CLI should use the admin key generated from the running backend container.
- `CONVEX_CLOUD_ORIGIN` should point to the backend API origin.
- `CONVEX_SITE_ORIGIN` should point to the dashboard UI origin.

### 2. Local CLI and frontend environment

For local development, `.env.local` should contain:

```env
VITE_CONVEX_URL=http://localhost:3220
CONVEX_SELF_HOSTED_URL=http://localhost:3220
CONVEX_SELF_HOSTED_ADMIN_KEY=convex-self-hosted|generated-from-container
```

Notes:

- `VITE_CONVEX_URL` is used by the frontend.
- `CONVEX_SELF_HOSTED_URL` and `CONVEX_SELF_HOSTED_ADMIN_KEY` are used by the Convex CLI.
- `.env.local` should not be committed.

## Reference Docker Compose pattern

This project uses the same high-level pattern as the official self-hosted documentation: one backend service and one dashboard service.

```yaml
services:
  convex:
    image: ghcr.io/get-convex/convex-backend:latest
    ports:
      - "${CONVEX_PORT:-3210}:3210"
      - "${CONVEX_DASHBOARD_PORT:-3211}:3211"
    volumes:
      - convex-data:/convex/data
    environment:
      CONVEX_ADMIN_KEY: ${CONVEX_ADMIN_KEY}
      CONVEX_CLOUD_ORIGIN: ${CONVEX_CLOUD_ORIGIN}
      CONVEX_SITE_ORIGIN: ${CONVEX_SITE_ORIGIN}

  convex-dashboard:
    image: ghcr.io/get-convex/convex-dashboard:latest
    depends_on:
      convex:
        condition: service_started
    ports:
      - "${CONVEX_DASHBOARD_UI_PORT:-6791}:6791"
    environment:
      NEXT_PUBLIC_DEPLOYMENT_URL: ${CONVEX_CLOUD_ORIGIN}
      NEXT_PUBLIC_LOAD_MONACO_INTERNALLY: "true"

volumes:
  convex-data:
```

In this repository, the actual compose file also includes a `web` service for the frontend.

## Step-by-step setup for this project

### 1. Install dependencies

From the repository root:

```bash
npm install
```

### 2. Create `.env.dev`

Copy the development template:

```bash
cp env.dev.example .env.dev
```

Recommended local values:

```env
APP_ENV=dev
WEB_PORT=8080
CONVEX_PORT=3220
CONVEX_DASHBOARD_PORT=3221
CONVEX_DASHBOARD_UI_PORT=6792
VITE_CONVEX_URL=http://localhost:3220
CONVEX_ADMIN_KEY=replace-with-placeholder-if-needed
CONVEX_CLOUD_ORIGIN=http://localhost:3220
CONVEX_SITE_ORIGIN=http://localhost:6792
```

Important:

- Treat `CONVEX_ADMIN_KEY` here as backend container configuration.
- Do not copy this value into `CONVEX_SELF_HOSTED_ADMIN_KEY` for CLI usage unless you have confirmed it is the generated self-hosted admin key for your instance.

### 3. Create `.env.local`

Create the local file with the frontend URL first:

```bash
cat > .env.local <<'EOF'
VITE_CONVEX_URL=http://localhost:3220
EOF
```

You will append the self-hosted CLI settings after the backend starts and after you generate the real admin key.

### 4. Start the Convex backend and dashboard

Run:

```bash
docker compose --env-file .env.dev up -d convex convex-dashboard
```

Check status:

```bash
docker compose --env-file .env.dev ps
```

Expected result:

- `convex` is running
- `convex-dashboard` is running

By default for local development in this project:

- backend API is available at `http://localhost:3220`
- backend dashboard/API port is mapped at `http://localhost:3221`
- dashboard UI is available at `http://localhost:6792`

## 5. Generate the real self-hosted admin key

After the backend is running, generate the admin key from the live Convex container.

Run:

```bash
docker compose --env-file .env.dev exec convex ./generate_admin_key.sh
```

Expected output format:

```text
convex-self-hosted|...
```

Copy that exact value.

Now append the self-hosted CLI settings to `.env.local`:

```bash
cat >> .env.local <<'EOF'
CONVEX_SELF_HOSTED_URL=http://localhost:3220
CONVEX_SELF_HOSTED_ADMIN_KEY=paste-the-generated-key-here
EOF
```

Important:

- Use the generated key exactly as printed.
- If you later recreate the backend state, generate the key again.
- If the backend uses a persistent Docker volume, the instance credentials can persist across restarts.

## 6. Deploy schema and functions

With `.env.local` configured, deploy the Convex schema and functions:

```bash
npm run deploy:selfhosted
```

Equivalent raw command:

```bash
convex deploy --url "$CONVEX_SELF_HOSTED_URL" --admin-key "$CONVEX_SELF_HOSTED_ADMIN_KEY"
```

If deployment succeeds, the self-hosted backend now has the current Convex schema and functions.

### Project-specific warning

This repository currently has a known self-hosted compatibility issue in `convex/schema.ts`: reserved index names such as `by_id` can cause deploy to fail on self-hosted Convex.

If you see an error like:

```text
IndexNameReserved: In table "agents" cannot name an index "by_id"
```

rename the reserved index names to something non-reserved such as `by_external_id`, then deploy again.

## 7. Seed or run commands against the backend

Once deploy succeeds, you can run Convex commands against the self-hosted instance.

For this project's seed function:

```bash
npx convex run seed:run '{}' \
  --url http://localhost:3220 \
  --admin-key "$CONVEX_SELF_HOSTED_ADMIN_KEY"
```

You can also use other CLI commands after configuration, for example:

```bash
npx convex --help
```

## 8. Run the frontend locally

Start the frontend development server:

```bash
npm run dev
```

Open the local Vite URL shown in the terminal, typically:

```text
http://localhost:5173
```

## 9. Optional Dockerized frontend

If you want to run the frontend through Docker Compose too:

```bash
docker compose --env-file .env.dev up -d --build
```

This project passes `VITE_CONVEX_URL` as a Docker build argument so the Vite app can be built with the correct public backend URL.

## Verification checklist

- `npm install` completes successfully
- `docker compose --env-file .env.dev up -d convex convex-dashboard` succeeds
- `docker compose --env-file .env.dev exec convex ./generate_admin_key.sh` returns a `convex-self-hosted|...` key
- `.env.local` contains `VITE_CONVEX_URL`, `CONVEX_SELF_HOSTED_URL`, and the generated `CONVEX_SELF_HOSTED_ADMIN_KEY`
- `npm run deploy:selfhosted` succeeds
- any seed or query command against the backend succeeds
- `npm run dev` starts the frontend successfully
- the frontend can load data from Convex

## Common mistakes

- using `.env.dev`'s `CONVEX_ADMIN_KEY` as the CLI admin key without generating the real self-hosted key from the container
- using a random string as `CONVEX_SELF_HOSTED_ADMIN_KEY`
- forgetting to deploy schema and functions before running seed commands
- using a `VITE_CONVEX_URL` that the browser cannot reach
- assuming changing `.env.dev` automatically updates credentials already persisted in a Docker volume
- overlooking self-hosted restrictions such as reserved index names during deploy

## Troubleshooting

### `401 Unauthorized: BadAdminKey`

Cause:

- the CLI is using the wrong admin key

Fix:

1. make sure the backend is running
2. run `docker compose --env-file .env.dev exec convex ./generate_admin_key.sh`
3. copy the printed `convex-self-hosted|...` value into `.env.local` as `CONVEX_SELF_HOSTED_ADMIN_KEY`
4. retry deploy or seed

### `Could not find function for 'seed:run'`

Cause:

- deploy has not succeeded yet, so the function is not available on the backend

Fix:

1. resolve the deploy error first
2. rerun `npm run deploy:selfhosted`
3. rerun the seed command

### `IndexNameReserved`

Cause:

- the schema defines a reserved index name such as `by_id`

Fix:

- rename the reserved index to a non-reserved name such as `by_external_id`
- redeploy

### Frontend fails because `VITE_CONVEX_URL` is missing

Cause:

- `.env.local` is missing or incomplete

Fix:

- recreate `.env.local`
- restart the frontend dev server

## Files in this project you can reuse as references

- `package.json`
- `docker-compose.yml`
- `Dockerfile`
- `env.dev.example`
- `env.prod.example`
- `src/providers/ConvexClientProvider.tsx`
- `prompter/changes/add-convex-backend/guide.md`
