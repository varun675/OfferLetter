import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

// Get the base path from Vite's import.meta.env.BASE_URL
const BASE_PATH = import.meta.env.BASE_URL || '/';

// Custom router that handles the base path
function Router() {
  return (
    <WouterRouter base={BASE_PATH}>
      <Switch>
        <Route path="/" component={Home} />
        {/* Add a catch-all route for 404 pages */}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
