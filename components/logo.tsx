import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <div className="relative h-[38px] w-[146px] sm:h-[42px] sm:w-[162px]">
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
