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

function Router() {
  return (
    <div className="flex h-screen overflow-hidden bg-apple-lightgray">
      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 md:px-8 animate-fade-in">
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
        </main>
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
