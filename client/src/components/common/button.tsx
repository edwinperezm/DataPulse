import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { useTheme } from "@/context/theme-context";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const getButtonClasses = (variant: string, size: string, colors: any) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: [
      'bg-accent text-white',
      'hover:bg-accent/90',
      'focus-visible:ring-accent',
    ].join(' '),
    outline: [
      'border border-border',
      'bg-background',
      'hover:bg-hover',
      'hover:text-accent',
      'focus-visible:ring-accent',
    ].join(' '),
    ghost: [
      'hover:bg-hover',
      'hover:text-accent',
      'focus-visible:ring-accent',
    ].join(' '),
  };

  const sizeClasses = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-10 px-8',
    icon: 'h-9 w-9',
  };

  return cn(
    baseClasses,
    variantClasses[variant as keyof typeof variantClasses] || variantClasses.default,
    sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", style, ...props }, ref) => {
    const { colors } = useTheme();
    
    return (
      <button
        className={cn(
          getButtonClasses(variant, size, colors),
          className
        )}
        style={{
          '--accent': colors.accent.primary,
          '--background': colors.background.primary,
          '--hover': colors.background.hover,
          '--border': colors.border.default,
          ...style,
        } as React.CSSProperties}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
