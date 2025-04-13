import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { cn } from "@/utils/utils";
import { Activity } from "lucide-react";
import { useTheme } from "@/context/theme-context";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { colors } = useTheme();
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
    <div 
      className="flex min-h-screen overflow-hidden"
      style={{ backgroundColor: colors.background.primary }}
    >
      {/* Backdrop for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 backdrop-blur-[2px] lg:hidden",
          "transition-all duration-300 ease-in-out",
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        style={{ backgroundColor: `${colors.background.secondary}40` }}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col border-r border-[#020E13]",
          "transform transition-all duration-300 ease-in-out lg:relative lg:transform-none",
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
            <Activity className="h-5 w-5" style={{ color: colors.text.primary }} />
            {isSidebarOpen && (
              <h1 
                className="text-lg font-medium tracking-tight"
                style={{ color: colors.text.primary }}
              >
                DataPulse
              </h1>
            )}
          </div>
        </div>
        <SideNav isCollapsed={!isSidebarOpen} onToggle={toggleSidebar} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main 
          className="flex-1 p-6"
          style={{ backgroundColor: colors.background.secondary }}
        >
          {children}
        </main>
      </div>
    </div>
  );
} 