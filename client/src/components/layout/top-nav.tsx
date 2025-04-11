import { Menu, ChevronLeft, Search, Bell, Settings, User, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { cn } from "@/utils/utils";

interface TopNavProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function TopNav({ toggleSidebar, isSidebarOpen }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="flex justify-between h-16 items-center gap-max-w pl-6 pr-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "hidden lg:flex rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] transition-all duration-300",
            !isSidebarOpen && "rotate-180"
          )}
        >
          <PanelLeftClose className="h-5 w-5" />
        </Button>
        
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
              <Input
                type="search"
                placeholder="Search clients, surveys, or reports..."
                className="w-full pl-10 rounded-full border-black/[0.08] bg-white/80 hover:bg-white focus:bg-white focus:border-black/20 transition-all duration-200"
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors relative"
            >
              <Bell className="h-5 w-5 text-black/60" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors"
            >
              <Settings className="h-5 w-5 text-black/60" />
            </Button>
            <div className="h-4 w-px bg-black/[0.08] mx-2" />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors overflow-hidden"
            >
              <img
                src="https://avatars.githubusercontent.com/u/1?v=4"
                alt="User avatar"
                className="h-8 w-8 rounded-full"
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 