import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function ArrowIcon({
  direction = "up-right",
}: {
  direction?: "right" | "up-right";
}) {
  const Icon = direction === "right" ? ArrowRight : ArrowUpRight;
  return (
    <Icon
      className="arrow-icon"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    />
  );
}
