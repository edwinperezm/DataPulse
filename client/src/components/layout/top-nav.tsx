import { Menu, ChevronLeft, Search, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { cn } from "@/utils/utils";

interface TopNavProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function TopNav({ toggleSidebar, isSidebarOpen }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white">
      <div className="flex h-14 items-center gap-4 px-4">
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
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
            <Input
              type="search"
              placeholder="Search clients, surveys, or reports..."
              className="w-full pl-10 rounded-full border-black/[0.08] bg-white hover:bg-black/[0.02] focus:bg-white focus:border-black/20 transition-all duration-200"
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors relative"
          >
            <Bell className="h-5 w-5 text-black/60" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors"
          >
            <Settings className="h-5 w-5 text-black/60" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white shadow-sm hover:bg-black/90 transition-colors cursor-pointer">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
} 