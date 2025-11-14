import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth-context";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Get the base path from Vite's import.meta.env.BASE_URL
const BASE_PATH = import.meta.env.BASE_URL || '/';

console.log('App BASE_PATH:', BASE_PATH);

// Custom router that handles the base path
function Router() {
  return (
    <WouterRouter base={BASE_PATH}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route>
          <ProtectedRoute>
            <Route path="/" component={Home} />
            {/* Add other protected routes here */}
          </ProtectedRoute>
        </Route>
        {/* Add a catch-all route for 404 pages */}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
