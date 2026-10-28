import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-content">
      <div className="page-intro">
        <h1>Page not found.</h1>
        <p>This address does not match a page in the portfolio.</p>
        <Link href="/projects">Browse projects →</Link>
      </div>
    </section>
  );
}
