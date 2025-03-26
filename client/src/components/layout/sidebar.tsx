import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  HomeIcon, 
  UsersIcon, 
  BarChartIcon, 
  Settings, 
  SlidersHorizontal, 
  Menu, 
  Loader,
  LayoutGrid,
  X
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

function NavItem({ href, icon, children, active = false }: NavItemProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center px-3 py-2.5 text-sm font-boldonse rounded-xl cursor-pointer transition-all duration-200 ease-in-out",
          active
            ? "bg-[#57B4BA]/20 text-[#015551] shadow-none backdrop-blur-sm"
            : "text-[#015551]/70 hover:bg-[#57B4BA]/10 hover:text-[#015551]"
        )}
      >
        <div className={cn(
          "w-5 h-5 mr-3", 
          active ? "text-apple-blue" : "text-apple-darkgray"
        )}>
          {icon}
        </div>
        <span>
          {children}
        </span>
      </div>
    </Link>
  );
}

interface SidebarProps {
  isMobileOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isMobileOpen, toggleSidebar }: SidebarProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`u-layout-sidebar ${isMobileOpen ? 'open' : ''} ${collapsed ? 'w-[70px]' : ''}`}>
      <div className="flex flex-col">
        <nav className="flex-1 py-4 space-y-1.5 animate-slide-in">
          <NavItem
            href="/"
            icon={<HomeIcon />}
            active={location === "/"}
          >
            {!collapsed && "Dashboard"}
          </NavItem>
          <NavItem
            href="/clients"
            icon={<UsersIcon />}
            active={location === "/clients"}
          >
            {!collapsed && "Clients"}
          </NavItem>
          <NavItem
            href="/surveys"
            icon={<BarChartIcon />}
            active={location === "/surveys"}
          >
            {!collapsed && "Surveys"}
          </NavItem>
          <NavItem
            href="/settings"
            icon={<SlidersHorizontal />}
            active={location === "/settings"}
          >
            {!collapsed && "Settings"}
          </NavItem>
          <NavItem
            href="/loading-demo"
            icon={<Loader />}
            active={location === "/loading-demo"}
          >
            {!collapsed && "Loading Demo"}
          </NavItem>
          <NavItem
            href="/widget-dashboard"
            icon={<LayoutGrid />}
            active={location === "/widget-dashboard"}
          >
            {!collapsed && "Widget Dashboard"}
          </NavItem>
        </nav>
        
        {/* Collapse toggle button - only on desktop */}
        <div className="hidden md:block mt-auto mb-4">
          <div 
            className="flex items-center px-3 py-2.5 text-sm font-medium cursor-pointer transition-all text-apple-darkgray hover:bg-white/20 hover:text-apple-black rounded-xl mx-3"
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className="w-5 h-5 mr-3 text-apple-darkgray">
              {collapsed ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              )}
            </div>
            {!collapsed && <span>Collapse</span>}
          </div>
        </div>
        
        {/* User profile */}
        {!collapsed && (
          <div className="p-4 m-3 mb-4 bg-white/40 rounded-2xl backdrop-blur-sm shadow-apple-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-apple-blue/10 flex items-center justify-center text-apple-blue font-boldonse font-bold shadow-apple-sm">
                  SJ
                </div>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-apple-black font-boldonse">Sarah Johnson</div>
                <div className="text-xs text-apple-darkgray font-boldonse">Agency Owner</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Collapsed profile */}
        {collapsed && (
          <div className="flex justify-center my-4">
            <div className="h-10 w-10 rounded-full bg-apple-blue/10 flex items-center justify-center text-apple-blue font-boldonse font-bold shadow-apple-sm">
              SJ
            </div>
          </div>
        )}
      </div>
    </div>
  );
}