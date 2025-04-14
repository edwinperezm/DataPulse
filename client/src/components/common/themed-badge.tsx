import { useTheme } from "@/context/theme-context";
import { cn } from "@/utils/utils";

interface ThemedBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "active" | "healthy" | "needs-attention" | "at-risk" | "inactive";
}

export function ThemedBadge({ 
  children, 
  className, 
  variant = "default",
  ...props 
}: ThemedBadgeProps) {
  const { colors } = useTheme();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        "transition-all duration-200 hover:bg-[#101E22] hover:text-[#00C8AA] hover:[text-shadow:0px_0px_10px_#00C8AA80]",
        className
      )}
      style={{
        backgroundColor: {
          default: colors.accent.primary,
          outline: 'transparent',
          active: '#192832',
          healthy: '#152C14',
          'needs-attention': '#333116',
          'at-risk': '#331616',
          inactive: '#101E22'
        }[variant || 'default'],
        color: {
          default: colors.background.primary,
          outline: colors.text.primary,
          active: '#0095FF',
          healthy: '#07A500',
          'needs-attention': '#EDDD05',
          'at-risk': '#E30000',
          inactive: '#2D4C55'
        }[variant || 'default'],
        border: variant === "outline" ? `1px solid ${colors.border.default}` : "none"
      }}
      {...props}
    >
      {children}
    </div>
  );
}
