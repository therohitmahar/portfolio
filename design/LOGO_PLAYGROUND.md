# Wordmark playground and RM archive

The editable route is `/playground`. The preserved RM study is
`/playground/logo-study.html` (historical production URL:
https://rohitmahar.vercel.app/playground/logo-study.html).

The build regenerates `public/playground/logo-study.html` from the same source
as the offline copy. It is publicly accessible without a main-navigation link.

Open `logo-study.html` directly, or use the running preview at http://localhost:3015/logo-study.html. It is a self-contained archive, separate from the portfolio navigation. The logo
Easter egg now opens the editable `/playground` route.

The playground keeps the supplied original mark, the earlier filled-gap regression, the previous extended m, the restored complete m, both colour schemes, and all of these motion presets:

- One gesture: synchronized m movement and ordered tuck (current choice).
- Gentle stagger: the earlier two-phase version.
- Ease-out cubic.
- Power ease-out.
- Previous short steps.

Expand/Tuck controls replay the selected curve. Hover/focus also works on desktop. The animation respects reduced motion; the header's normal narrow/touch behaviour stays compact.

## Source and regeneration

Run `npm run playground:logo` from the project root after changing the logo. This regenerates the self-contained HTML from the actual component and controller. To serve it separately:

```bash
python3 -m http.server 3015 --bind 127.0.0.1 --directory design
```

- `logo-reference.svg`: immutable copy of the supplied mark; original paths and curved separation.
- `logo-playground.json`: retained regression geometry and curve presets.
- `src/data/brand-glyphs.json`: letter geometry and positions.
- `src/components/BrandLogo.tsx`: inline SVG, per-letter clipping, overlap and theme colours.
- `src/lib/wordmark-motion.ts`: reusable, reversible native animation controller.
- `scripts/render-logo-study.mjs`: generates the offline playground without external browser dependencies.

The controller exposes `open`, `close` and `destroy`. The playground and real header use the same implementation; this is live SVG motion, not a recorded animation. Temporary compiled modules and verification captures go into ignored `output/review/logo-isolation/`.

The standalone wordmark remains at `public/images/rm-wordmark.svg`. No dependency on a matching installed font or an animation library is required. The supplied original mark is never overwritten.

Mobile introduction (2026-10-30): every mobile page refresh starts with the full
name, holds for five visible seconds, then folds into RM as navigation appears.
Tapping RM still navigates home and replays the expansion; this replay stays open
until scrolling or another interaction. Desktop keeps hover/focus expansion.
Reduced motion shows the compact mark and navigation immediately. The standalone
study includes a five-second replay control alongside every earlier easing preset.


## Editable route and reusable exports

`src/app/playground/page.tsx` mounts
`src/components/playground/WordmarkPlayground.tsx`; `playground.css` scopes its
layout. This route uses `src/data/wordmark-alphabet.json` for all 26 lowercase
letters and spacing. Words accept 1–24 letters each. Only initial r + m uses the
supplied merged mark; other initials stay separate. The archive and immutable
reference above remain separate from this new alphabet.

`src/lib/playground/runtime.js` exposes `createWordmark(host, settings, alphabet)`.
It renders inline SVG with per-instance clipping IDs and returns `play(direction)`,
`pause()`, `seek(progress)`, `getState()`, `setSpeed(value)`, `setLoop(value)`,
`subscribe(listener)` (returning an unsubscribe function), and `destroy()`.
Progress runs from 0 (full name) to 1 (initials). Both previews share that pose.
Reverse continues along the same timeline, loop reverses at endpoints, and
stagger is bounded by total duration. Hidden documents pause playback; enabling
reduced motion pauses active playback, while explicit seeking remains available.

`settings.ts` validates words, hex colours, duration, stagger, size and easing.
Share serializes those settings into the URL fragment. Speed and loop remain
editor controls. Reset restores defaults and clears the shared fragment.
`export.ts` emits a React `Wordmark.jsx` or standalone `wordmark.html`, including
only used glyphs and RM merge data when needed. Both use the same source-preserved
runtime rather than serializing a minified function. React requires only React;
the plain-web file has no runtime dependency.

The existing `scripts/render-logo-study.mjs` also copies the framework-free
runtime into `src/lib/playground/runtime-source.json` after removing its module
export keyword. Run `npm run playground:logo` after runtime edits, or use
`npm run build`, which runs this generator before Next.js. Do not edit the
generated runtime string independently.

## Logo entry and verification

`useLogoPlayground.ts` adds desktop hold (4 seconds, release to cancel), focused
Shift+Enter, and mobile seven taps within 30 seconds followed by a cancelable
3-second countdown. Escape, scroll, blur and hidden-tab changes cancel pending
entry. Ordinary taps still navigate home. SiteHeader presents the countdown;
its approved SVG renderer and normal animation controller are preserved.

With Chrome exposing CDP on `http://127.0.0.1:9222` and the local portfolio server
running on port 3014, run:

```bash
npm run verify:wordmark
```

Use `PORTFOLIO_BASE_URL` to verify another already-running server:

```bash
PORTFOLIO_BASE_URL=http://localhost:3014 npm run verify:wordmark
```

The script uses the local Playwright runtime, writes captures and generated
export fixtures to ignored `output/review/playground/`, and saves the completed
report as `verification.json`. The saved report inspected for this documentation
records the four editor widths (1440 light, 900 dark, 390 dark touch, 320 light
touch), standalone HTML pose parity, React multiple-instance support, desktop
hold/release/keyboard entry, mobile seven-tap entry with a gap above eight seconds
and Cancel, and reduced-motion seeking. The eight `viewport-*` / `final-*` PNGs
were inspected. This documentation pass performed no new browser run.
