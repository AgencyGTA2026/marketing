import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-28 w-full rounded-xl border border-line-2 bg-bg px-3.5 py-3.5 text-[15px] text-ink",
          "placeholder:text-muted-2 focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/5",
          "transition-[border-color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          "aria-[invalid=true]:border-warn",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
