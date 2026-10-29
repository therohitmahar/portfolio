import { PageIntro, TextLink } from "@/components/UI";
export default function NotFound() {
  return (
    <section className="page-content not-found-page">
      <PageIntro label="404 / Page not found" title="That page isn’t here.">
        <p>
          The address may be outdated or mistyped. You can find my professional
          work and personal projects below.
        </p>
      </PageIntro>
      <div className="recovery-links">
        <TextLink href="/">Homepage</TextLink>
        <TextLink href="/work">Professional work</TextLink>
        <TextLink href="/projects">Personal projects</TextLink>
        <TextLink href="/contact">Contact</TextLink>
      </div>
    </section>
  );
}
