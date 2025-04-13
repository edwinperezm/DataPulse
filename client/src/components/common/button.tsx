import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-blue-500 text-white hover:bg-blue-600": variant === "default",
            "border border-[#243531] bg-[#0E1A1D] hover:bg-[#132622] hover:text-[#00927C]": variant === "outline",
            "hover:bg-[#152C2D] hover:text-[#00927C]": variant === "ghost",
            "h-9 px-4 py-2": size === "default",
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-8": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
