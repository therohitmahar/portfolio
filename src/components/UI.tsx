import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { stories } from "@/data/stories";
import type { Work } from "@/data/work";
import BrandSlash from "./BrandSlash";
import ArrowIcon from "./ArrowIcon";
import PixelwindExample from "./PixelwindExample";

export function PageIntro({
  label,
  title,
  slash = false,
  children,
}: {
  label: string;
  title: string;
  slash?: boolean;
  children: ReactNode;
}) {
  return (
    <header className="page-intro">
      <h1>
        {slash && <BrandSlash className="heading-slash" />}
        {title}
      </h1>
      <div className="page-description">{children}</div>
      <p className="page-context">{label}</p>
    </header>
  );
}
export function TextLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return external ? (
    <a
      className={`text-link ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <ArrowIcon />
    </a>
  ) : (
    <Link className={`text-link ${className}`} href={href}>
      {children}
      <ArrowIcon direction="right" />
    </Link>
  );
}
export function ProjectMeta({ project }: { project: Work }) {
  const story = stories[project.slug];
  return (
    <dl className="project-meta">
      <div>
        <dt>Contribution</dt>
        <dd>{story.contribution}</dd>
      </div>
      <div>
        <dt>Built with</dt>
        <dd>{project.stack}</dd>
      </div>
      <div>
        <dt>Focus</dt>
        <dd>{story.focus}</dd>
      </div>
    </dl>
  );
}
export function ProjectMedia({
  slug,
  priority = false,
  compact = false,
}: {
  slug: string;
  priority?: boolean;
  compact?: boolean;
}) {
  const media = stories[slug]?.media;
  if (!media) return <ToolArtwork slug={slug} compact={compact} />;
  return (
    <figure className={`project-figure media-${slug}`}>
      <div className="project-image" data-project-cover={slug}>
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes="(max-width: 650px) 100vw, (max-width: 1000px) 85vw, 1100px"
          priority={priority}
        />
        {media.secondary && (
          <Image
            src={media.secondary.src}
            alt={media.secondary.alt}
            width={media.secondary.width}
            height={media.secondary.height}
            sizes="(max-width: 650px) 40vw, 400px"
            priority={priority}
          />
        )}
      </div>
      <figcaption>{media.caption}</figcaption>
    </figure>
  );
}
const snippets: Record<
  string,
  { label: string; before: string; after: string; caption: string }
> = {
  "auto-dynamic-importer": {
    label: "React import → Next.js dynamic import",
    before: "import Chart from './Chart';",
    after:
      "import dynamic from 'next/dynamic';\n\nconst Chart = dynamic(\n  () => import('./Chart'),\n  { ssr: false }\n);",
    caption:
      "Illustrated transformation · the SSR option is chosen by the developer.",
  },
  "quick-wrapper": {
    label: "Selection → Emmet abbreviation",
    before: "<h2>Reading list</h2>\n<p>Pick up where you left off.</p>",
    after:
      '<section class="library">\n  <h2>Reading list</h2>\n  <p>Pick up where you left off.</p>\n</section>',
    caption: "Illustrated usage · wrap the selection with section.library.",
  },
  "frontend-agent-kit": {
    label: "A shared definition of complete UI",
    before:
      "Reusable controls\nInline validation\nLoading, empty, and error states",
    after:
      "Action → Visible feedback\n\nSave     → Saving / Saved / Error\nUpload   → Progress / Complete / Error\nData     → Loading / Empty / Ready",
    caption:
      "Illustration of the standards covered by the public instruction files.",
  },
  pixelwind: {
    label: "Explicit values → Reusable CSS utilities",
    before: "npm install pixelwind",
    after:
      '<div class="p-13px">\n  Measured padding, expressed directly.\n</div>',
    caption:
      "Illustrated usage · spacing and sizing auto-scale on screens ≥1600px in the local version.",
  },
};
export function ToolArtwork({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  if (slug === "pixelwind" && !compact) return <PixelwindExample />;
  const example = snippets[slug];
  if (!example) return null;
  return (
    <figure
      className={`tool-artwork artwork-${slug} ${compact ? "artwork-compact" : ""}`}
    >
      <div className="artwork-label">{example.label}</div>
      <div className="code-comparison">
        <pre tabIndex={compact ? undefined : 0} aria-label="Starting point">
          <code>{example.before}</code>
        </pre>
        <span className="code-arrow" aria-hidden="true">
          ↓
        </span>
        <pre tabIndex={compact ? undefined : 0} aria-label="Result">
          <code>{example.after}</code>
        </pre>
      </div>
      <figcaption>{example.caption}</figcaption>
    </figure>
  );
}
