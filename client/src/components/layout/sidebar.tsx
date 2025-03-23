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
          "flex items-center px-3 py-2.5 text-sm font-medium rounded-xl cursor-pointer transition-all duration-200 ease-in-out",
          active
            ? "bg-white/30 text-apple-black shadow-apple-sm backdrop-blur-sm"
            : "text-apple-darkgray hover:bg-white/20 hover:text-apple-black"
        )}
      >
        <div className={cn(
          "w-5 h-5 mr-3", 
          active ? "text-apple-blue" : "text-apple-darkgray"
        )}>
          {icon}
        </div>
        <span className="font-boldonse">
          {children}
        </span>
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
      <div className="md:hidden flex items-center justify-between pl-3 pt-3 bg-apple-gray h-16 animate-fade-in">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-full text-apple-darkgray hover:text-apple-black hover:bg-white/30 transition-colors"
          onClick={() => setMobileOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-5 w-5" />
        </button>
        <div className="px-4">
          <h1 className="text-xl font-bold-onse-bold text-apple-black tracking-tight">
            <span className="text-apple-blue mr-2">●</span>
            ClientSignal
          </h1>
        </div>
        <div className="pr-4">
          <div className="h-9 w-9 rounded-full bg-apple-blue/10 flex items-center justify-center text-apple-blue font-boldonse font-bold shadow-apple-sm">
            SJ
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 bg-apple-gray w-72 backdrop-blur-lg border-0">
          <div className="flex h-16 flex-shrink-0 items-center px-6 animate-fade-in">
            <h1 className="text-xl font-bold-onse-bold text-apple-black tracking-tight">
              <span className="text-apple-blue mr-2">●</span>
              ClientSignal
            </h1>
          </div>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-3 py-6 space-y-1.5 animate-slide-up">
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
            
            <div className="p-4 m-3 mt-auto bg-white/40 rounded-2xl backdrop-blur-sm shadow-apple-sm">
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
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-72 bg-apple-gray animate-fade-in">
          <div className="flex items-center h-16 flex-shrink-0 px-6">
            <h1 className="text-xl font-bold-onse-bold text-apple-black tracking-tight">
              <span className="text-apple-blue mr-2">●</span>
              ClientSignal
            </h1>
          </div>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-3 py-6 space-y-1.5 animate-slide-up">
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
            
            <div className="p-4 m-3 mt-auto bg-white/40 rounded-2xl backdrop-blur-sm shadow-apple-sm">
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
          </div>
        </div>
      </div>
    </>
  );
}