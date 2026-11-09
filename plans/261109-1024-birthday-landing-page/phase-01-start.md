---
phase: 1
title: "Phase 1: Cake Background & Cat Progress Loader"
status: completed
priority: P1
effort: "1h"
dependencies: []
---

# Phase 1: Cake Background & Cat Progress Loader

## Overview

Establish the centralized customization config (`src/config/birthdayConfig.ts`), global theme/typography styles, the full-screen illustrated Birthday Cake background with flickering candles and floating sparkles, and the Stage 1 (`loading`) center progress bar (`0% -> 100%`) featuring an animated cute cat walking directly above the progress fill head.

## Requirements

- [x] Create `src/config/birthdayConfig.ts` holding recipient name, birthday date/age badge, letter title & paragraphs, main recipient image URL (with attractive built-in SVG/canvas data URI default so it works out-of-the-box and is easily swappable), 4 corner mini photo items (image URL, caption, rotation angle), loading duration, and optional custom `.mp3` audio URL.
- [x] Create `src/components/CakeBackground.tsx` rendering a layered birthday cake scene in the background with flickering candle flames, pastel frosting, and floating bokeh/sparkle particles.
- [x] Create `src/components/CatProgressBar.tsx` displaying a glassmorphism center card, a rounded progress track (`0%` to `100%`), dynamic loading status messages, percentage badge, and an animated SVG cat positioned at `left: ${progress}%` above the bar with walking paw/tail keyframes.
- [x] Set up the 3-stage state machine in `src/App.tsx` (`'loading' | 'envelope' | 'opened'`) transitioning automatically from `'loading'` to `'envelope'` once progress reaches `100%`.

## Architecture & Data Flow

```text
birthdayConfig.ts ──► App.tsx (stage: 'loading' | 'envelope' | 'opened')
                       ├── CakeBackground.tsx (always mounted background layer)
                       └── CatProgressBar.tsx (mounted when stage === 'loading', calls onComplete at 100%)
```

## Related Code Files

- Create: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/config/birthdayConfig.ts`
- Create: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/components/CakeBackground.tsx`
- Create: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/components/CatProgressBar.tsx`
- Modify: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/index.css`
- Modify: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/App.tsx`

## Implementation Steps

1. Define `BirthdayConfig` TypeScript interface and default sample data in `src/config/birthdayConfig.ts` with clear Vietnamese comments showing where to replace photos, letter text, and music file.
2. Build `CakeBackground.tsx` with a multi-tier birthday cake illustration, animated candle flames, and floating celebratory particles fixed behind the main stage.
3. Build `CatProgressBar.tsx` using `requestAnimationFrame` for smooth `0% -> 100%` interpolation over configurable duration (~4 seconds), binding the walking cat container's horizontal offset to `progress` and displaying dynamic status text (*"Đang thắp nến sinh nhật..."*, *"Mèo nhỏ đang mang thư tới..."*, *"Sẵn sàng 100%!"*).
4. Add base CSS variables, warm festive palette, and cat walking / candle flicker `@keyframes` in `src/index.css` and `src/App.css`.

## Todo

- [x] Create `src/config/birthdayConfig.ts` with typed config and default assets
- [x] Implement `src/components/CakeBackground.tsx` with animated cake & candles
- [x] Implement `src/components/CatProgressBar.tsx` with walking cat synced to `%`
- [x] Wire Stage 1 (`loading` -> `envelope`) state transition in `src/App.tsx`

## Success Criteria

- Opening the page immediately shows the birthday cake background and the center progress bar.
- The cat walks smoothly from left (`0%`) to right (`100%`) right above the progress bar as the percentage counter increments.
- Upon reaching `100%`, after a brief completion beat (~400ms), the app transitions cleanly to the `'envelope'` stage.
