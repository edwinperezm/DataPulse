import { useState, useEffect } from "react";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { cn } from "@/utils/utils";
import { Activity } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Add overflow hidden to body when mobile menu is open
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7f7f7]">
      {/* Backdrop for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] lg:hidden",
          "transition-[opacity,visibility] duration-300 ease-in-out",
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col bg-black shadow-[0_0_1px_rgba(255,255,255,0.1)]",
          "transform transition-all duration-300 ease-in-out lg:relative lg:transform-none",
          isSidebarOpen ? "w-64" : "w-16",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-14 items-center justify-center border-b border-white/[0.08]">
          <div className={cn(
            "transition-[opacity,width] duration-300 ease-in-out overflow-hidden whitespace-nowrap",
            isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0 lg:w-auto lg:opacity-100"
          )}>
            <h1 className="text-lg font-medium text-white tracking-tight">
              DataPulse
            </h1>
          </div>
          <Activity className={cn(
            "h-5 w-5 text-white transition-[opacity,width] duration-300 ease-in-out",
            isSidebarOpen ? "w-0 opacity-0" : "w-auto opacity-100"
          )} />
        </div>
        <SideNav isCollapsed={!isSidebarOpen} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main 
          className={cn(
            "flex-1 p-6 transition-all duration-300 ease-in-out will-change-[padding]",
            isSidebarOpen ? "lg:pl-70" : "lg:pl-22"
          )}
        >
          <div className="max-w-[2000px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 