import { Link, useLocation } from "wouter";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/utils/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  ChartColumnIncreasing,
  Loader,
  Settings,
} from "lucide-react";

interface SideNavProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Clients",
    href: "/clients",
    icon: Users,
  },
  {
    name: "Surveys",
    href: "/surveys",
    icon: FileText,
  },
  {
    name: "Analytics",
    href: "/analytics-dashboard",
    icon: ChartColumnIncreasing,
  },
  {
    name: "Widget",
    href: "/widget-dashboard",
    icon: Loader,
  },
];

export function SideNav({ isCollapsed, onToggle }: SideNavProps) {
  const [location] = useLocation();
  const { colors } = useTheme();

  return (
    <nav 
      className="flex flex-1 flex-col gap-2 p-3 transition-all duration-0 rounded-lg group-data-[collapsible=icon]:rounded-md"
      style={{ backgroundColor: colors.background.primary }}
    >
      {navigation.map((item) => {
        const isActive = location === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-lg py-2 text-sm font-medium transition-all duration-0",
              isActive 
                ? "bg-[#101E22] text-[#00927C]" 
                : "hover:bg-[#152C2D] hover:text-[#00927C] text-white",
              isCollapsed ? "w-[42px] px-3" : "w-[231px] px-3"
            )}
          >
            <div 
              className="flex items-center gap-3 min-w-0"
            >
              <item.icon 
                className={cn(
                  "h-5 w-5 min-h-[20px] min-w-[20px]",
                  isActive 
                    ? "text-[#00927C]" 
                    : "text-white group-hover:text-[#00927C]"
                )}
              />
              {!isCollapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}