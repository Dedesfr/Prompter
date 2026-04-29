<!--
LARAVEL OVERLAY — append verbatim to AGENTS.md when the project is Laravel.
Detection: `composer.json` includes `laravel/framework`, OR `artisan` exists at repo root.
Place this block AFTER `## Behavioral guidelines` and BEFORE end of file.
-->

## Laravel safety rules (mandatory)

These rules are non-negotiable and override speed/convenience. They exist because destructive DB commands have repeatedly destroyed local and shared data on this project.

### Confirmation required before any destructive command

Always ask for explicit yes/no confirmation before running any of:

- **Schema drops:** `Schema::drop`, `Schema::dropIfExists`, raw `DROP TABLE`, `DROP DATABASE`, `php artisan db:wipe`.
- **Bulk data deletion:** `Model::truncate()`, `DB::table(...)->truncate()`, `DB::table(...)->delete()` without a `where`, `Model::query()->delete()`, `forceDelete` on collections, mass cleanup jobs/commands.
- **Fresh rebuild:** `php artisan migrate:fresh`, `php artisan migrate:fresh --seed`, `php artisan migrate:refresh`, `php artisan schema:dump --prune`. (User may call this "migrateg --fresh" — same thing.)
- **Production-targeted destructive ops:** anything above with `--force`, or `--env=production`, or against a non-local `DB_CONNECTION`.
- **Seeders that truncate:** any `DatabaseSeeder` or seeder containing `truncate()` / `delete()` calls.
- **Tinker:** destructive operations via `php artisan tinker` (treat the same as direct execution).

### Required confirmation format

Before running, state:

1. **Command:** the exact invocation (with all flags, env, and target connection).
2. **Why destructive:** what it deletes/drops.
3. **Scope:** which DB connection, which env (`APP_ENV`, `DB_CONNECTION`, `DB_DATABASE`), how many rows/tables affected if knowable.
4. **Safer alternative:** name one (e.g. `php artisan migrate` instead of `migrate:fresh`; a targeted `where()->delete()` instead of `truncate()`).

Then ask: *"Run this? (yes/no)"* — wait for an explicit yes. Implicit consent does not count.

### Default safe behavior

- No confirmation → do not run. Do not retry with a different flag.
- Prefer non-destructive first: `migrate` over `migrate:fresh`; new migration over editing a merged one; targeted update over truncate-and-reseed.
- If approved, run **only** the confirmed scope. Do not chain extra commands ("while I'm here, also...").
- After running, report: command run, rows/tables affected, current migration status.

### Hard rules (never, even with confirmation, unless user explicitly names the command)

- Never run any destructive command against a connection that isn't `sqlite` in-memory or a database whose name contains `local`, `dev`, or `test` — without the user typing the actual command themselves.
- Never use `--force` in any environment without an explicit user instruction containing `--force`.
- Never `DROP DATABASE` or `db:wipe` without the user typing it.
