# Design system

Visual and mobile layout decisions live in `src/styles/tokens.css` and `src/styles/global.css`. Tokens are a starter mechanism, not a finished game theme.

## Token groups

| Group | Examples | Use for |
| --- | --- | --- |
| Color | `--color-bg`, `--color-text`, `--color-accent` | Surfaces, copy, emphasis, danger, focus |
| Typography | `--font-family-sans`, `--font-size-md`, `--font-weight-semibold` | Text style |
| Spacing | `--space-1` … `--space-8` | Padding, margin, gap |
| Layout / viewport | `--layout-min-height`, `--layout-padding-*` | Full-height shell and screen padding |
| Safe area | `--safe-area-inset-*`, `--layout-padding-*` | Notch, home indicator, edge insets |
| Radii | `--radius-sm`, `--radius-md` | Corners |
| Shadows | `--shadow-sm`, `--shadow-md` | Elevation |
| Motion | `--duration-fast`, `--easing-standard` | Transitions |
| Z-index | `--z-base`, `--z-overlay` | Stacking |
| Breakpoints | `--breakpoint-sm` (480px), `--breakpoint-md` (768px), `--breakpoint-lg` (1024px) | Layout thresholds |

## Mobile viewport ownership

- `index.html` sets `viewport-fit=cover` for native WebView edge-to-edge behavior.
- `src/styles/global.css` owns document-level viewport rules: `100dvh` minimum height, horizontal overflow prevention, and overscroll containment.
- `src/app/AppShell.tsx` is the application root flex column for future headers, scroll regions, and footers.
- Screen content uses `--layout-padding-*` tokens rather than ad-hoc viewport math.

Do not scatter viewport calculations across components or JavaScript.

## Safe-area ownership

Platform `env(safe-area-inset-*)` values are mapped once in `src/styles/tokens.css` to semantic tokens:

- `--safe-area-inset-top`, `-right`, `-bottom`, `-left`
- `--layout-padding-top`, `-right`, `-bottom`, `-left` combine base spacing with safe-area insets

Components consume `--layout-padding-*` or `--safe-area-inset-*`. Do not repeat `env(safe-area-inset-*)` in component CSS.

No Capacitor safe-area plugin is used; CSS environment variables are sufficient at this stage.

## Orientation policy ownership

Authoritative location: `src/config/orientationPolicy.ts`.

No product orientation lock is defined yet. Native platform defaults from Capacitor generation remain until a task explicitly sets a lock in that file and the corresponding native configuration.

Web layouts must work in portrait and landscape. Do not scatter orientation assumptions across React, CSS, Phaser, or native files.

## Phaser resize ownership

- Game resolution and aspect ratio come from `appConfig.game` only.
- React sets `--game-aspect-ratio` on the host viewport from that config.
- Phaser `Scale.FIT` and parent `ResizeObserver` refresh live inside `src/game/createPhaserGameSession.ts`. React must not access Phaser scale or scene internals.

## Usage rules

- Components consume semantic tokens, not ad-hoc hex values or spacing literals, when a token already exists.
- Add a token when the same visual decision is about to be repeated, or when it represents a design-system primitive. Do not tokenise a one-off implementation detail.
- Prefer CSS modules colocated with the component. Keep `global.css` limited to reset and document-level rules.
- Shared React components are created only when they are actually shared or are a deliberate primitive. Do not pre-build a component library.

## Breakpoints

CSS custom properties cannot reliably be used inside `@media` queries. Documented breakpoint pixel values in `tokens.css` are the source of truth. If JavaScript later needs the same numbers, add a small module under `src/styles` and keep it aligned with those values.

## Phaser

The Phaser canvas is hosted in React chrome that uses tokens. Phaser itself does not read CSS variables. Gameplay rendering can adopt a token-aligned palette later through explicit game configuration, not by importing CSS into scenes.
