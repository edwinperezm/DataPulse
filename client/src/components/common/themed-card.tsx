import { useTheme } from "@/context/theme-context";
import { cn } from "@/utils/utils";

interface ThemedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

export function ThemedCard({ 
  children, 
  className, 
  variant = "default",
  ...props 
}: ThemedCardProps) {
  const { colors } = useTheme();

  return (
    <div
      className={cn(
        "rounded-lg",
        "transition-all duration-200",
        className
      )}
      style={{
        backgroundColor: variant === "default" ? colors.background.primary : "transparent",
        border: variant === "outline" ? `1px solid ${colors.border.default}` : "none",
        color: colors.text.primary
      }}
      {...props}
    >
      {children}
    </div>
  );
}
