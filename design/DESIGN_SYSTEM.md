# Portfolio design system

The approved baseline is `portfolio-landmark-2026-10-28`. The portfolio introduces a frontend developer and makes his work assessable. Its typography and spacing carry the identity; project imagery supplies product context. The experimental logo studies are not adopted.

## Implementation

- `src/app/tokens.css` owns shared colours, type sizes, spacing, widths, and control radius.
- `src/app/globals.css` owns base styles, shared patterns, page composition, and responsive rules.
- `SiteHeader` owns navigation and active-route state. `ThemeToggle` owns appearance preference.
- `UI.tsx` provides `PageIntro`, `TextLink`, `ProjectMeta`, `ProjectMedia`, and `ToolArtwork`.
- `ProjectArchive` owns category selection while `ProjectCard` content is server-rendered. `ProjectDemo` hydrates only the optional sample interactions. The homepage, case prose, and informational pages remain server components.
- `ProjectDetail` composes case notes. `stories.ts` owns their content and media provenance; `work.ts` owns project identity and public links.

## Colour and appearance

| Token          | Light   | Dark    | Purpose                                 |
| -------------- | ------- | ------- | --------------------------------------- |
| `--paper`      | #fafaf6 | #1b1e19 | Canvas                                  |
| `--ink`        | #262923 | #f0f0e6 | Primary text                            |
| `--muted`      | #62665c | #b4b9a9 | Supporting text                         |
| `--line`       | #dedfd5 | #3d4337 | Dividers                                |
| `--accent`     | #e8edab | #dce597 | Primary action and selected model state |
| `--accent-ink` | #262923 | #25291b | Text on the accent                      |
| `--link`       | #364e37 | #e0e9ac | Hover and focus                         |

Surface, panel-border, code, and period tokens complete the palette. Keep screenshots in their original product colours: they document other applications, not alternate portfolio themes. The muted terracotta book cover appears only in a labelled sample interaction.

Default appearance follows the OS. An early head script restores an explicit preference before page paint. The header control switches to the opposite rendered scheme; switching back to the OS's current scheme restores automatic appearance. Storage events synchronise open tabs. CSS retains system-theme support without JavaScript. Native controls receive the corresponding `color-scheme`.

## Typography

Primary family: Arial, Helvetica, sans-serif. Code uses a system monospace. Weight is regular or medium; reserve stronger weight for concise emphasis.

| Token           | Size                                  |
| --------------- | ------------------------------------- |
| Caption         | .75rem                                |
| Small           | .875rem                               |
| Body            | 1rem                                  |
| Lead            | clamp(1.125rem, 1rem + .3vw, 1.25rem) |
| Section heading | clamp(1.5rem, 1.2rem + .7vw, 2rem)    |
| Subheading      | 1.25rem                               |
| Page title      | clamp(2.5rem, 1.2rem + 4vw, 4.5rem)   |

The homepage name/role lockup retains the approved separate scale and restrained negative tracking. The role is 8% larger. It is inline above 1100px and stacked below. Do not extend display tracking to body text. Use one H1 per page and sequential section headings. The case study has an index and metadata; its prose remains a comfortable reading width.

## Spacing and layout

Spacing tokens: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96px. Prefer these for padding, margins, and gaps. One-pixel rules and optical alignment are deliberate exceptions.

Maximum site width: 90rem. Maximum reading width: 43rem. Page margins are6% desktop, 5% below 900px, and 22px below 650px. Project media reserves its dimensions. Page sections use 48–80px separation; related text uses 12–24px.

Responsive breakpoints are literal media-query values because CSS variables cannot be substituted into viewport queries:

- 1600px: cap desktop margins.
- 1100px: stack the homepage name and role.
- 900px: move case metadata and professional context above prose; stop sticky sidebars.
- 650px: single-column gallery, contact options, and editorial content; compact navigation and icon-only theme label.

Content must fit at 320px and with increased text size. Do not use fixed-height text containers. Code wraps within its own surface. Screenshots use containment, not crops that hide important controls.

## Shared patterns

- Navigation: plain text links, active-route underline, semantic `aria-current`; `rm` links home with an accessible full-name label. No glass, glow, or floating controls.
- Links: underline or explicit arrow where appropriate. External links say where they go. Use links for navigation and buttons for actions.
- Primary action: pale lime background with dark text, 44px minimum height. Secondary actions use a quiet border. Focus uses a visible 2px outline with offset.
- Filters: native buttons with `aria-pressed`, counts, and an announced result count. They remain available when selected.
- Project archive: a consistent two-column comparison grid, one column on phones. Real screenshots and labelled usage illustrations establish project identity. The archive is for browsing, not reading an entire case study.
- Project notes: lead with the product and contribution; show media, project context, the actual problem, concrete decisions, and supported evidence. Do not imply test coverage merely because a test directory exists.
- Engineering demos: native `details` disclosure, visibly labelled as simplified sample state. They support the story and are not passed off as live product integrations.
- Contact: direct email and professional profiles. Copy has visible success/failure feedback. No nonfunctional contact form.
- Footer: consistent contact and profile links, separated by a rule. Do not repeat a large brand heading.
  -404: explain the missing page and offer working recovery links.

## Asset rules

Use actual project screenshots when available, with honest captions. Product landing examples or sample libraries are demonstration data, not adoption evidence. Generated contextual imagery is optional and must be identified; it cannot stand in for a functioning product screenshot. Do not create imagery merely to fill space.

Screenshots are optimised WebP files under `public/project-media/`; the capture manifest records origin and scope. Informative images have specific alt text, intrinsic dimensions, responsive sizing, and deferred loading below the fold. Tool illustrations are native HTML/CSS code examples rather than rasterised text.

## Review gate

Inspect all routes in light and dark mode at 320, 390, 768, and 1440px. Check headings, landmarks, internal destinations, active nav, filters, demos, focus, copy feedback, images, contrast, theme persistence, and overflow. Save screenshots and fix observed issues. TypeScript and production build must pass. Record limitations in `design/REVIEW.md`, not in vague claims of completeness.

## Mobile composition — October 29 refinement

Below 650px the header is a single, opaque sticky row using the page canvas and a bottom rule. Navigation stays visible; the active page has an inset underline. Controls retain a 44px height. Below 360px only horizontal gaps and navigation type tighten. Safe-area top padding and 84px scroll padding keep navigation and fragment targets clear. No scroll listeners or animated header resizing are needed.

The hero uses a two-column name/slash row below 1100px, followed by the role across both columns. The name column fits its content so the slash sits immediately after the name, with a 16px gap on phones; it shares the name’s size and baseline. On phones the role deliberately wraps into two large lines; the slash remains visible and uses the existing olive period colour. The main action spans the available width. A real Context Flow AI screenshot adds a product preview to the personal-projects destination on phones; the desktop directory stays typographic and professional work stays text-only.

## Slash identity

`BrandSlash` is the shared decorative slash component used by SiteHeader, the homepage hero, and PageIntro. It renders a span hidden from assistive technologies; link and heading text provide their accessible names. The `--brand-slash` token gives it a darker olive in light mode for small navigation text and a pale olive in dark mode. Context classes control spacing and scale, rather than duplicating the character markup.

Navigation labels remain `/work`, `/projects`, and `/about` in both inactive and active states. Selection uses an underline and `aria-current`, never removing the slash. The main Work, Projects, About, and Contact pages use PageIntro's `slash` option with lowercase titles and no added slash gap: `/work`, `/projects`, `/about`, and `/contact`. Individual project titles stay plain. Resume is hidden in the header below 650px and is available in the shared footer and About page. ThemeToggle is an icon-only, borderless control with a 44px hit area and a visible icon sized to 1em of navigation text. Hover/press changes only its colour; there is no background tile or scaling. It retains an accessible name and visible keyboard focus outline.

Project-detail breadcrumbs use the reusable Breadcrumbs component and BrandSlash: `/projects/pr tracker` with only the slash characters in primary olive and labels in the normal text colour, with the parent linked and the current project marked `aria-current="page"`. Professional details use `/work/…`. The path replaces the former back link rather than adding another navigation row.

## Interaction and typography polish — October 30

The named Emil Kowalski, Impeccable, and Taste skill sources informed a local refinement of shared components. The approved layout, Arial family, off-white/charcoal palette, lowercase slash headings, and text-only professional work remain the visual authority. New-scene generators, replacement fonts, decorative photography, and broad motion sequences were not applied to this existing brief.

PageIntro starts with its title and description; context is secondary text below them. Project cards start with the project name, with category placed beside the stack. Homepage directory headings lead their sections. Primary descriptions use ink rather than muted metadata colour. Display tracking uses `--tracking-display: -0.04em`; the `rm` logotype retains its approved optical spacing.

ArrowIcon wraps Lucide React’s ArrowRight and ArrowUpRight icons. ThemeToggle uses Lucide Moon and Sun. Decorative icons use a consistent 1.5px stroke, inherit text colour, and are hidden from assistive technologies; the controls retain their accessible text names. The slash remains a typographic brand character. Motion tokens define a 140ms press response with a custom ease-out. Pointer presses scale controls slightly; keyboard focus does not animate. Hover movement is restricted to fine pointers with hover support and to the primary action's arrow. Reduced-motion mode removes these transforms and transitions. Filters have 44px minimum height and tabular counts.

## CTA clarity and About structure — October 30

Baseline: commit `2898eae`, tag `portfolio-before-cta-about-2026-10-30`.

Ordinary text links have a persistent underline. Navigation, the wordmark, project-cover/title links, and filled primary actions retain their explicit treatments. The homepage's linked sections have separate underlined action labels below the descriptions, rather than relying on heading arrows. Project actions use 14px text, 44px minimum height, and right arrows for internal notes / up-right arrows for external destinations. Source links in Other builds also have 44px targets. Plain secondary actions stay typographic; the pale accent fill identifies the main action.

About presents the career timeline before the editorial grid on every viewport. Its main groups are Experience at LineupX, How I work (Frontend engineering / UI/UX and product redesigns / User collaboration), and Skills & education. Role dates, technologies, education, and narrative facts are retained. On phones the experience block is followed by the narrative and then supporting background. Related links sit 16px after their paragraph, with no additional child margin; wrapped links have a 4px row gap. The closing contact action uses the shared primary-action treatment.

Contact actions use a shared grid: the email link and copy button occupy the action rows, and the copy status spans a separate full-width feedback row. CopyEmail's non-semantic wrapper uses `display: contents` within that grid. Two lines of feedback space are reserved so success/error messages do not move the actions or supporting note. At 400px and below, actions intentionally stack at full width; wider layouts keep them alongside one another. This arrangement is determined by viewport width, never by confirmation text.

## Approved monogram — option 3

BrandLogo renders the supplied RM path geometry as inline SVG, allowing CSS theme colours to apply directly. The r uses `--brand-slash` and the m uses `--ink`: light #687137 / #262923; dark #dce597 / #f0f0e6. No website palette tokens changed. The header mark is 44px wide with its original 920:560 aspect ratio, inside a 44px-minimum home link. The link owns the accessible name; the SVG is decorative and nonfocusable.

`src/app/icon.svg` uses the same paths on a charcoal square with the existing dark-theme pair. `favicon.ico` supplies 16/32/48/64px raster fallbacks; `apple-icon.png` supplies an opaque 180px square for Apple touch icons. These are derived from the SVG, not separate logo drawings. They retain the same palette and shape, with practical small-size limits on the curved separation.

## Interaction motion

Use motion to connect a clicked project to its detail view, preserve card position during filtering, or identify the active route. Motion durations stay between 200–240ms with the existing ease-out curve. Avoid looping decoration, scroll reveals that hide content, and motion on the theme switch or copy feedback.

- `ProjectMotionProvider` and `ProjectLink` coordinate Next.js soft navigation with native same-document view transitions. Only the selected screenshot frame receives a transition name. Server-rendered images and prose remain server-rendered. Tool artwork and text-only professional work keep normal navigation. Navigation has a bounded wait for route/image readiness; animation failure never prevents routing.
- `ProjectArchive` temporarily names cards during native transitions, so retained cards move and removed/added cards fade. Rapid selection skips an earlier animation. Keyboard selection is immediate.
- `SiteHeader` measures the active link and moves one underline. Initial rendering, resizing, and keyboard navigation position it immediately. The existing underline remains a pre-hydration fallback.
- `HeroSlash` reveals the slash once per tab session, without hiding text or waiting for an animation to finish. Desktop screenshot hover zoom is 1.02×, limited to fine pointers.
- Reduced-motion preferences bypass native transitions and the hero reveal; CSS also disables new transition pseudo-element animations. Browsers without native view transitions retain immediate functional navigation and filtering. No framework upgrades or animation dependencies are required.

### Brand and scroll motion

`EntranceMotion` coordinates the logo, homepage text/slash, primary page-heading slashes, and sections explicitly marked with `data-reveal`. These entrances last 360–440ms (up to 500ms including the small hero delay); the 200–240ms budget above remains for repeated hover/navigation interactions. The homepage sequence runs once per completed tab-session introduction, and heading slashes enter on route changes. Only the large heading slash moves: navigation and breadcrumb slashes stay still. SVG path geometry, all type sizing, and theme tokens remain unchanged. Logo hover gently separates the two existing shapes on fine pointers without changing the home-link hit area.

Work/About sections rise 14px on desktop or 8px on phones, once per page mount. They stay visible before JavaScript and while outside the viewport; animation is an enhancement rather than a gate to reading. Reduced-motion preference changes cancel running entrances.

`SmoothScroll` uses Lenis 1.3.27 with a gentle 0.16 lerp, one automatic RAF loop, native document scrolling, and inertia cancellation on navigation. It activates only for fine pointers with hover and no reduced-motion preference. Touch scrolling stays native. Native hash links retain browser history/focus and existing scroll offsets; anchor/key events settle wheel inertia first. Code blocks and editable nested areas opt out. Route changes recreate the instance after destroying the old one, preserving Next's native scroll restoration. A live preference change tears it down immediately.

`PixelwindExample` is the one playful, explicit interaction: 32 olive tiles cover/uncover equivalent inline-style and utility-class examples in at most 355ms. It appears only on Pixelwind's detail page; its archive artwork remains static. Its button supports touch/keyboard, preserves dimensions, and announces the active example. It is labelled as an illustration rather than a running source converter. Reduced motion swaps the example immediately. The previous independent `HeroSlash` effect is removed to avoid two competing entrances.

React Bits [Split Text](https://reactbits.dev/text-animations/split-text), [Animated Content](https://reactbits.dev/animations/animated-content), and [Pixel Transition](https://reactbits.dev/animations/pixel-transition) informed these focused native adaptations. Their generic components and GSAP are not installed. Lenis is the only new dependency; its recommended CSS is included. No scroll stacking, looping effects, theme-control animation, or copy-confirmation animation is introduced.

### Header and slash refinement

Navigation hover changes colour; the existing sliding active-route underline remains the only underline. The supplied monogram now opens into the lowercase wordmark on hover at ≥900px with a fine pointer. Its SVG r/m separate and crossfade into the site-family lettering, with the wordmark at 44px/700 so the visible lowercase height stays close to the original mark. All of `rohit` uses `--brand-slash`; all of `mahar` uses `--ink`. Both follow the existing theme tokens. Resting logo geometry and favicon assets remain unchanged. Header navigation stays anchored while the identity uses free space. The full name is measured for its expansion width and the m's travel; keyboard focus and reduced motion show the expanded name immediately. Touch/narrow layouts retain the compact mark. Initial logo animation cancels on interaction so it cannot fight hover expansion.

Page-heading slashes retain the bottom-up wipe. They have the same oversized `inset(-.15em)` clip during their completed animation and at rest, preventing an edge crop from handing back to unmasked text. Their reveal lasts 560ms with `cubic-bezier(.45, 0, .55, 1)` for a gentle start and finish. This is deliberate decorative motion, separate from the shorter repeated-interaction timings.

The hero slash now uses `HeroSlash`, a single-character native SVG/CSS adaptation of [React Bits Stroke Text](https://reactbits.dev/text-animations/stroke-text). It draws an outline, fills from the bottom, holds, then reverses on a 6.8-second loop with gentle ease-in/ease-out. The native slash reserves its original layout; SVG text inherits and measures that font/baseline rather than using a fixed-size illustration. The SVG remains the renderer throughout the loop. Click/Space/Enter pauses or resumes, with an accessible label and an expanded hit area. Reduced motion renders the static native glyph. The loop pauses when offscreen or when the tab is hidden. No GSAP dependency is added; heading slashes do not loop, and the homepage name/role introduction remains once per session.

The hero loop starts blank, with a 200ms delay before drawing. Its outline/fill use the empty first keyframes during the delay; no negative animation offset or visible native-glyph flash precedes the appearance. The hidden native glyph still reserves the original layout space. Reduced motion continues to show the static slash.
