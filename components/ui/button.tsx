import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-black uppercase tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-bg border-2 border-ink shadow-[5px_5px_0_0_var(--color-blue)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_var(--color-blue)]",
        outline:
          "bg-bg text-ink border-2 border-ink shadow-[5px_5px_0_0_var(--color-ink)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_var(--color-ink)]",
        ghost: "hover:bg-bg-sunken text-ink-2",
        link: "text-ink-2 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-[22px] text-[14px]",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
