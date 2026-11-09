---
title: "Interactive Birthday Landing Page"
description: "Build an interactive 3-stage birthday landing page with cake background, cat progress bar, clickable envelope that triggers birthday music, center photo + letter card, and 4 corner mini Polaroid photos."
status: completed
priority: P1
effort: "3h"
tags: [frontend, animation, ui, audio]
blockedBy: []
blocks: []
created: 2026-11-09
---

# Interactive Birthday Landing Page

## Overview

Build a responsive, animated React + TypeScript birthday landing page featuring an illustrated glowing birthday cake background, a 3-stage interactive experience (`loading` -> `envelope` -> `opened`), a walking cat atop a 0%–100% progress bar, an interactive envelope that unlocks audio autoplay when clicked, a center recipient photo & birthday letter reveal, 4 floating mini Polaroid photos in the 4 corners, confetti bursts, and a persistent birthday music player.

## Brainstorm Contract

- **Outcome**: A complete 3-stage interactive birthday landing page (`loading` -> `envelope` -> `opened`) where clicking the envelope opens the birthday letter + recipient photo, reveals 4 corner mini photos, launches confetti, and starts birthday music immediately.
- **Constraints**: Pure React 19 + TypeScript + Vite 8 + CSS Keyframes + Canvas 2D + Web Audio/HTML5 Audio (zero external runtime dependencies); browser autoplay compliance handled via user click on the envelope; single configuration file (`src/config/birthdayConfig.ts`) for easy customization.
- **Non-goals**: Backend upload server, user authentication, or multi-user database persistence.
- **Acceptance Criteria**:
  - Stage 1 (`loading`): Birthday cake background renders with flickering candles; center progress bar advances smoothly `0% -> 100%` with an animated walking cat tracking the exact progress percentage above the bar.
  - Stage 2 (`envelope`): Reaching `100%` transitions to a glowing interactive envelope in the center prompting the user to click/tap to open.
  - Stage 3 (`opened`): Clicking the envelope triggers birthday music playback immediately, fires confetti, reveals the center recipient photo + birthday greeting letter, displays 4 mini Polaroid photos in the 4 corners, and shows a music control pill (Play/Pause/Mute).
  - Passes `npm run lint` and `npm run build` with zero errors.
- **Better approaches**: `none — recommended direction is the requested one` (Pure React + CSS 3D/Keyframes + Canvas 2D + Web Audio synthesizer/MP3 fallback avoids React 19 peer dependency conflicts and works out-of-the-box offline and online).

## Goals

| # | Goal | Priority |
|---|------|----------|
| 1 | Centralized customization config (`src/config/birthdayConfig.ts`) + Cake background + Cat progress bar (`0% -> 100%`) | P1 |
| 2 | Clickable envelope reveal + Center recipient photo & letter card + 4 corner mini Polaroid photos | P1 |
| 3 | Birthday music player triggered on envelope open + Confetti celebration + Responsive mobile/desktop polish | P1 |

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Phase 1: Cake Background & Cat Progress Loader](./phase-01-start.md) | Completed |
| 2 | [Phase 2: Interactive Envelope, Letter & 4 Corner Polaroids](./phase-02-envelope-letter-and-polaroids.md) | Completed |
| 3 | [Phase 3: Birthday Music Player, Confetti & Responsive Polish](./phase-03-music-confetti-and-polish.md) | Completed |

## Dependencies

- Phase 2 depends on Phase 1 state machine (`stage`: `'loading' | 'envelope' | 'opened'`) and `src/config/birthdayConfig.ts`.
- Phase 3 hooks into the Phase 2 envelope click handler (`onOpenEnvelope`) to trigger audio playback and confetti burst synchronously within the user gesture.

## Success Criteria

- [x] Cake background with glowing candles and floating sparkles is visible across all stages.
- [x] Progress bar runs smoothly from `0%` to `100%` with the animated cat walking right above the progress indicator.
- [x] Envelope appears at `100%` and opens on click/keyboard activation.
- [x] Opening the envelope reveals the recipient photo + birthday letter in the center, 4 mini Polaroid photos at the 4 corners, fires confetti, and starts playing birthday music.
- [x] `npm run lint` and `npm run build` succeed without errors.

<!-- slug: birthday-landing-page -->