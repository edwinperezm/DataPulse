import { Switch, Route } from "wouter";
import { queryClient } from "./utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/common/toaster";
import { MainLayout } from "@/components/layout/main-layout";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Clients from "@/pages/clients";
import NewClient from "@/pages/new-client";
import Surveys from "@/pages/surveys";
import LoadingDemo from "@/pages/loading-demo";
import WidgetDashboard from "@/pages/widget-dashboard";

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/clients" component={Clients} />
        <Route path="/clients/new" component={NewClient} />
        <Route path="/surveys" component={Surveys} />
        <Route path="/loading-demo" component={LoadingDemo} />
        <Route path="/widget-dashboard" component={WidgetDashboard} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
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