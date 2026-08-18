# Project structure

## Current tree

Only directories that currently contain project code are present.

```text
nss-v2/
├── .cursor/rules/           Cursor agent rules
├── .github/workflows/       GitHub Actions (CI)
├── .gitattributes           Repository line-ending policy (LF)
├── .nvmrc                   Authoritative Node.js version
├── android/                 Capacitor Android platform (committed native source)
├── ios/                     Capacitor iOS platform (committed native source; build requires macOS/Xcode)
├── capacitor.config.ts      Capacitor native-shell configuration
├── docs/                    Human-readable architecture docs
│   └── DECISIONS/           ADR-style records (process only, for now)
├── public/                  Static assets served as-is
├── src/
│   ├── app/                 React composition root
│   ├── config/              Validated application configuration
│   ├── core/                Framework-independent contracts
│   ├── features/            Product screen ownership
│   ├── game/                Phaser host implementation
│   ├── shared/
│   │   ├── layout/          Reusable screen layout (ScreenLayout)
│   │   └── ui/              Reusable UI primitives (Button, Card, Badge, etc.)
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

Copied web assets under `android/app/src/main/assets/public` and `ios/App/App/public` are produced by Capacitor sync and are gitignored.

## Source files today

| Path | Role |
| --- | --- |
| `src/main.tsx` | Mounts React against `#root` |
| `src/app/App.tsx` | Composition: error boundary + router + app shell |
| `src/app/routing/AppRouter.tsx` | Product route mapping for approved screens |
| `src/app/routing/appPaths.ts` | Authoritative technical route paths for approved screens |
| `src/app/AppShell.tsx` | Application shell with optional header/footer chrome slots |
| `src/shared/layout/ScreenLayout/ScreenLayout.tsx` | Default scrollable screen layout wrapper |
| `src/app/AppErrorBoundary.tsx` | Render-error boundary |
| `src/app/BootstrapScreen.tsx` | Minimal proof that React and tokens work |
| `src/app/GameHost.tsx` | DOM parent + `GameSession` lifecycle |
| `src/config/appConfig.ts` | Typed config factory and `appConfig` export |
| `src/config/orientationPolicy.ts` | Orientation policy location (unset until product decision) |
| `src/core/errors.ts` | `AppError`, codes, categories, `normalizeError` |
| `src/core/gameSession.ts` | Game host contract and event type |
| `src/game/createPhaserGameSession.ts` | Phaser implementation of `GameSession` |
| `src/game/HostScene.ts` | Empty host scene used to boot Phaser |
| `src/styles/tokens.css` | Authoritative design tokens |
| `src/styles/global.css` | Document reset and token application |
| `src/shared/ui/*` | Domain-neutral UI primitives |
| `src/app/BootstrapUiShowcase.tsx` | Temporary bootstrap preview of UI primitives |
| `src/features/entry/*` | Product-owned `ENTRY` screen |
| `src/features/careerSelect/*` | Product-owned `CAREER_SELECT` screen and slot UI |

## Intended later locations

Do not create these until they have real code.

```text
src/features/<feature-name>/     Feature UI, hooks, and feature-local logic
src/shared/layout/               Reusable screen layout (ScreenLayout)
src/shared/ui/                   Reusable UI primitives (Button, Card, Badge, etc.)
src/shared/native/               Capacitor adapters for core native contracts (when needed)
src/shared/hooks/                Shared React hooks
src/game/scenes/                 Additional Phaser scenes
src/game/systems/                Phaser gameplay systems
src/core/<concept>/              New framework-independent contracts
```

Import with the `@/` alias (`@/config/appConfig`), which maps to `src/`.
