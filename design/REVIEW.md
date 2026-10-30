# Portfolio completion review

Reviewed 29 October 2026 against the goal in the attached pasted-text file. The approved landmark remains `portfolio-landmark-2026-10-28` at `aedd2922deec67968b70a2aca622b83c6654501c`.

## Page-by-page critique and result

| Page                   | Main issue found                                                                                          | Final treatment                                                                                                                                                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Homepage               | This was already the approved identity; further content would turn it back into an oversized single page. | Preserved the inline name/role hero, short introduction, and two destinations. Shared header, footer, tokens, and mobile theme control now match the rest of the site.                                                                     |
| Work                   | Contributions lacked a clear professional narrative and role context.                                     | Role progression alongside five focused contributions: database rendering, assessments, field-setting navigation, shared components/analytics, and user collaboration.50% is scoped to re-renders.                                         |
| Projects               | Large explanatory demo panels obscured what the products actually look like; tools lacked visual context. | A filterable comparison grid with actual product screenshots, honest captions, illustrated tool usage, category counts, and public links. Earlier builds stay a concise text index rather than receiving invented case studies or imagery. |
| About                  | Repeated work-page material and a generic skills list.                                                    | A personal account of engineering interests and recent UI/UX work, with a separate factual career/skills/education column. Links connect the interests to actual projects.                                                                 |
| Contact                | Basic contact data offered little guidance or action feedback.                                            | Direct email, working copy success/failure states, profile purposes, location, and a resume link. No fake form submission.                                                                                                                 |
| PR Tracker             | The generic case format hid its strongest engineering work.                                               | Checkpoint recovery, IndexedDB, rate limits, expiring cross-tab coordination, and analytics. 3,000+ is an observed sync count. Actual landing screenshot's built-in figures are explicitly sample data.                                    |
| Context Flow AI        | A node illustration alone did not explain state design.                                                   | Actual editor screenshot plus drag-end history, linked graph state, timestamp-based draft recovery, and persisted viewport/output history. The simplified model is optional.                                                               |
| Next Shelf             | Desktop search screenshot was uninformative and underrepresented the reading workflow.                    | Actual reading-progress/library captures from the Expo web app at a mobile viewport. Notes explain local data, reducer transitions, import merge behavior, versioned backups, and relevant tests. Demonstration data is labelled.          |
| Pixelwind              | “Exact pixels” needed the local source's breakpoint qualification.                                        | Illustrated package usage and generated-CSS story, with≥1600px scaling clearly described. Removed a gap utility from a snippet without a layout context.                                                                                   |
| Auto Dynamic Importer  | Generic performance language obscured its narrow transformation scope.                                    | Actual default-import example with SSR control, selection behavior, and guards against its own edits/pastes. No measured speedup is invented.                                                                                              |
| Quick Wrapper          | A small implementation risked being inflated into a broad tool.                                           | A specific markup/Emmet example and explanation of reusing the editor's command rather than writing a parser.                                                                                                                              |
| Frontend Agent Kit     | Could be mistaken for an executable framework.                                                            | Illustrated interface-state expectations and explicit copyable-file workflow. No CLI/runtime claim.                                                                                                                                        |
| ClearMind              | A booking screenshot could imply a functioning scheduling service.                                        | Actual scheduling-panel capture, personal UI-exploration framing, stepped-layout decisions, and one clear qualification about local-only request feedback.                                                                                 |
| LineupX field settings | Needed to remain text-only and accurately bounded.                                                        | Text case notes covering section visibility and reuse of BlueBtn/TableV2 patterns. No before/after image or inferred usability metric.                                                                                                     |
| 404                    | A missing-page message offered limited recovery.                                                          | Consistent introduction plus Home, Work, Projects, and Contact recovery links; actual404 response retained.                                                                                                                                |

## Shared design system

`DESIGN_SYSTEM.md` documents colour, appearance, typography, spacing, widths, responsive breakpoints, and shared UI patterns. `tokens.css` implements them. `UI.tsx`, `SiteHeader`, `ProjectCard`, `ProjectArchive`, and `ProjectDetail` implement the corresponding patterns across routes.

Static page content and case prose are server-rendered. Client code is limited to category selection, the appearance control, copy feedback, and optional explanatory demos. Candidate-field settings remains text-only.

## Source and media review

A bounded source audit covered all nine case-study entries. A second read-only content review checked the new copy and led to corrections for the PR lease guarantee, mobile-web screenshot wording, Pixelwind test specificity, and redundant defensive prose. `SOURCE_EVIDENCE.md` records the underlying files and qualifications.

Four main projects use actual captured UI. Tool entries use labelled native HTML/CSS usage illustrations, where raster images would make code less readable. No generated product screenshot or invented product data was added. `public/project-media/capture-manifest.json` records provenance; all source dimensions were checked with the OS image inspector. Media is WebP, uses responsive image sizing, reserves frame dimensions, supplies alt text, and contains screenshots without hiding important controls.

## Verification evidence

- `npm run build`: passed with all 20 generated routes/assets.
- `npx tsc --noEmit`: passed.
- `git diff --check`: passed.
- `scripts/verify-portfolio.cjs`: 120 successful combinations: 15 content/recovery routes × 4 widths × 2 themes.
- Widths: 320, 390, 768, 1440px. No horizontal overflow; images decoded successfully; one H1/main per page; accessible control names and anchor targets were checked.
- Interaction checks passed: project filters and counts; copy success and failure; skip link; visible keyboard focus; keyboard theme activation; reload persistence; cross-tab and system preference changes; all three demos; legacy redirects; 15 internal destinations including the resume.
- Zero browser runtime errors and no unexpected console errors. Expected404 network errors are excluded from the console gate.
- `scripts/check-contrast.cjs`: 1,358 rendered-text samples across all 15 routes in both themes at 390px; no failures against 4.5:1 normal-text and 3:1 large-text thresholds. This measures portfolio text, not text embedded in screenshots.
- 64 final browser screenshots were captured. Every page was visually inspected, including inner project notes, mobile layouts, light/dark surfaces, the gallery, and 404.
- All 12 main outbound project/source URLs returned 200 through actual browser navigation. Public-source eligibility was separately verified via GitHub metadata. Agent-side HTTP requests encountered DNS restrictions, so they were not used to claim external-link success.

Detailed reports and images are in ignored `output/review/final/`: `report.json`, `contrast.json`, `external-links-browser.json`, and named PNG screenshots. Before/first-pass images are retained locally for comparison.

## Completion audit

| Requirement                                     | Current evidence                                                                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Shared implemented and documented design system | tokens.css; globals.css; shared components; DESIGN_SYSTEM.md                                                                    |
| All pages refined and reviewed                  | Page table above; final screenshots; 120 route checks                                                                           |
| Specific evidence-based descriptions            | stories.ts; source audit; SOURCE_EVIDENCE.md                                                                                    |
| Useful integrated and labelled visuals          | ProjectMedia/ToolArtwork; five used WebP assets; capture manifest; image decode checks                                          |
| Light/dark consistency                          | Browser route matrix, appearance interaction checks, screenshot review, contrast report                                         |
| TypeScript and production build                 | Successful commands after final application changes                                                                             |
| Preserve approved landmark and unrelated edits  | Landmark SHA unchanged; no commands modified legacy image edits, src/data/projects.ts, IMPROVEMENT_REVIEW.md, or pnpm-lock.yaml |
| No push/deployment                              | All changes remain local; no publishing or push operations were performed for this goal                                         |

## Limits

Browser verification used desktop Chromium through a dedicated local Chrome profile. It is not a Safari/Firefox or screen-reader certification. Product-source test suites were inspected as evidence but not rerun; the automated tests here verify the portfolio. The user-supplied 50% re-render figure and 3,000+ sync count were not independently rebenchmarked. These qualifications are reflected in the content/source notes and do not represent unfinished portfolio functionality.

## Mobile refinement — October 29

The initial mobile hero lost the slash and shrank both name and role into a small text stack. The revised composition keeps the name and olive slash on the first row, gives the role two large lines, and makes the primary action full width. A real Context Flow AI screenshot now introduces the personal-projects destination on phones. The desktop composition and approved landmark commit remain intact.

The shared mobile header is now opaque and sticky, with visible destinations, an active-page rule, 44px-tall controls, safe-area padding, and scroll clearance. At 320px the gaps tighten to keep the theme control inside the content area. This uses existing CSS and semantic links; Pico's nav documentation was consulted as a reference, with no library added. Work/settings remain text-only.

The route verifier now explicitly checks sticky positioning and control bounds on every mobile route in both themes, and requires the homepage slash to be visible. Image verification checks rendered images; the phone-only homepage preview is intentionally hidden on desktop.

Validation of this refinement: production build, TypeScript, targeted ESLint, and diff whitespace checks passed. The refreshed production preview passed all 120 route/width/theme combinations and the existing interaction suite, with 64 screenshots and zero runtime errors. Contrast: 1,360 text samples, zero findings. A further 320×700 keyboard pass checked 35 successive focus targets against the sticky header and viewport bounds (1px rounding tolerance). Screenshots of the homepage in both themes, the narrow 320px layout, and Work/Projects were inspected. Local production preview remains on port 3014, including the Wi-Fi address shown by Next.js. Physical-device Safari remains unverified.

### Slash alignment correction

The first mobile pass placed the slash against the far-right edge using a flexible name column. Visibility and overflow checks passed, but that did not establish good visual placement; the visual review missed the detached separator. The name column now fits its content, placing the slash directly after the name with a 16px phone gap and matching type size/baseline. A fresh production build passed. Targeted Playwright checks covered 320, 390, 650, 768, 1100, and 1440px in both themes: visible slash, no horizontal overflow, matching phone font size, and a measured 16px phone gap. Phone screenshots were inspected after this correction. The earlier 120-route results predate this narrow alignment change.

### Lowercase heading treatment

Applied the user-approved `/projects` treatment to all four primary page titles through PageIntro: lowercase text, no added gap after BrandSlash. Build/TypeScript and whitespace checks passed. Browser verification was limited to an attempted Projects-only check; the current CDP endpoint rejected Playwright context management, so this revision has not been visually reverified. The earlier route-matrix run was stopped at the user's request and is not claimed as verification of this revision.

## October 30 — named design-skills refinement

Source guidance read directly from upstream because the requested skills were absent locally and the skill-installer download failed at DNS resolution:
- Emil Kowalski: https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md
- Impeccable: https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md plus polish and craft-floor references.
- Taste: https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md plus critique guidance.

Impeccable's launcher could not run; the documented fallback was announced and existing DESIGN_SYSTEM.md, tokens, shared components, and saved captures were used as context. No PRODUCT.md or root DESIGN.md exists. The user requested local changes and previously limited browsing, so this pass targets shared components and representative Home/Projects surfaces rather than opening every route.

| Before | After | Why |
| --- | --- | --- |
| Small labels above page and project headings | Titles lead; context follows descriptions and project categories join the stack | Clearer hierarchy without removing project facts |
| Font-dependent Unicode arrow icons | Shared decorative ArrowIcon SVG | Consistent weight, baseline and shape |
| No shared press feedback; hover styling could persist on touch | 140ms pointer feedback, fine-pointer hover, immediate keyboard focus and reduced-motion fallback | More deliberate control behavior |
| Tight -0.055em display tracking and muted main descriptions | Shared -0.04em display tracking and ink for primary descriptions | More readable type within the approved family |

The requested skills are guidance for this refinement, not installed packages or successfully executed inspector tools. Their generators/inspectors were unavailable; the brief's pinned identity takes precedence over their broader new-site defaults. No invented imagery, metrics, testimonials or new dependencies were added. Browser tools were discovered, but local Chrome launch failed with the macOS Crashpad/bootstrap error. No fresh before/after render or visual score is claimed. Earlier captures are reference evidence only; their navigation and heading styling precede the latest slash changes.

Validation of this local pass: production build including TypeScript passed; targeted ESLint and diff whitespace checks passed. Home and Projects returned 200 from the rebuilt local preview, with shared SVG icons and slash markup. Projects renders its H1 before its description and context and retains filter pressed-state markup. These are rendered-HTML checks, not browser layout, motion, accessibility, or screenshot verification. No pages beyond Home and Projects were requested for these checks. Changes remain local and uncommitted.

### Lucide icons

At the user's request, ArrowIcon now wraps Lucide ArrowRight/ArrowUpRight, ThemeToggle uses Lucide Moon/Sun, and demo connector arrows use the shared wrapper. The slash stays typographic. Added lucide-react 1.33.0 to package.json and the npm lockfile. Normal offline installation hit an unrelated missing Tailwind archive; the cached Lucide tarball was obtained directly, its SHA-512 verified against npm metadata, and the exact package extracted into ignored node_modules. The dependency/lock entry uses that published version, tarball and integrity. No unrelated lock entries were changed.

Build with TypeScript, targeted lint, and whitespace checks passed. Home returned 200 and its rendered HTML contains Lucide arrow, moon, and sun classes. No all-page traversal or fresh browser visual check was run.

## CTA clarity and About grouping — traceable revision

The pre-fix portfolio is commit `2898eaeb61083a3621a8eca2f1d064c9ede5f3fe`, annotated tag `portfolio-before-cta-about-2026-10-30`. This checkpoints the earlier local polish, Lucide migration, and compact theme toggle before the CTA/About changes. The original portfolio landmark tag is unchanged. Pre-fix screenshots and measurements are retained in ignored `output/review/cta-about-before/`; revised captures and reports are in `output/review/cta-about-after/`.

| Before | After | Why |
| --- | --- | --- |
| Project actions used 12px text, approximately 20px-high targets, and hover-only underlines | Project actions use 14px text, persistent underlines, 44px minimum target height, and Lucide direction cues; Other builds sources also have 44px targets | Secondary actions can be recognised before hovering or tapping |
| Homepage linked sections relied on headings and distant arrows | Each linked section includes an explicit underlined action label: View LineupX work / Explore projects | The destination and available action are stated |
| Mobile career/background block began at y≈1493px after all narrative sections | Separate experience timeline begins at y≈418px at 390px viewport width (y≈446px at 320px), before the narrative | Current professional experience is visible much earlier |
| Career history appeared under Currently; narrative and supporting facts had overlapping labels | Experience, How I work, and Skills & education establish the main groups; engineering, UI/UX, and user collaboration are subtopics | Readers can scan related facts together |
| UI/UX link group and its children both added 24px top margins | A single 16px group margin; wrapped link rows have a 4px gap | Evidence links remain attached to the paragraph they support |

Validation: production build including TypeScript, targeted ESLint, and whitespace checks passed. Browser checks used isolated Chromium contexts through the working local CDP connection, without touching existing tabs. Only Home, Projects, and About were visited. Those routes were checked at 320, 390, and 1440px in both themes (18 views). The final 390/1440 report records 12 views, zero overflow, and zero runtime errors. Project/Other builds action heights, type size and persistent underlines were asserted, as were the explicit homepage action labels and earlier About experience order. The 320px pass additionally verified the exact 16px UI/UX paragraph-to-link gap and keyboard-visible focus clearing the sticky header. Home-to-Projects navigation and filtering worked in both desktop and mobile contexts. Screenshots of the revised layouts, project actions, and narrow About page were visually inspected and compared with the baseline.

This is an implementation and browser review, not a user study or Safari/Firefox certification. Project facts, role dates, skills, education, portfolio branding, and the compact theme-control treatment were preserved. No push or deployment was performed.

## Copy email compatibility fix

Reproduced on `http://10.137.51.47:3014/contact`: `isSecureContext` was false, `navigator.clipboard` was absent, and the previous implementation showed Copy unavailable. The component now prefers the modern Clipboard API when exposed in a secure context, then falls back to selection copying for local HTTP previews or a denied async write. The temporary readonly field is removed and previous focus/selection restored in a finally block. Success is reported only after the Clipboard API resolves or the compatibility copy command returns true; when both fail, the manual-copy/email-link message remains.

The compatibility use of deprecated `execCommand("copy")` is intentionally limited to this fallback because HTTP LAN previews cannot expose the secure-context Clipboard API. References: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText and https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand . Existing regression failure coverage now blocks both mechanisms so it still verifies the genuine failure state.

Production build with TypeScript, targeted ESLint, script syntax, and diff whitespace checks passed. Six isolated Chromium browser scenarios passed on Contact only: LAN HTTP mobile fallback; localhost modern API; rejected modern write with fallback; absent modern API with fallback; both methods blocked; LAN HTTP keyboard activation. Successful cases verified actual clipboard contents equal the expected email through a secure-origin reader, returning only the comparison result. Tests also confirmed no leftover temporary fields, restored focus, stable viewport position, no horizontal overflow, and no page errors. The blocked case retained honest failure feedback. The local report is in ignored `output/review/clipboard-fix/report.json`. Physical-device Safari is not verified.

## Copy feedback layout stability

The copy confirmation previously participated in the same wrapping flex group as its button; adding text enlarged that group and could move the button relative to Write an email. Contact now uses a dedicated action grid, with copy feedback in its own full-width row and space reserved for two lines. At 400px and below the buttons intentionally stack from the initial render; above that they sit side by side. Feedback does not determine the layout.

Production build including TypeScript, targeted ESLint, and whitespace checks passed. Contact-only browser tests at 320, 390, 414, 768, and 1440px in both themes checked initial, copy-success, and forced-copy-failure states. All ten combinations preserved each button's x/y position and width/height, as well as the supporting note's y position, within 0.5px. Feedback remained below the buttons with no overlap or horizontal overflow. Representative success/error screenshots were visually inspected. Measurements and captures are retained locally in ignored `output/review/copy-feedback-layout/`. The clipboard fallback logic itself is unchanged from the previous verified fix.

## Logo option 3 implementation and independent compatibility review

The user selected logo colour option 3. Header geometry is unchanged from `/Users/rohitmahar/Downloads/rm-logo.svg` (the sage/ivory source has identical paths). BrandLogo uses the current slash and text tokens in each theme, without altering the website palette. Favicon SVG uses the same paths and approved dark pair on #1b1e19. Added a multi-size ICO and an opaque Apple PNG derived by browser rasterisation of that SVG. Original supplied files are untouched.

| Before | After | Why |
| --- | --- | --- |
| Font-based rm header and favicon | Supplied vector monogram geometry | Identity is consistent and independent of font rendering |
| Fixed asset colours | Existing mode-aware slash/ink fills in header | Matches option 3 and preserves site colours |
| SVG icon only | SVG + 16/32/48/64px ICO + 180px Apple PNG | Browser and home-screen format fallbacks |

The read-only logo_compatibility sub-agent verified exact path preservation, accessible home-link naming, hidden/nonfocusable inner SVG, theme contrast, valid ICO directories and decoded payload sizes, and the 180px opaque-corner Apple PNG. No blocking compatibility issue was found. Its concrete limitation is that at 16px the mark occupies approximately 14×8px, so the curved separation is a tiny antialiased notch; individual initials should not be promised as fully legible.

Primary verification: production build with TypeScript, targeted lint and diff checks passed. Homepage-only browser checks covered 320, 390, and 1440px in both schemes, plus manual theme switching, reload persistence, and OS-theme changes. Header height remains 68px on phones / 112px on desktop, logo/navigation do not collide, and no horizontal overflow was found. Generated metadata advertises ICO, SVG sizes=any, and Apple PNG 180×180; all three asset URLs returned 200 with the expected MIME types. Rendered logo and 16px favicon samples were visually inspected. Browser reports/captures are in ignored output/review/logo/. Safari/Firefox and actual OS home-screen installation were not run; format checks and published file conventions support those fallbacks, not a claim of device certification.

The user separately requested mobile type options before application. Current, equal-size, and swapped-size variants were rendered only in isolated temporary browser previews at 390px in both themes. An additional typography-only 320px check could not run because its fresh browser tab crashed; this does not invalidate the earlier successful 320px logo checks. No hero typography styles were changed in the project. Preview comparisons are /tmp/mobile-type-options-light.png and /tmp/mobile-type-options-dark.png.

## Scoped portfolio motion — 2026-10-30

Traceable baseline: `portfolio-before-motion-2026-10-30` (374f2ab). Implemented the approved motion suggestions except theme-toggle and copy-confirmation animation. Their components and existing styles are unchanged; mobile typography options remain unapplied.

| Before | After | Why |
| --- | --- | --- |
| Screenshot disappears when opening notes | Selected screenshot frame morphs into its detail frame in 240ms | Connect the preview and the page it opens |
| Project filters replace the grid abruptly | Native card reflow with entry/exit fades | Preserve spatial context when categories change |
| Active route underline jumps | One underline glides in 220ms for pointer navigation | Make route selection visible without moving text |
| Static hero slash | 200ms reveal once per tab session | A short introduction to the existing brand character |
| Static screenshot hover | 1.02× image zoom on desktop fine pointers | Signal the clickable project preview |

Verification: production build and TypeScript passed; ESLint passed for all changed TS/TSX files. Full repository lint still reports 22 pre-existing errors in CommonJS verification scripts and the unused ThemeProvider; these were not changed in this task. Focused Playwright checks used the working Chrome CDP session, with isolated contexts at 1440px/light and 390px/dark, plus reduced-motion and missing-View-Transitions cases. Checks covered filters and quick changes, native transition readiness without duplicate-name errors, screenshot-route continuity and cleanup, browser back, active underline position, no horizontal overflow, and no page errors. Extra checks cover keyboard activation without animation, one-time slash/session behavior, Next Shelf's two-image frame, destination focus, and actual underline transition duration. Representative project-grid and detail screenshots were visually inspected. Reports and captures are in ignored `output/review/motion/`. Chrome was tested; Safari and Firefox fallback behavior was not tested on actual browsers. Navigation back is normal Next/browser navigation rather than an added reverse-cover animation.

Reference patterns: [native same-document transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API), [Next App Router coordination reference](https://github.com/shuding/next-view-transitions), and [Emil Kowalski's animation guidance](https://emilkowal.ski/ui/good-vs-great-animations). Implementation keeps stable installed React/Next versions and does not import that transition library.

## Lenis, section entrances, and brand motion — 2026-10-30

Baseline: `portfolio-before-brand-motion-2026-10-30` (5ba63af). The approved application covers gentle desktop scrolling, a coordinated homepage entrance, Work/About section entrances, and one Pixelwind illustration, with additional subtle logo and page-heading slash motion. Existing typography, colours, favicon geometry/assets, theme toggle, and copy feedback are preserved.

| Before | After | Why |
| --- | --- | --- |
| Native wheel scrolling | Gentle Lenis smoothing for hover/fine-pointer users | Softer desktop scrolling; touch remains native |
| Independent hero-slash reveal | One coordinated name, role, and slash entrance | The homepage introduction feels like a single gesture |
| Static logo | Brief two-shape entrance and slight desktop hover separation | A small identity cue using the supplied geometry |
| Static primary-heading slash | Short reveal and settling rotation on route changes | Carry the homepage slash behaviour to Work/Projects and other primary headings |
| Static Work/About sections | Small one-time section entrances | Establish a reading rhythm without obscuring prose |
| Static Pixelwind example | Explicit equivalent-style swap through olive tiles | Tie a playful effect to the actual tool |

The new React Bits-inspired effects use native Web Animations/IntersectionObserver rather than adding GSAP for these limited requirements. Lenis 1.3.27 is an actual pinned dependency, with its official CSS. Shell npm DNS was unavailable, and an offline whole-repo install hit an unrelated uncached Tailwind optional package. The official npm tarball was fetched through an isolated browser context, verified against the registry SHA-512 integrity, installed in isolation, and copied into ignored node_modules. The tracked manifest/lock entry uses the normal registry URL/version/integrity, with no temporary-file dependency or vendored runtime source. Existing pnpm-lock.yaml and unrelated work were untouched.

Production build, TypeScript, changed-file ESLint and diff whitespace checks passed. Focused Chrome/Playwright coverage used 1440px/light desktop, 390px/dark touch, and 320px/light reduced-motion contexts, plus a desktop/dark continuity check. Checks cover logo/hero/heading entrance calls and settled styles, unchanged logo hit area during hover, no horizontal overflow, desktop smoothing and mobile-native scrolling, live reduced-motion teardown/restart, Pixelwind pointer/keyboard toggles with stable button bounds, native desktop anchors and mobile hash navigation, and no browser page errors. The existing image expansion and project-filter transitions also remain functional alongside Lenis, with no post-navigation scroll drift. The mobile notes sidebar is intentionally hidden by existing CSS, so its anchor links were tested by visible clicking on desktop and direct hash navigation on mobile.

Beginning/midpoint/end frames of the hero and Projects heading were captured in an isolated paused-animation preview and visually inspected, alongside settled mobile Work and Pixelwind views. Work content and heading slash remain readable with JavaScript disabled. Artifacts are retained in ignored `output/review/brand-motion/`. The CDP desktop wheel input was observed to double the requested synthetic delta before DOM dispatch (400 requested → 800 delivered → 800 scrolled); this was separately checked to distinguish browser input scaling from Lenis amplification. Safari/Firefox and actual phone hardware were not run.

Final follow-up checks confirmed the homepage session flag is saved only after its entrance completes (so development Strict Mode cleanup cannot suppress the real introduction), and enabling reduced motion during Pixelwind's tile animation cancels the motion, completes the intended swap, and releases the button immediately. The final production rebuild and changed-file lint passed after those refinements.

## Header underline, wordmark expansion, and slash revisions — 2026-10-30

Baseline tag: `portfolio-before-header-refinement-2026-10-30` (55907f9). User scope includes removing the duplicate hover underline, correcting the slash's last-frame handoff while retaining its blade-like reveal, expanding the logo into the full name, matching visible name size and whole-word theme colours, then adding the linked Stroke Text-style hero loop and gentler easing.

| Before | After | Why |
| --- | --- | --- |
| Hover underline competes with the active slider | Hover colour plus one active underline | Avoid two conflicting navigation indicators |
| Slash clip ends at its text box and drops rotation/masking | Heading wipe ends at the same oversized resting clip; no rotation | Preserve the blade-like reveal without cropping a trailing edge |
| Tiny r/m hover separation | SVG initials separate into `rohit mahar` using the site family | Reveal the actual name as requested |
| Smaller/thinner expanded text with only r tinted | 44px/700 wordmark; entire first/last words use the corresponding logo tokens | Match the visible letter height/weight and carry theme-aware logo colours |
| One-time hero slash reveal | Native SVG Stroke Text-style draw/fill/reverse loop with pause control | Apply the user's linked continuous-animation direction |
| Fast initial sweep | Gentler ease-in/ease-out, slower heading draw and hero loop | Soften the lightsaber motion |

The published Emil Kowalski guidance informed explicit transition properties, interruptible hover states and immediate keyboard states; Impeccable's polish/craft guidance informed scoped refinement and preserving the incumbent identity; Taste informed preserving the approved family/palette. Those three packages are not installed, and their unavailable proprietary/context inspectors were not claimed to have run. Existing project design context was read directly. References: [Emil](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md), [Impeccable polish](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/polish.md), [Taste](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md), and [Stroke Text source](https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/TextAnimations/StrokeText).

Earlier focused headed-Chrome checks verified the single-underline behaviour, an initial wordmark expansion/collapse, unchanged nav position, keyboard/reduced-motion states, and mobile compact layout. A later oversized-clip implementation produced identical last-frame/resting PNGs for Home/Work/Projects at 1440px/light and 390px/dark. These captures precede the final continuous hero loop and timing changes. Desktop pointer emulation occasionally retained a previous mobile context's state over CDP; isolated desktop checks distinguished this from application behaviour. A requested headless attempt crashed before loading a page with macOS Mach-port bootstrap errors; Launch Services also failed. The user chose to retain headed testing, then explicitly requested that local testing stop and said they would verify the rest.

**Final verification status:** the subsequent continuous HeroSlash component, final 44px whole-word colours, and gentler easing were reviewed in source only. No build, lint, browser test, or screenshot was run after the user's stop-testing instruction. Earlier browser reports in ignored `output/review/header-refinement/` are historical evidence, not verification of this final version. The preview was switched from the prior production build to the development server on port 3014 so the user's review receives current source. No commit is being represented as tested beyond that evidence.

Hero loop starting-state follow-up: removed the negative phase offset that initially displayed the completed slash. In normal-motion mode the native layout glyph is now hidden before hydration as well; the SVG starts at its empty first frame, holds it through a 200ms positive delay, then draws in. Both animations use backwards/forwards fill so no completed outline can flash during that delay. Reduced-motion mode retains the static native glyph. No local tests were run, following the user's standing instruction.

## Custom SVG letters for the expanding name

The user requested custom vector letters rather than an approximate font match. The implementation now preserves the supplied r/m paths as the actual, continuously visible initials. It adds only the required geometric letterforms (o/h/i/t/a), reusing h/a/r where repeated, with matched stem thickness, counters, baseline and SVG scale. The m translates into its full-name position while suffixes appear; it no longer fades into a differently shaped text m. Complete first/last groups retain their light/dark colour tokens. Compact header and favicon geometry are preserved.

| Before | After | Why |
| --- | --- | --- |
| SVG initials crossfade into Arial letters | Same r/m paths remain visible throughout | Remove the font-shape handoff |
| Full name width measured from HTML text | Fixed vector layout in shared glyph data | Keep glyph scale and spacing independent of installed fonts |
| Startup animation selects every logo path | Startup animation selects only r/m | Keep added letters hidden until expansion |

The single source of glyph geometry is `src/data/brand-glyphs.json`; `public/images/rm-wordmark.svg` is the complete standalone export. This refinement uses vector/code-native assets, not generated bitmap imagery. No local build, lint, browser check or visual rendering was run, as requested by the user; only source review and formatting were performed. The existing development server will pick up the changes for the user's review.

## Sequential letter tuck, complete m, and optical corrections

Replaced the partial m outline with a full three-stem path. In compact state its left portion sits behind r; expanded, the complete unmodified shape slides into view. The two names now use recursive SVG groups: each trailing letter moves within its predecessor's coordinates and is clipped at that predecessor's edge. Reversed DOM paint order places the predecessor in front. Explicit reversed delays implement the user's closing sequences, and m waits for both chains to finish before returning. There are no opacity fades or m path morphs. The user also requested a smaller right gap after the opening r and a lighter o; the r/o kerning is reduced by 40 units, subsequent positions shift together to retain the remaining spacing, and only o's inner counter expands slightly.

| Before | After | Why |
| --- | --- | --- |
| Suffixes fade in/out | Each letter slides behind its predecessor in order | Match the requested t/i/h/o and r/a/h/a tuck chains |
| m contains only the exposed part of the interlocked mark | Complete m drawn behind r, then translated as a whole | Show all three stems when expanded |
| Opening r/o gap looks loose | Tighter first pair; later gaps preserved | Correct optical spacing without redistributing the rest |
| o reads heavier than straight-stem letters | Slightly expanded inner counter | Compensate optically while preserving the outer shape |

Source and standalone SVG remain in sync. Production build/typecheck passed before the final optical adjustments; the preview is rebuilt again after those changes. No browser interaction or screenshot tests were run, per the user's preference to verify visually themselves.
