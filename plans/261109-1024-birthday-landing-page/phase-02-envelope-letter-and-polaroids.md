---
phase: 2
title: "Phase 2: Interactive Envelope, Letter & 4 Corner Polaroids"
status: completed
priority: P1
effort: "1h"
dependencies: [1]
---

# Phase 2: Interactive Envelope, Letter & 4 Corner Polaroids

## Overview

Implement Stage 2 (`envelope`) and Stage 3 (`opened`): when the cat progress bar finishes at `100%`, present an animated wax-sealed birthday envelope in the center. When the user clicks the envelope, play the flap-opening animation, reveal the center card containing the recipient's photo and heartfelt birthday letter, and animate 4 mini Polaroid photos into the 4 corners of the viewport.

## Requirements

- [x] Create `src/components/BirthdayEnvelope.tsx` for Stage 2 (`envelope`): a floating 3D-styled envelope with a heart/birthday seal, gentle bounce animation, and clear call-to-action (*"Chạm để mở thư & phát nhạc 🎵"*).
- [x] Support flap-open transition (`isOpening` sub-state ~650ms) that immediately invokes `onOpen()` on click so audio starts synchronously on the user's click event while the envelope unfolds into the full letter card.
- [x] Create `src/components/BirthdayLetterModal.tsx` for Stage 3 (`opened`): centered card displaying the recipient's main framed photo (with decorative crown/sparkles), recipient name, birthday greeting paragraphs with staggered fade-in / typewriter feel, and a button to replay animations or close/re-read.
- [x] Create `src/components/CornerPolaroids.tsx` rendering 4 mini Polaroid photo frames anchored to the 4 corners (`top-left`, `top-right`, `bottom-left`, `bottom-right`) with entrance spring animations, gentle floating tilt keyframes, captions, and click-to-zoom preview.

## Architecture & Data Flow

```text
Stage === 'envelope':
  BirthdayEnvelope.tsx ──(user click)──► triggers startMusic() + fireConfetti()
                                     ──► flap opens ──► sets stage = 'opened'

Stage === 'opened':
  ├── BirthdayLetterModal.tsx (center recipient portrait + birthday letter)
  └── CornerPolaroids.tsx (4 mini Polaroid frames in top-left, top-right, bottom-left, bottom-right)
```

## Related Code Files

- Create: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/components/BirthdayEnvelope.tsx`
- Create: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/components/BirthdayLetterModal.tsx`
- Create: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/components/CornerPolaroids.tsx`
- Modify: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/App.tsx`
- Modify: `C:/Users/manhh/Desktop/learn_tech/landing-page-birthday/src/App.css`

## Implementation Steps

1. Build `BirthdayEnvelope.tsx` with SVG/CSS envelope body, top triangular flap (`transform-origin: top`), wax seal button, and accessible `button` semantics (`Enter`/`Space`/click).
2. Build `BirthdayLetterModal.tsx` showing the recipient's main portrait badge at the top of the letter, decorative floral/sparkle borders, greeting header, multi-paragraph message, signature, and a subtle cat mascot sticker.
3. Build `CornerPolaroids.tsx` positioning the 4 mini photos from `birthdayConfig.cornerPhotos` into the 4 corners with staggered pop-in delays (`0.1s`, `0.25s`, `0.4s`, `0.55s`), pin/tape decoration, and hover/tap enlargement.
4. Connect `BirthdayEnvelope`, `BirthdayLetterModal`, and `CornerPolaroids` in `src/App.tsx`.

## Todo

- [x] Implement `src/components/BirthdayEnvelope.tsx` with click-to-open flap animation
- [x] Implement `src/components/BirthdayLetterModal.tsx` with center recipient photo & letter
- [x] Implement `src/components/CornerPolaroids.tsx` for the 4 corner mini photos
- [x] Integrate Stage 2 and Stage 3 transitions in `src/App.tsx`

## Success Criteria

- Reaching `100%` displays the interactive envelope in the center of the cake background.
- Clicking the envelope smoothly animates the flap opening and reveals the recipient photo + birthday letter in the center.
- All 4 mini Polaroid photos appear in the 4 corners with lively entrance and floating animations without obscuring the center letter.
