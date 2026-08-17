# Development guide

## Prerequisites

Use the Node.js version in `.nvmrc`. That file is the single source of truth for local version managers and GitHub Actions. npm ships with Node.js.

Capacitor native projects are not initialized yet. Develop in the browser with Vite.

When Capacitor is added, use this identity:

- Display name: `Mobile Football Career`
- Application ID: `com.goktugecikli.mobilefootballcareer`

## Commands

```bash
npm ci             # install from package-lock.json (same as CI)
npm run dev        # Vite development server
npm run typecheck  # TypeScript project build, no bundle
npm run lint       # ESLint
npm run build      # Typecheck (tsc -b) then production bundle
```

`npm install` is for when the lockfile itself should change.

## Environment variables

Only `src/config` may read `import.meta.env`. Application, feature, and game code use `appConfig`.

Vite exposes only `VITE_`-prefixed variables to client code. Do not put secrets in those variables; they are bundled into the browser.

Supported variables are listed in `.env.example`. All are optional; `appConfig` supplies defaults when they are unset. Copy `.env.example` to a gitignored `.env` only when you need to override a default. Do not commit `.env` files.

## Git workflow

`main` is the latest validated integrated state. Work on short-lived branches and merge through pull requests so CI runs before integration. This is enough for one developer now and two later.

Branch names:

- `feature/<scope>` — new capability
- `fix/<scope>` — defect
- `chore/<scope>` — tooling, docs, or maintenance

Examples: `feature/game-host`, `fix/error-boundary`, `chore/ci`.

1. Branch from current `main`.
2. Keep the change scoped. Validate locally with `typecheck`, `lint`, and `build`.
3. Open a pull request targeting `main`.
4. Wait for the `CI` GitHub Actions job.
5. Merge when the change is reviewed and CI is green.

Do not add GitFlow, a `develop` branch, or release branches unless a later decision requires them.

## Where to put new code

1. Read `docs/ARCHITECTURE.md` and `docs/PROJECT_STRUCTURE.md`.
2. Search the existing tree before adding a file.
3. Put React composition in `src/app`, contracts in `src/core`, Phaser in `src/game`, and configuration in `src/config`.
4. Create `src/features/<name>` only when building that feature.
5. Create `src/shared` only when a second consumer exists or a design-system primitive is being introduced on purpose.

## Working on a task

- Stay inside the requested scope. Do not start the next numbered task, and do not refactor unrelated code.
- Do not add routing, state libraries, test runners, or UI kits unless the task requires them.
- After source or tooling changes, run `typecheck`, `lint`, and `build` as needed and fix failures you introduced.
- If a change alters layering, communication, or another long-lived rule, add a decision record under `docs/DECISIONS`.

## Second-developer onboarding

Start with this file, then `docs/ARCHITECTURE.md`, then the Cursor rules in `.cursor/rules/`. The bootstrap screen is only a runtime smoke check: React, tokens, the error boundary, and the Phaser host. It is not product UI.
