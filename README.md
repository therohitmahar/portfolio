# Rohit Mahar — portfolio

A Next.js portfolio with product notes, a filterable project archive, interface redesign notes, developer tools, and direct contact links.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run build` followed by `npm start` for a production preview.

## Content

- `src/data/work.ts`: curated projects, implementation notes, and verified public source links.
- `src/components/Portfolio.tsx`: homepage sections, archive filters, and small interaction demos.
- `/work`: professional experience and LineupX contributions.
- `/projects`: personal projects, developer tools, and interface explorations.
- `src/app/projects/[slug]/page.tsx`: personal project detail pages.
- `src/app/work/[slug]/page.tsx`: professional detail pages and redirects for previous project URLs.
- `src/components/ProjectDetail.tsx`: shared project-note presentation.
- `src/app/globals.css`: responsive layout, typography, focus states, and reduced-motion support.
- `public/rohit-mahar-resume.pdf`: updated resume.

The project visuals are interactive explanations, not screenshots or live integrations. They use sample state and reset on reload. The LineupX settings redesign is described in text. ClearMind is presented as a UI exploration. Only repositories verified as public have source links.

Existing images and the earlier `src/data/projects.ts` remain available, but the redesigned pages use `src/data/work.ts`. Existing route addresses (`/about`, `/projects`, `/experience`, `/contact`) remain supported.

## Verification

Run `npx tsc --noEmit` and `npm run build`. Before publishing, also check desktop and mobile layouts, keyboard navigation, archive filters, project demos, the resume, and outbound links in a browser.
