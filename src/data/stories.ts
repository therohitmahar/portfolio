export type Story = {
  audience: string;
  contribution: string;
  focus: string;
  takeaway: string;
  sections: { id: string; title: string; paragraphs: string[] }[];
  media?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
    secondary?: { src: string; alt: string; width: number; height: number };
  };
};
export const stories: Record<string, Story> = {
  "pr-tracker": {
    audience: "Developers reviewing pull-request activity across repositories",
    contribution: "Personal product · frontend and sync workflow",
    focus: "Reliable imports",
    takeaway: "3,000+ PR records successfully synced across repositories.",
    media: {
      src: "/project-media/pr-tracker.webp",
      alt: "PR Tracker interface for exploring GitHub pull-request activity",
      caption:
        "PR Tracker landing page · built-in sample dashboard; preview figures are illustrative.",
      width: 1440,
      height: 1000,
    },
    sections: [
      {
        id: "challenge",
        title: "An import should survive an interruption",
        paragraphs: [
          "Pull-request history is larger than one response. Fetching it across repositories means handling pagination, partial results, and GitHub rate limits. Starting again after every interruption wastes the work already completed.",
          "I separated the saved history from the current sync operation. The interface can show cached records while an import continues, instead of making every view depend on a fresh request.",
        ],
      },
      {
        id: "decisions",
        title: "Checkpoints, caching, and cross-tab coordination",
        paragraphs: [
          "Sync checkpoints record progress through the import. IndexedDB stores history in the browser, and rate-limit recovery lets the workflow continue after GitHub becomes available again.",
          "Multiple tabs introduce another failure mode: duplicate imports. An expiring owner lock and storage events coordinate sync across tabs and reduce duplicate imports.",
        ],
      },
      {
        id: "result",
        title: "What the project demonstrates",
        paragraphs: [
          "The app has successfully synced more than 3,000 PR records. That is an observed record count, rather than a claim about users or maximum capacity.",
          "The dashboard presents activity and merge trends; web analytics captures visits and referral sources. The main engineering story is preserving useful state when a long-running import is interrupted.",
        ],
      },
    ],
  },
  "context-flow-ai": {
    audience:
      "People who reuse instructions and reference material across AI prompts",
    contribution: "Personal product · visual workspace and editing state",
    focus: "Graph editing & recovery",
    takeaway:
      "Reusable context, undo/redo, and recoverable drafts in one workspace.",
    media: {
      src: "/project-media/context-flow-ai.webp",
      alt: "Context Flow AI visual workspace with context blocks and composer connections",
      caption:
        "Context Flow AI · local editor with built-in blocks; no AI response was generated.",
      width: 1440,
      height: 1000,
    },
    sections: [
      {
        id: "challenge",
        title: "Make context reusable",
        paragraphs: [
          "A long prompt often contains several different things: instructions, source material, and the current task. Editing one part can disturb the rest, and reusing it means copying the whole prompt.",
          "I built a workspace where text, URLs, and files become reusable context blocks. Connections and @mentions make the relationship between those blocks and the composer explicit.",
        ],
      },
      {
        id: "decisions",
        title: "Treat the graph as editing state",
        paragraphs: [
          "React Flow handles the canvas, while Zustand stores the graph and editing history. Undo/redo restores related nodes and edges together. I record drag history at drag-end, rather than turning every position update into a separate undo step.",
          "Local and cloud drafts support recovery after leaving the workspace. Recovery compares saved drafts by timestamp so an older cloud version does not silently replace more recent local edits.",
        ],
      },
      {
        id: "result",
        title: "The work behind the canvas",
        paragraphs: [
          "The graph, undo history, and saved draft need to stay consistent. Returning to a flow restores the newest saved state, including its viewport and output history.",
        ],
      },
    ],
  },
  "next-shelf": {
    audience: "Readers keeping a personal library and reading progress",
    contribution: "Personal product · React Native app and persistence",
    focus: "Local data & backup compatibility",
    takeaway:
      "Reading progress and reviews stay on-device, with versioned export and restore.",
    media: {
      src: "/project-media/next-shelf.webp",
      alt: "Next Shelf reading-progress screen for a demonstration book",
      caption:
        "Next Shelf · Expo web app at a mobile viewport, using a demonstration library.",
      width: 390,
      height: 844,
      secondary: {
        src: "/project-media/next-shelf-mobile.webp",
        alt: "Next Shelf library with a book in the reading list",
        width: 390,
        height: 844,
      },
    },
    sections: [
      {
        id: "challenge",
        title: "Keep the library between sessions",
        paragraphs: [
          "A reading tracker is personal data: books to read, progress, ratings, and reviews. It needs to persist through routine edits and remain recoverable when the app changes.",
          "Open Library supplies book-search results and catalogue metadata. Progress, notes, and reviews belong to the personal library and are stored on-device.",
        ],
      },
      {
        id: "decisions",
        title: "State transitions and recoverable backups",
        paragraphs: [
          "A reducer manages reading-status changes and related library updates. Keeping those transitions together makes it easier to reason about what happens when a book moves between lists.",
          "JSON backups carry a schema version. Restore logic migrates older formats, and import merging preserves existing local progress, notes, reviews, and custom covers.",
        ],
      },
      {
        id: "result",
        title: "Verify the data that matters",
        paragraphs: [
          "Jest tests cover reading-state behavior and backup compatibility. Those checks focus on preserving the library and correctly restoring previous exports, where a regression would matter more than a visual change.",
        ],
      },
    ],
  },
  pixelwind: {
    audience: "Frontend developers working from exact layout measurements",
    contribution: "Personal package · CSS utilities and generation",
    focus: "Small tooling",
    takeaway:
      "A stylesheet of pixel-based utilities, usable without a configuration step.",
    sections: [
      {
        id: "challenge",
        title: "Make a measured value easy to express",
        paragraphs: [
          "When a design calls for a value between the usual spacing-scale steps, writing a one-off rule can be slower than expressing that value directly. Pixelwind provides explicit pixel-based utility classes for these situations.",
        ],
      },
      {
        id: "decisions",
        title: "Ship CSS rather than another runtime",
        paragraphs: [
          "The package produces regular and minified stylesheets for spacing, sizing, gaps, and type. It can be imported by a bundler or included as a stylesheet, without a framework-specific runtime.",
          "The local source includes large-screen scaling for spacing and sizing at 1600px and above. That behavior is a deliberate exception to literal pixel values and matters when choosing where to use the utilities.",
        ],
      },
      {
        id: "result",
        title: "Keep the package contract small",
        paragraphs: [
          "Snapshot tests compare generated readable and minified CSS with both committed snapshots and shipped stylesheets. This keeps changes to the generator visible in the package output.",
        ],
      },
    ],
  },
  "auto-dynamic-importer": {
    audience: "Next.js developers refactoring component imports in VS Code",
    contribution:
      "Personal extension · editor command and import transformation",
    focus: "Import refactoring",
    takeaway:
      "Convert selected React imports into Next.js dynamic imports with SSR control.",
    sections: [
      {
        id: "challenge",
        title: "Remove the mechanical part of lazy loading",
        paragraphs: [
          "Moving a component to a dynamic import requires rewriting the import and adding the dynamic helper. Doing that repeatedly is mechanical work that fits naturally into an editor command.",
        ],
      },
      {
        id: "decisions",
        title: "Keep the transformation close to the selection",
        paragraphs: [
          "The extension supports selected default component imports, multiple selections, command-palette access, and an SSR option. The transformation updates the component import and adds the helper when needed.",
          "The choice to lazy-load a component still belongs to the developer. An import transformation does not by itself establish a performance improvement.",
        ],
      },
      {
        id: "result",
        title: "A focused editor utility",
        paragraphs: [
          "The automatic listener guards against paste events and its own edits, while manual commands operate on the selected default imports.",
        ],
      },
    ],
  },
  "quick-wrapper": {
    audience: "Developers editing JSX or HTML in VS Code",
    contribution: "Personal extension · shortcut and command integration",
    focus: "Editor workflow",
    takeaway:
      "A configurable shortcut to VS Code’s existing Emmet wrapping command.",
    sections: [
      {
        id: "challenge",
        title: "Give an existing action a shorter path",
        paragraphs: [
          "Wrapping selected markup is already supported by Emmet. The friction was finding and invoking the command while editing.",
        ],
      },
      {
        id: "decisions",
        title: "Reuse the editor’s implementation",
        paragraphs: [
          "Quick Wrapper calls the built-in “Wrap with Abbreviation” command and exposes a configurable shortcut. It leaves abbreviation parsing and editing behavior to Emmet.",
          "That kept the extension small and avoided maintaining a separate markup transformation for an operation the editor already implements.",
        ],
      },
      {
        id: "result",
        title: "A small amount of code for a repeated task",
        paragraphs: [
          "The extension has no external runtime dependencies. Its scope is intentionally narrow: make one editing action easier to reach.",
        ],
      },
    ],
  },
  "frontend-agent-kit": {
    audience: "Developers using coding agents in React and Tailwind projects",
    contribution: "Personal toolkit · portable instructions and UI standards",
    focus: "Complete interface states",
    takeaway:
      "Reusable instructions for controls, validation, feedback, and data states.",
    sections: [
      {
        id: "challenge",
        title: "Write down what “finished” means",
        paragraphs: [
          "An interface can look complete while saves happen silently, errors appear without context, or a data view goes blank during loading. Repeating the same expectations in every coding session is easy to get wrong.",
        ],
      },
      {
        id: "decisions",
        title: "Keep standards portable",
        paragraphs: [
          "The kit packages expectations as instruction files and focused skills for controls, forms, feedback, uploads, and loading, empty, and error states.",
          "Developers can copy a single concern or a combined React/Tailwind template. There is no CLI or runtime dependency to add to the product.",
        ],
      },
      {
        id: "result",
        title: "Review behavior as well as appearance",
        paragraphs: [
          "The public repository contains the reusable files and a review checklist. The standards travel with the repository so controls, validation, and feedback can be reviewed against the same expectations.",
        ],
      },
    ],
  },
  "lineupx-settings": {
    audience: "Users configuring candidate-field groups in LineupX",
    contribution: "Professional frontend work · legacy interface redesign",
    focus: "Navigation within an existing product",
    takeaway:
      "Sidebar navigation replaced the section dropdown while reusing shared controls.",
    sections: [
      {
        id: "challenge",
        title: "Make the section structure visible",
        paragraphs: [
          "The existing candidate-field settings used a dropdown to move between groups. I redesigned that navigation within the production product, keeping the established field groups and editing behavior.",
        ],
      },
      {
        id: "decisions",
        title: "Change navigation, reuse the building blocks",
        paragraphs: [
          "The revised screen exposes sections in a sidebar. The selected group stays visible alongside the field table, rather than being hidden behind the section selector.",
          "I reused the shared table and button components. This made the redesign part of the existing product’s component system instead of introducing a second set of controls.",
        ],
      },
      {
        id: "result",
        title: "Production work with a bounded scope",
        paragraphs: [
          "This was a frontend navigation and layout change at LineupX. It reflects my recent UI/UX interest through work on an existing product, alongside collaboration with users, product, and backend colleagues.",
        ],
      },
    ],
  },
  clearmind: {
    audience: "Visitors exploring counseling services and therapist options",
    contribution:
      "Personal UI exploration · site structure and booking screens",
    focus: "Service discovery & form layout",
    takeaway:
      "A multi-page counseling-site exploration with a stepped booking interface.",
    media: {
      src: "/project-media/clearmind.webp",
      alt: "ClearMind scheduling interface with session mode, calendar, and available time choices",
      caption:
        "ClearMind · actual scheduling interface from the UI exploration; no request was submitted.",
      width: 811,
      height: 746,
    },
    sections: [
      {
        id: "challenge",
        title: "Move from service information to a request",
        paragraphs: [
          "A counseling website needs to introduce its services and help a visitor understand the next step. I used this project to explore information hierarchy, service pages, therapist selection, and a staged booking layout.",
        ],
      },
      {
        id: "decisions",
        title: "Make each step manageable",
        paragraphs: [
          "Dedicated routes separate services, background information, resources, and contact details. The booking screens divide therapist, schedule, and contact information into smaller steps.",
          "This is a UI exploration with local request-style feedback, not a connected clinical scheduling or payment service.",
        ],
      },
      {
        id: "result",
        title: "An interface study",
        paragraphs: [
          "The project demonstrates page structure, responsive composition, and form flow. Resource pages also combine search and category filters with visible counts and empty states.",
        ],
      },
    ],
  },
};
