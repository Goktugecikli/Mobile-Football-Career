# Development guide

## Prerequisites

- Node.js 20 or later
- npm (comes with Node.js)

Capacitor native projects are not part of this foundation. Develop in the browser with Vite.

## Commands

```bash
npm install
npm run dev        # Vite development server
npm run build      # Typecheck (tsc -b) then production bundle
npm run lint       # ESLint
npm run typecheck  # TypeScript project build, no bundle
```

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
