# Project structure

## Current tree

Only directories that contain bootstrap code are present.

```text
nss-v2/
├── .cursor/rules/           Cursor agent rules
├── docs/                    Human-readable architecture docs
│   └── DECISIONS/           ADR-style records (process only, for now)
├── public/                  Static assets served as-is
├── src/
│   ├── app/                 React composition root
│   ├── config/              Validated application configuration
│   ├── core/                Framework-independent contracts
│   ├── game/                Phaser host implementation
│   ├── styles/              Design tokens and global CSS
│   ├── main.tsx             Module entry
│   └── vite-env.d.ts        Vite environment typings
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── eslint.config.js
```

## Source files today

| Path | Role |
| --- | --- |
| `src/main.tsx` | Mounts React against `#root` |
| `src/app/App.tsx` | Composition: error boundary + bootstrap screen |
| `src/app/AppErrorBoundary.tsx` | Render-error boundary |
| `src/app/BootstrapScreen.tsx` | Minimal proof that React and tokens work |
| `src/app/GameHost.tsx` | DOM parent + `GameSession` lifecycle |
| `src/config/appConfig.ts` | Typed config factory and `appConfig` export |
| `src/core/errors.ts` | `AppError`, codes, categories, `normalizeError` |
| `src/core/gameSession.ts` | Game host contract and event type |
| `src/game/createPhaserGameSession.ts` | Phaser implementation of `GameSession` |
| `src/game/HostScene.ts` | Empty host scene used to boot Phaser |
| `src/styles/tokens.css` | Authoritative design tokens |
| `src/styles/global.css` | Document reset and token application |

## Intended later locations

Do not create these until they have real code.

```text
src/features/<feature-name>/     Feature UI, hooks, and feature-local logic
src/shared/components/           Design-system or otherwise shared components
src/shared/hooks/                Shared React hooks
src/game/scenes/                 Additional Phaser scenes
src/game/systems/                Phaser gameplay systems
src/core/<concept>/              New framework-independent contracts
```

Import with the `@/` alias (`@/config/appConfig`), which maps to `src/`.
