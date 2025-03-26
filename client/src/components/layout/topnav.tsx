import { Bell, Menu, MoreHorizontal } from "lucide-react";
import { SearchBar } from "./search-bar";

interface TopNavProps {
  toggleSidebar: () => void;
}

export function TopNav({ toggleSidebar }: TopNavProps) {
  return (
    <div className="u-layout-topnav animate-fade-in">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="md:hidden -ml-0.5 -mt-0.5 h-10 w-10 inline-flex items-center justify-center rounded-full text-apple-darkgray hover:text-apple-black hover:bg-white/30 transition-colors"
          onClick={toggleSidebar}
        >
          <span className="sr-only">Toggle sidebar</span>
          <Menu className="h-5 w-5" />
        </button>
        <div className="text-lg font-bold text-apple-black">
          <span className="text-apple-blue mr-1">●</span>
          ClientSignal
        </div>
      </div>
      
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <SearchBar className="w-full" />
      </div>
      
      <div className="flex items-center gap-3">
        <SearchBar className="md:hidden" />
        
        <button className="h-9 w-9 rounded-full bg-white/80 flex items-center justify-center text-apple-darkgray hover:text-apple-black hover:bg-white transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <button className="h-9 w-9 rounded-full bg-white/80 flex items-center justify-center text-apple-darkgray hover:text-apple-black hover:bg-white transition-colors">
          <MoreHorizontal className="h-5 w-5" />
        </button>
        <div className="h-9 w-9 rounded-full bg-apple-blue/10 flex items-center justify-center text-apple-blue font-boldonse font-bold shadow-apple-sm">
          SJ
        </div>
      </div>
    </div>
  );
}