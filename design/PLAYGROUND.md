# Wordmark playground

This route is an Operate surface within the existing portfolio. Visitors edit two
lowercase words, inspect the tuck, and take working React or plain-web code.

## Direction contract

THESIS: the moving wordmark is the work. One canvas and one playhead replace the
old comparison sheet; controls explain their purpose without ornamental cards.
OWN-WORLD: inherit the approved Arial interface, sage accents, flat paper, thin
rules and lowercase slash heading. Custom SVG letters carry the experiment.
STORY: see the original name, pause and inspect, edit a pairing, export it.
FIRST VIEWPORT: desktop preview left, compact settings right, transport directly
under the canvas. On mobile the same preview and playhead precede settings.
FORM: a code-led editing workspace; seed: none (unavailable).
FINISH: review the implemented surface and document the extension here and in the
incumbent design system. No new visual world, root DESIGN.md, sidecar, or raster
asset is introduced.

## Behaviour and boundaries

Only lowercase a–z; each word accepts 1–24 letters. Only initial r + m uses the
approved merge. All other initials are separate. The alphabet proof below the
editor is part of the product, not a hidden development artifact. The seven
existing glyphs are retained; the m's missing arch completes its full-name form.
No raster assets are needed. All export geometry is inline SVG.

The same framework-free renderer drives both previews and both export formats.
Exports include only used glyphs. Each instance generates unique clipping IDs.
The older header controller remains unchanged to preserve its approved rendering.

Easter egg: desktop hold 4s; mobile 7 taps within 30s then a cancelable 3s timer.
Shift+Enter on the logo is the keyboard equivalent. Ordinary taps still go home.
No new primary-navigation or footer entry. The legacy study remains accessible at
/playground/logo-study.html. No backend or new runtime dependency is needed.


## Implemented extension

| Before | After | Why |
| --- | --- | --- |
| Archived RM comparison sheet | One editable preview with a shared playhead and a navbar-size preview | Inspect the same pose at two useful scales. |
| Original-name geometry only | Complete 26-letter lowercase proof; only r + m merges | Make other pairings possible while preserving the supplied mark. |
| Study-specific playback | Source-preserved runtime in React and plain-web exports | Export the geometry and timing that the visitor actually previews. |

The interface inherits the portfolio palette, Arial, lowercase slash heading,
flat surfaces and thin rules. The workspace uses a flexible preview plus a 270px
settings column (240px below 1000px); below 750px the preview and transport come
before the settings disclosure. The alphabet changes from 13 to 9 to 5 columns.
The customizable canvas background is content, independent of site appearance.
Code stays behind a disclosure; Copy and Download remain visible.

The preview begins at the full name without automatic playback. Its normalized
playhead drives both SVG instances. Nested clipping makes suffixes tuck behind
predecessors; reverse traverses the same geometry. Duration, stagger and easing
are settings; playback speed and loop are editor controls. Share stores validated
settings in the URL fragment, and Reset restores the original pair, appearance,
playhead, speed and loop. Invalid drafts leave the last valid geometry visible
and disable sharing and exports.

## Source and QA

`src/app/playground/page.tsx` mounts `WordmarkPlayground`; route-local CSS owns the
workspace. `src/data/wordmark-alphabet.json` supplies paths and spacing.
`src/lib/playground/runtime.js` supplies the framework-free renderer; `export.ts`
combines its generated source with only the required glyphs. Run
`npm run playground:logo` after changing the runtime: it regenerates
`runtime-source.json` and both legacy study copies. `npm run build` also runs
that generator. See `LOGO_PLAYGROUND.md` for commands and API details.

Review evidence is under `output/review/playground/`: `viewport-*` and `final-*`
PNG pairs at 1440 light, 900 dark, 390 dark and 320 light. All eight captures were
inspected. The scoped finish review's icon finding was resolved and re-reviewed
with a ship disposition. The saved `verification.json` records editor checks at
those four widths, standalone HTML and React exports, desktop and mobile entry,
and reduced motion; this documentation pass did not run a fresh browser suite.
