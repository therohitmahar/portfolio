import Link from "next/link";
import BrandSlash from "./BrandSlash";

export default function Breadcrumbs({
  parent,
  current,
}: {
  parent: { label: string; href: string };
  current: string;
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol role="list">
        <li>
          <BrandSlash />
          <Link href={parent.href}>{parent.label}</Link>
        </li>
        <li>
          <BrandSlash />
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
