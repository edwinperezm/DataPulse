import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Clients from "@/pages/clients";
import NewClient from "@/pages/new-client";
import Surveys from "@/pages/surveys";
import LoadingDemo from "@/pages/loading-demo";
import WidgetDashboard from "@/pages/widget-dashboard";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/topnav";
import { useState } from "react";

function Router() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="u-layout">
      <TopNav toggleSidebar={toggleSidebar} />

      <div className="u-layout-main-container">
        <Sidebar isMobileOpen={isMobileOpen} toggleSidebar={toggleSidebar} />

        <div className="u-layout-main">
          <div className="u-layout-content">
            <div className="l-layout-container">
              <Switch>
                <Route path="/" component={Dashboard} />
                <Route path="/clients" component={Clients} />
                <Route path="/clients/new" component={NewClient} />
                <Route path="/surveys" component={Surveys} />
                <Route path="/loading-demo" component={LoadingDemo} />
                <Route path="/widget-dashboard" component={WidgetDashboard} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;