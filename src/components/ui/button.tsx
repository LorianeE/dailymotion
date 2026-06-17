import type { ButtonHTMLAttributes } from "react";

import { cn } from "../../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "default" | "sm";
  variant?: "default" | "outline";
};

export function Button({
  className,
  size = "default",
  type = "button",
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        variant === "default" &&
          "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" &&
          "border border-border bg-transparent text-foreground hover:bg-accent",
        size === "default" && "h-10 rounded-lg px-4 py-2",
        size === "sm" && "h-8 rounded-md px-3 text-xs",
        className,
      )}
      type={type}
      {...props}
    />
  );
}
