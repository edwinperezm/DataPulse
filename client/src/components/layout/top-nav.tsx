import { Menu, Search, Bell, Settings, PanelLeftClose } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { cn } from "@/utils/utils";
import { useLocation } from "wouter";

interface TopNavProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function TopNav({ toggleSidebar, isSidebarOpen }: TopNavProps) {
  const { colors } = useTheme();
  return (
    <header 
      className="sticky top-0 z-40 border-b backdrop-blur-md supports-[backdrop-filter]:bg-opacity-60"
      style={{
        backgroundColor: colors.background.primary,
        borderColor: "#020E13"
      }}
    >
      <div className="flex h-16 items-center justify-between pl-4 pr-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden rounded-full hover:bg-[#152C2D] active:bg-[#101E22] transition-colors"
          >
            <Menu className="h-5 w-5" style={{ color: colors.text.primary }} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "hidden lg:flex rounded-full hover:bg-[#152C2D] active:bg-[#101E22] transition-all duration-300",
              !isSidebarOpen && "rotate-180"
            )}
          >
            <PanelLeftClose className="h-5 w-5" style={{ color: colors.text.primary }} />
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
            <Input
              type="search"
              placeholder="Search clients, surveys, or reports..."
              className="w-full pl-10 rounded-full transition-all duration-200"
              style={{
                backgroundColor: colors.background.secondary,
                borderColor: "#020E13",
                color: colors.text.primary
              }}
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors relative"
          >
            <Bell className="h-5 w-5" style={{ color: colors.text.secondary }} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors"
          >
            <Settings className="h-5 w-5" style={{ color: colors.text.secondary }} />
          </Button>
          <ThemeSelector />
          <div className="h-4 w-px mx-2" style={{ backgroundColor: "#020E13" }} />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors overflow-hidden"
          >
            <img
              src="https://avatars.githubusercontent.com/u/1?v=4"
              alt="User avatar"
              className="h-8 w-8 rounded-full ring-2 ring-[#020E13]"
            />
          </Button>
        </div>
      </div>
    </header>
  );
}