import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-12 w-full border-2 border-ink bg-bg px-3.5 py-3 text-[15px] text-ink",
          "placeholder:text-muted-2 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue",
          "transition-[border-color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-warn",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
