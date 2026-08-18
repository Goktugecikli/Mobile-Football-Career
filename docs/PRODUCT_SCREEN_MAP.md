# Product Screen Map

## Purpose
`docs/PRODUCT_SCREEN_MAP.md` is the authoritative product definition for approved product screens and product navigation in this repository.

This document is intentionally incomplete. It records only screens, visible elements, navigation relationships, and responsibilities that are explicitly approved right now. Missing product decisions must remain open until later product requirements define them.

## Authority And Scope
### APPROVED
- This document owns approved product screens.
- This document owns approved product navigation between product screens.
- Future route implementation must map Screen IDs from this document to technical route paths.
- Technical routing belongs in `src/app/routing`.
- Route configuration must not become a second source of product-screen definitions.

### OPEN / NOT YET DEFINED
- Final route paths for product screens.
- Product screens beyond the scope of this document.
- Detailed interaction rules, validation, data models, and gameplay systems unless explicitly listed below.

## Product Vs Technical Screens
### APPROVED
- `BootstrapScreen` is temporary engineering/development UI.
- `BootstrapScreen` is not part of the approved product screen map.
- `BootstrapScreen` will eventually be replaced or removed when real product screens are implemented.
- `NotFoundScreen`, when present, is technical application infrastructure and not a product screen.

### OPEN / NOT YET DEFINED
- The future implementation timing for removing or replacing temporary engineering screens.

## Approved Primary Product Flow
```text
ENTRY
  -> CAREER_SELECT
  -> PROFILE_CREATE
  -> INITIAL_TRAINING
  -> TEAM_ASSIGNMENT
  -> GAME_HOME
  -> MATCH_ENTRY
  -> MATCH_PREPARATION
  -> MATCH_GAMEPLAY (future placeholder only)
```

`MATCH_GAMEPLAY` is a future destination placeholder only. Its gameplay, UI, and detailed behavior are not yet specified.

## Screen Inventory
| Screen ID | Product Name | Type | Previous Screen | Primary Next Screen | Current Implementation Status |
| --- | --- | --- | --- | --- | --- |
| `ENTRY` | Entry | Full Screen | None | `CAREER_SELECT` | Specified, Not Implemented |
| `CAREER_SELECT` | Career Select | Full Screen | `ENTRY` | `PROFILE_CREATE` for empty slot; existing career flow eventually returns to `GAME_HOME` | Specified, Not Implemented |
| `PROFILE_CREATE` | Profile Create | Full Screen | `CAREER_SELECT` | `INITIAL_TRAINING` | Specified, Not Implemented |
| `INITIAL_TRAINING` | Initial Training | Full Screen | `PROFILE_CREATE` | `TEAM_ASSIGNMENT` | Specified, Not Implemented |
| `TEAM_ASSIGNMENT` | Team Assignment | Full Screen | `INITIAL_TRAINING` | `GAME_HOME` | Specified, Not Implemented |
| `GAME_HOME` | Game Home | Full Screen | `TEAM_ASSIGNMENT` or existing career resume flow | `MATCH_ENTRY` | Specified, Not Implemented |
| `MATCH_ENTRY` | Match Entry | Full Screen | `GAME_HOME` | `MATCH_PREPARATION` | Specified, Not Implemented |
| `MATCH_PREPARATION` | Match Preparation | Full Screen | `MATCH_ENTRY` | `MATCH_GAMEPLAY` | Specified, Not Implemented |
| `MATCH_GAMEPLAY` | Match Gameplay | Gameplay | `MATCH_PREPARATION` | Not yet defined | Specified as future placeholder, Not Implemented |

## Screen Definitions
### `ENTRY`
**Purpose**

First screen shown when the game starts.

**APPROVED**
- Game logo
- Game name
- Football-related background
- Opening animation concept
- Football-related animation direction
- Example concept: ball or shot animation
- `Oyna` button
- `Eğitim` button
- `Ayarlar` button
- `Oyna` starts the career-selection flow

**Navigation**
- Previous: none
- Primary next: `CAREER_SELECT` via `Oyna`

**OPEN / NOT YET DEFINED**
- Exact opening animation
- Final logo
- Final background artwork
- Exact behavior or content of `Eğitim`
- Exact behavior or content of `Ayarlar`

### `CAREER_SELECT`
**Purpose**

Choose, create, or remove a career save.

**APPROVED**
- Exactly 3 career slots
- Empty slot can create a new career
- Existing career can be deleted
- Filled career slot shows player name
- Filled career slot shows team name

**Navigation**
- Previous: `ENTRY`
- Primary next: `PROFILE_CREATE` from an empty slot
- Additional approved relationship: a filled career slot eventually resumes the existing career flow toward `GAME_HOME`

**OPEN / NOT YET DEFINED**
- Delete confirmation UX
- Additional career-slot metadata
- Save preview styling

### `PROFILE_CREATE`
**Purpose**

Create the player's initial identity/profile.

**APPROVED**
- Back button at the top
- `Ayak`
- `Ad`
- `Soyad`
- `Cinsiyet`
- `Mevki`
- `Lig`
- `Uyruk`
- All listed fields must be selectable or editable through this screen

**Navigation**
- Previous: `CAREER_SELECT`
- Primary next: `INITIAL_TRAINING`

**OPEN / NOT YET DEFINED**
- Exact control type for each field
- Available values
- Validation rules
- Position list
- League list
- Nationality list
- Gender options
- Foot options

### `INITIAL_TRAINING`
**Purpose**

Determine the player's initial ability or skill level after profile creation.

**APPROVED**
- Occurs after `PROFILE_CREATE`
- Affects or determines the player's initial abilities
- Includes a difficulty and/or scoring concept
- After training evaluation, the game assigns a team
- After training evaluation, the game determines and shows salary

**Navigation**
- Previous: `PROFILE_CREATE`
- Primary next: `TEAM_ASSIGNMENT`

**OPEN / NOT YET DEFINED**
- Skill list
- Training minigames
- Number of exercises
- Difficulty system
- Scoring formula
- How training score maps to abilities
- How training affects team assignment
- How training affects salary

### `TEAM_ASSIGNMENT`
**Purpose**

Show the result of the player's initial evaluation.

**APPROVED**
- Assigns or shows the player's team
- Shows salary information

**Navigation**
- Previous: `INITIAL_TRAINING`
- Primary next: `GAME_HOME`

**OPEN / NOT YET DEFINED**
- Team assignment algorithm
- Salary algorithm
- Whether the user can reject or change the assigned team
- Presentation layout
- Additional contract information

### `GAME_HOME`
**Purpose**

Main in-career game hub.

**APPROVED**
- Back button at the top
- Player information box
- Player information box shows player name
- Player information box shows position
- Player information box shows gender
- `?` button for education, help, or wizard behavior
- Status boxes below the player information
- Energy is explicitly one of the player resources or statuses
- Team box
- First team
- National team
- `Dükkan` button
- Football boots or krampon purchasing
- Remaining match-use count for the equipped boot is visible
- Energy-giving consumable or items area
- Show how many of each owned energy item the player currently has
- Large `Oyna` button at the bottom
- `Oyna` leads to `MATCH_ENTRY`

**Navigation**
- Previous: `TEAM_ASSIGNMENT` or existing career resume flow
- Primary next: `MATCH_ENTRY`

**OPEN / NOT YET DEFINED**
- Exact additional status or resource boxes besides energy
- National-team availability rules
- Shop structure
- Boot stats, types, or prices
- Remaining-use system details
- Energy item list
- Inventory rules
- Help wizard content
- Whether Back exits the career or goes elsewhere

### `MATCH_ENTRY`
**Purpose**

First screen shown after pressing `Oyna` from `GAME_HOME`.

**APPROVED**
- Fixture display
- All teams visible in fixture or competition context
- Player's own team selected or highlighted by default
- Back button
- Match kit or form selection button/control
- `Devam` button
- `Devam` leads to `MATCH_PREPARATION`

**Navigation**
- Previous: `GAME_HOME`
- Primary next: `MATCH_PREPARATION`

**OPEN / NOT YET DEFINED**
- Fixture presentation
- Competition format
- Kit-selection UX
- Home or away kit rules
- Whether other teams are selectable or informational only

### `MATCH_PREPARATION`
**Purpose**

Final match-information and preparation screen before actual gameplay.

**APPROVED**
- Two teams playing the match
- Team logos or visual identifiers in the center area
- Ball visual
- Ability or control to change or select the ball
- Player energy level
- Energy-giving items
- Large `Başla` button
- `Başla` leads to future `MATCH_GAMEPLAY`

**Navigation**
- Previous: `MATCH_ENTRY`
- Primary next: `MATCH_GAMEPLAY`

**OPEN / NOT YET DEFINED**
- Ball selection rules
- Ball ownership or unlock system
- Energy-item usage behavior
- Team visual composition
- Match tactical information
- Gameplay loading transition

### `MATCH_GAMEPLAY`
**Purpose**

Future gameplay destination after match preparation.

**APPROVED**
- Exists only as a future placeholder destination from `MATCH_PREPARATION`

**Navigation**
- Previous: `MATCH_PREPARATION`
- Primary next: not yet defined

**OPEN / NOT YET DEFINED**
- Gameplay UI
- Match systems
- Controls
- Match objectives
- Match outcome presentation
- Post-match flow

## Future Route Mapping
### APPROVED
- Screen IDs in this document are stable technical identifiers for product-screen definitions.
- Final URL path decisions are deferred.
- Future route implementation must map approved Screen IDs to technical route paths in `src/app/routing`.
- Routing must consume this document's approved screen list rather than redefining screens independently.

### OPEN / NOT YET DEFINED
- Final route path strings
- Nested-routing structure, if any
- Route guards or resume-entry behavior for existing careers

## Relationship To UI Architecture
### APPROVED
- Shared UI primitives remain generic.
- Product-specific components belong to their future feature or screen ownership.
- Do not create a generic shared component merely because two product screens look visually similar.
- Reuse shared primitives for visual foundations.
- Extract product components only when real repeated product behavior exists.

### OPEN / NOT YET DEFINED
- The exact feature-folder breakdown that will own later product-screen implementations.

## Future State Requirements
These are product-state areas implied by approved screens and flows. They are recorded here for future implementation planning only.

### APPROVED
- Career save-slot state is required for `CAREER_SELECT`.
- Player profile state is required for `PROFILE_CREATE`.
- Initial training result state is required for `INITIAL_TRAINING`.
- Team assignment and salary state are required for `TEAM_ASSIGNMENT`.
- In-career hub state is required for `GAME_HOME`.
- Fixture-selection and kit-selection state are required for `MATCH_ENTRY`.
- Match-preparation state is required for `MATCH_PREPARATION`.

### OPEN / NOT YET DEFINED
- Data model shapes
- Persistence strategy
- Route-driven versus session-driven ownership
- Validation timing and error handling behavior for product flows

## Open Product Decisions
### Entry / onboarding
- Exact opening animation
- Final logo
- Final background artwork
- Exact behavior or content of `Eğitim`
- Exact behavior or content of `Ayarlar`

### Career saves
- Delete confirmation UX
- Additional career-slot metadata
- Save preview styling
- Existing-career resume details before `GAME_HOME`

### Player creation
- Exact control type for each field
- Available values
- Validation rules
- Position list
- League list
- Nationality list
- Gender options
- Foot options

### Training
- Skill list
- Training minigames
- Number of exercises
- Difficulty system
- Scoring formula
- How training score maps to abilities

### Team assignment / salary
- Team assignment algorithm
- Salary algorithm
- How training affects team assignment
- How training affects salary
- Whether the user can reject or change the assigned team
- Additional contract information
- Presentation layout

### Main career hub
- Exact additional status or resource boxes besides energy
- National-team availability rules
- Help wizard content
- Whether Back exits the career or goes elsewhere

### Shop / equipment
- Shop structure
- Boot stats, types, or prices
- Remaining-use system details

### Energy / inventory
- Energy item list
- Inventory rules
- Energy-item usage behavior during match preparation

### Fixture / match entry
- Fixture presentation
- Competition format
- Kit-selection UX
- Home or away kit rules
- Whether other teams are selectable or informational only

### Match preparation
- Ball selection rules
- Ball ownership or unlock system
- Team visual composition
- Match tactical information
- Gameplay loading transition

### Gameplay
- Gameplay UI
- Match systems
- Controls
- Match objectives
- Match outcome presentation
- Post-match flow
