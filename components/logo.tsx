import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <div className="relative h-[58px] w-[224px] sm:h-[62px] sm:w-[240px]">
        <Image
          src="/bayline-logo-cropped.png"
          alt="Bayline Digital"
          width={1254}
          height={325}
          priority
          className="h-full w-full object-contain"
          unoptimized
        />
      </div>
    </div>
  );
}
