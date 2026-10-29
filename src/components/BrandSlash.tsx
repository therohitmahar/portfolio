export default function BrandSlash({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-slash ${className}`.trim()} aria-hidden="true">
      /
    </span>
  );
}
