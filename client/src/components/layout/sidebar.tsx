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
          "flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer",
          active
            ? "bg-primary-50 text-primary-700"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        )}
      >
        <div className={cn(
          "w-6 h-6 mr-3", 
          active ? "text-primary-500" : "text-gray-400"
        )}>
          {icon}
        </div>
        {children}
      </div>
    </Link>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile header bar */}
      <div className="md:hidden flex items-center justify-between pl-3 pt-3 border-b border-gray-200 bg-white h-16">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          onClick={() => setMobileOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" />
        </button>
        <div className="px-4">
          <h1 className="text-xl font-semibold text-gray-800">
            <span className="text-primary-500 mr-2">●</span>
            ClientSignal
          </h1>
        </div>
        <div className="pr-2">
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
            SJ
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 bg-white w-64">
          <div className="flex h-16 flex-shrink-0 items-center px-4 border-b border-gray-200 bg-white">
            <h1 className="text-xl font-semibold text-gray-800">
              <span className="text-primary-500 mr-2">●</span>
              ClientSignal
            </h1>
          </div>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <NavItem
                href="/"
                icon={<HomeIcon />}
                active={location === "/"}
              >
                Dashboard
              </NavItem>
              <NavItem
                href="/clients"
                icon={<UsersIcon />}
                active={location === "/clients"}
              >
                Clients
              </NavItem>
              <NavItem
                href="/surveys"
                icon={<BarChartIcon />}
                active={location === "/surveys"}
              >
                Surveys
              </NavItem>
              <NavItem
                href="/settings"
                icon={<SlidersHorizontal />}
                active={location === "/settings"}
              >
                Settings
              </NavItem>
              <NavItem
                href="/loading-demo"
                icon={<Loader />}
                active={location === "/loading-demo"}
              >
                Loading Demo
              </NavItem>
              <NavItem
                href="/widget-dashboard"
                icon={<LayoutGrid />}
                active={location === "/widget-dashboard"}
              >
                Widget Dashboard
              </NavItem>
            </nav>
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                    SJ
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-700">Sarah Johnson</div>
                  <div className="text-xs text-gray-500">Agency Owner</div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-800">
              <span className="text-primary-500 mr-2">●</span>
              ClientSignal
            </h1>
          </div>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <NavItem
                href="/"
                icon={<HomeIcon />}
                active={location === "/"}
              >
                Dashboard
              </NavItem>
              <NavItem
                href="/clients"
                icon={<UsersIcon />}
                active={location === "/clients"}
              >
                Clients
              </NavItem>
              <NavItem
                href="/surveys"
                icon={<BarChartIcon />}
                active={location === "/surveys"}
              >
                Surveys
              </NavItem>
              <NavItem
                href="/settings"
                icon={<SlidersHorizontal />}
                active={location === "/settings"}
              >
                Settings
              </NavItem>
              <NavItem
                href="/loading-demo"
                icon={<Loader />}
                active={location === "/loading-demo"}
              >
                Loading Demo
              </NavItem>
              <NavItem
                href="/widget-dashboard"
                icon={<LayoutGrid />}
                active={location === "/widget-dashboard"}
              >
                Widget Dashboard
              </NavItem>
            </nav>
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                    SJ
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-700">Sarah Johnson</div>
                  <div className="text-xs text-gray-500">Agency Owner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}