---
title: Bind Public Birthday Photos
date: 2026-11-09
summary: "Configured anh_1.jpg, anh_2.jpg for 4 corners and anh_3.jpg for letter avatar"
---

# Bind Public Birthday Photos

## What happened\nUpdated src/config/birthdayConfig.ts to use /anh_3.jpg for the main letter avatar and /anh_1.jpg, /anh_2.jpg for the 4 corner Polaroid photos from public/, plus added image preloading in src/App.tsx.\n\n## Verification\nVerified in Chromium that /anh_3.jpg (828x828) and /anh_1.jpg, /anh_2.jpg (1536x2048) load and render with complete=true.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
