# Design system

Visual and mobile layout decisions live in `src/styles/tokens.css` and `src/styles/global.css`. Tokens are the authoritative design foundation for application UI and future game-adjacent screens.

## Semantic token structure

`tokens.css` defines two layers:

1. **Raw palette** (`--palette-*`) — internal color ramps used only inside `tokens.css` to build semantic values. Component CSS must not reference palette tokens directly.
2. **Semantic tokens** — the public contract consumed by component and module styles.

| Category | Examples | Use for |
| --- | --- | --- |
| Background | `--color-bg-app`, `--color-bg-subtle` | Page and shell backgrounds |
| Surface | `--color-surface-primary`, `--color-surface-inset` | Cards, panels, inset regions |
| Text | `--color-text-primary`, `--color-text-secondary`, `--color-text-accent` | Copy hierarchy and emphasis |
| Accent / brand | `--color-accent-primary`, `--color-accent-muted` | Brand emphasis, glows, highlights |
| Border | `--color-border-default`, `--color-border-focus` | Dividers, outlines, focus rings |
| Status | `--color-status-success`, `--color-status-danger` | Runtime and feedback states |
| Typography | `--font-size-md`, `--font-weight-semibold`, `--letter-spacing-wide` | Text style |
| Spacing | `--space-xs` … `--space-3xl` | Padding, margin, gap |
| Radius | `--radius-sm`, `--radius-lg`, `--radius-full` | Corners |
| Shadow | `--shadow-md`, `--shadow-glow-accent`, `--shadow-inset` | Elevation and depth |
| Motion | `--duration-fast`, `--easing-standard` | Transitions |
| Layout / viewport | `--layout-min-height`, `--layout-content-max-width`, `--layout-padding-*` | Shell sizing and screen padding |
| Safe area | `--safe-area-inset-*`, `--layout-padding-*` | Notch, home indicator, edge insets |
| Z-index | `--z-base`, `--z-overlay` | Stacking |
| Breakpoints | `--breakpoint-sm` (480px), `--breakpoint-md` (768px), `--breakpoint-lg` (1024px) | Layout thresholds |

## Consuming tokens

- Component CSS modules consume semantic tokens only. Do not repeat hex values, spacing literals, or palette names when a token exists.
- Add a token when the same visual decision is about to be repeated, or when it represents a design-system primitive. Do not tokenise a one-off implementation detail.
- Prefer CSS modules colocated with the component. Keep `global.css` limited to reset and document-level rules.

## Shared UI primitives

Reusable, domain-neutral UI lives in `src/shared/ui/`. Each primitive owns its component and CSS module (for example `Button/Button.tsx`).

| Primitive | Approved variants |
| --- | --- |
| Button | `primary`, `secondary`, `ghost`, `danger` |
| Badge | `neutral`, `accent`, `success`, `warning`, `danger`, `info` |
| ProgressBar | `default`, `success`, `warning`, `danger` |
| Card | Composable shell (`Card`, `CardHeader`, `CardContent`) |
| Modal | Controlled open/close; optional actions slot |

**Primitive vs feature component:** Primitives expose generic layout, interaction, and visual semantics only. Feature screens compose primitives and add domain copy, data, and behavior. Do not recreate button, card, badge, progress, or modal styling inside features when a primitive already covers the need.

**API philosophy:** Small typed props, semantic variants only, native HTML semantics where applicable, no arbitrary color/style escape hatches, no global managers or registries.

Feature code imports from `@/shared/ui/<Primitive>/<Primitive>`. Do not pre-build additional primitives or barrel files unless reuse proves they are needed.

## Application shell and screen layout

**AppShell** (`src/app/AppShell.tsx`) owns application-level chrome only: optional `header` and `footer` slots plus a non-scrolling `main` region. It holds viewport height, shell background, and future fixed top/bottom chrome. It must not contain feature content, routes, or navigation definitions.

**ScreenLayout** (`src/shared/layout/ScreenLayout/ScreenLayout.tsx`) is the default reusable screen wrapper. Each screen composes one `ScreenLayout` inside `AppShell` `main`. It owns the single page-level scroll container, `--layout-padding-*` screen insets, content max-width, and optional screen `header` slot (title/supporting content composed by the screen).

**Scrolling:** `AppShell` does not scroll. `ScreenLayout` is the one vertical scroll surface per screen. Avoid nested page-level overflow on feature screens.

**Safe areas:** `env(safe-area-inset-*)` is mapped only in `tokens.css`. Screen content uses `--layout-padding-*`. Application chrome uses `--layout-chrome-padding-*` so future bottom navigation can sit above the home-indicator inset without duplicating raw environment values.

**Navigation:** Routing and bottom navigation are deferred. `AppShell` `footer` is the future home for bottom chrome; no tab items or route logic belong in the shell yet.

- `index.html` sets `viewport-fit=cover` for native WebView edge-to-edge behavior.
- `src/styles/global.css` owns document-level viewport rules: `100dvh` minimum height, horizontal overflow prevention, and overscroll containment.
- `src/app/AppShell.tsx` is the application root flex column. Optional `header`/`footer` slots host future fixed chrome; `main` holds screen content.
- `src/shared/layout/ScreenLayout/` is the default scrollable screen wrapper for product screens.
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

## Breakpoints

CSS custom properties cannot reliably be used inside `@media` queries. Documented breakpoint pixel values in `tokens.css` are the source of truth. If JavaScript later needs the same numbers, add a small module under `src/styles` and keep it aligned with those values.

## Phaser

The Phaser canvas is hosted in React chrome that uses tokens. Phaser itself does not read CSS variables. Gameplay rendering can adopt a token-aligned palette later through explicit game configuration, not by importing CSS into scenes.
