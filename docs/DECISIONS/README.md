# Architecture decision records

Record architectural choices that have meaningful long-term impact. Day-to-day implementation detail does not belong here.

Typical subjects: a new layer or boundary, a communication pattern, a persistence approach, a native-shell decision, or replacing an established convention. Do not write a record to justify a local refactor.

## File name

`NNNN-short-title.md`, using a monotonic four-digit number (`0001`, `0002`, …).

## Template

```markdown
# NNNN — Title

Date: YYYY-MM-DD

## Status

Accepted | Superseded by NNNN | Deprecated

## Context

What problem or constraint forced a choice?

## Decision

What did we decide?

## Consequences

What becomes easier, harder, or off-limits after this?
```

Keep records short. Link them from a pull request or task notes when the change lands. Bootstrap layering is described in `docs/ARCHITECTURE.md`; start numbered records when a later change amends or extends that baseline.
