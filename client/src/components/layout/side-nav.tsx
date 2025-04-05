import { Link, useLocation } from "wouter";
import { cn } from "@/utils/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
} from "lucide-react";

interface SideNavProps {
  isCollapsed: boolean;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/",
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
    name: "Widget Dashboard",
    href: "/widget-dashboard",
    icon: BarChart2,
  },
  {
    name: "Loading Demo",
    href: "/loading-demo",
    icon: Settings,
  },
];

export function SideNav({ isCollapsed }: SideNavProps) {
  const [location] = useLocation();

  return (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {navigation.map((item) => {
        const isActive = location === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              "hover:bg-white/[0.06] hover:text-white",
              isActive
                ? "bg-white/[0.08] text-white shadow-[0_0_1px_rgba(255,255,255,0.1)]"
                : "text-white/60",
              isCollapsed && "justify-center px-2"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 transition-colors duration-200",
              isActive ? "text-white" : "text-white/60"
            )} />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        );
      })}
    </nav>
  );
} 