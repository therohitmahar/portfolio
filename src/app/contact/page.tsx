import type { Metadata } from "next";
import { PageIntro, TextLink } from "@/components/UI";
import CopyEmail from "@/components/CopyEmail";
import ArrowIcon from "@/components/ArrowIcon";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rohit Mahar for frontend roles, project enquiries, and conversations about his work.",
};
export default function ContactPage() {
  return (
    <div className="page-content contact-page">
      <PageIntro label="Email & professional profiles" title="contact" slash>
        <p>
          For frontend roles, project enquiries, or a question about something
          I’ve built. Email is the most direct way to reach me.
        </p>
      </PageIntro>
      <section className="contact-primary" aria-labelledby="email-heading">
        <h2 id="email-heading">Email</h2>
        <a className="contact-address" href="mailto:therohitmahar@gmail.com">
          therohitmahar@gmail.com
        </a>
        <div className="contact-actions">
          <a className="primary-link" href="mailto:therohitmahar@gmail.com">
            Write an email <ArrowIcon />
          </a>
          <CopyEmail />
        </div>
        <p className="scope-note">
          “Write an email” opens your email app. You can also copy the address.
        </p>
      </section>
      <div className="contact-options">
        <section>
          <h2>LinkedIn</h2>
          <p>Professional background and experience.</p>
          <TextLink href="https://www.linkedin.com/in/therohitmahar/" external>
            View profile
          </TextLink>
        </section>
        <section>
          <h2>GitHub</h2>
          <p>Public repositories and developer tools.</p>
          <TextLink href="https://github.com/therohitmahar" external>
            Browse repositories
          </TextLink>
        </section>
        <section>
          <h2>Mumbai, India</h2>
          <p>
            Based in Mumbai. For role or project details, include the context in
            your email.
          </p>
          <TextLink href="/rohit-mahar-resume.pdf">View resume</TextLink>
        </section>
      </div>
    </div>
  );
}
