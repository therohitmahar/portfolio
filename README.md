# Rohit Mahar — portfolio

A Next.js portfolio for professional frontend work, personal apps, developer tools, and UI explorations. The approved design baseline is `portfolio-landmark-2026-10-28`.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run build
npm run start -- --port 3016
```

## Structure

- `/`: short introduction and links to professional work and personal projects.
- `/work`: LineupX experience and contributions. Candidate-field settings stays text-only.
- `/projects`: filterable archive of 8 projects, plus earlier builds.
- `/projects/[slug]`: personal product and tool notes.
- `/work/lineupx-settings`: professional redesign notes.
- `/about`: background, approach, UI/UX interest, skills, and education.
- `/contact`: email, copy action, and professional profiles.
- `/experience` and old `/work/[personal-project]` addresses redirect to the current routes.

`src/data/work.ts` owns project identity and public links. `src/data/stories.ts` owns the implementation stories and media. The earlier `src/data/projects.ts` and legacy image edits are preserved but are not used by the redesigned pages.

Shared tokens live in `src/app/tokens.css`; shared patterns and page layouts live in `globals.css`. `UI.tsx` provides page introductions, links, project metadata, screenshots, and code-based illustrations. See [the design system](design/DESIGN_SYSTEM.md).

The site follows the system colour scheme by default. The header toggle supports an explicit opposite scheme, persistence, and tab synchronisation. Switching back to the current system scheme restores automatic appearance. Screenshots retain their original product colours.

## Media and content

Actual project screenshots are stored under `public/project-media/`, with a capture manifest. The PR Tracker landing has a built-in sample dashboard; Next Shelf uses an isolated demonstration library. Tool visuals are labelled usage illustrations. Interactive explanations on the three product detail pages are sample models, not integrations. ClearMind is a UI exploration with no connected booking-delivery service.

Public source links are restricted to repositories verified as public. Source evidence and qualifications are recorded in [SOURCE_EVIDENCE.md](design/SOURCE_EVIDENCE.md). The current resume is `public/rohit-mahar-resume.pdf`.

## Verification

```sh
npx tsc --noEmit
npm run build
```

The Playwright script uses a locally installed or npm-cached Playwright package. When direct browser launches are unavailable, start a dedicated Chrome profile from Terminal:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-address=127.0.0.1 \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/rohit-portfolio-browser \
  http://localhost:3016
```

Then run:

```sh
PLAYWRIGHT_CDP_URL=http://127.0.0.1:9222 \
PORTFOLIO_URL=http://localhost:3016 \
node scripts/verify-portfolio.cjs
```

The verifier checks every current content route and 404 at 320, 390, 768, and 1440px in both themes. It also checks filters, copy success/failure, keyboard focus, theme persistence, cross-tab/system changes, demos, redirects, and internal targets. Reports and screenshots are saved under ignored `output/review/final/`. It creates and closes isolated browser contexts; it does not use your personal browser session.

Run browser QA commands sequentially when attaching to the same Chrome instance. Separate concurrent Playwright connections can interfere with emulated colour-scheme state.
