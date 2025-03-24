import { Bell, Menu, MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

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
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-apple-darkgray" />
          <Input 
            className="pl-10 pr-4 py-2 w-full bg-white/80 border-transparent focus:border-apple-blue rounded-xl" 
            placeholder="Search..." 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
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