# Architecture

This repository is the engineering foundation for Mobile Football Career. The current source tree is intentionally small. Layers exist so later features have a clear home; they are not a request to pre-build those features.

## Layers

- **app** — Composition root. Mounts React, the error boundary, bootstrap UI, and the Phaser host. This is the only React layer that should construct a `GameSession`.
- **config** — One validated configuration object. The rest of the application reads `appConfig`. Only this layer reads environment variables.
- **core** — Framework-independent contracts. Today that is the error model, career-state contracts, and the game-session contract. Core must not import React, Phaser, or CSS.
- **features** — Product capabilities (career, club, matches, and so on). Created when a feature is implemented, not before.
- **game** — Phaser runtime. Owns `Phaser.Game`, scenes, and translation of Phaser callbacks into typed game events.
- **shared** — Application implementations reused by more than one feature. Created when reuse is real.
- **styles** — Design tokens and global document styles.

`app` may compose every layer. `core` depends on none of the other source layers. See `.cursor/rules/10-architecture.mdc` for the full dependency rule.

## Error handling

Unexpected failures are normalized to `AppError` (`src/core/errors.ts`) so raw `unknown` values do not leak into UI. `reportError` is the shared reporting helper: it normalizes and writes `console.error`. Persistence uses `reportError` and does not call `console.error` directly. The React error boundary catches render failures and stores an `AppError`. Phaser host construction failures stay inside the game session: they are logged as `AppError` and reported to React as a typed `GameEvent` (`failed`), not by throwing across the React/Phaser boundary. There is no logging library.

## Configuration

`appConfig` is the single access path. It is created once at startup, is read-only, and is not global mutable state. Environment-specific, native, and gameplay configuration can be added to this object later without scattering `import.meta.env` reads. Vite environment variable conventions are documented in `docs/DEVELOPMENT_GUIDE.md`.

## Phaser communication

```
Application → GameSession contract → Phaser runtime
Phaser runtime → typed GameEvent → GameSession listener → Application
```

React must not hold Scene references or poke Phaser internals. Phaser must not import React or write React state. The current event surface is `{ type: 'ready' }` and `{ type: 'failed'; code }`. Additional event types should be added when a real consumer exists.

## OOP and React

React UI stays functional. Classes are used for `AppError`, the React error boundary (required by React), Phaser scenes, and the Phaser session wrapper. That is ownership of lifetime and identity, not an application-wide object model.

## Career state

Career identity is held in one focused Zustand store (`src/shared/career/careerStore.ts`). That store is the authoritative source for the three career slots and the active slot. React Router may carry navigation hints, but it is not career identity.

Persistence is local-device only: a versioned JSON envelope in `localStorage`, read and written exclusively by `src/shared/career/careerPersistence.ts`. Malformed or unsupported stored data falls back to empty career state after a normalized `AppError` is logged. Cloud/backend sync is not implemented. See `docs/DECISIONS/0001-career-state-persistence.md`.

Capacitor is configured at the repository root. Android and iOS platforms are initialized in `android/` and `ios/` and are committed. Native capability adapters belong behind application-owned contracts when a feature needs them; see the native boundary below.

## Native boundary

Capacitor is the native shell, not an application dependency surface.

```
Application / feature / game code → native capability contract (core, when needed) → Capacitor adapter (shared/native) → Capacitor API
```

Framework-independent capability contracts belong in `src/core` when a real capability is required. Capacitor implementations belong in `src/shared/native` (create when the first adapter exists). `src/app` or an owning feature composes the adapter; UI, features, and game depend only on the contract.

React, feature, and game code must not import `@capacitor/*` directly. Only dedicated adapter code may call Capacitor APIs, and only after a core contract exists for that capability. Do not add adapters or plugin packages until a task requires them.

Native identity lives in `capacitor.config.ts`:

- Application ID: `com.goktugecikli.mobilefootballcareer`
- Display name: `Mobile Football Career`
- Web assets: Vite `dist` output

Web-to-native copy uses `npm run build` then `npx cap sync android` or `npx cap sync ios`. Native workflow is documented in `docs/DEVELOPMENT_GUIDE.md`. iOS build verification requires macOS and Xcode.

Mobile viewport, safe-area, and orientation ownership are documented in `docs/DESIGN_SYSTEM.md`. Phaser resize handling stays inside the game session implementation.
