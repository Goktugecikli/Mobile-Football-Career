# 0001 — Career state persistence

Date: 2026-08-18

## Status

Accepted

## Context

Career identity and profile-creation drafts must survive browser refresh and Capacitor restarts. Route `location.state` is not a durable source of truth. The project previously deferred client-state libraries and persistence.

## Decision

- Use one focused Zustand store as the authoritative in-memory career state.
- Persist that state on-device with a versioned JSON envelope in `localStorage`.
- Keep domain types in `src/core/career.ts`.
- Allow only `src/shared/career/careerPersistence.ts` to call the storage API.
- Treat malformed or unsupported stored data as empty career state after logging a normalized `AppError`.
- Do not use cloud sync, SQLite, or a second store for this data.

## Consequences

Career screens read and write through the store, not through routing state or `localStorage`. Future storage migrations can branch on the envelope `version`. Cloud/backend sync remains unimplemented.
