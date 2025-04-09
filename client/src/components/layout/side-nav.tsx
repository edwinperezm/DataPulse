import { Link, useLocation } from "wouter";
import { Button } from "@/components/common/button";
import { cn } from "@/utils/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  ChartColumnIncreasing,
  Loader,
  Settings,
  PanelLeftClose,
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

  return (
    <nav className="flex flex-1 flex-col gap-2 p-2 transition-all duration-500">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="self-end mb-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <PanelLeftClose className={cn("h-4 w-4 transition-transform", isCollapsed ? "rotate-180" : "")} />
      </Button>
      {navigation.map((item) => {
        const isActive = location === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
              isActive
                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm dark:shadow-gray-800"
                : "text-gray-600 dark:text-gray-400",
              isCollapsed ? "justify-center px-2 opacity-100" : undefined
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 transition-colors duration-200",
                isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400"
              )}
            />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        );
      })}
    </nav>
  );
}