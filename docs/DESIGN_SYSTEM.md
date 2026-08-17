# Design system

Visual decisions live in `src/styles/tokens.css`. That file is the single authoritative place for colors, typography, spacing, radii, shadows, motion, z-index, and breakpoints.

The current tokens are a starter mechanism, not a finished game theme. Do not invent a full product look during foundation work.

## Token groups

| Group | Examples | Use for |
| --- | --- | --- |
| Color | `--color-bg`, `--color-text`, `--color-accent` | Surfaces, copy, emphasis, danger, focus |
| Typography | `--font-family-sans`, `--font-size-md`, `--font-weight-semibold` | Text style |
| Spacing | `--space-1` … `--space-8` | Padding, margin, gap |
| Radii | `--radius-sm`, `--radius-md` | Corners |
| Shadows | `--shadow-sm`, `--shadow-md` | Elevation |
| Motion | `--duration-fast`, `--easing-standard` | Transitions |
| Z-index | `--z-base`, `--z-overlay` | Stacking |
| Breakpoints | `--breakpoint-sm` (480px), `--breakpoint-md` (768px), `--breakpoint-lg` (1024px) | Layout thresholds |

## Usage rules

- Components consume semantic tokens, not ad-hoc hex values or spacing literals, when a token already exists.
- Add a token when the same visual decision is about to be repeated, or when it represents a design-system primitive. Do not tokenise a one-off implementation detail.
- Prefer CSS modules colocated with the component. Keep `global.css` limited to reset and document-level rules.
- Shared React components are created only when they are actually shared or are a deliberate primitive. Do not pre-build a component library.

## Breakpoints

CSS custom properties cannot reliably be used inside `@media` queries. Documented breakpoint pixel values in `tokens.css` are the source of truth. If JavaScript later needs the same numbers, add a small module under `src/styles` and keep it aligned with those values.

## Phaser

The Phaser canvas is hosted in React chrome that uses tokens. Phaser itself does not read CSS variables. Gameplay rendering can adopt a token-aligned palette later through explicit game configuration, not by importing CSS into scenes.
