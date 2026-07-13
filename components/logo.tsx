import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("brand-mark", className)}>
      <span className="brand-slashes" aria-hidden="true">{"//"}</span>
      <span>BAYLINE <b>DIGITAL</b></span>
    </span>
  );
}
