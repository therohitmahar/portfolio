# RM motion playground

Production URL: https://rohitmahar.vercel.app/playground/logo-study.html

The build regenerates `public/playground/logo-study.html` from the same source
as the offline copy. It is publicly accessible without a main-navigation link.

Open `logo-study.html` directly, or use the running preview at http://localhost:3015/logo-study.html. It is a self-contained file, separate from the portfolio navigation, and can become an Easter egg later.

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
