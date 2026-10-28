export type Work = {
  slug: string;
  name: string;
  kind: "Product" | "Tool" | "Interface";
  description: string;
  stack: string;
  live?: string;
  source?: string;
  problem: string;
  decisions: string[];
  evidence: string;
};

export const work: Work[] = [
  {
    slug: "pr-tracker",
    name: "PR Tracker",
    kind: "Product",
    description:
      "Explore GitHub pull-request history without starting every import from scratch.",
    stack: "Next.js · TypeScript · IndexedDB",
    live: "https://prs-tracker.vercel.app/",
    problem:
      "Pull-request history can span thousands of records. An interrupted import or a rate limit should not mean fetching everything again.",
    decisions: [
      "Save sync checkpoints so an interrupted import can resume.",
      "Cache records in IndexedDB and coordinate sync across browser tabs to avoid duplicate work.",
      "Show merge trends and activity across repositories; record visits and referral sources through web analytics.",
    ],
    evidence:
      "Successfully synced more than 3,000 PR records across repositories. Web analytics also records visits and referral sources.",
  },
  {
    slug: "context-flow-ai",
    name: "Context Flow AI",
    kind: "Product",
    description: "Assemble AI prompts from connected, reusable context blocks.",
    stack: "React · TypeScript · Zustand · React Flow",
    live: "https://context-stacker.vercel.app/",
    source: "https://github.com/therohitmahar/context-flow-ai",
    problem:
      "Long prompts mix instructions, reference material, and the current task. Reusing one part without losing the rest gets cumbersome.",
    decisions: [
      "Represent context as text, URL, and file nodes connected to a composer, with @mentions to reference individual blocks.",
      "Manage graph edits and undo/redo with Zustand.",
      "Save local and cloud drafts and recover work after an interruption.",
    ],
    evidence:
      "A working visual prompt workspace. The main engineering work is keeping graph state, editing history, and saved drafts consistent.",
  },
  {
    slug: "next-shelf",
    name: "Next Shelf",
    kind: "Product",
    description:
      "Keep a personal reading library, progress, and reviews on your device.",
    stack: "React Native · Expo · TypeScript",
    live: "https://nextshelf.vercel.app/",
    problem:
      "A reading tracker needs to preserve a personal library through everyday edits and backup restores, including backups created by older versions.",
    decisions: [
      "Use Open Library search to find books and persist personal reading data on-device.",
      "Use a reducer for reading-status changes, progress, ratings, and reviews.",
      "Add versioned JSON export and restore with migration support for older backups.",
    ],
    evidence:
      "Jest tests cover reading-state behavior, restoring backups, and compatibility with older backup formats.",
  },
  {
    slug: "pixelwind",
    name: "Pixelwind",
    kind: "Tool",
    description: "A CSS package for explicit pixel-based spacing and sizing.",
    stack: "CSS · npm",
    live: "https://therohitmahar.github.io/pixelwind/",
    source: "https://github.com/therohitmahar/pixelwind",
    problem:
      "Some interface work calls for exact pixel values rather than a predefined spacing scale.",
    decisions: [
      "Provide utility classes for spacing, sizing, gaps, and type.",
      "Keep the package usable without configuration or a build step.",
    ],
    evidence:
      "Install with npm install pixelwind. The source and documentation are public.",
  },
  {
    slug: "auto-dynamic-importer",
    name: "Auto Dynamic Importer",
    kind: "Tool",
    description:
      "Convert React component imports to Next.js dynamic imports in VS Code.",
    stack: "VS Code extension",
    live: "https://marketplace.visualstudio.com/items?itemName=therohitmahar.auto-dynamic-importer",
    source: "https://github.com/therohitmahar/Auto-Dynamic-Importer",
    problem:
      "Repeatedly rewriting component imports for lazy loading is mechanical editor work.",
    decisions: [
      "Support selected imports and multi-selection conversions.",
      "Offer SSR control and command-palette access.",
    ],
    evidence:
      "An editor utility; using dynamic imports still requires deciding which components benefit from lazy loading.",
  },
  {
    slug: "quick-wrapper",
    name: "Quick Wrapper",
    kind: "Tool",
    description:
      "Wrap selected code using an Emmet abbreviation and a shortcut.",
    stack: "VS Code extension",
    live: "https://marketplace.visualstudio.com/items?itemName=therohitmahar.quick-wrapper",
    source: "https://github.com/therohitmahar/quick-wrapper",
    problem:
      "Wrapping selected markup should be accessible without a repetitive sequence of editor commands.",
    decisions: [
      "Reuse VS Code’s built-in Emmet wrapping command.",
      "Expose a configurable keyboard shortcut.",
    ],
    evidence:
      "A deliberately small extension with no external runtime dependencies.",
  },
  {
    slug: "frontend-agent-kit",
    name: "Frontend Agent Kit",
    kind: "Tool",
    description: "Reusable frontend instructions for AI coding agents.",
    stack: "Documentation · React · Tailwind",
    source: "https://github.com/therohitmahar/frontend-agent-kit",
    problem:
      "Generated interfaces often omit loading states, clear validation, and reusable controls unless those expectations are written down.",
    decisions: [
      "Keep standards in portable instruction and skill files.",
      "Cover feedback, forms, loading, empty, and error states without requiring another framework.",
    ],
    evidence:
      "Public instruction files and templates that can be copied into an existing project.",
  },
  {
    slug: "lineupx-settings",
    name: "LineupX field settings",
    kind: "Interface",
    description:
      "Replace a section dropdown with navigation that keeps candidate-field settings in view.",
    stack: "React · SCSS · Shared components",
    problem:
      "The legacy settings screen used a section dropdown to move between candidate-field groups. I redesigned the navigation within the existing product.",
    decisions: [
      "Replace the section selector with sidebar navigation.",
      "Reuse the shared table and button components instead of introducing parallel controls.",
      "Keep the existing field groups and editing behavior.",
    ],
    evidence:
      "Implemented in the LineupX product using the existing field groups and shared components.",
  },
  {
    slug: "clearmind",
    name: "ClearMind",
    kind: "Interface",
    description:
      "A counseling website and an exploration of therapist selection and booking layouts.",
    stack: "Next.js · TypeScript · Tailwind",
    source: "https://github.com/therohitmahar/clear-mind",
    problem:
      "Explore how a counseling website can present services and guide a visitor through choosing a therapist and requesting a session.",
    decisions: [
      "Organize services, therapist information, and resources into dedicated routes.",
      "Break the booking interface into therapist, schedule, and contact steps.",
    ],
    evidence:
      "Built dedicated service and resource pages alongside a multi-step booking interface. This project explores layout, navigation, and form structure.",
  },
];

export const moreProjects = [
  {
    name: "ContextAI",
    description: "AI writing workspace and browser side panel",
    source: "https://github.com/therohitmahar/context-ai",
  },
  {
    name: "Weekly Update Composer",
    description: "Compose status updates from selected tasks",
  },
  {
    name: "Fourth Umpire",
    description: "Cricket scoring interface",
    source: "https://github.com/therohitmahar/fourth-umpire",
  },
  {
    name: "Ovis Garden Glow",
    description: "Gardening storefront",
    source: "https://github.com/therohitmahar/ovisgardenglow",
  },
  {
    name: "Meesho Reboot",
    description: "E-commerce interface project",
    source: "https://github.com/therohitmahar/meesho-Reboot",
  },
];

export function projectHref(project: Work) {
  return `/${project.slug === "lineupx-settings" ? "work" : "projects"}/${project.slug}`;
}
