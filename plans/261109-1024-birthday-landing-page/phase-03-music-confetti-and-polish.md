---
phase: 3
title: "Phase 3: Birthday Music Player, Confetti & Responsive Polish"
status: completed
priority: P1
effort: "1h"
dependencies: [1, 2]
---

# Phase 3: Birthday Music Player, Confetti & Responsive Polish

## Overview

Implement the birthday music engine and floating player UI (`src/components/MusicPlayer.tsx` + `src/utils/birthdayAudio.ts`) that starts playing immediately when the user clicks the envelope, add a celebratory Canvas 2D confetti burst (`src/components/ConfettiCanvas.tsx`), and verify responsive layout across desktop and mobile viewports.

## Requirements

- [x] Create `src/utils/birthdayAudio.ts` supporting both a custom `.mp3` file URL (from `birthdayConfig.music.audioUrl`) AND a built-in Web Audio API polyphonic "Happy Birthday" music-box synthesizer fallback so music plays reliably out-of-the-box even before the user adds an `.mp3` file.
- [x] Trigger music playback directly inside the envelope click handler (`BirthdayEnvelope` -> `App.tsx`) so browser autoplay policies permit immediate playback on desktop and mobile Safari/Chrome.
- [x] Create `src/components/MusicPlayer.tsx` displaying a floating vinyl/music-note player widget with spinning disc animation, song title marquee, Play/Pause toggle, and Replay button.
- [x] Create `src/components/ConfettiCanvas.tsx` rendering colorful confetti ribbons and hearts when the envelope opens (plus a button to shoot extra confetti/fireworks).
- [x] Ensure responsive layout on mobile (`< 768px`) and desktop (`>= 768px`) so the 4 corner mini photos and center letter remain readable and harmonious.

## Architecture & Data Flow

```text
User clicks Envelope
  ├──► birthdayAudioController.play() (starts HTML5 Audio if configured, else Web Audio Happy Birthday melody loop)
  ├──► ConfettiCanvas bursts celebratory particles
  └──► MusicPlayer widget appears (spinning vinyl + Play/Pause toggle)
```

## Related Code Files

- Create: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/utils/birthdayAudio.ts`
- Create: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/components/MusicPlayer.tsx`
- Create: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/components/ConfettiCanvas.tsx`
- Modify: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/App.tsx`
- Modify: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/App.css`

## Implementation Steps

1. Implement `src/utils/birthdayAudio.ts` with a dual-mode controller: if `birthdayConfig.music.audioUrl` is provided, play the HTML5 `<audio>` element with automatic fallback to a warm Web Audio API music-box rendition of "Happy Birthday to You" (looped with chord accompaniment) if the file is absent or fails to load.
2. Build `src/components/MusicPlayer.tsx` with a spinning record icon, equalizer bars animation when playing, track title display, and Play/Pause button.
3. Build `src/components/ConfettiCanvas.tsx` using a full-viewport `<canvas>` (`pointer-events: none`) that fires multi-colored confetti and heart particles when triggered.
4. Refine responsive breakpoints in `src/App.css` so on narrow mobile screens the 4 corner photos scale neatly into top/bottom corners or a clean frame around the letter without overlapping text.
5. Run `npm run lint`, `npm run build`, and verify the live app in a headless/real browser across all 3 stages (`loading` -> `envelope` -> `opened`).

## Todo

- [x] Create `src/utils/birthdayAudio.ts` with MP3 + Web Audio Happy Birthday music-box synth
- [x] Implement `src/components/MusicPlayer.tsx` floating music controller
- [x] Implement `src/components/ConfettiCanvas.tsx` particle burst overlay
- [x] Polish mobile/desktop CSS breakpoints and run `npm run lint` + `npm run build`

## Success Criteria

- Clicking the envelope immediately starts birthday music without browser autoplay errors.
- The floating music player shows spinning disc + animated sound waves and allows pausing/resuming music at any time.
- Confetti bursts across the screen when the letter opens.
- `npm run lint` and `npm run build` pass with zero errors.
