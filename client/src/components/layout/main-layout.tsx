import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { cn } from "@/utils/utils";
import { Activity } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [location] = useLocation();

  // Trigger resize event when route changes
  useEffect(() => {
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
  }, [location]);
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
    <div className="flex min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Backdrop for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/5 dark:bg-black/20 backdrop-blur-[2px] lg:hidden",
          "transition-all duration-300 ease-in-out",
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col bg-white dark:bg-gray-900 border-r border-black/[0.06]",
          "transform transition-all duration-300 ease-in-out lg:relative lg:transform-none",
          "border-r border-gray-200 dark:border-gray-800",
          isSidebarOpen ? "w-64" : "w-16",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-center">
          <div className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap",
            "flex items-center gap-3",
            isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0 lg:w-auto lg:opacity-100"
          )}>
            <Activity className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            {isSidebarOpen && (
              <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100 tracking-tight">
                DataPulse
              </h1>
            )}
          </div>
        </div>
        <SideNav isCollapsed={!isSidebarOpen} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main 

        >
          {children}
        </main>
      </div>
    </div>
  );
} 