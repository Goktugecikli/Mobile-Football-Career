# Architecture

This repository is the engineering foundation for a mobile-first football career game. The current source tree is intentionally small. Layers exist so later features have a clear home; they are not a request to pre-build those features.

## Layers

- **app** — Composition root. Mounts React, the error boundary, bootstrap UI, and the Phaser host. This is the only React layer that should construct a `GameSession`.
- **config** — One validated configuration object. The rest of the application reads `appConfig`. Only this layer reads environment variables.
- **core** — Framework-independent contracts. Today that is the error model and the game-session contract. Core must not import React, Phaser, or CSS.
- **features** — Product capabilities (career, club, matches, and so on). Created when a feature is implemented, not before.
- **game** — Phaser runtime. Owns `Phaser.Game`, scenes, and translation of Phaser callbacks into typed game events.
- **shared** — Application implementations reused by more than one feature. Created when reuse is real.
- **styles** — Design tokens and global document styles.

`app` may compose every layer. `core` depends on none of the other source layers. See `.cursor/rules/10-architecture.mdc` for the full dependency rule.

## Error handling

Unexpected failures are normalized to `AppError` (`src/core/errors.ts`) so raw `unknown` values do not leak into UI. The React error boundary catches render failures and stores an `AppError`. Phaser host construction failures stay inside the game session: they are logged as `AppError` and reported to React as a typed `GameEvent` (`failed`), not by throwing across the React/Phaser boundary. There is no logging framework yet; unexpected failures are still reported via `console.error` so they are not swallowed.

## Configuration

`appConfig` is the single access path. It is created once at startup, is read-only, and is not global mutable state. Environment-specific, native, and gameplay configuration can be added to this object later without scattering `import.meta.env` reads.

## Phaser communication

```
Application → GameSession contract → Phaser runtime
Phaser runtime → typed GameEvent → GameSession listener → Application
```

React must not hold Scene references or poke Phaser internals. Phaser must not import React or write React state. The current event surface is `{ type: 'ready' }` and `{ type: 'failed'; code }`. Additional event types should be added when a real consumer exists.

## OOP and React

React UI stays functional. Classes are used for `AppError`, the React error boundary (required by React), Phaser scenes, and the Phaser session wrapper. That is ownership of lifetime and identity, not an application-wide object model.

## What this foundation does not decide

Routing, client state libraries, persistence, native shells, and feature modules are deferred. When a choice has lasting structural impact, record it under `docs/DECISIONS`.
