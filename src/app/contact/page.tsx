import type { Metadata } from "next";
export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() {
  return (
    <section className="page-content contact-page">
      <div className="page-intro">
        <h1>Contact.</h1>
        <p>
          For frontend roles, project enquiries, or a conversation about the
          work here.
        </p>
      </div>
      <dl className="contact-list">
        <div>
          <dt>Email</dt>
          <dd>
            <a href="mailto:therohitmahar@gmail.com">therohitmahar@gmail.com</a>
          </dd>
        </div>
        <div>
          <dt>LinkedIn</dt>
          <dd>
            <a
              href="https://www.linkedin.com/in/therohitmahar/"
              target="_blank"
              rel="noreferrer"
            >
              therohitmahar ↗
            </a>
          </dd>
        </div>
        <div>
          <dt>GitHub</dt>
          <dd>
            <a
              href="https://github.com/therohitmahar"
              target="_blank"
              rel="noreferrer"
            >
              therohitmahar ↗
            </a>
          </dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>Mumbai, India</dd>
        </div>
      </dl>
    </section>
  );
}
