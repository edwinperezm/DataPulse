import { useTheme } from "@/context/theme-context";
import { cn } from "@/utils/utils";

interface ThemedTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "muted";
}

export function ThemedText({ 
  children, 
  className, 
  variant = "primary",
  ...props 
}: ThemedTextProps) {
  const { colors } = useTheme();

  return (
    <p
      className={cn("transition-colors duration-200", className)}
      style={{
        color: colors.text[variant]
      }}
      {...props}
    >
      {children}
    </p>
  );
}
